import { setAuthToken } from '$lib/api/client';

export interface AuthState {
    token: string | null;
    email: string | null;
}

function getStoredAuth() {
    try {
        if (
            typeof window !== 'undefined' &&
            'localStorage' in window &&
            typeof window.localStorage?.getItem === 'function'
        ) {
            const token = window.localStorage.getItem('auth_token');
            const email = window.localStorage.getItem('auth_email');
            return { token, email };
        }
    } catch {
        // Ignore storage access errors and fall back to nulls
    }
    return { token: null, email: null };
}

const { token: storedToken, email: storedEmail } = getStoredAuth();

export const authState: AuthState = $state({
    token: storedToken,
    email: storedEmail,
});

if (authState.token) {
    setAuthToken(authState.token);
}

export function setAuth(token: string, email: string) {
    authState.token = token;
    authState.email = email;
    setAuthToken(token);
    try {
        if (
            typeof window !== 'undefined' &&
            'localStorage' in window &&
            typeof window.localStorage?.setItem === 'function'
        ) {
            window.localStorage.setItem('auth_token', token);
            window.localStorage.setItem('auth_email', email);
        }
    } catch {
        // Non-fatal if storage fails
    }
}

export function clearAuth() {
    authState.token = null;
    authState.email = null;
    setAuthToken(null);
    try {
        if (
            typeof window !== 'undefined' &&
            'localStorage' in window &&
            typeof window.localStorage?.removeItem === 'function'
        ) {
            window.localStorage.removeItem('auth_token');
            window.localStorage.removeItem('auth_email');
        }
    } catch {
        // Ignore
    }
}

