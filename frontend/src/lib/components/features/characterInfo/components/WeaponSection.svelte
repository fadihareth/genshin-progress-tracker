<script lang="ts">
    import { LazyImage } from "$lib/components/ui";
	import type { CharacterBuild } from "$lib/models/CharacterBuild.svelte";
    import { weaponsById } from "$lib/stores/data";
    import { Item } from "./";
    import { IconStarFilled } from "@tabler/icons-svelte";
    import { calculateWeaponAmount } from "$lib/util/getItemAmount";

    let { build }: { build: CharacterBuild } = $props();
    let weapon = $derived(build.weaponId ? weaponsById[build.weaponId] : null);
</script>

{#if weapon}
    <div class="border border-genshin-gold/30 w-full"></div>
    <div class="flex flex-col gap-4 text-start">
        <div class="flex gap-4 w-full">
            <LazyImage src={weapon.image} alt={`${weapon.name}-image`} className="h-30 w-30 rounded object-cover bg-gray-100/10 shadow-md" />
            <div class="flex flex-col gap-1 items-start">
                <p class="text-xl text-genshin-gold">{weapon.name}</p>
                <!-- <p class="text-sm">{weapon.effectName}</p> -->
                <div class="flex flex-wrap gap-2 text-sm items-center">
                    <p>Base ATK: {weapon.baseAtk}-{weapon.baseAtkMax}</p>
                    <p class="text-genshin-white/30">|</p>
                    <p>{weapon.type}</p>
                    <p class="text-genshin-white/30">|</p>
                    <div class="flex gap-1 items-center">
                        {#each { length: weapon.rarity }}
                            <IconStarFilled size={12} />
                        {/each}
                    </div>
                </div>
                <p class="text-sm">Bonus Effect: {weapon.mainStat} +{weapon.mainStatValue}%-{weapon.mainStatValueMax}%</p>
            </div>
        </div> 
        <p class="text-genshin-gold">Ascension Lvl 1-{build.targetWeaponLevel}</p>
        <div class="grid gap-4" style="grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));">
            {#each { length: 4 }, rarity }
                <Item
                    name={weapon.weaponMaterial[rarity + 1]} 
                    rarity={rarity + 1}
                    amount={calculateWeaponAmount('weaponMaterial', build.targetWeaponLevel, rarity)}
                />
            {/each}
            <Item name="Mora" rarity={2} amount={calculateWeaponAmount('mora', build.targetWeaponLevel)} />
            {#each { length: 3}, rarity }
                <Item
                    name={weapon.worldDropMaterial1[rarity + 1]}
                    {rarity}
                    amount={calculateWeaponAmount('worldDrop1', build.targetWeaponLevel, rarity)}
                />
            {/each}
            {#each { length: 3}, rarity }
                <Item
                    name={weapon.worldDropMaterial2[rarity + 1]}
                    {rarity}
                    amount={calculateWeaponAmount('worldDrop2', build.targetWeaponLevel, rarity)}
                />
            {/each}
        </div>
    </div>
{/if}