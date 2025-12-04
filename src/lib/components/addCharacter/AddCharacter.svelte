<script lang="ts">
	import type { Character } from '$lib/models/Character';
	import { CharacterBuild } from '$lib/models/CharacterBuild.svelte';
	import { characterList } from '$lib/stores/data';
	import { buildsState } from '$lib/stores/state.svelte';
	import { fly } from 'svelte/transition';
	import { LevelSectionForm } from './components';
    import { LazyImage } from '../ui';

	let { toggleShowOverlay }: { toggleShowOverlay: () => void } = $props();
	let search = $state('');
	let selectedCharacter: Character | null = $state(null);
	let buildValues = $state({
		currLevel: 1,
		targetLevel: 90,
        weaponId: null,
        currWeaponLevel: 1,
        targetWeaponLevel: 90,
        currWeaponRefine: 0,
        targetWeaponRefine: 5,
		currTalent1Level: 1,
		targetTalent1Level: 10,
		currTalent2Level: 1,
		targetTalent2Level: 10,
		currTalent3Level: 1,
		targetTalent3Level: 10
	});

	function filtered() {
		const query = search.toLowerCase();
		return characterList.filter((c) => c.name.toLowerCase().includes(query));
	}

	function startBuild(c: Character) {
		selectedCharacter = c;
	}

	function goBack() {
		selectedCharacter = null;
	}

	function saveBuild() {
		if (!selectedCharacter) return;

        characterList.forEach((c) => {
            let key = Object.keys(buildsState).length;
            const newBuild = new CharacterBuild(key, c.id, buildValues);
            buildsState[key] = newBuild;
        })

		// let key = Object.keys(buildsState).length;
		// const newBuild = new CharacterBuild(key, selectedCharacter.id, buildValues);
		// buildsState[key] = newBuild;
		toggleShowOverlay();
	}
</script>

<div
	class="relative h-3/4 w-full max-w-2xl overflow-x-hidden overflow-y-scroll rounded-lg bg-white p-6 shadow-lg"
>
	<h2 class="mb-4 text-xl">Add a Character</h2>
	{#if !selectedCharacter}
		<!-- Page 1: Search -->
		<div in:fly={{ x: -20, duration: 200 }}>
			<input
				type="text"
				placeholder="Search characters..."
				bind:value={search}
				class="mb-4 w-full rounded border px-3 py-2"
			/>

			<div
				class="grid max-h-3/4 gap-2 overflow-y-auto"
				style="grid-template-columns: repeat(4, minmax(80px, 1fr));"
			>
				{#each filtered() as c}
					<button
						class="flex flex-col items-center justify-evenly gap-1 rounded-xl bg-gray-100 p-2 hover:bg-gray-200"
						onclick={() => startBuild(c)}
					>
                        <LazyImage src={c.iconImage} alt={c.name} className="h-30 w-30 rounded object-cover" />
						<p class="flex h-10 flex-col justify-around text-sm text-gray-800">{c.name}</p>
					</button>
				{/each}
			</div>
		</div>
	{:else}
		<!-- Page 2: Form -->
		<div in:fly={{ x: 20, duration: 200 }}>
			<div class="mb-4 flex items-center gap-3">
				<img
					src={selectedCharacter.iconImage}
					alt={selectedCharacter.name}
					class="h-12 w-12 rounded"
				/>
				<h2 class="text-xl">{selectedCharacter.name}</h2>
			</div>

			<div class="space-y-4">
				<LevelSectionForm bind:curr={buildValues.currLevel} bind:target={buildValues.targetLevel} />

				<div class="mt-6 flex justify-between">
					<button class="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300" onclick={goBack}>
						Back
					</button>
					<button
						class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
						onclick={saveBuild}
					>
						Save
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>
