<script lang="ts">
	import { charactersById, talentsByName, weaponsById } from '$lib/stores/data';
	import { buildsState, nullBuild } from '$lib/stores/state.svelte';
	import { bgColors, bgGradientColors } from '$lib/constants';
	import { BuildSection, LevelSection } from './components';
    import AddWeapon from '../addWeapon/AddWeapon.svelte';
	import { IconPlus } from '@tabler/icons-svelte';
    import { Overlay } from '../ui';

	let { id = $bindable() }: { id: number | null } = $props();
	let build = $derived(id !== null ? buildsState[id] : nullBuild);
    let weapon = $derived(build.weaponId !== null ? weaponsById[build.weaponId] : null);
	let character = $derived(charactersById[id !== null ? buildsState[id].character : 0]);

    let showOverlay = $state(false);
    function toggleShowOverlay() {
        document.body.style.overflow = showOverlay ? 'unset' : 'hidden';
		showOverlay = !showOverlay;
	}
    function onWeaponSelect(wId: number) {
        weapon = weaponsById[wId];
        showOverlay = false;
    }
</script>

<div
	class={`w-full bg-linear-to-b from-genshin-blue from-0% to-30% ${bgGradientColors[character.element]}`}
>
    <div class="flex flex-col gap-4">
        <div class="flex gap-2 max-lg:flex-col">
            <div class="fadeout-all z-10 h-100 max-lg:w-full lg:w-150">
                <img
                    src={character.profileImage}
                    alt={character.name}
                    class="h-100 object-cover max-lg:w-full lg:w-150"
                />
            </div>
            <div class="flex flex-1 flex-col gap-4 max-lg:px-6">
                <div class="flex items-center gap-1">
                    <div class="relative inline-flex items-center justify-center">
                        <div
                            class={`absolute h-8 w-8 rounded-full ${bgColors[character.element]} blur-md`}
                        ></div>
                    <img
                        src={`src/lib/assets/elements/${character.element}.svg`}
                        alt="element"
                        class="relative h-12 w-12"
                    />
                    </div>
                    <h1 class="text-3xl text-white">{character.name}</h1>
                </div>
                <div class="lg:pr-6">
                    <BuildSection title="Character">
                        <div class="grid grid-cols-[max-content_1fr] items-center gap-x-4 gap-y-2 p-4">
                            <LevelSection
                                title="Level"
                                iconProps={{ icon: 'src/lib/assets/icons/level.webp', alt: 'Level Icon', tags: "p-1" }}
                                bind:curr={build.currLevel}
                                target={build.targetLevel}
                            />
                            <LevelSection
                                title="Attack"
                                iconProps={{ icon: character.attackTalentImage, alt: 'Attack Icon' }}
                                bind:curr={build.currTalent1Level}
                                target={build.targetTalent1Level}
                            />
                            <LevelSection
                                title="Skill"
                                iconProps={{ icon: talentsByName[character.name].skillImage, alt: 'Skill Icon' }}
                                bind:curr={build.currTalent2Level}
                                target={build.targetTalent2Level}
                            />
                            <LevelSection
                                title="Burst"
                                iconProps={{ icon: talentsByName[character.name].burstImage, alt: 'Burst Icon' }}
                                bind:curr={build.currTalent3Level}
                                target={build.targetTalent3Level}
                            />
                        </div>
                    </BuildSection>
                </div>
            </div>
        </div>
        <div class="flex-1 px-6">
            <BuildSection title="Weapon">
                <div class="grid grid-cols-[max-content_1fr] items-center gap-x-4 p-4">
                    <button
                        class="flex flex-col items-center justify-evenly gap-1 rounded-xl bg-gray-100/10 p-2 hover:bg-gray-200/30"
                        onclick={() => { showOverlay = true }}
                    >
                        {#if weapon !== null}
                            <img src={weapon?.image} alt={"weapon"} class="h-30 w-30 rounded object-cover" />
                            <p class="flex h-10 flex-col justify-around text-sm text-gray-800">{weapon?.name}</p>
                        {:else}
                            <div class="font-md flex items-center gap-1 text-white">
                                <IconPlus stroke={3} size={18} /> Add Weapon
                            </div>
                        {/if}
                    </button>
                </div>
            </BuildSection>
        </div>
    </div>
</div>

<Overlay bind:open={showOverlay} onClose={toggleShowOverlay}>
    <AddWeapon {onWeaponSelect} />
</Overlay>
