use actix_web::{web, Responde, Result};

#[derive(serde::Deserialize)]
struct Category(String);

async fn fetch_items(query: web::Path<Category>) -> Result<impl Responder, anyhow::Error> {

}
