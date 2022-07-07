use uuid::Uuid;

#[derive(serde::Deserialize, serde::Serialize)]
pub struct Item {
    pub name: String,
    pub category: String,
    pub description: String,
    pub price: f64,
    pub discount: f64,
}

#[derive(serde::Deserialize, serde::Serialize)]
pub struct ItemId {
    pub name: String,
    pub id: Uuid,
    pub category: String,
    pub description: String,
    pub price: f64,
    pub discount: f64, }
