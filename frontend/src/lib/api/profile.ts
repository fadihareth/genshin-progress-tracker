import { graphqlClient } from './client';

const GET_PROFILE_QUERY = `
    query Me {
        me {
            id
            email
            hideCompleted
        }
    }
`;

const UPDATE_USER_SETTINGS_MUTATION = `
        mutation UpdateUserSettings($hideCompleted: Boolean!) {
            updateUserSettings(hideCompleted: $hideCompleted) {
                id
                email
                hideCompleted
            }
        }
    `;

export async function fetchProfile(): Promise<{ id: number; email: string; hideCompleted: boolean }> {
    try {
        const res = await graphqlClient.request<{ me: { id: number; email: string; hideCompleted: boolean } }>(GET_PROFILE_QUERY);
        return res.me;
    } catch (error) {
        console.error('Error fetching builds:', error);
        throw error;
    }
}

export async function updateUserSettings(hideCompleted: boolean): Promise<{ id: number; email: string; hideCompleted: boolean }> {
    const res = await graphqlClient.request<{
        updateUserSettings: { id: number; email: string; hideCompleted: boolean };
    }>(UPDATE_USER_SETTINGS_MUTATION, { hideCompleted });
    return res.updateUserSettings;
}
