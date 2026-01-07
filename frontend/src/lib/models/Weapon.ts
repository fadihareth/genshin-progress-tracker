import type { SelectableItem } from "$lib/constants";

export type WeaponJSON = {
    id: number;
    name: string;
    description: string;
    type: string;
    rarity: number;
    baseAtk: number;
    mainStat: string;
    mainStatValue: string;
    effectName: string;
    effect: string;
    r1: string[];
    r2?: string[] | undefined;
    r3?: string[] | undefined;
    r4?: string[] | undefined;
    r5?: string[] | undefined;
    weaponMaterial: Record<number, string>; // key = rarity, value = name
    worldDropMaterial1: Record<number, string>; // key = rarity, value = name
    worldDropMaterial2: Record<number, string>; // key = rarity, value = name
};

export class Weapon implements SelectableItem {
    id: number;
    name: string;
    description: string;
    type: string;
    rarity: number;
    baseAtk: number;
    mainStat: string;
    mainStatValue: string;
    effectName: string;
    effect: string;
    r1: string[];
    r2: string[] | undefined;
    r3: string[] | undefined;
    r4: string[] | undefined;
    r5: string[] | undefined;
    weaponMaterial: Record<number, string>;
    worldDropMaterial1: Record<number, string>;
    worldDropMaterial2: Record<number, string>;

    constructor(data: WeaponJSON) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.type = data.type;
        this.rarity = data.rarity;
        this.baseAtk = data.baseAtk;
        this.mainStat = data.mainStat;
        this.mainStatValue = data.mainStatValue;
        this.effectName = data.effectName;
        this.effect = data.effect;
        this.r1 = data.r1;
        this.r2 = data.r2;
        this.r3 = data.r3;
        this.r4 = data.r4;
        this.r5 = data.r5;
        this.weaponMaterial = data.weaponMaterial;
        this.worldDropMaterial1 = data.worldDropMaterial1;
        this.worldDropMaterial2 = data.worldDropMaterial2;
    }

    get image(): string {
        return `https://gbp-weapons.s3.us-east-2.amazonaws.com/${this.name.replaceAll(' ', '_')}.png`;
    }
}
