use crate::domain::{ItemId, FetchError};
use sqlx::PgPool;
use actix_web::{get, web, Responder, Result};
use anyhow::Context;

#[derive(serde::Deserialize)]
pub struct Category(String);

#[get("/category/{category}")]
pub async fn fetch_items(path: web::Path<String>, pool: web::Data<PgPool>) -> Result<impl Responder, FetchError> {
    let query = path.into_inner();
    let query: Vec<ItemId> = get_items(&query, &pool)
        .await
        .context("test")?;

    Ok(web::Json(query))
}

async fn get_items(category: &String, pool: &PgPool) -> Result<Vec<ItemId>, anyhow::Error> {
    let rows = sqlx::query_as!(ItemId,
        r#"SELECT * FROM items WHERE category = $1"#,
        category,
    )
    .fetch_all(pool)
    .await?;

    Ok(rows)
}
