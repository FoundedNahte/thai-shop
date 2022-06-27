use crate::domain::ItemId;
use sqlx::PgPool;
use actix_web::{get, web, Responder, Result, ResponseError};
use actix_web::http::StatusCode;
use anyhow::Context;

#[derive(serde::Deserialize)]
pub struct Category(String);

#[derive(thiserror::Error)]
pub enum FetchError {
    #[error(transparent)]
    UnexpectedError(#[from] anyhow::Error)
}

impl ResponseError for FetchError {
    fn status_code(&self) -> StatusCode {
        match self {
            FetchError::UnexpectedError(_) => StatusCode::INTERNAL_SERVER_ERROR,
        }
    }
}

impl std::fmt::Debug for FetchError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        error_chain_fmt(self, f)
    }
}

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

pub fn error_chain_fmt(
    e: &impl std::error::Error,
    f: &mut std::fmt::Formatter<'_>,
) -> std::fmt::Result {
    writeln!(f, "{}\n", e)?;
    let mut current = e.source();
    while let Some(cause) = current {
        writeln!(f, "Caused by:\n\t{}", cause)?;
        current = cause.source();
    }
    Ok(())
}
