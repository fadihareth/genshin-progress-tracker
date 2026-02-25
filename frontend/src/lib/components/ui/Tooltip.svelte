<script lang="ts">
	import { tick } from "svelte";

	let { text, offset = 12, children }: { text: string; offset?: number; children: any } = $props();

	let visible = $state(false);
	let x = $state(0);
	let y = $state(0);
	let tooltipEl: HTMLDivElement | null = $state(null);

	let posX = $state(0);
	let posY = $state(0);

	function handleMouseMove(e: MouseEvent) {
		x = e.clientX;
		y = e.clientY;
		updatePosition();
	}

	async function show() {
		visible = true;
		await tick(); // wait until tooltip is in DOM
		updatePosition();
	}

	function hide() {
		visible = false;
	}

	function updatePosition() {
		if (!tooltipEl) return;

		const rect = tooltipEl.getBoundingClientRect();
		const vw = window.innerWidth;
		const vh = window.innerHeight;

		let newX = x + offset;
		let newY = y + offset;

		// Flip horizontally if overflowing right
		if (newX + rect.width > vw) {
			newX = x - rect.width - offset;
		}

		// Flip vertically if overflowing bottom
		if (newY + rect.height > vh) {
			newY = y - rect.height - offset;
		}

		posX = newX;
		posY = newY;
	}
</script>

<div
	class="inline-block"
	role="tooltip"
	onmouseenter={show}
	onmouseleave={hide}
	onmousemove={handleMouseMove}
>
	{@render children()}

	{#if visible}
		<div
			bind:this={tooltipEl}
			class="fixed z-50 pointer-events-none bg-gray-900 text-white text-sm px-3 py-1 rounded shadow-lg whitespace-nowrap"
			style={`top:${posY}px; left:${posX}px;`}
		>
			{text}
		</div>
	{/if}
</div>