import charactersData from "$lib/data/characters.json";
import talentsData from "$lib/data/talents.json";

import { Character } from "$lib/models/Character";
import { Talent } from "$lib/models/Talent";
import type { TalentJSON } from "$lib/models/Talent";

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
