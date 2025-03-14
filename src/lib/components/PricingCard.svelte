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
  
  // Convert Tailwind color classes to CSS variables
  const getTailwindColor = (colorClass) => {
    const colorMap = {
      // Emerald
      'emerald-400': 'rgb(52, 211, 153)',
      'emerald-500/30': 'rgba(16, 185, 129, 0.3)',
      'emerald-500/40': 'rgba(16, 185, 129, 0.4)',
      'emerald-500/10': 'rgba(16, 185, 129, 0.1)',
      
      // Teal
      'teal-400': 'rgb(45, 212, 191)',
      'teal-500/30': 'rgba(20, 184, 166, 0.3)',
      'teal-500/40': 'rgba(20, 184, 166, 0.4)',
      'teal-500/10': 'rgba(20, 184, 166, 0.1)',
      
      // Blue
      'blue-400': 'rgb(96, 165, 250)',
      'blue-500/30': 'rgba(59, 130, 246, 0.3)',
      'blue-500/40': 'rgba(59, 130, 246, 0.4)',
      'blue-500/10': 'rgba(59, 130, 246, 0.1)',
      
      // Cyan
      'cyan-400': 'rgb(34, 211, 238)',
      'cyan-500/30': 'rgba(6, 182, 212, 0.3)',
      'cyan-500/40': 'rgba(6, 182, 212, 0.4)',
      'cyan-500/10': 'rgba(6, 182, 212, 0.1)',
      
      // Purple
      'purple-400': 'rgb(192, 132, 252)',
      'purple-500': 'rgb(168, 85, 247)',
      'purple-500/30': 'rgba(168, 85, 247, 0.3)',
      'purple-500/40': 'rgba(168, 85, 247, 0.4)',
      'purple-500/10': 'rgba(168, 85, 247, 0.1)',
      
      // Fuchsia
      'fuchsia-400': 'rgb(232, 121, 249)',
      'fuchsia-500': 'rgb(217, 70, 239)',
      'fuchsia-500/30': 'rgba(217, 70, 239, 0.3)',
      'fuchsia-500/40': 'rgba(217, 70, 239, 0.4)',
      'fuchsia-500/10': 'rgba(217, 70, 239, 0.1)',
      
      // Rose
      'rose-400': 'rgb(251, 113, 133)',
      'rose-500/30': 'rgba(244, 63, 94, 0.3)',
      'rose-500/40': 'rgba(244, 63, 94, 0.4)',
      'rose-500/10': 'rgba(244, 63, 94, 0.1)',
      
      // Red
      'red-400': 'rgb(248, 113, 113)',
      'red-500/30': 'rgba(239, 68, 68, 0.3)',
      'red-500/40': 'rgba(239, 68, 68, 0.4)',
      'red-500/10': 'rgba(239, 68, 68, 0.1)',
    };
    
    return colorMap[colorClass] || colorClass;
  };
</script>

<div class="pricing-card relative backdrop-blur-sm bg-gray-800/35 rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px]"
     style="border: 1px solid {getTailwindColor(borderColor)}; box-shadow: 0 10px 15px -3px {getTailwindColor(shadowColor)};">
  {#if isRecommended}
    <!-- Recommended Tag -->
    <div class="absolute -top-3 right-4 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
         style="background-image: linear-gradient(to right, {getTailwindColor('purple-500')}, {getTailwindColor('fuchsia-500')});">
      Rekommenderad
    </div>
  {/if}
  
  <div class="flex flex-col items-center mb-6">
    <div class="rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4"
         style="background-color: {getTailwindColor(iconBgColor)}; border: 1px solid {getTailwindColor(iconBorderColor)};">
      <svg class="w-8 h-8" style="color: {getTailwindColor(iconTextColor)};" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d={iconPath}></path>
      </svg>
    </div>
    <h3 class="text-xl font-bold text-transparent bg-clip-text mb-1"
        style="background-image: linear-gradient(to right, {getTailwindColor(gradientFrom)}, {getTailwindColor(gradientTo)});">{title}</h3>
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
        <div class="flex-shrink-0 mt-0.5 mr-2">
          <svg class="w-5 h-5" style="color: {getTailwindColor(iconTextColor)};" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <span class="text-gray-300">{feature}</span>
      </li>
    {/each}
  </ul>
</div> 