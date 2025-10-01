<script lang="ts">
	import { charactersById } from '$lib/stores/data';
	import { buildsState } from '$lib/stores/state.svelte';
	import { MenuButton } from '../ui';
    import { LevelSection } from '.';

	let { id }: { id: number } = $props();
    let build = $derived(buildsState[id]);
	let character = charactersById[buildsState[id].character];

	function onSelect(option: String) {
		switch (option) {
			case 'Remove Build': {
                delete buildsState[id];
                break;
			}
			case 'Track Level': {
				buildsState[id].trackingLevel = true;
				break;
			}
			default: {
				console.log('Invalid option');
			}
		}
	}
</script>

<div class="flex h-80 overflow-hidden rounded-xl bg-white shadow-md">
	<div class="relative h-full w-2/5">
		<img src={character.profileImage} alt={character.name} class="h-full w-full object-cover" />
		<div class="absolute inset-0 bg-gradient-to-r from-transparent from-50% to-white to-100%"></div>
	</div>

	<div class="flex flex-1 flex-col gap-1 p-4">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-1">
				<img
					src={`/src/lib/assets/elements/${character.element}.svg`}
					alt={`${character.element} Element`}
					class="h-12.5 w-12.5"
				/>
				<h2 class="text-3xl font-bold">{character.name}</h2>
			</div>
			<MenuButton options={build.menuOptions} {onSelect} />
		</div>
        <LevelSection bind:build={build} />
	</div>
</div>
