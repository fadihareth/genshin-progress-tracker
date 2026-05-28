import { CharacterBuild } from '$lib/models/CharacterBuild.svelte';
import { UserSettings } from '$lib/models/UserSettings.svelte';

export const buildsState: Record<string, CharacterBuild> = $state({});
export const settingsState: UserSettings = $state(new UserSettings);
