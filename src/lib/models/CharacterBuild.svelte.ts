export class CharacterBuild {
    id: number;
    character: number;

    // Sort order (lower = earlier in grid)
	order: number;

    // Level Progress
    levelComplete: boolean = $state(false);
    targetLevel: number = $state(90);

    // Weapon Progress
    weaponId: number | null = $state(null);
    weaponLevelComplete: boolean = $state(false);
    targetWeaponLevel: number = $state(90);
    weaponRefineComplete: boolean = $state(false);
    targetWeaponRefine: number = $state(5);

    // Artifact Progress
    artifactIds: number[] = $state([]);
    flowerStatus: boolean = false;
    plumeStatus: boolean = false;
    sandsStat: string | null = null;
    sandsStatus: boolean = false;
    gobletStat: string | null = null;
    gobletStatus: boolean = false;
    circletStat: string | null = null;
    circletStatus: boolean = false;
    artifactSubstats: string[] = [];

    // Talents Progress
    talent1LevelComplete: boolean = $state(false);
    targetTalent1Level: number = $state(10);
    talent2LevelComplete: boolean = $state(false);
    targetTalent2Level: number = $state(10);
    talent3LevelComplete: boolean = $state(false);
    targetTalent3Level: number = $state(10);

    constructor(id: number, character: number, buildValues: Record<string,any>) {
        this.id = id;
        this.character = character;
        this.order = id;

        this.levelComplete = buildValues.levelComplete ?? false;
        this.targetLevel = buildValues.targetLevel ?? 90;

        this.weaponId = buildValues.weaponId ?? null;
        this.weaponLevelComplete = buildValues.weaponLevelComplete ?? false;
        this.targetWeaponLevel = buildValues.targetWeaponLevel ?? 90;
        this.weaponRefineComplete = buildValues.weaponRefineComplete ?? false;
        this.targetWeaponRefine = buildValues.targetWeaponRefine ?? 5;

        this.artifactIds = buildValues.artifactIds ? [...buildValues.artifactIds] : [];
        this.flowerStatus = buildValues.flowerStatus ?? false;
        this.plumeStatus = buildValues.plumeStatus ?? false;
        this.sandsStat = buildValues.sandsStat ?? null;
        this.sandsStatus = buildValues.sandsStatus ?? false;
        this.gobletStat = buildValues.gobletStat ?? null;
        this.gobletStatus = buildValues.gobletStatus ?? false;
        this.circletStat = buildValues.circletStat ?? null;
        this.circletStatus = buildValues.circletStatus ?? false;
        this.artifactSubstats = buildValues.artifactSubstats ?? [];

        this.talent1LevelComplete = buildValues.talent1LevelComplete ?? false;
        this.targetTalent1Level = buildValues.targetTalent1Level ?? 10;
        this.talent2LevelComplete = buildValues.talent2LevelComplete ?? false;
        this.targetTalent2Level = buildValues.targetTalent2Level ?? 10;
        this.talent3LevelComplete = buildValues.talent3LevelComplete ?? false;
        this.targetTalent3Level = buildValues.targetTalent3Level ?? 10;
    }
}
