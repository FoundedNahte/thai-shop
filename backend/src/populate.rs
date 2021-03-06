use crate::domain::InsertError;
use crate::domain::Item;
use crate::entity::items;
use anyhow::Context;
use anyhow::Result;
use sea_orm::entity::*;
use sea_orm::DatabaseConnection;
use std::collections::HashSet;
use std::fs;
use std::fs::File;
use std::io::{self, BufRead, Write};
use std::path::{Path, PathBuf};
use uuid::Uuid;

fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where
    P: AsRef<Path>,
{
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}
pub fn get_hashset(item_base_path: &String) -> HashSet<String> {
    let mut item_list: PathBuf = PathBuf::new();
    item_list.push(&item_base_path);
    item_list.push("item_list");
    item_list.set_extension("txt");

    let mut file_names: HashSet<String> = HashSet::new();

    if let Ok(lines) = read_lines(&item_list) {
        for item in lines.flatten() {
            file_names.insert(item);
        }
    }

    file_names
}

// Initial call to populate database with item directory on app startup
pub async fn populate_database(
    item_base_path: &String,
    image_base_path: &String,
    pool: &DatabaseConnection,
) -> Result<(), anyhow::Error> {
    // Populate vector with all item paths
    let mut item_list: PathBuf = PathBuf::new();
    item_list.push(&item_base_path);
    item_list.push("item_list");
    item_list.set_extension("txt");

    let mut new_files: Vec<String> = Vec::new();

    if let Ok(lines) = read_lines(&item_list) {
        for item in lines.flatten() {
            println!("Adding {} to database", item);
            let new_name = add_item(&item, item_base_path, image_base_path, pool).await?;
            new_files.push(new_name.to_owned());
        }
    }
    // Append all filenames into string with new lines in between each item
    let data = |mut string: String| -> String {
        for file in new_files.iter() {
            string.push_str(file);
            string.push('\n');
        }
        string
    };
    println!("{:?}", item_list);
    println!("{}", data(String::new()));
    let mut file = File::options().write(true).open(&item_list)?;
    file.write_all(data(String::new()).as_bytes())?;
    Ok(())
}

async fn add_item(
    name: &String,
    item_base_path: &String,
    image_base_path: &String,
    pool: &DatabaseConnection,
) -> Result<String, anyhow::Error> {
    // Read item's csv
    let mut item_path: PathBuf = PathBuf::new();
    item_path.push(&item_base_path);
    item_path.push(&name);
    item_path.set_extension("csv");
    let mut reader = csv::Reader::from_path(&item_path)?;
    let mut iter = reader.deserialize();
    let mut id: String = String::new();

    if let Some(result) = iter.next() {
        let record: Item = result?;

        let item_id = insert_item(pool, &record)
            .await
            .expect("Failed to insert new item in database");

        // Rename image files with uuid
        let mut item_image_path: PathBuf = PathBuf::new();
        item_image_path.push(&image_base_path);
        item_image_path.push(&name);
        item_image_path.set_extension("png");
        let mut image_temp: PathBuf = PathBuf::new();
        image_temp.push(&image_base_path);
        image_temp.push(&item_id.to_simple().to_string());
        image_temp.set_extension("png");
        fs::rename(&item_image_path, &image_temp)?;

        // Rname csv files with uuid
        let mut csv_temp: PathBuf = PathBuf::new();
        csv_temp.push(&item_base_path);
        csv_temp.push(&item_id.to_simple().to_string());
        csv_temp.set_extension("csv");
        fs::rename(&item_path, &csv_temp)?;
        id = item_id.to_simple().to_string();
    }
    Ok(id)
}

async fn insert_item(db: &DatabaseConnection, item: &Item) -> Result<Uuid, InsertError> {
    let item_id = Uuid::new_v4();

    let item = items::ActiveModel {
        name: Set(item.name.to_owned()),
        id: Set(item_id.to_owned()),
        category: Set(item.category.to_owned()),
        description: Set(item.description.to_owned()),
        price: Set(item.price.to_owned()),
        discount: Set(item.discount.to_owned()),
    };

    items::Entity::insert(item)
        .exec(db)
        .await
        .context("Failed to insert item into database")?;

    Ok(item_id)
}
