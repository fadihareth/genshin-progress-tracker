<script lang="ts">
	import type { CharacterBuild } from "$lib/models/CharacterBuild.svelte";
    import { charactersById } from "$lib/stores/data";
    import { IconX } from "@tabler/icons-svelte";
    import { CharacterSection, WeaponSection } from "./components";

    let { toggleShowOverlay, build }: { toggleShowOverlay: () => void; build: CharacterBuild } = $props();
    let character = $derived(charactersById[build.character]);
</script>

<div class="h-3/4 w-full max-w-2xl rounded shadow-lg text-genshin-white gradient {character.element.toLowerCase()}-bg p-3">
    <div class="relative flex flex-col h-full p-3 gap-4 overflow-y-scroll no-scrollbar border-genshin-gold/30 rounded-lg border-2">
        <button class="absolute top-2 right-2 rounded-full p-1 z-10 transition hover:bg-white/20" onclick={toggleShowOverlay}>
            <IconX />
        </button>
        <CharacterSection {build} />
        <WeaponSection {build} />
    </div>
</div>