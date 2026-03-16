<script lang="ts">
	import { AddCharacter, Overlay } from '$lib/components';
	import { IconPlus } from '@tabler/icons-svelte';
	import { hideScrollbar } from '$lib/util/hideScrollbar';

	let showOverlay = $state(false);
	function toggleShowOverlay() {
		hideScrollbar(showOverlay);
		showOverlay = !showOverlay;
	}
</script>

<header
	class="sticky top-0 z-50 flex items-center justify-between bg-genshin-blue py-4 px-6 shadow-sm"
>
	<h1 class="text-2xl text-genshin-gold">Genshin Build Progress</h1>
	<button
		onclick={toggleShowOverlay}
		class="max-md:text-sm flex items-center gap-1 rounded-md bg-genshin-gold p-2 px-4 text-genshin-blue transition hover:bg-genshin-gold/50"
		aria-label="Add character"
	>
        <IconPlus stroke={3} size={18} /> Add Character
	</button>
</header>

<Overlay bind:open={showOverlay} onClose={toggleShowOverlay}>
    <AddCharacter {toggleShowOverlay} />
</Overlay>
