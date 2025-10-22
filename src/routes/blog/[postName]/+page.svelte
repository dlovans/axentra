<script>
  import Navbar from '$lib/components/Navbar.svelte';
  import PostDetail from '$lib/components/blog/PostDetail.svelte';
  import ParticleBackground from '$lib/components/ParticleBackground.svelte';
  import { page } from '$app/stores';

  let { data } = $props();

  // Dynamically import the post content
  let Content = $state(null);

  $effect(() => {
    const postName = data.post.postName;

    // Try importing .svx first, then .md
    import(`../../../content/posts/${postName}.svx`)
      .then(module => {
        Content = module.default;
      })
      .catch(() => {
        import(`../../../content/posts/${postName}.md`)
          .then(module => {
            Content = module.default;
          })
          .catch(err => {
            console.error('Failed to load post content:', err);
          });
      });
  });
</script>

<Navbar />

<ParticleBackground>
<div class="min-h-screen px-4 pt-32 pb-12">
  {#if Content}
    <PostDetail post={data.post} content={Content} />
    <div class="max-w-4xl px-4 mx-auto mt-8">
      <a href="/blog" class="inline-flex items-center font-medium text-blue-800 transition-colors duration-200 hover:text-blue-900">
        ← Back to Blog
      </a>
    </div>
  {:else}
    <div class="max-w-4xl px-4 py-8 mx-auto">
      <p class="text-center">Loading...</p>
    </div>
  {/if}
</div>
</ParticleBackground>