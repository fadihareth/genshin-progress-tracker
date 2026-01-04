import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { join } from 'path';

const DB_PATH = process.env.DB_PATH || join(__dirname, '../../data.db');

let db: Database.Database | null = null;

export function getDatabase(): Database.Database {
    if (!db) {
        db = new Database(DB_PATH);
        db.pragma('journal_mode = WAL');
        initializeDatabase();
    }
    return db;
}

function initializeDatabase() {
    if (!db) return;

    // Read and execute schema
    const schemaPath = join(__dirname, 'schema.sql');
    const schema = readFileSync(schemaPath, 'utf-8');
    db.exec(schema);

    console.log('Database initialized successfully');
}

export function closeDatabase() {
    if (db) {
        db.close();
        db = null;
    }
}