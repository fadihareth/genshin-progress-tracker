<script lang="ts">
	import { weaponsById } from '$lib/stores/data';
	import { ChecklistItem } from '.';
	import { LazyImage } from '$lib/components';
	import type { CharacterBuild } from '$lib/models/CharacterBuild.svelte';

	let {
		build = $bindable(),
		weaponType,
		onUpdate
	}: { build: CharacterBuild; weaponType: string; onUpdate: (input: any) => void } = $props();
</script>

<div class="flex flex-col gap-2">
	<p class={`${build.weaponComplete() && 'opacity-30'}`}>Weapon</p>
	<div class="flex gap-5">
		{#if build.weaponId !== null}
			<LazyImage
				src={weaponsById[build.weaponId].image}
				alt="Weapon"
				className={`pointer-events-none object-fill select-none w-20 h-20 p-1 rounded-lg bg-gray-100/10 ${build.weaponComplete() && 'opacity-30'}`}
			/>
		{/if}
		<div class="flex flex-col gap-2">
			<p class={`text-sm ${build.weaponComplete() && 'opacity-30'}`}>
				{build.weaponId !== null ? weaponsById[build.weaponId].name : weaponType}
			</p>
			<ChecklistItem
				bind:isComplete={build.weaponLevelComplete}
				label={`Level: ${build.targetWeaponLevel}`}
				onUpdate={() => {
					onUpdate({ weaponLevelComplete: build.weaponLevelComplete });
				}}
			/>
			<ChecklistItem
				bind:isComplete={build.weaponRefineComplete}
				label={`Refine: ${build.targetWeaponRefine}`}
				onUpdate={() => {
					onUpdate({ weaponRefineComplete: build.weaponRefineComplete });
				}}
			/>
		</div>
	</div>
</div>
