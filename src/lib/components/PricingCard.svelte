<script>
  // Props for the pricing card
  const {
    title = "",
    price = "",
    unit = "",
    features = [],
    iconPath = "",
    isRecommended = false,
    gradientFrom = "emerald-400",
    gradientTo = "teal-400",
    borderColor = "emerald-500/30",
    shadowColor = "emerald-500/10",
    iconBgColor = "emerald-500/30",
    iconBorderColor = "emerald-500/40",
    iconTextColor = "emerald-400"
  } = $props();
</script>

<div class="pricing-card relative backdrop-blur-sm bg-gray-800/35 border border-{borderColor} shadow-lg shadow-{shadowColor} rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px]">
  {#if isRecommended}
    <!-- Recommended Tag -->
    <div class="absolute -top-3 right-4 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
      Rekommenderad
    </div>
  {/if}
  
  <div class="flex flex-col items-center mb-6">
    <div class="rounded-full bg-{iconBgColor} p-4 w-16 h-16 flex items-center justify-center border border-{iconBorderColor} mb-4">
      <svg class="w-8 h-8 text-{iconTextColor}" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d={iconPath}></path>
      </svg>
    </div>
    <h3 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-{gradientFrom} to-{gradientTo} mb-1">{title}</h3>
    <div class="flex items-baseline">
      {#if price.toLowerCase() === 'equity'}
        <span class="text-5xl font-bold text-white">{price}</span>
      {:else}
        <span class="text-3xl font-bold text-white">SEK</span>
        <span class="text-5xl font-bold text-white mx-1">{price}</span>
        <span class="text-xl text-gray-400">{unit}</span>
      {/if}
    </div>
  </div>
  
  <ul class="space-y-3">
    {#each features as feature}
      <li class="flex items-start">
        <svg class="w-5 h-5 text-{iconTextColor} mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-gray-300">{feature}</span>
      </li>
    {/each}
  </ul>
</div> 