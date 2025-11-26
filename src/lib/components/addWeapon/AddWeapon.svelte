<script lang="ts">
	import { weaponList } from '$lib/stores/data';

    let { onWeaponSelect }: { onWeaponSelect: (wId: number) => void } = $props();
	let search = $state('');

	function filtered() {
		const query = search.toLowerCase();
		return weaponList.filter((w) => w.name.toLowerCase().includes(query));
	}
</script>

<div
	class="relative h-3/4 w-full max-w-2xl overflow-x-hidden overflow-y-scroll rounded-lg bg-white p-6 shadow-lg"
>
	<h2 class="mb-4 text-xl">Select a Weapon</h2>
    <div>
        <input
            type="text"
            placeholder="Search weapons..."
            bind:value={search}
            class="mb-4 w-full rounded border px-3 py-2"
        />

        <div
            class="grid max-h-3/4 gap-2 overflow-y-auto"
            style="grid-template-columns: repeat(4, minmax(80px, 1fr));"
        >
            {#each filtered() as w}
                <button
                    class="flex flex-col items-center justify-evenly gap-1 rounded-xl bg-gray-100 p-2 hover:bg-gray-200"
                    onclick={() => onWeaponSelect(w.id)}
                >
                    <img src={w.image} alt={w.name} class="h-30 w-30 rounded object-cover" />
                    <p class="flex h-10 flex-col justify-around text-sm text-gray-800">{w.name}</p>
                </button>
            {/each}
        </div>
    </div>
</div>
