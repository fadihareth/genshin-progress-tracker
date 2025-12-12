export class CharacterBuild {
    id: number;
    character: number;

    // Sort order (lower = earlier in grid)
	order: number;

    // Level Progress
    currLevel: number = $state(1);
    targetLevel: number = $state(90);

    // Weapon Progress
    weaponId: number | null = null;
    currWeaponLevel: number = $state(1);
    targetWeaponLevel: number = $state(90);
    currWeaponRefine: number = $state(0);
    targetWeaponRefine: number = $state(5);

    // Artifact Progress
    artifactIds: number[] = [];
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
    currTalent1Level: number = $state(1);
    targetTalent1Level: number = $state(10);
    currTalent2Level: number = $state(1);
    targetTalent2Level: number = $state(10);
    currTalent3Level: number = $state(1);
    targetTalent3Level: number = $state(10);

    constructor(id: number, character: number, buildValues: Record<string,any>) {
        this.id = id;
        this.character = character;
        this.order = id;

        this.currLevel = buildValues.currLevel ?? 1;
        this.targetLevel = buildValues.targetLevel ?? 90;

        this.weaponId = buildValues.weaponId ?? null;
        this.currWeaponLevel = buildValues.currWeaponLevel ?? 1;
        this.targetWeaponLevel = buildValues.targetWeaponLevel ?? 90;
        this.currWeaponRefine = buildValues.currWeaponRefine ?? 0;
        this.targetWeaponRefine = buildValues.targetWeaponRefine ?? 5;

        this.artifactIds = buildValues.artifactIds ?? [];
        this.flowerStatus = buildValues.flowerStatus ?? false;
        this.plumeStatus = buildValues.plumeStatus ?? false;
        this.sandsStat = buildValues.sandsStat ?? null;
        this.sandsStatus = buildValues.sandsStatus ?? false;
        this.gobletStat = buildValues.gobletStat ?? null;
        this.gobletStatus = buildValues.gobletStatus ?? false;
        this.circletStat = buildValues.circletStat ?? null;
        this.circletStatus = buildValues.circletStatus ?? false;
        this.artifactSubstats = buildValues.artifactSubstats ?? [];

        this.currTalent1Level = buildValues.currTalent1Level ?? 1;
        this.targetTalent1Level = buildValues.targetTalent1Level ?? 10;
        this.currTalent2Level = buildValues.currTalent2Level ?? 1;
        this.targetTalent2Level = buildValues.targetTalent2Level ?? 10;
        this.currTalent3Level = buildValues.currTalent3Level ?? 1;
        this.targetTalent3Level = buildValues.targetTalent3Level ?? 10;
    }
}
