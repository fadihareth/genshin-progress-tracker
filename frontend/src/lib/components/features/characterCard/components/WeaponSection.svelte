<script lang="ts">
	import { weaponsById } from '$lib/stores/data';
	import { ChecklistItem } from '.';
	import { LazyImage } from '$lib/components';
	import type { CharacterBuild } from '$lib/models/CharacterBuild.svelte';
	import { baseURL } from "$lib/constants";

	let {
		build = $bindable(),
		weaponType,
		onUpdate
	}: { build: CharacterBuild; weaponType: string; onUpdate: (input: any) => void } = $props();

	const weapon = $derived(build.weaponId ? weaponsById[build.weaponId] : null);
	const noWeaponImage = $derived(`${baseURL}/weapons/images/${weaponType.toLowerCase()}.webp`);
</script>

<div class="flex flex-col gap-2">
	<p class:opacity-30={build.weaponComplete()} class="fade">Weapon</p>
	<div class="flex gap-5">
		<LazyImage
			src={weapon ? weapon.image : noWeaponImage}
			alt="Weapon"
			className={`pointer-events-none object-contain shrink-0 select-none w-20 h-20 rounded-lg bg-gray-100/10 fade ${build.weaponComplete() && 'opacity-30'}`}
		/>
		<div class="flex flex-col gap-2">
			<p class:opacity-30={build.weaponComplete()} class="text-sm fade">
				{weapon !== null ? weapon.name : weaponType}
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
