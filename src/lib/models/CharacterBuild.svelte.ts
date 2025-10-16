export class CharacterBuild {
    id: number;
    character: number;

    // Sort order (lower = earlier in grid)
	order: number;

    // Level Progress
    currLevel: number = $state(1);
    targetLevel: number = $state(90);

    // Weapon Progress
    currWeaponLevel: number = $state(1);
    targetWeaponLevel: number = $state(90);
    currWeaponRefine: number = $state(0);
    targetWeaponRefine: number = $state(5);

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
        this.currLevel = buildValues.currLevel;
        this.targetLevel = buildValues.targetLevel;
        this.currTalent1Level = buildValues.currTalent1Level;
        this.targetTalent1Level = buildValues.targetTalent1Level;
        this.currTalent2Level = buildValues.currTalent2Level;
        this.targetTalent2Level = buildValues.targetTalent2Level;
        this.currTalent3Level = buildValues.currTalent3Level;
        this.targetTalent3Level = buildValues.targetTalent3Level;
    }
}
