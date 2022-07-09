use crate::domain::FetchError;
use crate::startup::ApplicationImagePath;
use actix_web::http::StatusCode;
use actix_web::HttpResponse;
use actix_web::{get, web, Result};
use anyhow::anyhow;
use std::collections::HashSet;
use std::path::PathBuf;

#[get("/images/{image_id}")]
pub async fn get_image(
    path: web::Path<String>,
    files: web::Data<HashSet<String>>,
    image_path: web::Data<ApplicationImagePath>,
) -> Result<HttpResponse, FetchError> {
    let image_id = path.into_inner();
    if files.contains(&image_id) {
        let mut temp: PathBuf = PathBuf::new();
        temp.push(&image_path.0);
        temp.push(&image_id);
        temp.set_extension("png");
        let image_content = tokio::fs::read(temp).await;

        match image_content {
            Ok(bytes) => Ok(HttpResponse::build(StatusCode::OK)
                .content_type("iamge/png")
                .body(bytes)),
            Err(_) => Err(FetchError::UnexpectedError(anyhow!("Internal Error"))),
        }
    } else {
        Err(FetchError::UnexpectedError(anyhow!("Internal Error")))
    }
}
