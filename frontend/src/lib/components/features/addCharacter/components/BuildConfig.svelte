<script lang="ts">
	import type { Character } from '$lib/models/Character';
	import { BuildSelect, BuildMultiSelect } from '.';
	import { talentsByName } from '$lib/stores/data';
	import { IconCrown, IconGlass, IconHourglassEmpty } from '@tabler/icons-svelte';

	let {
		editingBuild,
		onSave,
		saving,
		character
	}: {
		editingBuild: any;
		onSave: (buildValues: any) => void;
		saving: boolean;
		character: Character | null;
	} = $props();

	let targetLevel = $derived(editingBuild?.targetLevel ?? '90');
	let targetConstellation = $derived(editingBuild?.targetConstellation ?? 'C0');
	let targetWeaponLevel = $derived(editingBuild?.targetWeaponLevel ?? '90');
	let targetWeaponRefine = $derived(editingBuild?.targetWeaponRefine ?? 'R0');
	let sandsStat = $derived(editingBuild?.sandsStat ?? null);
	let gobletStat = $derived(editingBuild?.gobletStat ?? null);
	let circletStat = $derived(editingBuild?.circletStat ?? null);
	let artifactSubstats = $derived(editingBuild?.artifactSubstats ?? []);
	let targetTalent1Level = $derived(editingBuild?.targetTalent1Level ?? '10');
	let targetTalent2Level = $derived(editingBuild?.targetTalent2Level ?? '10');
	let targetTalent3Level = $derived(editingBuild?.targetTalent3Level ?? '10');

	function save() {
		onSave({
			targetLevel: targetLevel,
			targetConstellation: targetConstellation,
			targetWeaponLevel: targetWeaponLevel,
			targetWeaponRefine: targetWeaponRefine,
			sandsStat: sandsStat,
			gobletStat: gobletStat,
			circletStat: circletStat,
			artifactSubstats: artifactSubstats,
			targetTalent1Level: targetTalent1Level,
			targetTalent2Level: targetTalent2Level,
			targetTalent3Level: targetTalent3Level
		})
	}
</script>

<div class="grid grid-cols-[max-content_1fr] items-center gap-x-10 gap-y-4 text-start">
	<hr class="col-span-2 border-t border-gray-300" />
	<p class="col-span-2">Character Goals</p>
	<BuildSelect
		bind:value={targetLevel}
		id="Level"
		items={Array.from({ length: 9 }, (_, i) => ((i + 1) * 10).toString())}
	/>
	<BuildSelect
		bind:value={targetConstellation}
		id="Constellations"
		items={Array.from({ length: 7 }, (_, i) => `C${i}`)}
	/>
	<BuildSelect
		bind:value={targetTalent1Level}
		id="Normal Attack Talent"
		items={Array.from({ length: 10 }, (_, i) => (i + 1).toString())}
		icon={character?.attackTalentImage}
	/>
	<BuildSelect
		bind:value={targetTalent2Level}
		id="Skill Talent"
		items={Array.from({ length: 10 }, (_, i) => (i + 1).toString())}
		icon={talentsByName[character?.name ?? '']?.skillImage}
	/>
	<BuildSelect
		bind:value={targetTalent3Level}
		id="Burst Talent"
		items={Array.from({ length: 10 }, (_, i) => (i + 1).toString())}
		icon={talentsByName[character?.name ?? '']?.burstImage}
	/>

	<hr class="col-span-2 border-t border-gray-300" />
	<p class="col-span-2">Weapon Goals</p>
	<BuildSelect
		bind:value={targetWeaponLevel}
		id="Weapon Level"
		items={Array.from({ length: 9 }, (_, i) => ((i + 1) * 10).toString())}
	/>
	<BuildSelect
		bind:value={targetWeaponRefine}
		id="Weapon Refine"
		items={Array.from({ length: 6 }, (_, i) => `R${i}`)}
	/>

	<hr class="col-span-2 border-t border-gray-300" />
	<p class="col-span-2">Artifact Goals</p>
	<BuildSelect
		bind:value={sandsStat}
		id="Sands Main Stat"
		items={['HP(%)', 'ATK(%)', 'DEF(%)', 'EM', 'ER(%)']}
		icon={IconHourglassEmpty}
	/>
	<BuildSelect
		bind:value={gobletStat}
		id="Goblet Main Stat"
		items={[
			'Anemo DMG(%)',
			'Cryo DMG(%)',
			'Dendro DMG(%)',
			'Electro DMG(%)',
			'Geo DMG(%)',
			'Hydro DMG(%)',
			'Pyro DMG(%)',
			'Physical DMG(%)',
			'EM',
			'HP(%)',
			'ATK(%)',
			'DEF(%)'
		]}
		icon={IconGlass}
	/>
	<BuildSelect
		bind:value={circletStat}
		id="Circlet Main Stat"
		items={['CRIT Rate(%)', 'CRIT DMG(%)', 'EM', 'HP(%)', 'ATK(%)', 'DEF(%)', 'Healing Bonus(%)']}
		icon={IconCrown}
	/>
	<BuildMultiSelect
		bind:value={artifactSubstats}
		id="Artifact Substats"
		options={[
			'CRIT Rate(%)',
			'CRIT DMG(%)',
			'EM',
			'ER(%)',
			'HP(%)',
			'ATK(%)',
			'DEF(%)',
			'HP',
			'ATK',
			'DEF'
		]}
	/>
</div>
<div class="sticky bottom-0 flex w-full justify-end bg-white py-3">
	<button
		class="rounded bg-blue-500 object-right px-4 py-2 text-white shadow enabled:hover:bg-blue-600 disabled:opacity-50"
		onclick={save}
		disabled={saving || character === null}
	>
		{saving ? 'Saving...' : 'Save'}
	</button>
</div>
