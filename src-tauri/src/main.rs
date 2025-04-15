// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod file_operations;
use file_operations::{ read_json_file, update_json_file, write_json_file};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            read_json_file,
            write_json_file,
            update_json_file,
            
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
