import charactersData from "$lib/data/characters.json";

import { Character } from "$lib/models/Character";

export const characterList = charactersData.map((c) => new Character(c));
export const charactersById = Object.fromEntries(
    characterList.map((c) => [c.id, c])
);
