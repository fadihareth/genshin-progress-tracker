<script lang="ts">
	import { onMount } from 'svelte';

	let { src, alt = '', spinnerSize = 24, className = '', placeholder = null } = $props();

	let loading: boolean = $state(true);
	let imgEl: HTMLImageElement;
	let actualSrc: string = $state('');

	onMount(() => {
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				actualSrc = src;
			});
		});
	});

	function handleLoad() {
		loading = false;
	}
</script>

<div class={`inline-block ${className}`}>
	{#if loading}
		<div class="inset-0 flex h-full w-full items-center justify-center">
			<div class="spinner" style={`width:${spinnerSize}px; height:${spinnerSize}px;`}></div>
		</div>
		{#if placeholder}
			<img src={placeholder} alt="Placeholder" class="w-full object-cover" />
		{/if}
	{/if}

	<img
		bind:this={imgEl}
		src={actualSrc}
		{alt}
		class={`${loading ? 'opacity-0' : 'opacity-100'} h-full w-full object-cover transition-opacity duration-300`}
		loading="lazy"
		decoding="async"
		onload={handleLoad}
	/>
</div>

<style>
	.spinner {
		border: 3px solid rgba(0, 0, 0, 0.2);
		border-top-color: rgba(0, 0, 0, 0.6);
		border-radius: 50%;
		animation: spin 0.7s linear infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
