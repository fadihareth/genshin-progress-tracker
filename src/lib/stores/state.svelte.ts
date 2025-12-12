import { CharacterBuild } from '$lib/models/CharacterBuild.svelte';

export const buildsState: Record<string, CharacterBuild> = $state({});

let buildValues = {
    currLevel: 1,
    targetLevel: 90,
    currWeaponLevel: 1,
    targetWeaponLevel: 90,
    currWeaponRefine: 0,
    targetWeaponRefine: 5,
    artifactIds: [],
    flowerStatus: false,
    plumeStatus: false,
    sandsStat: null,
    sandsStatus: false,
    gobletStat: null,
    gobletStatus: false,
    circletStat: null,
    circletStatus: false,
    artifactSubstats: [],
    currTalent1Level: 1,
    targetTalent1Level: 10,
    currTalent2Level: 1,
    targetTalent2Level: 10,
    currTalent3Level: 1,
    targetTalent3Level: 10,
}
export const nullBuild = new CharacterBuild(0, 0, buildValues)
