export class CharacterBuild {
    id: number;
    character: number;

    // Sort order (lower = earlier in grid)
    order: number;

    // Level Progress
    levelComplete: boolean = $state(false);
    targetLevel: string = $state("90");
    constellationComplete: boolean = $state(false);
    targetConstellation: string = $state("C0");

    // Weapon Progress
    weaponId: number | null = $state(null);
    weaponLevelComplete: boolean = $state(false);
    targetWeaponLevel: string = $state("90");
    weaponRefineComplete: boolean = $state(false);
    targetWeaponRefine: string = $state("R5");

    // Artifact Progress
    artifactIds: number[] = $state([]);
    flowerComplete: boolean = $state(false);
    plumeComplete: boolean = $state(false);
    sandsStat: string | null = $state(null);
    sandsComplete: boolean = $state(false);
    gobletStat: string | null = $state(null);
    gobletComplete: boolean = $state(false);
    circletStat: string | null = $state(null);
    circletComplete: boolean = $state(false);
    artifactSubstats: string[] = $state([]);

    // Talents Progress
    talent1LevelComplete: boolean = $state(false);
    targetTalent1Level: string = $state("10");
    talent2LevelComplete: boolean = $state(false);
    targetTalent2Level: string = $state("10");
    talent3LevelComplete: boolean = $state(false);
    targetTalent3Level: string = $state("10");

    constructor(id: number, character: number, buildValues: Record<string, any>) {
        this.id = id;
        this.character = character;
        this.order = id;

        this.levelComplete = buildValues.levelComplete ?? false;
        this.targetLevel = buildValues.targetLevel ?? "90";
        this.constellationComplete = buildValues.constellationComplete ?? false;
        this.targetConstellation = buildValues.targetConstellation ?? "C0";

        this.weaponId = buildValues.weaponId ?? null;
        this.weaponLevelComplete = buildValues.weaponLevelComplete ?? false;
        this.targetWeaponLevel = buildValues.targetWeaponLevel ?? "90";
        this.weaponRefineComplete = buildValues.weaponRefineComplete ?? false;
        this.targetWeaponRefine = buildValues.targetWeaponRefine ?? "R5";

        this.artifactIds = buildValues.artifactIds ? [...buildValues.artifactIds] : [];
        this.flowerComplete = buildValues.flowerComplete ?? false;
        this.plumeComplete = buildValues.plumeComplete ?? false;
        this.sandsStat = buildValues.sandsStat ?? null;
        this.sandsComplete = buildValues.sandsComplete ?? false;
        this.gobletStat = buildValues.gobletStat ?? null;
        this.gobletComplete = buildValues.gobletComplete ?? false;
        this.circletStat = buildValues.circletStat ?? null;
        this.circletComplete = buildValues.circletComplete ?? false;
        this.artifactSubstats = buildValues.artifactSubstats ?? [];

        this.talent1LevelComplete = buildValues.talent1LevelComplete ?? false;
        this.targetTalent1Level = buildValues.targetTalent1Level ?? "10";
        this.talent2LevelComplete = buildValues.talent2LevelComplete ?? false;
        this.targetTalent2Level = buildValues.targetTalent2Level ?? "10";
        this.talent3LevelComplete = buildValues.talent3LevelComplete ?? false;
        this.targetTalent3Level = buildValues.targetTalent3Level ?? "10";
    }

    isComplete(): boolean {
        return this.levelComplete && this.weaponComplete() && this.talentComplete() && this.artifactsComplete();
    }

    weaponComplete(): boolean {
        return this.weaponLevelComplete && this.weaponRefineComplete;
    }

    talentComplete(): boolean {
        return this.talent1LevelComplete && this.talent2LevelComplete && this.talent3LevelComplete;
    }

    artifactsComplete(): boolean {
        return this.flowerComplete && this.plumeComplete && this.sandsComplete && this.gobletComplete && this.circletComplete;
    }
}
