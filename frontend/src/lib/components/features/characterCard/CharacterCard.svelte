<script lang="ts">
	import { charactersById } from '$lib/stores/data';
	import { buildsState } from '$lib/stores/state.svelte';
	import { deleteBuild, updateBuild } from '$lib/api/builds';
	import { ArtifactSection, CharacterSection, WeaponSection } from './components';
	import { LazyImage, MenuButton } from '$lib/components';
	import { bgColors } from '$lib/constants';
	import { assets } from '$lib/assets';
	import fitty from 'fitty';

	let { id }: { id: number } = $props();
	let build = $derived(buildsState[id]);
	let character = charactersById[buildsState[id].character];

	let textEl: HTMLElement;
	$effect(() => {
		fitty(textEl, {
			minSize: 10,
			maxSize: 22,
			multiLine: false
		});
	});

	async function onSelect(option: String) {
		switch (option) {
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
	<div class="flex">
		<div class="fadeout w-[500px]">
			<LazyImage
				src={character.profileImage}
				alt={character.name}
				className={`h-full w-full ${build.isComplete() && 'opacity-30'}`}
				placeholder={assets.placeholders.character}
			/>
		</div>
		<div class="flex w-full flex-col gap-2 p-5">
			<div class="flex items-end justify-between">
				<h2 bind:this={textEl} class={`${build.isComplete() && 'opacity-30'}`}>{character.name}</h2>
				<MenuButton {onSelect} />
			</div>
			<CharacterSection bind:build {character} {onUpdate} />
		</div>
	</div>
	<div class="flex flex-col gap-5 p-5">
		<WeaponSection bind:build weaponType={character.weapon} {onUpdate} />
		<ArtifactSection bind:build {onUpdate} />
	</div>
</div>
