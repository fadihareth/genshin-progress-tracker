<script lang="ts">
    import { browser } from '$app/environment';
	import AddCharacter from '$lib/components/AddCharacter.svelte';
	import { CharacterBuild } from '$lib/models/CharacterBuild.svelte';
	import { buildsState } from '$lib/stores/state.svelte';

	let showOverlay = $state(false);

	function addBuild(id: number) {
		let key = Object.keys(buildsState).length;
		buildsState[key] = new CharacterBuild(key, id);
		showOverlay = false;
	}

	// hide overlay when clicking outside overlayed component
	if (browser) {
		window.onclick = function (event) {
			const overlay = document.getElementById('overlay');
			if (event.target === overlay) {
				showOverlay = false;
			}
		};
	}
</script>

<header
	class="sticky top-0 z-10 flex items-center justify-between bg-gray-200/90 p-4 shadow-sm backdrop-blur"
>
	<h1 class="text-2xl font-bold text-gray-800">Genshin Build Progress</h1>
	<button
		onclick={() => {
			showOverlay = true;
		}}
		class="rounded-md bg-gray-500 p-2 px-4 text-white transition hover:bg-gray-600"
		aria-label="Add character"
	>
		+
	</button>
</header>

{#if showOverlay}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" id="overlay">
		<AddCharacter {addBuild} />
	</div>
{/if}
