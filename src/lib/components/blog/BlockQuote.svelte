<script>
  let { children, author = null, source = null, variant = "primary" } = $props();

  const variantStyles = {
    primary: {
      card: "bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-gray-700 shadow-lg shadow-gray-900/20",
      border: "border-l-4 border-orange-500",
      text: "text-gray-100",
      footer: "text-orange-400"
    },
    secondary: {
      card: "bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 shadow-lg shadow-orange-500/10",
      border: "border-l-4 border-orange-500",
      text: "text-gray-700",
      footer: "text-orange-600"
    },
    accent: {
      card: "bg-gradient-to-br from-slate-100 to-gray-100 border-2 border-gray-300 shadow-lg shadow-gray-400/20",
      border: "border-l-4 border-gray-600",
      text: "text-gray-700",
      footer: "text-gray-600"
    }
  };
</script>

<blockquote class="my-8 pl-6 pr-6 py-6 rounded-xl italic transition-all duration-300 hover:shadow-xl {variantStyles[variant].card} {variantStyles[variant].border}">
  <div class="text-lg {variantStyles[variant].text} leading-relaxed">
    {@render children()}
  </div>
  {#if author || source}
    <footer class="mt-4 text-sm not-italic {variantStyles[variant].footer} font-semibold">
      {#if author}
        <cite>— {author}</cite>
      {/if}
      {#if source}
        <span class="opacity-75">, {source}</span>
      {/if}
    </footer>
  {/if}
</blockquote>