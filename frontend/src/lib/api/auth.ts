import { graphqlClient } from './client';

interface AuthPayload {
    token: string;
    user: {
        id: number;
        email: string;
    };
}

const SIGNUP_MUTATION = `
    mutation Signup($email: String!, $password: String!) {
        signup(email: $email, password: $password) {
            token
            user {
                id
                email
            }
        }
    }
`;

const LOGIN_MUTATION = `
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                id
                email
            }
        }
    }
`;

export async function signup(email: string, password: string): Promise<AuthPayload> {
    const res = await graphqlClient.request<{ signup: AuthPayload }>(SIGNUP_MUTATION, {
        email,
        password,
    });
    return res.signup;
}

export async function login(email: string, password: string): Promise<AuthPayload> {
    const res = await graphqlClient.request<{ login: AuthPayload }>(LOGIN_MUTATION, {
        email,
        password,
    });
    return res.login;
}
