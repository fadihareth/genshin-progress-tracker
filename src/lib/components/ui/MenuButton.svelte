<script lang="ts">
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
		<img src="/src/lib/assets/ui/ellipsis.svg" alt="Menu Button" class="h-full w-full" />
	</button>

	{#if open}
		<div class="absolute right-0 z-50 mt-2 w-40 bg-white shadow-lg">
			{#each options as option}
				<button
					class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
					onclick={() => select(option)}
				>
					{option}
				</button>
			{/each}
		</div>
	{/if}
</div>
