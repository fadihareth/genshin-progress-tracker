import { GraphQLClient } from 'graphql-request';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/graphql';

export const graphqlClient = new GraphQLClient(API_URL, {
    headers: {
        'Content-Type': 'application/json',
    },
});

export function setAuthToken(token: string | null) {
    if (token) {
        graphqlClient.setHeader('Authorization', `Bearer ${token}`);
    } else {
        graphqlClient.setHeaders({
            'Content-Type': 'application/json',
        });
    }
}