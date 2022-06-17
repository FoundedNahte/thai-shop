use crate::startup::ApplicationBuildPath;
use actix_files::NamedFile;
use actix_web::web;
use std::path::PathBuf;

pub async fn react_page(
    build_path: web::Data<ApplicationBuildPath>,
) -> Result<NamedFile, std::io::Error> {
    let mut path: PathBuf = PathBuf::new();
    path.push(&build_path.0);
    path.push("index.html");
    NamedFile::open(path)
}
