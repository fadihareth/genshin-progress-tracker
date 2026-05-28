<script lang="ts">
	import { AddCharacter, MenuButton, Overlay } from '$lib/components';
	import { IconPlus, IconSettings } from '@tabler/icons-svelte';
	import { hideScrollbar } from '$lib/util/hideScrollbar';
    import { settingsState } from '$lib/stores/state.svelte';
	import { authState, clearAuth } from '$lib/stores/auth.svelte';

	let showOverlay = $state(false);
	function toggleShowOverlay() {
		hideScrollbar(showOverlay);
		showOverlay = !showOverlay;
	}

	function onSelect(option: String) {
		switch (option) {
            case 'Hide Completed': {
                settingsState.hideCompleted = !settingsState.hideCompleted;
                break;
            }
            case 'Show Completed': {
                settingsState.hideCompleted = !settingsState.hideCompleted;
                break;
            }
			case 'Sign out': {
				clearAuth();
				break;
			}
			default: {
				console.log('Invalid option');
			}
		}
	}
</script>

<header
	class="sticky top-0 z-50 flex items-center justify-between bg-genshin-blue py-4 px-6 shadow-sm"
>
	<h1 class="md:text-2xl text-genshin-gold">Genshin Build Progress</h1>
	<div class="flex items-center gap-3">
		<button
			onclick={toggleShowOverlay}
			class="max-md:text-sm flex items-center gap-1 rounded-md bg-genshin-gold p-2 px-4 text-genshin-blue transition hover:bg-genshin-gold/50"
			aria-label="Add character"
		>
			<IconPlus class="w-[1em] h-[1em]" stroke={3} /> Add Character
		</button>

		{#if authState.email}
			<MenuButton
				options={[settingsState.hideCompleted ? 'Show Completed' : 'Hide Completed', 'Sign out']}
				label={authState.email}
				{onSelect}
				menuPlacement='mt-4'
				buttonClass="text-xl md:text-2xl rounded-md bg-genshin-gold p-2 text-genshin-blue transition hover:bg-genshin-gold/50"
			>
				<IconSettings class="w-[1em] h-[1em]" stroke={3} />
			</MenuButton>
		{/if}
	</div>
</header>

<Overlay bind:open={showOverlay} onClose={toggleShowOverlay}>
	<AddCharacter {toggleShowOverlay} />
</Overlay>
