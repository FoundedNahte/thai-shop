use actix_web::{web, Responder, Result};

#[derive(serde::Deserialize)]
struct Category(String);

async fn fetch_items(query: web::Path<Category>) -> Result<(), anyhow::Error> {
    Ok(())
}
