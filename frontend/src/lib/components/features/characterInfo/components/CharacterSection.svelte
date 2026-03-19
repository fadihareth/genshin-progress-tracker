<script lang="ts">
    import { LazyImage } from "$lib/components/ui";
	import type { CharacterBuild } from "$lib/models/CharacterBuild.svelte";
    import { charactersById, talentsByName } from "$lib/stores/data";
    import { getElementIcon } from "$lib/assets";
    import { IconStarFilled } from "@tabler/icons-svelte";
    import { Item } from "./";
    import { calculateAscensionAmount, calculateTalentsAmount } from "$lib/util/getItemAmount";

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
            <p class="text-sm">Substat: {character.substat}</p>
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
            <Item
                name={character.getGemstoneName(rarity)} 
                rarity={rarity + 1}
                amount={calculateAscensionAmount('gemstone', build.targetLevel, rarity)}
            />
        {/each}
        <Item
            name="Mora"
            rarity={2}
            amount={calculateAscensionAmount('mora', build.targetLevel)}
        />
        <Item
            name="Hero's Wit"
            rarity={3}
            amount={calculateAscensionAmount('exp', build.targetLevel)}
        />
        {#each { length: 3}, rarity }
            <Item
                name={character.worldDropMaterial[rarity + 1]}
                {rarity}
                amount={calculateAscensionAmount('worldDrop', build.targetLevel, rarity)}
            />
        {/each}
        <Item
            name={character.localSpecialtyMaterial}
            rarity={0}
            amount={calculateAscensionAmount('localSpecialty', build.targetLevel)}
        />
        <Item
            name={character.worldBossMaterial}
            rarity={3}
            amount={calculateAscensionAmount('worldBoss', build.targetLevel)}
        />
    </div>
    <p class="text-genshin-gold">
        Normal Attack Lvl 1-{build.targetTalent1Level}
        <span class="border-genshin-gold/50 border mr-2 ml-1"></span>
        Skill Lvl 1-{build.targetTalent2Level}
        <span class="border-genshin-gold/50 border mr-2 ml-1"></span>
        Burst Lvl 1-{build.targetTalent3Level}
    </p>
    {#if build.targetTalent1Level !== "1" || build.targetTalent2Level !== "1" || build.targetTalent3Level !== "1"}
        <div class="grid gap-4" style="grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));">
            {#each { length: 3 }, rarity}
                <Item
                    name={talents.talentMaterial[rarity + 1]}
                    rarity={rarity + 1}
                    amount={calculateTalentsAmount(
                        'talentsMaterial',
                        build.targetTalent1Level,
                        build.targetTalent2Level,
                        build.targetTalent3Level,
                        rarity
                    )}
                />
            {/each}
            {#each { length: 3}, rarity }
                <Item
                    name={character.worldDropMaterial[rarity + 1]}
                    {rarity}
                    amount={calculateTalentsAmount(
                        'worldDrop',
                        build.targetTalent1Level,
                        build.targetTalent2Level,
                        build.targetTalent3Level,
                        rarity
                    )}
                />
            {/each}
            <Item
                name="Mora"
                rarity={2}
                amount={calculateTalentsAmount(
                    'mora',
                    build.targetTalent1Level,
                    build.targetTalent2Level,
                    build.targetTalent3Level
                )}
            />
            <Item
                name="Crown of Insight"
                rarity={4}
                amount={calculateTalentsAmount(
                    'crown',
                    build.targetTalent1Level,
                    build.targetTalent2Level,
                    build.targetTalent3Level
                )}
            />
            <Item
                name={talents.weeklyBossMaterial}
                rarity={4}
                amount={calculateTalentsAmount(
                    'weeklyBoss',
                    build.targetTalent1Level,
                    build.targetTalent2Level,
                    build.targetTalent3Level
                )}
            />
        </div>
    {:else}
        <p class="italic text-genshin-white/70">No Materials Required</p>
    {/if}
</div>