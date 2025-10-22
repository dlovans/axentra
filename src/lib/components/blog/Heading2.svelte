<script>
  let { children } = $props();
</script>

<h2 class="text-3xl md:text-4xl font-bold text-text-primary mt-12 mb-6">
  {@render children()}
</h2>
