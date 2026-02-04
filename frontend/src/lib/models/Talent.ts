import { baseURL } from "$lib/constants";

export type TalentJSON = {
    attack: string;
    skill: string;
    burst: string;
    talentMaterial: Record<number, string>; // key = rarity, value = name
    weeklyBossMaterial: string;
};

export class Talent {
    attack: string;
    skill: string;
    burst: string;
    talentMaterial: Record<number, string>;
    weeklyBossMaterial: string;

    constructor(data: TalentJSON) {
        this.attack = data.attack;
        this.skill = data.skill;
        this.burst = data.burst;
        this.talentMaterial = data.talentMaterial;
        this.weeklyBossMaterial = data.weeklyBossMaterial;
    }

    get skillImage(): string {
        let name = this.skill.replaceAll(':', '').replaceAll('/ ', '').replaceAll(' ', '_');
        return `${baseURL}/characters/talents/${name}.webp`;
    }

    get burstImage(): string {
        let name = this.burst.replaceAll(':', '').replaceAll('/ ', '').replaceAll(' ', '_');
        return `${baseURL}/characters/talents/${name}.webp`;
    }
}
