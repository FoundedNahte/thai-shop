use crate::populate::populate_database;
use crate::configuration::{DatabaseSettings, Settings};
use crate::routes::{health_check, react_page, fetch_items};
use actix_files::Files;
use actix_web::dev::Server;
use actix_web::web::Data;
use actix_web::{web, App, HttpServer};
use sqlx::postgres::PgPoolOptions;
use sqlx::PgPool;
use std::net::TcpListener;
use std::collections::HashSet;
use tracing_actix_web::TracingLogger;
use sea_orm::{DatabaseConnection, Database};

pub struct Application {
    port: u16,
    server: Server,
}

impl Application {
    pub async fn build(configuration: Settings) -> Result<Self, anyhow::Error> {
        //let connection_pool = get_connection_pool(&configuration.database);
        let connection_pool = Database::connect(&configuration.database.database_url).await?;

        let address = format!(
            "{}:{}",
            configuration.application.host, configuration.application.port
        );
        
        let mut file_names: HashSet<String> = HashSet::new();
    
        if configuration.database.populate {
            file_names = populate_database(&configuration.application.item_path, &configuration.application.image_path, &connection_pool).await?;
        }

        let listener = TcpListener::bind(&address)?;
        let port = listener.local_addr().unwrap().port();
        let server = run(
            listener,
            connection_pool,
            configuration.application.base_url,
            configuration.application.build_path,
            configuration.application.image_path,
            file_names,
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

pub fn get_connection_pool(configuration: &DatabaseSettings) -> PgPool {
    PgPoolOptions::new()
        .connect_timeout(std::time::Duration::from_secs(2))
        .connect_lazy_with(configuration.with_db())
}

pub struct ApplicationBaseUrl(pub String);
pub struct ApplicationBuildPath(pub String);
pub struct ApplicationImagePath(pub String);

async fn run(
    listener: TcpListener,
    db_pool: DatabaseConnection,
    base_url: String,
    build_path: String,
    image_path: String,
    file_names: HashSet<String>,
) -> Result<Server, anyhow::Error> {
    let files = Data::new(file_names);
    let db_pool = Data::new(db_pool);
    let image_path = Data::new(ApplicationImagePath(image_path));
    let base_url = Data::new(ApplicationBaseUrl(base_url));
    let server = HttpServer::new(move || {
        App::new()
            .wrap(TracingLogger::default())
            .route("/health_check", web::get().to(health_check))
            .route("/", web::get().to(react_page))
            .service(fetch_items)
            .app_data(db_pool.clone())
            .app_data(base_url.clone())
            .app_data(image_path.clone())
            .app_data(files.clone())
            .app_data(Data::new(ApplicationBuildPath(build_path.clone())))
            .service(Files::new("/", build_path.clone()).index_file("index.html"))
    })
    .listen(listener)?
    .run();
    Ok(server)
}
