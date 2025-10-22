<script>
  import { formatDate } from '$lib/utils/posts.js';
  import { page } from '$app/stores';
  import SocialShare from './SocialShare.svelte';

  let { post, content } = $props();

  // Use post image if it exists, otherwise fallback to website branding
  // Convert to absolute URL for social media sharing
  let shareImage = $derived.by(() => {
    const imagePath = post.image || '/favicon.png';
    const baseUrl = $page.url.origin;
    return imagePath.startsWith('http') ? imagePath : `${baseUrl}${imagePath}`;
  });

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

<svelte:head>
  <title>{post.title} - Bakk'a Republic</title>
  <meta name="description" content={post.description} />

  <!-- Open Graph -->
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Bakk'a Republic" />
  <meta property="og:url" content={$page.url.href} />
  <meta property="og:title" content={post.title} />
  <meta property="og:description" content={post.description} />
  <meta property="og:image" content={shareImage} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content={post.title} />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={$page.url.href} />
  <meta name="twitter:title" content={post.title} />
  <meta name="twitter:description" content={post.description} />
  <meta name="twitter:image" content={shareImage} />
  <meta name="twitter:image:alt" content={post.title} />
</svelte:head>

<article class="min-h-screen">
  <div class="max-w-4xl px-4 py-8 mx-auto">
    <nav class="mb-8">
      <a href="/blog" class="inline-flex items-center font-medium text-blue-800 transition-colors duration-200 hover:text-blue-900">
        ← Back to Blog
      </a>
    </nav>

    <header class="mb-12">
      {#if post.tags && post.tags.length > 0}
        <div class="flex flex-wrap gap-2 mb-4">
          {#each post.tags as tag}
            <span class="px-3 py-1 text-sm font-medium text-blue-800 rounded-full bg-blue-800/10">{formatTag(tag)}</span>
          {/each}
        </div>
      {/if}

      <h2 class="mb-6 text-4xl font-bold leading-tight md:text-5xl text-text-primary">{post.title}</h2>

      <div class="flex items-center mb-8 text-text-tertiary">
        <time class="font-medium" datetime={post.date}>
          {formatDate(post.date)}
        </time>
        {#if post.author}
          <span class="mx-3">•</span>
          <span class="font-medium">{post.author}</span>
        {/if}
      </div>

      <div class="overflow-hidden aspect-video rounded-xl">
        {#if post.image}
          <img src={post.image} alt={post.title} class="object-contain w-full h-full rounded-xl" />
        {:else}
          <div class="w-full h-full {getPlaceholderColor(post.title)} flex items-center justify-center">
            <div class="p-8 text-center text-white">
              <div class="mb-4 text-6xl font-bold">
                {post.title.charAt(0).toUpperCase()}
              </div>
              <div class="text-xl opacity-75">
                {post.title.split(' ').slice(0, 3).join(' ')}
              </div>
            </div>
          </div>
        {/if}
      </div>
    </header>

    <div class="prose prose-lg max-w-none
      prose-headings:text-text-primary prose-headings:font-bold
      prose-p:text-text-secondary prose-p:text-lg prose-p:leading-relaxed
      prose-a:text-blue-800 hover:prose-a:text-blue-900
      prose-strong:text-text-primary prose-strong:font-bold
      prose-ul:text-text-secondary prose-ul:mb-6
      prose-ol:text-text-secondary prose-ol:mb-6
      prose-li:mb-2
      prose-blockquote:border-l-blue-800 prose-blockquote:text-text-secondary
      prose-code:text-blue-800 prose-code:bg-blue-800/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
      [&_p]:mb-6
      [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-text-primary [&_h2]:mt-8 [&_h2]:mb-4
      [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-text-primary [&_h3]:mt-6 [&_h3]:mb-3">
      {@render content()}
    </div>

    <footer class="pt-8 mt-12 border-t border-border">
    </footer>
  </div>

  <!-- Fixed Social Share (desktop only) -->
  <SocialShare position="fixed" title={post.title} description={post.description} />
</article>