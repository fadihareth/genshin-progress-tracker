<script lang="ts">
    import { LazyImage } from "$lib/components/ui";
	import type { CharacterBuild } from "$lib/models/CharacterBuild.svelte";
    import { charactersById, talentsByName } from "$lib/stores/data";
    import { getElementIcon } from "$lib/assets";
    import { IconStarFilled } from "@tabler/icons-svelte";
    import { Item } from "./";

    let { build }: { build: CharacterBuild } = $props();
    let character = $derived(charactersById[build.character]);
    let talents = $derived(talentsByName[character.name]);
</script>

<div class="flex flex-col gap-4 text-start">
    <div class="flex gap-4 w-full">
        <LazyImage src={character.image} alt={`${character.name}-image`} className="h-30 w-30 rounded object-cover bg-gray-100/10 shadow-md" />
        <div class="flex flex-col gap-1 items-start">
            <p class="text-xl text-genshin-gold">{character.name}</p>
            <p class="text-sm">{character.title}</p>
            <div class="flex flex-wrap gap-2 text-sm items-center">
                <div class="flex gap-1 items-center">
                    <img src={getElementIcon(character.element)} alt="element" class="h-5 w-5" />
                    <p>{character.element}</p>
                </div>
                <p class="text-genshin-white/30">|</p>
                <div class="flex gap-1 items-center">
                    <p>{character.weapon}</p>
                </div>
                <p class="text-genshin-white/30">|</p>
                <div class="flex gap-1 items-center">
                    {#each { length: character.rarity }}
                        <IconStarFilled size={12} />
                    {/each}
                </div>
            </div>
        </div>
    </div> 
    <p class="text-genshin-gold">Ascension Lvl 1-{build.targetLevel}</p>
    <div class="grid gap-4" style="grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));">
        {#each { length: 4 }, rarity }
            <Item name={character.getGemstoneName(rarity)} rarity={rarity + 1} amount={1} />
        {/each}
        <Item name="Mora" rarity={2} amount={2092530} />
        <Item name="Hero's Wit" rarity={3} amount={419} />
        {#each { length: 3}, rarity }
            <Item name={character.worldDropMaterial[rarity + 1]} {rarity} amount={1} />
        {/each}
        <Item name={character.localSpecialtyMaterial} rarity={0} amount={168} />
        <Item name={character.worldBossMaterial} rarity={3} amount={46} />
    </div>
    <p class="text-genshin-gold">
        Normal Attack Lvl 1-{build.targetTalent1Level}
        <span class="border-genshin-gold/50 border mr-2 ml-1"></span>
        Skill Lvl 1-{build.targetTalent2Level}
        <span class="border-genshin-gold/50 border mr-2 ml-1"></span>
        Burst Lvl 1-{build.targetTalent3Level}
    </p>
    <div class="grid gap-4" style="grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));">
        {#each { length: 3 }, rarity}
            <Item name={talents.talentMaterial[rarity + 1]} rarity={rarity + 1} amount={1} />
        {/each}
        {#each { length: 3}, rarity }
            <Item name={character.worldDropMaterial[rarity + 1]} {rarity} amount={1} />
        {/each}
        <Item name="Mora" rarity={2} amount={4957500} />
        <Item name="Crown of Insight" rarity={4} amount={3} />
        <Item name={talents.weeklyBossMaterial} rarity={4} amount={18} />
    </div>
</div>