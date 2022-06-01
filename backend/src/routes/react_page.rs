use actix_files::NamedFile;
use std::path::PathBuf;

pub async fn react_page() -> Result<NamedFile, std::io::Error> {
    let path: PathBuf = PathBuf::from("/home/ethan/repo/thai-shop/frontend/build/index.html");
    Ok(NamedFile::open(path)?)
}

