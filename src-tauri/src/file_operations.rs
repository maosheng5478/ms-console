use std::fs::{self, File};
use std::io::Write;
use tauri::AppHandle;
use lazy_static::lazy_static;
use serde::{Deserialize, Serialize};

lazy_static! {
    pub static ref FILE_PATH: &'static str = "data/record.json";
}

#[derive(Deserialize, Serialize)]
pub struct CalculatorRecord {
    pub id: String,
    pub name: String,
    pub create_time: String,
    pub update_time: String,
    pub calculator: String,
}

#[tauri::command]
pub fn read_json_file(handle: AppHandle) -> Result<Vec<CalculatorRecord>, String> {
    let resource_path = handle
        .path_resolver()
        .resolve_resource(*FILE_PATH)
        .expect("failed to resolve resource");
    let content = fs::read_to_string(&resource_path).map_err(|e| e.to_string())?;
    let records: Vec<CalculatorRecord> = serde_json::from_str(&content).map_err(|e| e.to_string())?;
    Ok(records)
}

#[tauri::command]
pub fn write_json_file(handle: AppHandle, content: String) -> Result<(), String> {
    let resource_path = handle
        .path_resolver()
        .resolve_resource(*FILE_PATH)
        .expect("failed to resolve resource");
    let mut file = File::create(&resource_path).map_err(|e| e.to_string())?;
    file.write_all(content.as_bytes())
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn update_json_file(
    handle: AppHandle,
    id: String,
    new_data: String,
) -> Result<(), String> {
    let resource_path = handle
        .path_resolver()
        .resolve_resource(*FILE_PATH)
        .expect("failed to resolve resource");

    let file_content = fs::read_to_string(&resource_path).map_err(|e| e.to_string())?;
    let mut records: Vec<serde_json::Value> =
        serde_json::from_str(&file_content).map_err(|e| e.to_string())?;

    if let Some(record) = records.iter_mut().find(|r| r["id"] == id) {
        *record = serde_json::from_str(&new_data).map_err(|e| e.to_string())?;
    }

    let updated_content = serde_json::to_string_pretty(&records).map_err(|e| e.to_string())?;
    let mut file = File::create(&resource_path).map_err(|e| e.to_string())?;
    file.write_all(updated_content.as_bytes())
        .map_err(|e| e.to_string())
}


