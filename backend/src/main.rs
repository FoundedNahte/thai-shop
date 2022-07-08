use backend::telemetry::{get_subscriber, init_subscriber};
use backend::populate::populate_database;
use backend::configuration::get_configuration;
use backend::startup::{Application, get_connection_pool};
use std::env;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let configuration = get_configuration().expect("Failed to read configuration.");
    let subscriber = get_subscriber("server".into(), "info".into(), std::io::stdout); 
    init_subscriber(subscriber);

    let application = Application::build(configuration).await?;

    application.run_until_stopped().await?;

    Ok(())
}
