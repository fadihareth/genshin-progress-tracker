<script lang="ts">
	import AddCharacter from '$lib/components/addCharacter/AddCharacter.svelte';
    import { IconPlus } from '@tabler/icons-svelte';
    import { Overlay } from '../ui';

	let showOverlay = $state(false);
	function toggleShowOverlay() {
        document.body.style.overflow = showOverlay ? 'unset' : 'hidden';
		showOverlay = !showOverlay;
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

<Overlay bind:open={showOverlay} onClose={toggleShowOverlay}>
    <AddCharacter {toggleShowOverlay} />
</Overlay>
