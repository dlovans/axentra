<script>
  let { children, author = null, source = null } = $props();
</script>

<blockquote class="my-8 pl-6 pr-4 py-4 border-l-4 border-blue-800 bg-blue-50 rounded-r-lg italic">
  <div class="text-lg text-gray-800 leading-relaxed">
    {@render children()}
  </div>
  {#if author || source}
    <footer class="mt-4 text-sm text-gray-600 not-italic">
      {#if author}
        <cite class="font-semibold">— {author}</cite>
      {/if}
      {#if source}
        <span class="text-gray-500">, {source}</span>
      {/if}
    </footer>
  {/if}
</blockquote>