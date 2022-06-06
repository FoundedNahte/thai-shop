use backend::populate::populate_database;
use backend::configuration::get_configuration;
use backend::startup::{Application, get_connection_pool};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let configuration = get_configuration().expect("Failed to read configuration.");
    populate_database(&configuration.application.item_path, &get_connection_pool(&configuration.database)).await?;
    let application = Application::build(configuration).await?;
    application.run_until_stopped().await?;
    Ok(())
}
