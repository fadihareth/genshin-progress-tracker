<script lang="ts">
	import type { Character } from '$lib/models/Character';
	import type { Weapon } from '$lib/models/Weapon';
	import type { Artifact } from '$lib/models/Artifact';
	import {
		characterList,
		charactersById,
		weaponList,
		weaponsById,
		artifactList,
		artifactsById
	} from '$lib/stores/data';
	import { buildsState } from '$lib/stores/state.svelte';
	import { createBuild } from '$lib/api/builds';
	import { BuildConfig, BuildNavButton } from './components';
	import { AddItem } from '$lib/components';

	let { toggleShowOverlay }: { toggleShowOverlay: () => void } = $props();

	let containerElement: HTMLDivElement;

	const MODE = {
		CHARACTER: 0,
		WEAPON: 1,
		ARTIFACTS: 2,
		BUILD_CONFIG: 3
	} as const;
	let mode: number = $state(MODE.CHARACTER);
	let selectedCharacter: Character | null = $state(null);
	let selectedWeapon: Weapon | null = $state(null);
	let selectedArtifacts: Artifact[] = $state([]);
	let saving = $state(false);

	function selectCharacterMode() {
		mode = MODE.CHARACTER;
	}
	function selectWeaponMode() {
		mode = MODE.WEAPON;
	}
	function selectArtifactMode() {
		mode = MODE.ARTIFACTS;
	}
	function goBack() {
		mode = MODE.BUILD_CONFIG;
		containerElement?.scrollTo({ top: 0 });
	}

	function selectCharacter(id: number) {
		selectedCharacter = charactersById[id];
		selectedWeapon = null;
		goBack();
	}
	function selectWeapon(id: number) {
		selectedWeapon = weaponsById[id];
		goBack();
	}
	function selectArtifact(id: number) {
		selectedArtifacts.push(artifactsById[id]);
		goBack();
	}

	async function saveBuild(buildValues: any) {
		if (!selectedCharacter || !selectedWeapon || selectArtifact.length === 0) return;

		try {
			saving = true;
			const buildData = {
				...buildValues,
				characterId: selectedCharacter.id,
				weaponId: selectedWeapon?.id ?? null,
				artifactIds: selectedArtifacts.map((a) => Number(a.id))
			};

			const newBuild = await createBuild(buildData);

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
	bind:this={containerElement}
	class="relative h-3/4 w-full max-w-2xl overflow-x-hidden overflow-y-scroll rounded-lg bg-white shadow-lg"
>
	{#if mode === MODE.CHARACTER}
		<AddItem
			items={characterList}
			onItemSelect={selectCharacter}
			title="Choose Character"
			searchPlaceholder="Search characters..."
			{goBack}
		/>
	{:else if mode === MODE.WEAPON}
		<AddItem
			items={weaponList.filter((w) => w.type === selectedCharacter?.weapon)}
			onItemSelect={selectWeapon}
			title="Choose Weapon"
			searchPlaceholder="Search weapons..."
			{goBack}
		/>
	{:else if mode === MODE.ARTIFACTS}
		<AddItem
			items={artifactList}
			onItemSelect={selectArtifact}
			title="Choose Artifact"
			searchPlaceholder="Search artifacts..."
			{goBack}
		/>
	{:else}
		<div class="page-backward space-y-4 pt-6 px-6">
			<p class="float-left">Add Character Build</p>
			<BuildNavButton
				selected={selectedCharacter}
				label="Select Character"
				changeMode={selectCharacterMode}
			/>
			<BuildNavButton
				selected={selectedWeapon}
				label="Select Weapon"
				changeMode={selectWeaponMode}
				disabled={selectedCharacter === null}
			/>
			<BuildConfig onSave={saveBuild} {saving} character={selectedCharacter} />
		</div>
	{/if}
</div>

<style>
	.page-backward {
		animation: slideInBackward 0.3s ease-in-out;
	}

	@keyframes slideInBackward {
		from {
			opacity: 0;
			transform: translateX(-20px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}
</style>
