<script lang="ts">
	import ChevronRight from '@tabler/icons-svelte/icons/chevron-right';
	import type { SelectableItem } from '$lib/constants';

	let {
		selected,
		label,
		changeMode,
		disabled = false
	}: {
		selected: SelectableItem | null;
		label: string;
		changeMode: () => void;
		disabled?: boolean;
	} = $props();
</script>

<button
	onclick={changeMode}
	{disabled}
	class={`flex w-full items-center justify-between rounded-lg border border-gray-300 p-2 ${disabled ? 'opacity-50' : 'hover:border-gray-400'}`}
>
	{#if selected === null}
		<p class="">{label}</p>
	{:else}
		<div class="flex items-center gap-3">
			<img src={selected?.image} alt={selected?.name} class="h-15 w-15" />
			<h2>{selected?.name}</h2>
		</div>
	{/if}
	<ChevronRight />
</button>
