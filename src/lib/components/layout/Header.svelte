<script lang="ts">
	import { browser } from '$app/environment';
	import AddCharacter from '$lib/components/addCharacter/AddCharacter.svelte';
	import { fade } from 'svelte/transition';
    import { IconPlus } from '@tabler/icons-svelte';

	let showOverlay = $state(false);

	function toggleShowOverlay() {
		// Hide scrollbar when overlay is shown
		document.body.style.overflow = showOverlay ? 'unset' : 'hidden';
		showOverlay = !showOverlay;
	}

	// hide overlay when clicking outside overlayed component
	if (browser) {
		window.onclick = function (event) {
			const overlay = document.getElementById('overlay');
			if (event.target === overlay) {
				toggleShowOverlay();
			}
		};
	}
</script>

<header
	class="sticky top-0 z-50 flex items-center justify-between bg-genshin-blue/90 p-4 shadow-sm backdrop-blur"
>
	<h1 class="text-2xl text-genshin-gold">Genshin Build Progress</h1>
	<button
		onclick={toggleShowOverlay}
		class="font-md flex items-center gap-1 rounded-md bg-genshin-gold p-2 px-4 text-genshin-blue transition hover:bg-genshin-gold/50"
		aria-label="Add character"
	>
        <IconPlus stroke={3} size={18} /> Add Character
	</button>
</header>

{#if showOverlay}
	<div
		transition:fade={{ duration: 150 }}
		class="fixed inset-0 z-100 flex items-center justify-center bg-black/50"
		id="overlay"
	>
		<AddCharacter {toggleShowOverlay} />
	</div>
{/if}
