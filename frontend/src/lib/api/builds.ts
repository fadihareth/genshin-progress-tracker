import { graphqlClient } from './client';
import { CharacterBuild } from '$lib/models/CharacterBuild.svelte';

// GraphQL query to fetch all builds
const GET_BUILDS_QUERY = `
    query GetBuilds {
        builds {
            id
            characterId
            order
            levelComplete
            targetLevel
            constellationComplete
            targetConstellation
            weaponId
            weaponLevelComplete
            targetWeaponLevel
            weaponRefineComplete
            targetWeaponRefine
            artifactIds
            flowerComplete
            plumeComplete
            sandsStat
            sandsComplete
            gobletStat
            gobletComplete
            circletStat
            circletComplete
            artifactSubstats
            talent1LevelComplete
            targetTalent1Level
            talent2LevelComplete
            targetTalent2Level
            talent3LevelComplete
            targetTalent3Level
        }
    }
`;

// GraphQL mutation to create a build
const CREATE_BUILD_MUTATION = `
    mutation CreateBuild($input: CreateBuildInput!) {
        createBuild(input: $input) {
            id
            characterId
            order
            levelComplete
            targetLevel
            constellationComplete
            targetConstellation
            weaponId
            weaponLevelComplete
            targetWeaponLevel
            weaponRefineComplete
            targetWeaponRefine
            artifactIds
            flowerComplete
            plumeComplete
            sandsStat
            sandsComplete
            gobletStat
            gobletComplete
            circletStat
            circletComplete
            artifactSubstats
            talent1LevelComplete
            targetTalent1Level
            talent2LevelComplete
            targetTalent2Level
            talent3LevelComplete
            targetTalent3Level
        }
    }
`;

// Type for the build data from API
interface BuildData {
    id: number;
    characterId: number;
    order: number;
    levelComplete: boolean;
    targetLevel: string;
    constellationComplete: boolean;
    targetConstellation: string;
    weaponId: number | null;
    weaponLevelComplete: boolean;
    targetWeaponLevel: string;
    weaponRefineComplete: boolean;
    targetWeaponRefine: string;
    artifactIds: number[];
    flowerComplete: boolean;
    plumeComplete: boolean;
    sandsStat: string | null;
    sandsComplete: boolean;
    gobletStat: string | null;
    gobletComplete: boolean;
    circletStat: string | null;
    circletComplete: boolean;
    artifactSubstats: string[];
    talent1LevelComplete: boolean;
    targetTalent1Level: string;
    talent2LevelComplete: boolean;
    targetTalent2Level: string;
    talent3LevelComplete: boolean;
    targetTalent3Level: string;
}

// Convert API response to CharacterBuild instance
function buildDataToCharacterBuild(data: BuildData): CharacterBuild {
    return new CharacterBuild(data.id, data.characterId, {
        order: data.order,
        levelComplete: data.levelComplete,
        targetLevel: data.targetLevel,
        constellationComplete: data.constellationComplete,
        targetConstellation: data.targetConstellation,
        weaponId: data.weaponId,
        weaponLevelComplete: data.weaponLevelComplete,
        targetWeaponLevel: data.targetWeaponLevel,
        weaponRefineComplete: data.weaponRefineComplete,
        targetWeaponRefine: data.targetWeaponRefine,
        artifactIds: data.artifactIds,
        flowerComplete: data.flowerComplete,
        plumeComplete: data.plumeComplete,
        sandsStat: data.sandsStat,
        sandsComplete: data.sandsComplete,
        gobletStat: data.gobletStat,
        gobletComplete: data.gobletComplete,
        circletStat: data.circletStat,
        circletComplete: data.circletComplete,
        artifactSubstats: data.artifactSubstats,
        talent1LevelComplete: data.talent1LevelComplete,
        targetTalent1Level: data.targetTalent1Level,
        talent2LevelComplete: data.talent2LevelComplete,
        targetTalent2Level: data.targetTalent2Level,
        talent3LevelComplete: data.talent3LevelComplete,
        targetTalent3Level: data.targetTalent3Level,
    });
}

// Fetch all builds from the API
export async function fetchBuilds(): Promise<CharacterBuild[]> {
    try {
        const response = await graphqlClient.request<{ builds: BuildData[] }>(GET_BUILDS_QUERY);
        return response.builds.map(buildDataToCharacterBuild);
    } catch (error) {
        console.error('Error fetching builds:', error);
        throw error;
    }
}

// Create a new build via the API
export async function createBuild(buildInput: {
    characterId: number;
    order?: number;
    levelComplete?: boolean;
    targetLevel?: string;
    constellationComplete?: boolean;
    targetConstellation?: string;
    weaponId?: number | null;
    weaponLevelComplete?: boolean;
    targetWeaponLevel?: string;
    weaponRefineComplete?: boolean;
    targetWeaponRefine?: string;
    artifactIds?: number[];
    flowerComplete?: boolean;
    plumeComplete?: boolean;
    sandsStat?: string | null;
    sandsComplete?: boolean;
    gobletStat?: string | null;
    gobletComplete?: boolean;
    circletStat?: string | null;
    circletComplete?: boolean;
    artifactSubstats?: string[];
    talent1LevelComplete?: boolean;
    targetTalent1Level?: string;
    talent2LevelComplete?: boolean;
    targetTalent2Level?: string;
    talent3LevelComplete?: boolean;
    targetTalent3Level?: string;
}): Promise<CharacterBuild> {
    try {
        const response = await graphqlClient.request<{ createBuild: BuildData }>(
            CREATE_BUILD_MUTATION,
            { input: buildInput }
        );
        return buildDataToCharacterBuild(response.createBuild);
    } catch (error) {
        console.error('Error creating build:', error);
        throw error;
    }
}