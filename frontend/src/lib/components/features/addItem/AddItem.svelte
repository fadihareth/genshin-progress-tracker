<script lang="ts">
	import { LazyImage } from '$lib/components';
	import ChevronLeft from '@tabler/icons-svelte/icons/chevron-left';
	import type { SelectableItem } from "$lib/constants";

	let {
		items,
		onItemSelect,
		title,
		searchPlaceholder,
		goBack
	}: {
		items: SelectableItem[];
		onItemSelect: (id: number) => void;
		title: string;
		searchPlaceholder: string;
		goBack: () => void;
	} = $props();
	let search = $state('');

	function filtered() {
		const query = search.toLowerCase();
		return items.filter((i) => i.name.toLowerCase().includes(query));
	}
</script>

<div>
	<div class="sticky top-0 z-10 flex gap-2 items-center bg-white/80 pt-6 p-3 backdrop-blur">
		<button class="rounded-full p-1 hover:bg-gray-100" onclick={goBack}>
			<ChevronLeft />
		</button>
		<h2>{title}</h2>
	</div>
	<div class="px-6 pb-3 space-y-3">
		<input
			type="text"
			placeholder={searchPlaceholder}
			bind:value={search}
			class="w-full rounded-xl border px-3 py-2"
		/>
		<div
			class="max-h-3/4 grid gap-2 overflow-y-auto"
			style="grid-template-columns: repeat(4, minmax(80px, 1fr));"
		>
			{#each filtered() as i}
				<button
					class="flex flex-col items-center justify-evenly gap-1 rounded-xl bg-gray-100 p-2 hover:bg-gray-200"
					onclick={() => onItemSelect(i.id)}
				>
					<LazyImage src={i.image} alt={i.name} className="h-30 w-30 rounded object-cover" />
					<p class="flex h-10 flex-col justify-around text-sm text-gray-800">{i.name}</p>
				</button>
			{/each}
		</div>
	</div>
</div>
