<script lang="ts">
	import { artifactsById } from '$lib/stores/data';
	import { ChecklistItem } from '.';
	import { LazyImage } from '$lib/components';
	import {
		IconCrown,
		IconFeather,
		IconFlower,
		IconGlass,
		IconHourglassEmpty
	} from '@tabler/icons-svelte';
	import type { CharacterBuild } from '$lib/models/CharacterBuild.svelte';

	let { build = $bindable(), onUpdate }: { build: CharacterBuild; onUpdate: (input: any) => void } =
		$props();

	let artifact1 = $derived(build.artifact1Id ? artifactsById[build.artifact1Id] : null);
	let artifact2 = $derived(build.artifact2Id ? artifactsById[build.artifact2Id] : null);
</script>

<div class="flex flex-col gap-2">
	<p class="{build.artifactsComplete() ? 'opacity-30' : ''}">Artifacts</p>
	<div class="flex gap-5">
		{#if build.artifact1Id !== null && build.artifact2Id !== null}
			<div
				class="relative shrink-0 h-20 w-20 rounded-lg bg-gray-100/10 {build.artifactsComplete() ? 'opacity-30' : ''}"
			>
				<LazyImage
					src={artifact1?.image}
					alt="Artifact 1"
					className="pointer-events-none absolute select-none w-14 h-14 top-0 left-0"
				/>
				<LazyImage
					src={artifact2?.image}
					alt="Artifact 2"
					className="pointer-events-none absolute select-none w-14 h-14 bottom-0 right-0"
				/>
			</div>
		{:else if build.artifact1Id !== null}
			<LazyImage
				src={artifact1?.image}
				alt="Artifact"
				className={`pointer-events-none object-contain shrink-0 select-none w-20 h-20 rounded-lg bg-gray-100/10 ${build.artifactsComplete() && 'opacity-30'}`}
			/>
		{/if}
		<div class="flex flex-col gap-2">
			<p class="text-sm {build.artifactsComplete() ? 'opacity-30' : ''}">
				{artifact1 && artifact2 ? artifact1.name + " / " + artifact2.name : artifact1 ? artifact1.name : artifact2 ? artifact2.name : "Artifact"}
			</p>
			<ChecklistItem
				bind:isComplete={build.flowerComplete}
				label="HP"
				onUpdate={() => {
					onUpdate({ flowerComplete: build.flowerComplete });
				}}
			>
				<IconFlower size={20} />
			</ChecklistItem>
			<ChecklistItem
				bind:isComplete={build.plumeComplete}
				label="ATK"
				onUpdate={() => {
					onUpdate({ plumeComplete: build.plumeComplete });
				}}
			>
				<IconFeather size={20} />
			</ChecklistItem>
			<ChecklistItem
				bind:isComplete={build.sandsComplete}
				label={build.sandsStat ?? 'Sands'}
				onUpdate={() => {
					onUpdate({ sandsComplete: build.sandsComplete });
				}}
			>
				<IconHourglassEmpty size={20} />
			</ChecklistItem>
			<ChecklistItem
				bind:isComplete={build.gobletComplete}
				label={build.gobletStat ?? 'Goblet'}
				onUpdate={() => {
					onUpdate({ gobletComplete: build.gobletComplete });
				}}
			>
				<IconGlass size={20} />
			</ChecklistItem>
			<ChecklistItem
				bind:isComplete={build.circletComplete}
				label={build.circletStat ?? 'Circlet'}
				onUpdate={() => {
					onUpdate({ circletComplete: build.circletComplete });
				}}
			>
				<IconCrown size={20} />
			</ChecklistItem>
		</div>
	</div>
	<p class="{build.artifactsComplete() ? 'opacity-30' : ''}">Substats</p>
	<div
		class={`flex flex-wrap items-center gap-2 text-xs ${build.artifactsComplete() ? 'opacity-30' : ''}`}
	>
		{#if build.artifactSubstats.length === 0}
			<p class="rounded-lg bg-gray-100/10 p-2">None</p>
		{:else}
			{#each build.artifactSubstats as substat}
				<p class="rounded-lg bg-gray-100/10 p-2">{substat}</p>
			{/each}
		{/if}
	</div>
</div>
