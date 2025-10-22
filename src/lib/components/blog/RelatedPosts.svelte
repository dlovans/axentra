<script>
  let {
    posts = [],
    title = "Related Posts",
    variant = "primary"
  } = $props();

  const variantStyles = {
    primary: {
      card: "bg-white border-2 border-gray-200 shadow-lg shadow-gray-500/10 hover:shadow-xl hover:shadow-gray-500/20",
      sectionTitle: "text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-600 to-orange-500",
      postTitle: "text-gray-800 hover:text-orange-600",
      tag: "bg-orange-100 text-orange-700 border-orange-200",
      desc: "text-gray-600"
    },
    secondary: {
      card: "bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 shadow-lg shadow-orange-500/10 hover:shadow-xl",
      sectionTitle: "text-orange-700",
      postTitle: "text-orange-700 hover:text-orange-800",
      tag: "bg-orange-200 text-orange-800 border-orange-300",
      desc: "text-gray-600"
    },
    accent: {
      card: "bg-gradient-to-br from-slate-100 via-gray-50 to-slate-100 border-2 border-gray-300 shadow-lg shadow-gray-400/20 hover:shadow-xl",
      sectionTitle: "text-slate-700",
      postTitle: "text-slate-700 hover:text-slate-800",
      tag: "bg-slate-200 text-slate-700 border-slate-300",
      desc: "text-slate-600"
    }
  };

  // Generate a consistent color based on post title - using Axentra colors
  function getPlaceholderColor(title) {
    const colors = [
      'bg-gradient-to-br from-gray-800 to-orange-500',
      'bg-gradient-to-br from-gray-700 to-gray-900',
      'bg-gradient-to-br from-blue-600 to-blue-800',
      'bg-gradient-to-br from-slate-600 to-slate-800',
      'bg-gradient-to-br from-orange-500 to-orange-700',
      'bg-gradient-to-br from-gray-600 to-orange-600'
    ];
    const index = title.length % colors.length;
    return colors[index];
  }

  function formatTag(tag) {
    return tag
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
</script>

{#if posts.length > 0}
  <section class="my-12">
    <h3 class="text-2xl md:text-3xl font-bold mb-8 {variantStyles[variant].sectionTitle}">{title}</h3>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each posts as post}
        <article class="group rounded-xl overflow-hidden transition-all duration-300 hover:translate-y-[-5px] {variantStyles[variant].card}">
          <!-- Post Image -->
          <div class="relative h-48 overflow-hidden bg-gray-100">
            {#if post.image}
              <img
                src={post.image}
                alt={post.title}
                class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
            {:else}
              <div class="w-full h-full {getPlaceholderColor(post.title)} flex items-center justify-center">
                <div class="text-white text-center p-4">
                  <div class="text-3xl font-bold mb-2">
                    {post.title.charAt(0).toUpperCase()}
                  </div>
                  <div class="text-sm opacity-90 font-medium">
                    {post.title.split(' ').slice(0, 2).join(' ')}
                  </div>
                </div>
              </div>
            {/if}
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>

          <!-- Post Content -->
          <div class="p-6">
            {#if post.tags && post.tags.length > 0}
              <div class="flex flex-wrap gap-2 mb-3">
                {#each post.tags.slice(0, 2) as tag}
                  <span class="px-3 py-1 text-xs font-semibold rounded-full border {variantStyles[variant].tag}">
                    {formatTag(tag)}
                  </span>
                {/each}
              </div>
            {/if}

            <h4 class="text-lg font-bold mb-3 line-clamp-2 leading-tight">
              <a href="/blog/{post.slug}" class="transition-colors duration-200 {variantStyles[variant].postTitle}">
                {post.title}
              </a>
            </h4>

            {#if post.description}
              <p class="text-sm mb-4 line-clamp-3 leading-relaxed {variantStyles[variant].desc}">
                {post.description}
              </p>
            {/if}

            <a
              href="/blog/{post.slug}"
              class="group/link inline-flex items-center text-sm font-semibold transition-colors duration-200 {variantStyles[variant].postTitle}"
            >
              <span>Read article</span>
              <svg class="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>
          </div>
        </article>
      {/each}
    </div>
  </section>
{/if}
