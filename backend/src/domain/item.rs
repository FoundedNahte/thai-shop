#[derive(serde::Deserialize, serde::Serialize)]
pub struct Item {
    pub name: String,
    pub cateogry: String,
    pub description: String,
    pub price: f64,
    pub discount: f64,
}