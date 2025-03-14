<script>
  // Props for the hero card
  const {
    title = "",
    description = "",
    gradientFrom = "emerald-400",
    gradientVia = "teal-400",
    gradientTo = "cyan-400",
    borderColor = "emerald-500/30",
    shadowColor = "emerald-500/10",
    isStatsCard = false,
    stats = []
  } = $props();
</script>

<div class="hero-card backdrop-blur-sm bg-gray-800/25 border border-{borderColor} shadow-lg shadow-{shadowColor} rounded-2xl p-6 md:p-8">
  {#if !isStatsCard}
    <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
      <span class="text-transparent bg-clip-text bg-gradient-to-r from-{gradientFrom} via-{gradientVia} to-{gradientTo}">
        {title}
      </span>
    </h2>
    <p class="text-gray-300 text-lg md:text-xl">
      {description}
    </p>
  {:else}
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      {#each stats as stat}
        <div class="text-center {stat.colSpan ? 'col-span-' + stat.colSpan : ''}">
          <p class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-{gradientFrom} to-{gradientTo}">{stat.value}</p>
          <p class="text-gray-400 text-sm">{stat.label}</p>
        </div>
      {/each}
    </div>
  {/if}
</div> 