use crate::entity::items;
use crate::entity::items::Entity as Item;
use crate::domain::{ItemId, FetchError};
use sqlx::{PgPool, Database};
use actix_web::{get, web, Responder, Result};
use sea_orm::DatabaseConnection;
use sea_orm::{entity::*, query::*};
use anyhow::Context;

#[derive(serde::Deserialize)]
pub struct Category(String);

#[get("/category/{category}")]
pub async fn fetch_items(path: web::Path<String>, pool: web::Data<DatabaseConnection>) -> Result<impl Responder, FetchError> {
    let query = path.into_inner();
    let query: Vec<serde_json::Value> = get_items(&query, &pool)
        .await
        .context("test")?;

    Ok(web::Json(query))
}

async fn get_items(category: &String, pool: &DatabaseConnection) -> Result<Vec<serde_json::Value>, anyhow::Error> {
    let items: Vec<serde_json::Value> = Item::find()
        .filter(items::Column::Category.contains(&category))
        .order_by_asc(items::Column::Name)
        .into_json()
        .all(pool)
        .await?;

    Ok(items)
}
