<script lang="ts">
    import { IconDots } from "@tabler/icons-svelte";
	let { options = ['Edit Build', "Delete Build"], onSelect } = $props();

	let open = $state(false);
	let menuRef: HTMLDivElement | null = null;

	function handleClickOutside(event: MouseEvent) {
		if (menuRef && !menuRef.contains(event.target as Node)) {
			open = false;
		}
	}

	$effect(() => {
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});

	function select(option: string) {
		open = false;
		onSelect(option);
	}
</script>

<div class="relative" bind:this={menuRef}>
	<button
		class="rounded-full h-8 w-8 p-1 transition hover:bg-white/20"
		aria-haspopup="true"
		aria-expanded={open}
		onclick={() => (open = !open)}
	>
		<IconDots />
	</button>

	{#if open}
		<div class="absolute right-0 z-50 mt-1 w-40 rounded bg-genshin-white shadow-lg">
			{#each options as option}
				<button
					class="w-full px-4 py-2 text-left rounded text-sm text-genshin-blue hover:bg-genshin-gold/80"
					onclick={() => select(option)}
				>
					{option}
				</button>
			{/each}
		</div>
	{/if}
</div>
