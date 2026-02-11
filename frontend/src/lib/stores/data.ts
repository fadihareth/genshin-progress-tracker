import type { ArtifactJSON } from "$lib/models/Artifact";
import type { CharacterJSON } from "$lib/models/Character";
import type { TalentJSON } from "$lib/models/Talent";
import type { WeaponJSON } from "$lib/models/Weapon";

import { Artifact } from "$lib/models/Artifact";
import { Character } from "$lib/models/Character";
import { Talent } from "$lib/models/Talent";
import { Weapon } from "$lib/models/Weapon";
import { fetchJson } from "$lib/util/fetchJson";
import { baseURL } from "$lib/constants";

export let characterList: Character[] = [];
export let charactersById: Record<string, Character> = {};

export let talentsByName: Record<string, Talent> = {};

export let artifactList: Artifact[] = [];
export let artifactsById: Record<string, Artifact> = {};

export let weaponList: Weapon[] = [];
export let weaponsById: Record<string, Weapon> = {};

export async function loadData() {
    const [
        charactersData,
        talentsData,
        artifactData,
        weaponsData,
    ] = await Promise.all([
        fetchJson<CharacterJSON[]>(`${baseURL}/characters/characters.json`),
        fetchJson<Record<string, TalentJSON>>(`${baseURL}/characters/talents.json`),
        fetchJson<ArtifactJSON[]>(`${baseURL}/artifacts/artifacts.json`),
        fetchJson<WeaponJSON[]>(`${baseURL}/weapons/weapons.json`),
    ]);

    characterList = charactersData.map((c) => new Character(c)).sort((c1, c2) => c1.name.localeCompare(c2.name));
    charactersById = Object.fromEntries(
        characterList.map((c) => [c.id, c])
    );

    talentsByName = Object.entries(talentsData).reduce(
        (acc, [name, data]) => {
            acc[name] = new Talent(data);
            return acc;
        },
        {} as Record<string, Talent>
    );

    artifactList = artifactData.map((a) => new Artifact(a)).sort((a1, a2) => a1.name.localeCompare(a2.name));
    artifactsById = Object.fromEntries(
        artifactList.map((a) => [a.id, a])
    );

    weaponList = weaponsData.map((w) => new Weapon(w)).sort((w1, w2) => w1.name.localeCompare(w2.name));
    weaponsById = Object.fromEntries(
        weaponList.map((w) => [w.id, w])
    );
}
