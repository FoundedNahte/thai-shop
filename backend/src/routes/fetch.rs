use crate::domain::FetchError;
use crate::entity::items;
use crate::entity::items::Entity as Item;
use actix_web::{get, web, Responder, Result};
use anyhow::Context;
use sea_orm::DatabaseConnection;
use sea_orm::{entity::*, query::*};

#[derive(serde::Deserialize)]
struct Parameters {
    categories: Option<String>,
    search_term: Option<String>,
}

#[get("/category/{category}")]
pub async fn fetch_items(
    parameters: web::Query<Parameters>,
    pool: web::Data<DatabaseConnection>,
) -> Result<impl Responder, FetchError> {
    let categories: Vec<String> = Parameters.categories.unwrap_or_default();
    let query = get_items(&query, &pool).await.context("test")?;

    Ok(web::Json(query))
}

async fn get_items(
    category: &str,
    pool: &DatabaseConnection,
) -> Result<Vec<serde_json::Value>, anyhow::Error> {
    let items: Vec<serde_json::Value> = Item::find()
        .filter(items::Column::Category.contains(category))
        .order_by_asc(items::Column::Name)
        .into_json()
        .all(pool)
        .await?;

    Ok(items)
}
