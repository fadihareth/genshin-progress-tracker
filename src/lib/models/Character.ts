export type CharacterJSON = {
    id: number;
    name: string;
    rarity: number;
    weapon: string;
    element: string;
    region: string;
    substat: string;
    talents: number[];
    localSpecialtyMaterial: number;
    worldBossItemMaterial: number;
    worldDropItemMaterial: Record<number, number>; // key = rarity, value = id
};

export class Character {
    id: number;
    name: string;
    rarity: number;
    weapon: string;
    element: string;
    region: string;
    substat: string;
    talents: number[];
    localSpecialtyMaterial: number;
    worldBossItemMaterial: number;
    worldDropItemMaterial: Record<number, number>;

    constructor(data: CharacterJSON) {
        this.id = data.id;
        this.name = data.name;
        this.rarity = data.rarity;
        this.weapon = data.weapon;
        this.element = data.element;
        this.region = data.region;
        this.substat = data.substat;
        this.talents = data.talents;
        this.localSpecialtyMaterial = data.localSpecialtyMaterial;
        this.worldBossItemMaterial = data.worldBossItemMaterial;
        this.worldDropItemMaterial = data.worldDropItemMaterial;
    }

    get profileImage(): string {
        return `/src/lib/assets/${this.name.replaceAll(' ', '_')}_Profile.png`;
    }

    get iconImage(): string {
        return `/src/lib/assets/${this.name.replaceAll(' ', '_')}_Icon.png`;
    }
}
