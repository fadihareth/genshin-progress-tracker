import { CharacterBuild } from '$lib/models/CharacterBuild.svelte';

export const buildsState: Record<string, CharacterBuild> = $state({});

let buildValues = {
    levelComplete: false,
    targetLevel: 90,
    weaponLevelComplete: false,
    targetWeaponLevel: 90,
    weaponRefineComplete: false,
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
    talent1LevelComplete: false,
    targetTalent1Level: 10,
    talent2LevelComplete: false,
    targetTalent2Level: 10,
    talent3LevelComplete: false,
    targetTalent3Level: 10,
}
export const nullBuild = new CharacterBuild(0, 0, buildValues)
