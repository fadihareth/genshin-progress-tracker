<script lang="ts">
	import getCachedImage from '$lib/util/imageCache';

	let { src, alt = '', spinnerSize = 24, className = '' } = $props();

	let loading: boolean = $state(true);
	let actualSrc: string = $state('');

	$effect(() => {
		if (!src) return;

		loading = true;

		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				getCachedImage(src).then((res) => {
					actualSrc = res;
				});
			});
		});
	});

	function handleLoad() {
		loading = false;
	}
</script>

{#key src}
	<div class={`inline-block ${className}`}>
		{#if loading}
			<div class="inset-0 flex h-full w-full items-center justify-center">
				<div class="spinner" style={`width:${spinnerSize}px; height:${spinnerSize}px;`}></div>
			</div>
		{/if}
		
		<img
			src={actualSrc}
			{alt}
			class={`${loading ? 'opacity-0' : 'opacity-100'} h-full w-full object-cover fade`}
			loading="lazy"
			decoding="async"
			onload={handleLoad}
		/>
	</div>
{/key}

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
