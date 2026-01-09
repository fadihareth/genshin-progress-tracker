import type { SelectableItem } from "$lib/constants";

export type ArtifactJSON = {
    id: number;
    name: string;
    rarity: string[];
    "2pc": string;
    "4pc": string;
    flower: string;
    plume: string;
    sands: string;
    goblet: string;
    circlet: string;
};

export class Artifact implements SelectableItem {
    id: number;
    name: string;
    rarity: string[];
    "2pc": string;
    "4pc": string;
    flower: string;
    plume: string;
    sands: string;
    goblet: string;
    circlet: string;

    constructor(data: ArtifactJSON) {
        this.id = data.id;
        this.name = data.name;
        this.rarity = data.rarity;
        this["2pc"] = data["2pc"];
        this["4pc"] = data["4pc"];
        this.flower = data.flower;
        this.plume = data.plume;
        this.sands = data.sands;
        this.goblet = data.goblet;
        this.circlet = data.circlet;
    }

    get image(): string {
        let name = this.flower.replaceAll(':', '').replaceAll('/ ', '').replaceAll(' ', '_');
        return `https://fadihareth.github.io/genshin-build-tracker-server/artifacts/${name}.png`;
    }

    get plumeImage(): string {
        let name = this.plume.replaceAll(':', '').replaceAll('/ ', '').replaceAll(' ', '_');
        return `https://fadihareth.github.io/genshin-build-tracker-server/artifacts/${name}.png`;
    }

    get sandsImage(): string {
        let name = this.sands.replaceAll(':', '').replaceAll('/ ', '').replaceAll(' ', '_');
        return `https://fadihareth.github.io/genshin-build-tracker-server/artifacts/${name}.png`;
    }

    get gobletImage(): string {
        let name = this.goblet.replaceAll(':', '').replaceAll('/ ', '').replaceAll(' ', '_');
        return `https://fadihareth.github.io/genshin-build-tracker-server/artifacts/${name}.png`;
    }

    get circletImage(): string {
        let name = this.circlet.replaceAll(':', '').replaceAll('/ ', '').replaceAll(' ', '_');
        return `https://fadihareth.github.io/genshin-build-tracker-server/artifacts/${name}.png`;
    }
}
