<script lang="ts">
	import { BuildSelect, BuildMultiSelect } from '.';

	let { onSave, saving }: { onSave: (buildValues: any) => void; saving: boolean } = $props();

	let buildValues = $state({
		targetLevel: '90',
		targetConstellation: 'C0',
		targetWeaponLevel: '90',
		targetWeaponRefine: 'R5',
		sandsStat: null,
		gobletStat: null,
		circletStat: null,
		artifactSubstats: [] as string[],
		targetTalent1Level: '10',
		targetTalent2Level: '10',
		targetTalent3Level: '10'
	});
</script>

<div class="grid grid-cols-[max-content_1fr] items-center gap-x-10 gap-y-4 text-start">
    <hr class="col-span-2 border-t border-gray-300" />
	<p class="col-span-2">Character Info</p>
	<BuildSelect
		bind:value={buildValues.targetLevel}
		id="Level"
		items={Array.from({ length: 9 }, (_, i) => ((i + 1) * 10).toString())}
	/>
	<BuildSelect
		bind:value={buildValues.targetConstellation}
		id="Constellations"
		items={Array.from({ length: 7 }, (_, i) => `C${i}`)}
	/>
	<BuildSelect
		bind:value={buildValues.targetTalent1Level}
		id="Normal Attack Talent"
		items={Array.from({ length: 10 }, (_, i) => (i + 1).toString())}
	/>
	<BuildSelect
		bind:value={buildValues.targetTalent2Level}
		id="Skill Talent"
		items={Array.from({ length: 10 }, (_, i) => (i + 1).toString())}
	/>
	<BuildSelect
		bind:value={buildValues.targetTalent3Level}
		id="Burst Talent"
		items={Array.from({ length: 10 }, (_, i) => (i + 1).toString())}
	/>

    <hr class="col-span-2 border-t border-gray-300" />
    <p class="col-span-2">Weapon Info</p>
	<BuildSelect
		bind:value={buildValues.targetWeaponLevel}
		id="Weapon Level"
		items={Array.from({ length: 9 }, (_, i) => ((i + 1) * 10).toString())}
	/>
	<BuildSelect
		bind:value={buildValues.targetWeaponRefine}
		id="Weapon Refine"
		items={Array.from({ length: 6 }, (_, i) => `R${i}`)}
	/>

    <hr class="col-span-2 border-t border-gray-300" />
    <p class="col-span-2">Artifacts Info</p>
	<BuildSelect
		bind:value={buildValues.sandsStat}
		id="Sands Main Stat"
		items={['HP(%)', 'ATK(%)', 'DEF(%)', 'EM', 'ER(%)']}
	/>
	<BuildSelect
		bind:value={buildValues.gobletStat}
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
	/>
	<BuildSelect
		bind:value={buildValues.circletStat}
		id="Circlet Main Stat"
		items={['CRIT Rate(%)', 'CRIT DMG(%)', 'EM', 'HP(%)', 'ATK(%)', 'DEF(%)', 'Healing Bonus(%)']}
	/>
	<BuildMultiSelect
		bind:value={buildValues.artifactSubstats}
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
		max={4}
	/>
</div>
<div class="sticky bottom-0 flex w-full justify-end bg-white p-3 pl-6 pr-6">
	<button
		class="rounded bg-blue-500 object-right px-4 py-2 text-white shadow hover:bg-blue-600 disabled:opacity-50"
		onclick={() => {
			onSave(buildValues);
		}}
		disabled={saving}
	>
		{saving ? 'Saving...' : 'Save'}
	</button>
</div>
