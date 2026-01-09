import type { SelectableItem } from "$lib/constants";
import { baseURL } from "$lib/constants";

export type CharacterJSON = {
    id: number;
    name: string;
    title: string;
    description: string;
    weapon: string;
    gender: string;
    rarity: number;
    birthday: string;
    element: string;
    region: string | null;
    substat: string;
    localSpecialtyMaterial: string;
    worldBossMaterial: string;
    worldDropMaterial: Record<number, string>; // key = rarity, value = name
};

export class Character implements SelectableItem {
    id: number;
    name: string;
    title: string;
    description: string;
    weapon: string;
    gender: string;
    rarity: number;
    birthday: string;
    element: string;
    region: string | null;
    substat: string;
    localSpecialtyMaterial: string;
    worldBossMaterial: string;
    worldDropMaterial: Record<number, string>;

    constructor(data: CharacterJSON) {
        this.id = data.id;
        this.name = data.name;
        this.title = data.title;
        this.description = data.description;
        this.weapon = data.weapon;
        this.gender = data.gender;
        this.rarity = data.rarity;
        this.birthday = data.birthday;
        this.element = data.element;
        this.region = data.region;
        this.substat = data.substat;
        this.localSpecialtyMaterial = data.localSpecialtyMaterial;
        this.worldBossMaterial = data.worldBossMaterial;
        this.worldDropMaterial = data.worldDropMaterial;
    }

    get profileImage(): string {
        return `${baseURL}/characters/profiles/${this.name.replaceAll(' ', '_')}_Profile.png`;
    }

    get image(): string {
        return `${baseURL}/characters/icons/${this.name.replaceAll(' ', '_')}_Icon.png`;
    }

    get attackTalentImage(): string {
        return `${baseURL}/characters/talents/${this.weapon}_${this.element}.png`;
    }
}
