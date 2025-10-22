<script>
  let {
    previousPost = null,
    nextPost = null,
    variant = "primary"
  } = $props();

  const variantStyles = {
    primary: {
      card: "bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-gray-700 shadow-lg shadow-gray-900/20 hover:shadow-xl",
      title: "text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-orange-400",
      desc: "text-gray-300",
      label: "text-orange-400",
      icon: "text-orange-500"
    },
    secondary: {
      card: "bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 shadow-lg shadow-orange-500/10 hover:shadow-xl",
      title: "text-orange-700",
      desc: "text-gray-600",
      label: "text-orange-600",
      icon: "text-orange-500"
    },
    accent: {
      card: "bg-gradient-to-br from-slate-100 via-gray-50 to-slate-100 border-2 border-gray-300 shadow-lg shadow-gray-400/20 hover:shadow-xl",
      title: "text-slate-700",
      desc: "text-slate-600",
      label: "text-slate-600",
      icon: "text-slate-600"
    }
  };
</script>

<nav class="my-12 py-8 border-t-2 border-b-2 border-gray-300">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Previous Post -->
    {#if previousPost}
      <a
        href="/blog/{previousPost.slug}"
        class="group rounded-xl p-6 transition-all duration-300 hover:scale-105 {variantStyles[variant].card}"
      >
        <div class="flex items-start gap-4">
          <div class="mt-1 group-hover:-translate-x-1 transition-transform duration-300 {variantStyles[variant].icon}">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </div>
          <div class="flex-1">
            <div class="text-xs font-bold uppercase tracking-wider mb-2 {variantStyles[variant].label}">Previous Post</div>
            <h4 class="text-lg font-bold mb-2 {variantStyles[variant].title}">
              {previousPost.title}
            </h4>
            {#if previousPost.description}
              <p class="text-sm mt-2 line-clamp-2 {variantStyles[variant].desc}">{previousPost.description}</p>
            {/if}
          </div>
        </div>
      </a>
    {:else}
      <div class="hidden md:block"></div>
    {/if}

    <!-- Next Post -->
    {#if nextPost}
      <a
        href="/blog/{nextPost.slug}"
        class="group rounded-xl p-6 transition-all duration-300 hover:scale-105 {variantStyles[variant].card}"
      >
        <div class="flex items-start gap-4">
          <div class="flex-1 text-right">
            <div class="text-xs font-bold uppercase tracking-wider mb-2 {variantStyles[variant].label}">Next Post</div>
            <h4 class="text-lg font-bold mb-2 {variantStyles[variant].title}">
              {nextPost.title}
            </h4>
            {#if nextPost.description}
              <p class="text-sm mt-2 line-clamp-2 {variantStyles[variant].desc}">{nextPost.description}</p>
            {/if}
          </div>
          <div class="mt-1 group-hover:translate-x-1 transition-transform duration-300 {variantStyles[variant].icon}">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </a>
    {/if}
  </div>
</nav>
