<script>
  // Props for the stats card
  const {
    stats = [
      {
        value: "~4 Veckor",
        label: "Från Idé till MVP",
        colSpan: 1
      },
      {
        value: "100%",
        label: "Startup Fokuserad",
        colSpan: 1
      },
      {
        value: "24/7",
        label: "Support & Samarbete",
        colSpan: { default: 2, md: 1 }
      }
    ],
    gradientFrom = "blue-400",
    gradientTo = "cyan-400",
    borderColor = "blue-500/30",
    shadowColor = "blue-500/10"
  } = $props();
</script>

<div class="hero-card backdrop-blur-sm bg-gray-800/25 border border-{borderColor} shadow-lg shadow-{shadowColor} rounded-2xl p-6">
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
    {#each stats as stat}
      <div class="text-center {stat.colSpan && typeof stat.colSpan === 'object' ? `col-span-${stat.colSpan.default} md:col-span-${stat.colSpan.md}` : stat.colSpan ? `col-span-${stat.colSpan}` : ''}">
        <p class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-{gradientFrom} to-{gradientTo}">{stat.value}</p>
        <p class="text-gray-400 text-sm">{stat.label}</p>
      </div>
    {/each}
  </div>
</div> 