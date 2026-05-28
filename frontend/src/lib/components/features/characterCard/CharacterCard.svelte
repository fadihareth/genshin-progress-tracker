<script lang="ts">
	import { AddCharacter, CharacterInfo, Overlay } from '$lib/components';
	import { charactersById } from '$lib/stores/data';
	import { buildsState, settingsState } from '$lib/stores/state.svelte';
	import { deleteBuild, updateBuild } from '$lib/api/builds';
	import { ArtifactSection, CharacterSection, WeaponSection } from './components';
	import { LazyImage, MenuButton } from '$lib/components';
	import { hideScrollbar } from '$lib/util/hideScrollbar';
	import { IconDots } from "@tabler/icons-svelte";

	let { id }: { id: number } = $props();
	let build = $derived(buildsState[id]);
	let character = $derived(charactersById[buildsState[id].character]);

	let showEditing = $state(false);
	let showMaterials = $state(false);
	function toggleShowEditing() {
		hideScrollbar(showEditing);
		showEditing = !showEditing;
	}
	function toggleShowMaterials() {
		hideScrollbar(showMaterials);
		showMaterials = !showMaterials;
	}

	async function onSelect(option: String) {
		switch (option) {
			case 'View Info': {
				toggleShowMaterials();
				break;
			}
			case 'Edit Build': {
				toggleShowEditing();
				break;
			}
			case 'Delete Build': {
				if (confirm('Are you sure you want to delete this build?')) {
					try {
						await deleteBuild(id);
						delete buildsState[id];
					} catch (error) {
						console.error('Error deleting build:', error);
						alert('Failed to delete build. Please try again.');
					}
				}
				break;
			}
			default: {
				console.log('Invalid option');
			}
		}
	}

	async function onUpdate(input: any) {
		try {
			await updateBuild(id, input);
		} catch (error) {
			console.error('Error updating build:', error);
			alert('Failed to update build. Please try again.');
		}
	}
</script>

<div
	class={`relative flex flex-col rounded-xl gradient ${character.element.toLowerCase()}-bg ${build.isComplete() && 'bg-opacity-60'} text-genshin-gold shadow-xl`}
>
	<div class="border-genshin-gold/30 absolute inset-2 z-0 rounded-xl border-2"></div>
    <div class="overflow-hidden w-full h-70 fadeout">
        <LazyImage
                src={character.profileImage}
                alt={character.name}
                className={`h-full w-full fade object-cover scale-110 origin-top ${build.isComplete() && 'opacity-30'}`}
            />
    </div>
	<div class="flex flex-col gap-2 px-5 pb-5">
		<div class="flex items-center justify-between">
			<h2 class="fade" class:opacity-30={build.isComplete()}>
				{character.name}
			</h2>
			<MenuButton {onSelect} buttonClass='rounded-full h-8 w-8 p-1 transition hover:bg-white/20'>
				<IconDots />
			</MenuButton>
		</div>
		<CharacterSection bind:build {character} {onUpdate} />
		<WeaponSection bind:build weaponType={character.weapon} {onUpdate} />
		<ArtifactSection bind:build {onUpdate} />
        {#if build.isComplete() && settingsState.hideCompleted}
            <p class="opacity-30 italic">All done!</p>
        {/if}
	</div>
</div>

<Overlay bind:open={showEditing} onClose={toggleShowEditing}>
	<AddCharacter toggleShowOverlay={toggleShowEditing} editingBuild={build} />
</Overlay>

<Overlay bind:open={showMaterials} onClose={toggleShowMaterials}>
	<CharacterInfo toggleShowOverlay={toggleShowMaterials} {build} />
</Overlay>
