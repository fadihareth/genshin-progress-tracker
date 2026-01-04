<script lang="ts">
	import type { Character } from '$lib/models/Character';
	import { characterList } from '$lib/stores/data';
	import { buildsState } from '$lib/stores/state.svelte';
	import { createBuild } from '$lib/api/builds';
	import { fly } from 'svelte/transition';
	import { LazyImage } from '$lib/components';

	let { toggleShowOverlay }: { toggleShowOverlay: () => void } = $props();
	let search = $state('');
	let selectedCharacter: Character | null = $state(null);
	let saving = $state(false);
	let buildValues = $state({
		levelComplete: false,
		targetLevel: '90',
		constellationComplete: false,
		targetConstellation: 'C0',
		weaponId: null,
		weaponLevelComplete: false,
		targetWeaponLevel: '90',
		weaponRefineComplete: false,
		targetWeaponRefine: 'R5',
		artifactIds: [],
		flowerComplete: false,
		plumeComplete: false,
		sandsStat: null,
		sandsComplete: false,
		gobletStat: null,
		gobletComplete: false,
		circletStat: null,
		circletComplete: false,
		artifactSubstats: [],
		talent1LevelComplete: false,
		targetTalent1Level: '10',
		talent2LevelComplete: false,
		targetTalent2Level: '10',
		talent3LevelComplete: false,
		targetTalent3Level: '10'
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

	async function saveBuild() {
		if (!selectedCharacter) return;

		try {
			saving = true;
			const newBuild = await createBuild({
				characterId: selectedCharacter.id,
				...buildValues
			});

			buildsState[newBuild.id] = newBuild;
			toggleShowOverlay();
		} catch (error) {
			console.error('Error saving build:', error);
			alert('Failed to save build. Please try again.');
		} finally {
			saving = false;
		}
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
				class="max-h-3/4 grid gap-2 overflow-y-auto"
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
				<!-- <LevelSectionForm bind:curr={buildValues.currLevel} bind:target={buildValues.targetLevel} /> -->

				<div class="mt-6 flex justify-between">
					<button 
						class="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300" 
						onclick={goBack}
						disabled={saving}
					>
						Back
					</button>
					<button
						class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
						onclick={saveBuild}
						disabled={saving}
					>
						{saving ? 'Saving...' : 'Save'}
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>
