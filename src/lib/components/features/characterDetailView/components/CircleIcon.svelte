<script lang="ts">
	let { icon, alt, tags }: { icon?: string; alt?: string; tags?: string } = $props();
</script>

<div class="h-15 w-15 items-center justify-center rounded-full border-2 shadow-md">
	<img src={icon} {alt} class={`pointer-events-none object-contain select-none ${tags}`} />
</div>
