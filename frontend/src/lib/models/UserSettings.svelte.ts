export class UserSettings {
    hideCompleted: boolean = $state(true);

    constructor() {
        this.hideCompleted = false;
    }
}
