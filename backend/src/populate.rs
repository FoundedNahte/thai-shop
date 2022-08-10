use crate::domain::InsertError;
use crate::domain::Item;
use crate::entity::items;
use anyhow::Context;
use anyhow::Result;
use sea_orm::entity::*;
use sea_orm::DatabaseConnection;
use std::collections::{HashMap, HashSet};
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

pub fn get_table(item_base_path: &String) -> Option<HashMap<String, String>> {
    let mut item_store: PathBuf = PathBuf::new();

    item_store.push(&item_base_path);
    item_store.push("items_store");
    item_store.set_extension("txt");

    if item_store.exists() {
        let mut table: HashMap<String, String> = HashMap::new();

        if let Ok(lines) = read_lines(&item_store) {
            for line in lines.flatten() {
                let line_split: Vec<&str> = line.split('-').collect();
                table.insert(line_split[0].to_string(), line_split[1].to_string());
            }
        }
        Some(table)
    } else {
        None
    }
}

pub async fn populate_database(
    item_base_path: &String,
    image_base_path: &String,
    pool: &DatabaseConnection,
) -> Result<(), anyhow::Error> {
    // Create a csv reader from item.csv in item_base_path
    let mut item_list: PathBuf = PathBuf::new();

    item_list.push(&item_base_path);
    item_list.push("items");
    item_list.set_extension("csv");

    let file = File::open(item_list)?;

    let mut reader = csv::Reader::from_reader(file);

    let mut new_files: Vec<String> = Vec::new();

    let table: Option<HashMap<String, String>> = get_table(item_base_path);

    // Read each entry in the csv, appending each to the database
    for result in reader.deserialize() {
        let item: Item = result?;

        let item_id = insert_item(pool, &item)
            .await
            .expect("Failed to insert new item in database");

        // Since we are renaming image files with the id for fast lookup, we will keep a phsyical
        // txt will all the linking names and ids for human ease and server restarts
        let mut temp_string = String::new();

        temp_string.push_str(&item.name);
        temp_string.push_str("-");
        temp_string.push_str(&item_id.to_simple().to_string());

        // Rename file based on whether or not image file has been renamed already
        if let Some(ref v) = table {
            let previous_id = v.get(&item_id.to_simple().to_string());

            if let Some(id) = previous_id {
                let old_image_path = format!("{}/{}/{}", &image_base_path, id, ".png");
                let new_image_path = format!(
                    "{}/{}/{}",
                    &image_base_path,
                    &item_id.to_simple().to_string(),
                    ".png"
                );
                fs::rename(old_image_path, new_image_path);
            }
        } else {
            let old_image_path = format!("{}/{}/{}", &image_base_path, &item.name, ".png");
            let new_image_path = format!(
                "{}/{}/{}",
                &image_base_path,
                &item_id.to_simple().to_string(),
                ".png"
            );
            fs::rename(old_image_path, new_image_path);
        }

        new_files.push(temp_string);
    }

    // Write new file names into existing txt or create new one if none exists
    let append_data = |mut string: String| -> String {
        for file in new_files.iter() {
            string.push_str(file);
            string.push('\n');
        }
        string
    };

    let mut item_store: PathBuf = PathBuf::new();

    item_store.push(&item_base_path);
    item_store.push("items_store");
    item_store.set_extension("txt");

    // Writes no matter if file exists or not
    let mut file = File::options().write(true).open(&item_store)?;
    file.write_all(append_data(String::new()).as_bytes())?;

    Ok(())
}

async fn insert_item(db: &DatabaseConnection, item: &Item) -> Result<Uuid, InsertError> {
    let item_id = Uuid::new_v4();

    let item = items::ActiveModel {
        name: Set(item.name.to_owned()),
        id: Set(item_id.to_owned()),
        category: Set(item.category.to_owned()),
        description: Set(item.description.to_owned()),
        price: Set(item.price.to_owned()),
        brand: Set(item.brand.to_owned()),
    };

    items::Entity::insert(item)
        .exec(db)
        .await
        .context("Failed to insert item into database")?;

    Ok(item_id)
}
