import Database from 'better-sqlite3';
import path from 'path';

let db;

export function getDb(dbPath = process.env.NODE_ENV === 'test' ? ':memory:' : 'data.db') {
  if (db) return db;
  
  // In a real local-first app, we might want to ensure the directory exists
  db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  
  // Initial schema
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    );
    
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
  
  return db;
}

export function closeDb() {
  if (db) {
    db.close();
    db = null;
  }
}