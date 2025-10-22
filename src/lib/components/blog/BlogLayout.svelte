<script>
  let {
    title = 'Blog',
    description = 'Latest news and updates from the Axentra Agency',
    showBackLink = false,
    backLinkText = 'Back to Blog',
    backLinkHref = '/blog',
    children
  } = $props();
</script>

<svelte:head>
  <title>{title} - Axentra Agency</title>
  <meta name="description" content={description} />

  <!-- Open Graph -->
  <meta property="og:title" content="{title} - Axentra Agency" />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="website" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{title} - Axentra Agency" />
  <meta name="twitter:description" content={description} />
</svelte:head>

<div class="min-h-screen">
  <div class="max-w-6xl px-4 py-8 mx-auto">
    {#if showBackLink}
      <nav class="mb-6">
        <a href={backLinkHref} class="inline-flex items-center font-medium text-blue-800 transition-colors duration-200 hover:text-blue-900">
          ← {backLinkText}
        </a>
      </nav>
    {/if}

    <header class="mb-12 text-center">
      <h2 class="mb-4 text-4xl font-bold md:text-5xl text-text-primary">{title}</h2>
      <p class="max-w-2xl mx-auto text-lg text-text-secondary">{description}</p>
    </header>

    <main class="flex flex-col gap-8">
      {@render children()}
    </main>
  </div>
</div>

