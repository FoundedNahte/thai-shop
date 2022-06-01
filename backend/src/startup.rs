use crate::routes::{health_check, react_page};
use crate::configuration::{DatabaseSettings, Settings};
use actix_web::dev::Server;
use actix_web::web::Data;
use actix_web::{web, App, HttpServer};
use sqlx::postgres::PgPoolOptions;
use sqlx::PgPool;
use std::net::TcpListener;
use tracing_actix_web::TracingLogger;
use actix_files::Files;

pub struct Application {
    port: u16,
    server: Server,
}

impl Application {
    pub async fn build(configuration: Settings) -> Result<Self, anyhow::Error> {
        let connection_pool = get_connection_pool(&configuration.database)
            .await
            .expect("Failed to connect to Postgres.");

        let address = format!(
            "{}:{}",
            configuration.application.host, configuration.application.port
        );

        let listener = TcpListener::bind(&address)?;
        let port = listener.local_addr().unwrap().port();
        let server = run(
            listener,
            connection_pool,
            configuration.application.base_url,
        )
        .await?;

        Ok(Self { port, server })
    }

    pub fn port(&self) -> u16 {
        self.port
    }

    pub async fn run_until_stopped(self) -> Result<(), std::io::Error> {
        self.server.await
    }
}

pub async fn get_connection_pool(configuration: &DatabaseSettings) -> Result<PgPool, sqlx::Error> {
    PgPoolOptions::new()
        .connect_timeout(std::time::Duration::from_secs(2))
        .connect_with(configuration.with_db())
        .await
}

pub struct ApplicationBaseUrl(pub String);
use actix_web_lab::web::spa;
use actix_web::middleware;

async fn run(
    listener: TcpListener,
    db_pool: PgPool,
    base_url: String,
) -> Result<Server, anyhow::Error> {
    env_logger::init();
    let db_pool = Data::new(db_pool);
    let base_url = Data::new(ApplicationBaseUrl(base_url));
    let server = HttpServer::new(move || {
        App::new()
            .wrap(middleware::Logger::default())
            .route("/health_check", web::get().to(health_check))
            .route("/", web::get().to(react_page))
            .route("/usr", web::get().to(react_page))
            .app_data(db_pool.clone())
            .app_data(base_url.clone())
            .service(Files::new("/", "/home/ethan/repo/thai-shop/frontend/build").index_file("index.html"))
    })
    .listen(listener)?
    .run();
    Ok(server)
}
