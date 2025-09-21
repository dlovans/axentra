<script>
	import '../app.css';
	import { onMount } from 'svelte';

	let { children } = $props();
</script>

{@render children()}
