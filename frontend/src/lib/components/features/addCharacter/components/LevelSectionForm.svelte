<script lang="ts">
	let { curr = $bindable(), target = $bindable() }: { curr: number; target: number } = $props();
</script>

<div class="flex flex-col gap-2 rounded-md p-2">
    <p class="text-xl font-medium text-gray-600">Level</p>
    <div class="flex items-center gap-3">
    </div>
</div>
