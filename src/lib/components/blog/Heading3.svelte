<script>
  let { children } = $props();
</script>

<h3 class="text-2xl md:text-3xl font-bold text-text-primary mt-10 mb-5">
  {@render children()}
</h3>
