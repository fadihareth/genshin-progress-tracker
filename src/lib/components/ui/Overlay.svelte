<script lang="ts">
    let { open = $bindable(), onClose, children } = $props();
</script>

{#if open}
	<button
        class="fixed inset-0 z-100 flex items-center justify-center bg-black/50"
        onclick={(e) => e.target === e.currentTarget && onClose()}
    >
		{@render children?.()}
	</button>
{/if}
