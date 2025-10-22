<script>
  import PostCard from './PostCard.svelte';

  let {
    posts = [],
    title = "Related Posts",
    variant = "primary"
  } = $props();

  const variantStyles = {
    primary: {
      sectionTitle: "text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-600 to-orange-500"
    },
    secondary: {
      sectionTitle: "text-orange-700"
    },
    accent: {
      sectionTitle: "text-slate-700"
    }
  };

  // Normalize posts to use postName (PostCard expects postName, not slug)
  const normalizedPosts = posts.map(post => ({
    ...post,
    postName: post.slug || post.postName
  }));
</script>

{#if posts.length > 0}
  <section class="my-12">
    <h3 class="text-2xl md:text-3xl font-bold mb-8 {variantStyles[variant].sectionTitle}">{title}</h3>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each normalizedPosts as post}
        <PostCard {post} />
      {/each}
    </div>
  </section>
{/if}
