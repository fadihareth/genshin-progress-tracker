<script lang="ts">
	import { artifactList, artifactsById, charactersById, talentsByName, weaponList, weaponsById } from '$lib/stores/data';
	import { buildsState, nullBuild } from '$lib/stores/state.svelte';
	import { bgColors, bgGradientColors } from '$lib/constants';
	import { BuildSection, LevelSection } from './components';
	import { AddItem, Overlay } from '$lib/components';
	import { assets } from '$lib/assets';
	import { IconPlus } from '@tabler/icons-svelte';

	let { id = $bindable() }: { id: number | null } = $props();
	let build = $derived(id !== null ? buildsState[id] : nullBuild);
    let weapon = $derived(build.weaponId !== null ? weaponsById[build.weaponId] : null);
    let artifacts = $derived(build.artifactIds.map((aId) => artifactsById[aId]));
	let character = $derived(charactersById[id !== null ? buildsState[id].character : 0]);

    let showWeaponOverlay = $state(false);
    function toggleWeaponOverlay() {
        document.body.style.overflow = showWeaponOverlay ? 'unset' : 'hidden';
		showWeaponOverlay = !showWeaponOverlay;
	}
    function onWeaponSelect(wId: number) {
        build.weaponId = wId;
        toggleWeaponOverlay();
    }

    let showArtifactOverlay = $state(false);
    function toggleArtifactOverlay() {
        document.body.style.overflow = showArtifactOverlay ? 'unset' : 'hidden';
		showArtifactOverlay = !showArtifactOverlay;
	}
    function onArtifactSelect(aId: number) {
        build.artifactIds.push(aId);
        toggleArtifactOverlay();
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
						src={assets.getElementIcon(character.element)}
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
								iconProps={{ icon: assets.icons.level, alt: 'Level Icon', tags: "p-1" }}
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
                <div class="flex p-4 gap-4 items-start">
                    <button
                        class="flex flex-col items-center justify-evenly gap-1 rounded-xl bg-gray-100/10 p-2 hover:bg-gray-200/30"
                        onclick={toggleWeaponOverlay}
                    >
                        {#if weapon !== null}
                            <img src={weapon?.image} alt={"weapon"} class="h-30 w-30 rounded object-cover" />
                        {:else}
                            <div class="font-md flex items-center gap-1 text-white">
                                <IconPlus stroke={3} size={18} /> Add Weapon
                            </div>
                        {/if}
                    </button>
                    {#if weapon !== null}
                        <div class="grid grid-cols-[max-content_1fr] items-center gap-x-4 gap-y-2">
                            <p class="flex h-10 flex-col justify-around text-sm text-white col-span-2">{weapon?.name}</p>
                            <LevelSection
                                title="Level"
                                bind:curr={build.currWeaponLevel}
                                target={build.targetWeaponLevel}
                            />
                            <LevelSection
                                title="Refinement"
                                bind:curr={build.currWeaponRefine}
                                target={build.targetWeaponRefine}
                            />
                        </div>
                    {/if}
                </div>
            </BuildSection>
        </div>
        <div class="flex-1 px-6">
            <BuildSection title="Artifacts">
                <div class="flex p-4 gap-4 items-start">
                    <button
                        class="flex flex-col items-center justify-evenly gap-1 rounded-xl bg-gray-100/10 p-2 hover:bg-gray-200/30"
                        onclick={toggleArtifactOverlay}
                    >
                        {#if artifacts.length > 0}
                            <img src={artifacts[0].image} alt={"artifact"} class="h-30 w-30 rounded object-cover" />
                        {:else}
                            <div class="font-md flex items-center gap-1 text-white">
                                <IconPlus stroke={3} size={18} /> Add Artifact
                            </div>
                        {/if}
                    </button>
                    {#if artifacts.length > 0}
                        <div class="grid grid-cols-[max-content_1fr] items-center gap-x-4">
                            <p class="flex h-10 flex-col justify-around text-sm text-white col-span-2">{artifacts[0].name}</p>
                        </div>
                    {/if}
                </div>
            </BuildSection>
        </div>
    </div>
</div>

<Overlay bind:open={showWeaponOverlay} onClose={toggleWeaponOverlay}>
    <AddItem 
        items={weaponList} 
        onItemSelect={onWeaponSelect}
        title="Select a Weapon"
        searchPlaceholder="Search weapons..."
    />
</Overlay>

<Overlay bind:open={showArtifactOverlay} onClose={toggleArtifactOverlay}>
    <AddItem 
        items={artifactList} 
        onItemSelect={onArtifactSelect}
        title="Select an Artifact"
        searchPlaceholder="Search artifacts..."
    />
</Overlay>