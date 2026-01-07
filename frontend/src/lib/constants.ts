export const bgColors: Record<string, string> = {
    Anemo: "bg-anemo/10",
    Cryo: "bg-cryo/10",
    Dendro: "bg-dendro/10",
    Electro: "bg-electro/10",
    Geo: "bg-geo/10",
    Hydro: "bg-hydro/10",
    Pyro: "bg-pyro/10"
}

export const bgGradientColors: Record<string, string> = {
    Anemo: "to-anemo/30",
    Cryo: "to-cryo/30",
    Dendro: "to-dendro/30",
    Electro: "to-electro/30",
    Geo: "to-geo/30",
    Hydro: "to-hydro/30",
    Pyro: "to-pyro/30"
}

export interface SelectableItem {
    id: number;
    name: string;
    image: string;
}