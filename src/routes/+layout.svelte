<script>
	import '../app.css';
	import { pageTitle, setPageTitle } from '$lib/stores/page-title.js';
	import { onMount } from 'svelte';

	let { children } = $props();
	
	// Set default title on mount
	onMount(() => {
		setPageTitle();
	});
</script>

<svelte:head>
	<title>{$pageTitle}</title>
</svelte:head>

{@render children()}
