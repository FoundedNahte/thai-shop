use crate::domain::FetchError;
use crate::entity::items;
use crate::entity::items::Entity as Item;
use actix_web::{get, web, Responder, Result};
use anyhow::Context;
use sea_orm::DatabaseConnection;
use sea_orm::{entity::*, query::*};

#[derive(serde::Deserialize)]
pub struct Parameters {
    pub categories: Option<i32>,
    pub search_term: Option<String>,
}

// Read bits from parameter into vector of categories
fn bits_into_vector(input_bitfield: Option<i32>) -> Option<Vec<String>> {
    if let Some(bitfield) = input_bitfield {
        let categories = [
            "Bamboo/Corn/Mushrooms",
            "Beverages/Juices",
            "Candies/Snacks",
            "Canned Coconut Milk",
            "Canned Fruits & Vegetables",
            "Curry & Paste",
            "Dried Products",
            "Frozen Products",
            "Instant Noodles",
            "Other Canned Products",
            "Pickled & Preserved Products",
            "Rice",
            "Rice Products/Beans/Starch",
            "Sauces/Spices/Seasonings",
            "Utensils & Non-Food Products"
        ];

        let mut vec_categories: Vec<String> = Vec::new();

        for i in 0..categories.len() {
            if (bitfield & (1 << i)) != 0 {
                vec_categories.push(String::from(categories[i]));
            }
        }

        Some(vec_categories)
    } else {
        None
    }

}

#[get("/search")]
pub async fn fetch_items(
    parameters: web::Query<Parameters>,
    pool: web::Data<DatabaseConnection>,
) -> Result<impl Responder, FetchError> {

    println!("{:?}", &bits_into_vector(parameters.categories));
    let query = get_items(&bits_into_vector(parameters.categories), &parameters.search_term, &pool).await.context("test")?;

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
