<script lang="ts">
	let { curr = $bindable(), target }: { curr: number; target: number } = $props();

	function allowOnlyNumbers(e: InputEvent) {
		if (e.inputType.startsWith('delete')) return;
		if (e.data && !/^\d+$/.test(e.data)) {
			e.preventDefault();
		}
	}

	function handleFocusOut() {
		if (curr == null) {
			curr = 1;
		}
	}

	function clampValues() {
		if (curr > target) {
			curr = target;
		}
	}

	function ascendLevel() {
		curr = Math.min(target, Math.floor(curr / 10) * 10 + 10);
	}
</script>

<div class={`flex flex-col items-center gap-1 ${curr == target && 'section-complete'}`}>
	<div class="relative">
		<input
			type="number"
			class="number-textfield z-10 h-20 w-20 rounded-full border-4 
                   border-gray-400 bg-gradient-to-br from-gray-100 to-gray-200 
                   text-center text-4xl font-bold text-gray-800 shadow-lg
                   focus:border-gray-500 focus:ring-4 focus:ring-gray-200
                   outline-none transition-all duration-300
                   [appearance:textfield]
                   [&::-webkit-outer-spin-button]:appearance-none
                   [&::-webkit-inner-spin-button]:appearance-none"
			bind:value={curr}
			min="1"
			max={target}
			onbeforeinput={allowOnlyNumbers}
			onblur={handleFocusOut}
			oninput={clampValues}
		/>

		<p class="absolute -right-4 -bottom-1 text-sm font-semibold text-gray-600 drop-shadow">/ {target}</p>
	</div>
	<p class="text-sm font-medium tracking-wide text-gray-700">Level</p>
</div>
