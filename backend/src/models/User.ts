import { getDatabase } from '../db';
import bcrypt from 'bcryptjs';

export interface User {
    id: number;
    email: string;
}

export interface AuthResult {
    user: User;
    token: string;
}

function rowToUser(row: any): User {
    return {
        id: row.id,
        email: row.email,
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
        INSERT INTO users (email, password_hash, session_token)
        VALUES (?, ?, ?)
    `);
    const result = stmt.run(email, passwordHash, token);

    const row = db
        .prepare('SELECT id, email, session_token FROM users WHERE id = ?')
        .get(result.lastInsertRowid) as any;

    return {
        user: rowToUser(row),
        token: row.session_token,
    };
}

export function loginUser(email: string, password: string): AuthResult {
    const db = getDatabase();
    const row = db
        .prepare('SELECT id, email, password_hash, session_token FROM users WHERE email = ?')
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
        .prepare('SELECT id, email FROM users WHERE session_token = ?')
        .get(token) as any | undefined;

    return row ? rowToUser(row) : null;
}

function generateSessionToken(): string {
    return (
        Math.random().toString(36).slice(2) +
        Math.random().toString(36).slice(2) +
        Math.random().toString(36).slice(2)
    );
}

