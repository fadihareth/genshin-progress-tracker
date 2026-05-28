import { getDatabase } from '../db';
import bcrypt from 'bcryptjs';

export interface User {
    id: number;
    email: string;
    hideCompleted: boolean;
}

export interface AuthResult {
    user: User;
    token: string;
}

function rowToUser(row: any): User {
    return {
        id: row.id,
        email: row.email,
        hideCompleted: Boolean(row.hide_completed),
    };
}

export function createUser(email: string, password: string): AuthResult {
    const db = getDatabase();

    const existing = db
        .prepare('SELECT id, email FROM users WHERE email = ?')
        .get(email) as any | undefined;
    if (existing) {
        throw new Error('Email is already registered');
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const token = generateSessionToken();

    const stmt = db.prepare(`
        INSERT INTO users (email, password_hash, session_token, hide_completed)
        VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(email, passwordHash, token, 0);

    const row = db
        .prepare('SELECT id, email, hide_completed, session_token FROM users WHERE id = ?')
        .get(result.lastInsertRowid) as any;

    return {
        user: rowToUser(row),
        token: row.session_token,
    };
}

export function loginUser(email: string, password: string): AuthResult {
    const db = getDatabase();
    const row = db
        .prepare('SELECT id, email, password_hash, session_token, hide_completed FROM users WHERE email = ?')
        .get(email) as any | undefined;

    if (!row) {
        throw new Error('Invalid email or password');
    }

    const valid = bcrypt.compareSync(password, row.password_hash);
    if (!valid) {
        throw new Error('Invalid email or password');
    }

    let token = row.session_token as string | null;
    if (!token) {
        token = generateSessionToken();
        db.prepare('UPDATE users SET session_token = ? WHERE id = ?').run(token, row.id);
    }

    return {
        user: rowToUser(row),
        token,
    };
}

export function getUserByToken(token: string): User | null {
    const db = getDatabase();
    const row = db
        .prepare('SELECT id, email, hide_completed FROM users WHERE session_token = ?')
        .get(token) as any | undefined;

    return row ? rowToUser(row) : null;
}

export function getUserById(userId: number): User | null {
    const db = getDatabase();
    const row = db
        .prepare('SELECT id, email, hide_completed FROM users WHERE id = ?')
        .get(userId) as any | undefined;

    return row ? rowToUser(row) : null;
}

export function updateUserSettings(userId: number, hideCompleted: boolean): User {
    const db = getDatabase();
    db.prepare('UPDATE users SET hide_completed = ? WHERE id = ?').run(hideCompleted ? 1 : 0, userId);

    const row = db
        .prepare('SELECT id, email, hide_completed FROM users WHERE id = ?')
        .get(userId) as any;

    if (!row) {
        throw new Error('User not found');
    }

    return rowToUser(row);
}

function generateSessionToken(): string {
    return (
        Math.random().toString(36).slice(2) +
        Math.random().toString(36).slice(2) +
        Math.random().toString(36).slice(2)
    );
}

