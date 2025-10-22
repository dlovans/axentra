<script>
  import { formatDate } from '$lib/utils/posts.js';

  let { post } = $props();

  // Function to format tag names properly
  function formatTag(tag) {
    return tag
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Generate a consistent color based on post title
  function getPlaceholderColor(title) {
    const colors = [
      'bg-gradient-to-br from-blue-500 to-blue-700',
      'bg-gradient-to-br from-green-500 to-green-700',
      'bg-gradient-to-br from-purple-500 to-purple-700',
      'bg-gradient-to-br from-orange-500 to-orange-700',
      'bg-gradient-to-br from-red-500 to-red-700',
      'bg-gradient-to-br from-indigo-500 to-indigo-700',
      'bg-gradient-to-br from-pink-500 to-pink-700',
      'bg-gradient-to-br from-teal-500 to-teal-700'
    ];
    const index = title.length % colors.length;
    return colors[index];
  }
</script>

<article class="overflow-hidden transition-all duration-300 border bg-surface border-border rounded-xl hover:shadow-lg hover:border-blue-800/30">
  <div class="overflow-hidden aspect-video bg-gray-50 flex items-center justify-center">
    {#if post.image}
      <img src={post.image} alt={post.title} loading="lazy" class="object-cover w-full h-full" />
    {:else}
      <div class="w-full h-full {getPlaceholderColor(post.title)} flex items-center justify-center">
        <div class="p-6 text-center text-white">
          <div class="mb-2 text-3xl font-bold">
            {post.title.charAt(0).toUpperCase()}
          </div>
          <div class="text-sm opacity-75">
            {post.title.split(' ').slice(0, 2).join(' ')}
          </div>
        </div>
      </div>
    {/if}
  </div>

  <div class="p-6">
    {#if post.tags && post.tags.length > 0}
      <div class="flex flex-wrap gap-2 mb-3">
        {#each post.tags as tag}
          <span class="px-2 py-1 text-xs font-medium text-blue-800 rounded-full bg-blue-800/10">{formatTag(tag)}</span>
        {/each}
      </div>
    {/if}

    <h3 class="text-xl font-bold mb-3 text-text-primary min-h-[3.5rem]">
      <a href="/blog/{post.postName}" class="transition-colors duration-200 hover:text-blue-800">
        {post.title}
      </a>
    </h3>

    <p class="text-text-secondary mb-4 line-clamp-3 min-h-[4.5rem]">
      {post.description}
    </p>

    <div class="flex items-center mb-4 text-sm text-text-tertiary">
      <span class="font-medium">{formatDate(post.date)}</span>
      {#if post.author}
        <span class="mx-2">•</span>
        <span class="font-medium">{post.author}</span>
      {/if}
    </div>

    <a href="/blog/{post.postName}" class="inline-flex items-center font-medium text-blue-800 transition-colors duration-200 hover:text-blue-900">
      Read more →
    </a>
  </div>
</article>