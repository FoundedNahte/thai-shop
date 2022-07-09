use crate::startup::ApplicationImagePath;
use crate::entity::items;
use crate::entity::items::Entity as Item;
use crate::domain::FetchError;
use std::path::PathBuf;
use std::collections::HashSet;
use actix_web::{get, web, Responder, Result};
use actix_web::http::StatusCode;
use actix_web::HttpResponse;
use sea_orm::DatabaseConnection;
use sea_orm::{entity::*, query::*};
use anyhow::{anyhow, Context};

#[derive(serde::Deserialize)]
pub struct Category(String);

#[get("/images/{image_id}")]
pub async fn get_image(path: web::Path<String>, files: web::Data<HashSet<String>>, image_path: web::Data<ApplicationImagePath>) -> Result<HttpResponse, FetchError> {
    let image_id = path.into_inner();
    if files.contains(&image_id) {
        let mut temp: PathBuf = PathBuf::new();
        temp.push(&image_path.0);
        temp.push(&image_id);
        temp.set_extension("png");
        println!("{:?}", temp);
        let image_content = tokio::fs::read(temp)
            .await;

        match image_content {
            Ok(bytes) => {
                Ok(HttpResponse::build(StatusCode::OK)
                    .content_type("image/jpeg")
                    .body(bytes))
            },
            Err(_) => {
                Err(FetchError::UnexpectedError(anyhow!("Internal Error"))) 
            }
        }
    } else {
        println!("Image ID not found");
        Err(FetchError::UnexpectedError(anyhow!("Image ID not found")))
    }
}

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
