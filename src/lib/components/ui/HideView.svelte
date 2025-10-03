<script lang="ts">
	let { children, isVisible = $bindable(), title } = $props();
	function toggleVisible() {
		isVisible = !isVisible;
	}
</script>

<div class="flex flex-col gap-2 rounded-md p-2" style:opacity={isVisible ? '100%' : '25%'}>
	<div class="flex justify-between">
		<p class="text-xl font-medium text-gray-600">{title}</p>
		<button class="rounded-full p-2 transition hover:bg-gray-100" onclick={toggleVisible}>
			<img
				src={`/src/lib/assets/ui/${isVisible ? 'Hide' : 'View'}.svg`}
				alt="Hide Button"
				class="h-4 w-4"
			/>
		</button>
	</div>
	{@render children()}
</div>
