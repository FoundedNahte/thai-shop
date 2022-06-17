use actix_web::{web, Result};

#[derive(serde::Deserialize)]
struct Category(String);

async fn fetch_items(_query: web::Path<Category>) -> Result<(), anyhow::Error> {
    Ok(())
}
