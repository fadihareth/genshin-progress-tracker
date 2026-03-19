<script lang="ts">
    let { open = $bindable(), onClose, children } = $props();
</script>

{#if open}
    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
	<div
        class="fixed inset-0 z-100 flex items-center justify-center bg-black/50"
        onclick={(e) => e.target === e.currentTarget && onClose()}
    >
		{@render children?.()}
	</div>
{/if}
