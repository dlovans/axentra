<script>
  import PostCard from './PostCard.svelte';

  let { posts = [], limit = null } = $props();

  let displayPosts = $derived(limit ? posts.slice(0, limit) : posts);
</script>

<div class="flex flex-col gap-12">
  {#if displayPosts.length > 0}
    <section class="all-posts">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each displayPosts as post (post.postName)}
          <PostCard {post} />
        {/each}
      </div>
    </section>
  {:else}
    <div class="text-center py-12">
      <h3 class="text-xl font-semibold text-text-primary mb-2">No posts yet</h3>
      <p class="text-text-secondary">
        Check back soon for the latest news and updates from the Bakk'a Republic.
      </p>
    </div>
  {/if}
</div>

