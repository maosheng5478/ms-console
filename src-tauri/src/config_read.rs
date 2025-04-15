use std::fs::{self, File};
use std::io::Write;
use tauri::AppHandle;
use lazy_static::lazy_static;

lazy_static! {
    pub static ref FILE_PATH: &'static str = "data/config.json";
}


#[tauri::command]
pub fn read_config(handle: AppHandle) -> Result<String, String>{
    let resource_path = handle
        .path_resolver()
        .resolve_resource(*FILE_PATH)
        .expect("failed to resolve resource");
    let content = fs::read_to_string(&resource_path).map_err(|e| e.to_string())?;
    Ok(content)
}