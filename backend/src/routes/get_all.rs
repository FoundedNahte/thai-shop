use crate::populate::Item;
use actix_web::{web, App, HttpServer, Responder};

async fn get_items(
    pool: web::Data<PgPool>
) -> impl Responder {
    let mut response: Vec<Item> = Vec::new();
}
