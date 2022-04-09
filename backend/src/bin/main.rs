use actix_files as fs;
use actix_web::{get, web, App, HttpServer, Responder};
use std::path::PathBuf;

#[get("/")]
async fn greet(name: web::Path<String>) -> impl Responder {
    format!("HelloWorld")
}

async fn index() -> Result<fs::NamedFile> {
    let path: PathBuf = 
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .route("/", web::get().to(single_page_app))
            .service(fs::Files::new("/", "./frontend/build").index_file("index.html"))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
