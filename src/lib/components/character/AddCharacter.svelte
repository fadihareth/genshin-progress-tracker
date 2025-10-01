<script lang="ts">
	import { characterList } from '$lib/stores/data';

	let { addBuild }: { addBuild: (v: number) => void } = $props();
	let search = $state('');

	function filtered() {
		const query = search.toLowerCase();
		return characterList.filter((c) => c.name.toLowerCase().includes(query));
	}
</script>

<div class="relative w-3/4 max-w-2xl rounded-lg bg-white p-6 shadow-lg">
	<h2 class="mb-4 text-xl font-bold">Add a Character</h2>

	<input
		type="text"
		placeholder="Search characters..."
		bind:value={search}
		class="mb-4 w-full rounded border px-3 py-2"
	/>

	<div class="max-h-80 space-y-2 overflow-y-auto">
		{#each filtered() as c}
			<button
				class="flex w-full items-center gap-3 rounded border p-2 hover:bg-gray-100"
				onclick={() => addBuild(c.id)}
			>
				<img src={c.iconImage} alt={c.name} class="h-12 w-12 rounded object-cover" />
				<span class="text-lg">{c.name}</span>
			</button>
		{/each}
	</div>
</div>
