use crate::domain::Item;
use sqlx::PgPool;
use actix_web::{web, Result};

#[derive(serde::Deserialize)]
struct Category(String);

#[tracing::instrument(name = "Processing Fetch Request", skip(query, pool))]
async fn fetch_items(query: web::Path<Category>, pool: web::Data<PgPool>) -> Result<impl Responder, anyhow::Error> {
    let query: Vec<Item> = get_item(&query, &pool).await?;
    web::Json(query)
}

#[tracing::instrument(name = "Get item from database", skip(category, pool))]
async fn get_items(category: &String, pool: &PgPool) -> Result<Vec<Item>, anyhow::Error> {
    let rows = sqlx::query!(
        r#"SELECT * FROM items WHERE category = $1"#,
        category,
    )
    .execute(pool)
    .await?;
    
    let items: Vec<Item> = Vec::new();
    while let Some(row) = rows.try_next().await? {
        items.push(row);
    }
    
    Ok(items)
}
