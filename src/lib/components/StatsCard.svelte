<script>
  // Props for the stats card
  const {
    stats = [
      {
        value: "Veckor",
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
  
  // Convert Tailwind color classes to CSS variables
  const getTailwindColor = (colorClass) => {
    const colorMap = {
      // Blue
      'blue-400': 'rgb(96, 165, 250)',
      'blue-500/30': 'rgba(59, 130, 246, 0.3)',
      'blue-500/10': 'rgba(59, 130, 246, 0.1)',
      
      // Cyan
      'cyan-400': 'rgb(34, 211, 238)'
    };
    
    return colorMap[colorClass] || colorClass;
  };
</script>

<div class="hero-card backdrop-blur-sm bg-gray-800/25 rounded-2xl p-6"
     style="border: 1px solid {getTailwindColor(borderColor)}; box-shadow: 0 10px 15px -3px {getTailwindColor(shadowColor)};">
  <div class="grid grid-cols-3 gap-2 sm:gap-4">
    {#each stats as stat}
      <div class="text-center">
        <p class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text"
           style="background-image: linear-gradient(to right, {getTailwindColor(gradientFrom)}, {getTailwindColor(gradientTo)});">{stat.value}</p>
        <p class="text-gray-400 text-xs sm:text-sm">{stat.label}</p>
      </div>
    {/each}
  </div>
</div> 