<script lang="ts">
	import { AddCharacter, Overlay } from '$lib/components';
	import { charactersById } from '$lib/stores/data';
	import { buildsState } from '$lib/stores/state.svelte';
	import { deleteBuild, updateBuild } from '$lib/api/builds';
	import { ArtifactSection, CharacterSection, WeaponSection } from './components';
	import { LazyImage, MenuButton } from '$lib/components';
	import { bgColors } from '$lib/constants';

	let { id }: { id: number } = $props();
	let build = $derived(buildsState[id]);
	let character = $derived(charactersById[buildsState[id].character]);

	let showOverlay = $state(false);
	function toggleShowOverlay() {
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
		if (!showOverlay) {
			document.body.style.overflow = 'hidden';
			document.body.style.paddingRight = `${scrollbarWidth}px`;
		} else {
			document.body.style.overflow = 'unset';
			document.body.style.paddingRight = '0';
		}
		showOverlay = !showOverlay;
	}

	async function onSelect(option: String) {
		switch (option) {
			case 'Edit Build': {
				toggleShowOverlay();
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
	class={`relative flex flex-col rounded-xl ${bgColors[character.element]} ${build.isComplete() && 'bg-opacity-60'} text-genshin-gold shadow-xl`}
>
	<div class="border-genshin-gold/30 absolute inset-2 z-0 rounded-xl border-2"></div>
	<LazyImage
			src={character.profileImage}
			alt={character.name}
			className={`fadeout h-[250px] w-full ${build.isComplete() && 'opacity-30'}`}
		/>
	<div class="flex flex-col gap-2 px-5 pb-5">
		<div class="flex items-center justify-between">
			<h2 class="{build.isComplete() ? 'opacity-30' : ''}">
				{character.name}
			</h2>
			<MenuButton {onSelect} />
		</div>
		<CharacterSection bind:build {character} {onUpdate} />
		<WeaponSection bind:build weaponType={character.weapon} {onUpdate} />
		<ArtifactSection bind:build {onUpdate} />
	</div>
</div>

<Overlay bind:open={showOverlay} onClose={toggleShowOverlay}>
	<AddCharacter {toggleShowOverlay} editingBuild={build} />
</Overlay>
