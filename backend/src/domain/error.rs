use actix_web::ResponseError;
use actix_web::http::StatusCode;

#[derive(thiserror::Error)]
pub enum InsertError {
    #[error(transparent)]
    UnexpectedError(#[from] anyhow::Error)
}

impl ResponseError for InsertError {
    fn status_code(&self) -> StatusCode {
        match self {
            InsertError::UnexpectedError(_) => StatusCode::INTERNAL_SERVER_ERROR,
        }
    }
}

impl std::fmt::Debug for InsertError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        error_chain_fmt(self, f)
    }
}


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
