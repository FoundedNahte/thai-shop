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
    //let categories: Vec<String> = parameters.categories.unwrap_or_default();
    //let query = get_items(&query, &pool).await.context("test")?;

    Ok(web::Json())
}

async fn get_items(
    categories: Option<Vec<&str>>,
    search_term: Option<&str>,
    pool: &DatabaseConnection,
) -> Result<Vec<serde_json::Value>, anyhow::Error> {

    let conditions = Condition::any();

    if let Some(vector) = categories {
        let temp = Condition::any();
        for category in vector {
            &temp.add(items::Column::Category.contains(category));
        }
        &conditions.add(temp);
    }

    if let Some(term) = search_term {
        let temp = Condition::all().add(items::Column::Name.like(&format!("%{}%", term)));
        &conditions.add(temp);
    }

    let items: Vec<serde_json::Value> = Item::find()
        .filter(conditions)
        .order_by_asc(items::Column::Name)
        .into_json()
        .all(pool)
        .await?;

    Ok(items)
}
