<script>
    import Navbar from '$lib/components/Navbar.svelte';
    import BlogLayout from '$lib/components/blog/BlogLayout.svelte';
    import PostList from '$lib/components/blog/PostList.svelte';
    import ParticleBackground from '$lib/components/ParticleBackground.svelte';

    let { data } = $props();

    let selectedCategory = $state('all');

    // Extract unique categories from posts and calculate counts
    let categories = $derived([...new Set(data.posts.flatMap(post => post.tags || []))]);

    // Calculate post counts for each category
    let categoryCounts = $derived(categories.reduce((acc, category) => {
        acc[category] = data.posts.filter(post => post.tags?.includes(category)).length;
        return acc;
    }, {}));

    // Create categories with counts, including 'all'
    let allCategories = $derived([
        { name: 'all', count: data.posts.length },
        ...categories.map(cat => ({ name: cat, count: categoryCounts[cat] }))
    ]);

    // Filter posts based on selected category
    let filteredPosts = $derived(selectedCategory === 'all'
        ? data.posts
        : data.posts.filter(post => post.tags?.includes(selectedCategory)));

    function selectCategory(category) {
        selectedCategory = category;
    }

    // Function to format tag names properly
    function formatTag(tag) {
        return tag
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
</script>

<svelte:head>
    <title>News & Updates - Axentra Agency</title>
    <meta name="description" content="Stay updated with the latest news and developments from Axentra Agency" />
    <meta name="keywords" content="Axentra Agency news, custom API development, freelance, consultation, backend development, API developer" />
</svelte:head>

<Navbar />
<ParticleBackground>

<div class="min-h-screen px-4 pt-32 pb-12">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <!-- Header Section -->
        <div class="mb-16 text-center">
            <h2 class="mb-6 text-3xl font-bold text-blue-800 md:text-4xl lg:text-5xl">
                News & Updates
            </h2>
            <p class="max-w-4xl mx-auto text-lg leading-relaxed text-gray-700 md:text-xl">
                Stay informed about the latest developments in Axentra Agency and API development.
            </p>
        </div>

        <!-- Category Filter -->
        <div class="mb-8">
            <div class="flex flex-wrap justify-center gap-3">
                {#each allCategories as category}
                    <button
                        onclick={() => selectCategory(category.name)}
                        class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 capitalize
                               {selectedCategory === category.name
                                   ? 'bg-blue-800 text-white shadow-md'
                                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'}"
                    >
                        {category.name === 'all' ? 'All Posts' : formatTag(category.name)}
                        <span class="ml-2 text-xs opacity-75">({category.count})</span>
                    </button>
                {/each}
            </div>
        </div>

        <!-- Blog Content -->
        <PostList posts={filteredPosts} />
    </div>
</div>

</ParticleBackground>