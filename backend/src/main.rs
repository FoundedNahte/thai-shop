use backend::populate::populate_database;
use backend::configuration::get_configuration;
use backend::startup::{Application, get_connection_pool};
use std::env;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let configuration = get_configuration().expect("Failed to read configuration.");

    if let Ok(v) = env::var("POPULATE") {
        if v.eq_ignore_ascii_case("true") {
            populate_database(&configuration.application.item_path, &get_connection_pool(&configuration.database)).await?;
        }
    }

    let application = Application::build(configuration).await?;

    application.run_until_stopped().await?;

    Ok(())
}
