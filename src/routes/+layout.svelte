<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.ico';
	import appleTouchIcon from '$lib/assets/apple-touch-icon.png';

	let { children } = $props();
</script>

<svelte:head>
	<title>Genshin Build Progress</title>
	<meta name="description" content="Keep track of Genshin Impact character build progress" />
	<link rel="icon" href={favicon} />
	<link rel="apple-touch-icon" href={appleTouchIcon} />
</svelte:head>

{@render children?.()}
