<script lang="ts">
	import type { SelectableItem } from '$lib/constants';
	import Plus from '@tabler/icons-svelte/icons/plus';
	import X from '@tabler/icons-svelte/icons/x';
	import LazyImage from '$lib/components/ui/LazyImage.svelte';

	let {
		selected,
		label,
		changeMode,
		removeSelection
	}: {
		selected: SelectableItem | null;
		label: string;
		changeMode: () => void;
		removeSelection?: () => void;
	} = $props();
</script>

<div class="relative">
	{#if removeSelection !== undefined && selected !== null}
		<button
			onclick={removeSelection}
			class="absolute right-1 top-1 z-10 rounded-full p-1 hover:bg-gray-300"
		>
			<X />
		</button>
	{/if}
	<button
		onclick={changeMode}
		class="flex w-full flex-col items-center justify-evenly gap-1 rounded-xl bg-gray-100 p-2 hover:bg-gray-200"
	>
		{#if selected === null}
			<Plus class="m-5 h-15 w-15" />
			<p class="flex h-15 flex-col justify-around text-sm text-gray-800">{label}</p>
		{:else}
			<LazyImage
				src={selected?.image}
				alt={selected?.name}
				className="h-25 w-25 rounded object-cover"
			/>
			<p class="flex h-15 flex-col justify-around text-sm text-gray-800">{selected?.name}</p>
		{/if}
	</button>
</div>
