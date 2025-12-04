<script lang="ts">
	let { title, children }: { title: string, children: any } = $props();
</script>

<div class="flex flex-col border-1 border-white/10 rounded-2xl">
    <p class="text-genshin-gold text-xl w-full bg-white/10 rounded-t-2xl py-2 px-4">{title}</p>
    {@render children?.()}
</div>
