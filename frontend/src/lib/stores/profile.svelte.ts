import { fetchProfile, updateUserSettings } from '$lib/api/profile';
import { settingsState } from '$lib/stores/state.svelte';

export async function loadProfile() {
    const profile = await fetchProfile();

    if (profile?.hideCompleted !== undefined) {
        settingsState.hideCompleted = profile.hideCompleted;
    }

    return profile;
}

export async function updateSettings() {
    const updatedProfile = await updateUserSettings(!settingsState.hideCompleted);
    settingsState.hideCompleted = updatedProfile.hideCompleted;
    return updatedProfile;
}
