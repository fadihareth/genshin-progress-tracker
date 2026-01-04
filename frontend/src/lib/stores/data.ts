import artifactData from "$lib/data/artifacts.json";
import charactersData from "$lib/data/characters.json";
import talentsData from "$lib/data/talents.json";
import weaponsData from "$lib/data/weapons.json";

import { Artifact } from "$lib/models/Artifact";
import { Character } from "$lib/models/Character";
import { Talent } from "$lib/models/Talent";
import type { TalentJSON } from "$lib/models/Talent";
import { Weapon } from "$lib/models/Weapon";

export const characterList = charactersData.map((c) => new Character(c));
export const charactersById = Object.fromEntries(
    characterList.map((c) => [c.id, c])
);

export const talentsByName: Record<string, Talent> = Object.entries(
    talentsData as Record<string, TalentJSON>
).reduce((acc, [name, data]) => {
    acc[name] = new Talent(data);
    return acc;
}, {} as Record<string, Talent>);

export const artifactList = artifactData.map((a) => new Artifact(a));
export const artifactsById = Object.fromEntries(
    artifactList.map((a) => [a.id, a])
);

export const weaponList = weaponsData.map((w) => new Weapon(w));
export const weaponsById = Object.fromEntries(
    weaponList.map((w) => [w.id, w])
);
