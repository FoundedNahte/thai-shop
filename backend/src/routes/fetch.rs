use crate::domain::FetchError;
use crate::entity::items;
use crate::entity::items::Entity as Item;
use actix_web::{get, web, Responder, Result};
use anyhow::Context;
use sea_orm::DatabaseConnection;
use sea_orm::{entity::*, query::*};

#[derive(serde::Deserialize)]
pub struct Parameters {
    pub categories: Option<String>,
    pub search_term: Option<String>,
}

#[get("/search/{parameters}")]
pub async fn fetch_items(
    parameters: web::Query<Parameters>,
    pool: web::Data<DatabaseConnection>,
) -> Result<impl Responder, FetchError> {
    let test_search = Some(String::from("siracha"));

    let mut test_categories = Vec::new();
    test_categories
    let query = get_items(&None, , &pool).await.context("test")?;

    Ok(web::Json(query))
}

async fn get_items(
    categories: &Option<Vec<String>>,
    search_term: &Option<String>,
    pool: &DatabaseConnection,
) -> Result<Vec<serde_json::Value>, anyhow::Error> {

    let mut categories_condition: Option<sea_orm::Condition> = None;
    let mut search_condition: Option<sea_orm::Condition> = None;

    if let Some(vector) = categories {
        let mut temp = Condition::any();
        for category in vector {
            temp = temp.add(items::Column::Category.contains(&category));
        }
        categories_condition = Some(temp);
    }

    if let Some(term) = search_term {
        let temp = Condition::all().add(items::Column::Name.like(&format!("%{}%", term)));
        search_condition = Some(temp);
    }

    let items: Vec<serde_json::Value> = Item::find()
        .filter(Condition::all()
            .add_option(categories_condition)
            .add_option(search_condition)
        )
        .order_by_asc(items::Column::Name)
        .into_json()
        .all(pool)
        .await?;

    Ok(items)
}
