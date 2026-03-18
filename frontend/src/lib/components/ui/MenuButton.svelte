<script lang="ts">
	let {
		options = ['View Info', 'Edit Build', "Delete Build"],
		label = '',
		onSelect,
		buttonClass = '',
		menuPlacement = 'mt-1',
		children
	} = $props();

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
		class={buttonClass}
		aria-haspopup="true"
		aria-expanded={open}
		onclick={() => (open = !open)}
	>
		{@render children()}
	</button>

	{#if open}
		<div class="absolute right-0 z-50 {menuPlacement} w-50 rounded bg-genshin-white shadow-lg">
			{#if label !== ''}
				<p class="w-full px-4 py-2 text-left rounded text-sm text-genshin-blue/70">{label}</p>
			{/if}
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
