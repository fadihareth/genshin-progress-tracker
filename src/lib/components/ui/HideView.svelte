<script lang="ts">
	let { children, isVisible = $bindable() } = $props();
	let isHovered = $state(false);

	function handleMouseEnter() {
		isHovered = true;
	}
	function handleMouseLeave() {
		isHovered = false;
	}
	function toggleVisible() {
		isVisible = !isVisible;
	}
</script>

{#if isVisible}
	<div
		aria-hidden="true"
		class="flex justify-between rounded-md p-2 shadow-md"
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
	>
		{@render children()}
		{#if isHovered}
			<button class="rounded-full p-2 transition hover:bg-gray-100" onclick={toggleVisible}>
				<img src="/src/lib/assets/ui/close.svg" alt="Hide Button" class="h-3 w-3" />
			</button>
		{/if}
	</div>
{/if}
