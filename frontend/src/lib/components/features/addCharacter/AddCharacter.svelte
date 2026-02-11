<script lang="ts">
	import type { Character } from '$lib/models/Character';
	import type { Weapon } from '$lib/models/Weapon';
	import type { Artifact } from '$lib/models/Artifact';
	import type { CharacterBuild } from '$lib/models/CharacterBuild.svelte';
	import {
		characterList,
		charactersById,
		weaponList,
		weaponsById,
		artifactList,
		artifactsById
	} from '$lib/stores/data';
	import { buildsState } from '$lib/stores/state.svelte';
	import { createBuild, updateBuild } from '$lib/api/builds';
	import { BuildConfig, BuildNavButton } from './components';
	import { AddItem } from '$lib/components';

	let {
		toggleShowOverlay,
		editingBuild
	}: { toggleShowOverlay: () => void; editingBuild?: CharacterBuild } = $props();

	let containerElement: HTMLDivElement;

	const MODE = {
		CHARACTER: 0,
		WEAPON: 1,
		ARTIFACTS1: 2,
		ARTIFACTS2: 3,
		BUILD_CONFIG: 4
	} as const;
	let mode: number = $derived(editingBuild ? MODE.BUILD_CONFIG : MODE.CHARACTER);
	let selectedCharacter: Character | null = $derived(
		editingBuild ? charactersById[editingBuild.character] : null
	);
	let selectedWeapon: Weapon | null = $derived(
		editingBuild && editingBuild.weaponId ? weaponsById[editingBuild.weaponId] : null
	);
	let selectedArtifact1: Artifact | null = $derived(
		editingBuild && editingBuild.artifact1Id ? artifactsById[editingBuild.artifact1Id] : null
	);
	let selectedArtifact2: Artifact | null = $derived(
		editingBuild && editingBuild.artifact2Id ? artifactsById[editingBuild.artifact2Id] : null
	);
	let saving = $state(false);

	function selectCharacterMode() {
		mode = MODE.CHARACTER;
	}
	function selectWeaponMode() {
		mode = MODE.WEAPON;
	}
	function selectArtifact1Mode() {
		mode = MODE.ARTIFACTS1;
	}
	function selectArtifact2Mode() {
		mode = MODE.ARTIFACTS2;
	}
	function goBack() {
		mode = MODE.BUILD_CONFIG;
		containerElement?.scrollTo({ top: 0 });
	}

	function selectCharacter(id: number) {
		const newCharacter = charactersById[id];
		if (selectedCharacter?.weapon !== newCharacter.weapon) {
			selectedWeapon = null;
		}
		selectedCharacter = newCharacter;
		goBack();
	}
	function selectWeapon(id: number) {
		selectedWeapon = weaponsById[id];
		goBack();
	}
	function removeWeapon() {
		selectedWeapon = null;
	}
	function selectArtifact1(id: number) {
		selectedArtifact1 = artifactsById[id];
		goBack();
	}
	function removeArtifact1() {
		if (selectedArtifact2 !== null) {
			selectedArtifact1 = selectedArtifact2;
		} else {
			selectedArtifact1 = null;
		}
		selectedArtifact2 = null;
	}
	function selectArtifact2(id: number) {
		selectedArtifact2 = artifactsById[id];
		goBack();
	}
	function removeArtifact2() {
		selectedArtifact2 = null;
	}

	async function onSave(buildValues: any) {
		if (!selectedCharacter) return;

		try {
			saving = true;
			const buildData = {
				targetLevel: buildValues.targetLevel,
				targetConstellation: buildValues.targetConstellation,
				targetWeaponLevel: buildValues.targetWeaponLevel,
				targetWeaponRefine: buildValues.targetWeaponRefine,
				sandsStat: buildValues.sandsStat,
				gobletStat: buildValues.gobletStat,
				circletStat: buildValues.circletStat,
				artifactSubstats: buildValues.artifactSubstats ?? [],
				targetTalent1Level: buildValues.targetTalent1Level,
				targetTalent2Level: buildValues.targetTalent2Level,
				targetTalent3Level: buildValues.targetTalent3Level,
				characterId: selectedCharacter.id,
				weaponId: selectedWeapon?.id ?? null,
				artifact1Id: selectedArtifact1 ? Number(selectedArtifact1.id) : null,
				artifact2Id: selectedArtifact2 ? Number(selectedArtifact2.id) : null
			};

			if (editingBuild) {
				const newBuild = await updateBuild(editingBuild.id, buildData);
				buildsState[editingBuild.id] = newBuild;
			} else {
				const newBuild = await createBuild(buildData);
				buildsState[newBuild.id] = newBuild;
			}
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
	{:else if mode === MODE.ARTIFACTS1 || mode === MODE.ARTIFACTS2}
		<AddItem
			items={artifactList}
			onItemSelect={mode === MODE.ARTIFACTS1 ? selectArtifact1 : selectArtifact2}
			title="Add Artifact"
			searchPlaceholder="Search artifacts..."
			{goBack}
		/>
	{:else}
		<div class="page-backward flex flex-col gap-4 px-6 pt-6">
			<p class="w-full text-left">Add Character Build</p>
			<div
				class="max-h-3/4 grid gap-2 overflow-y-auto"
				style="grid-template-columns: repeat(4, minmax(80px, 1fr));"
			>
				<BuildNavButton
					selected={selectedCharacter}
					label="Character"
					changeMode={selectCharacterMode}
				/>
				{#if selectedCharacter !== null}
					<BuildNavButton
						selected={selectedWeapon}
						label="Weapon"
						changeMode={selectWeaponMode}
						removeSelection={removeWeapon}
					/>
					{#key selectedArtifact1?.id ?? 'artifact1-empty'}
						<BuildNavButton
							selected={selectedArtifact1}
							label="Artifact Set"
							changeMode={selectArtifact1Mode}
							removeSelection={removeArtifact1}
						/>
					{/key}
					{#if selectedArtifact1 !== null}
						<BuildNavButton
							selected={selectedArtifact2}
							label="Artifact Set"
							changeMode={selectArtifact2Mode}
							removeSelection={removeArtifact2}
						/>
					{/if}
				{/if}
			</div>
			<BuildConfig {editingBuild} {onSave} {saving} character={selectedCharacter} />
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
