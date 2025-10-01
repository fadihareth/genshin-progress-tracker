export class CharacterBuild {
    id: number;
    character: number;

    // Level Progress
    trackingLevel: boolean = $state(false);
    currLevel: number = $state(0);
    targetLevel: number = $state(90);

    // Talents Progress
    trackingTalents: boolean = $state(false);
    trackingTalent1: boolean = $state(false);
    currTalent1Level: number = $state(1);
    targetTalent1Level: number = $state(10);
    trackingTalent2: boolean = $state(false);
    currTalent2Level: number = $state(1);
    targetTalent2Level: number = $state(10);
    trackingTalent3: boolean = $state(false);
    currTalent3Level: number = $state(1);
    targetTalent3Level: number = $state(10);

    constructor(id: number, character: number) {
        this.id = id;
        this.character = character;
    }
}
