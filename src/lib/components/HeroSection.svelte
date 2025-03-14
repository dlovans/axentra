<script>
  import StatsCard from './StatsCard.svelte';
  import FeatureCardGroup from './FeatureCardGroup.svelte';
  
  // Props for the hero section
  const {
    title = "Lansera Din Startup Snabbare",
    subtitle = "Vi bygger marknadsfärdiga MVPs på veckor, inte månader. Förvandla din vision till verklighet med vår snabba utvecklingsmetod.",
    titleGradientFrom = "emerald-400",
    titleGradientVia = "teal-400",
    titleGradientTo = "cyan-400",
    borderColor = "emerald-500/30",
    shadowColor = "emerald-500/10"
  } = $props();
  
  // Convert Tailwind color classes to CSS variables
  const getTailwindColor = (colorClass) => {
    const colorMap = {
      // Emerald
      'emerald-400': 'rgb(52, 211, 153)',
      'emerald-500/30': 'rgba(16, 185, 129, 0.3)',
      'emerald-500/10': 'rgba(16, 185, 129, 0.1)',
      
      // Teal
      'teal-400': 'rgb(45, 212, 191)',
      
      // Cyan
      'cyan-400': 'rgb(34, 211, 238)',
    };
    
    return colorMap[colorClass] || colorClass;
  };
</script>

<div class="relative container mx-auto px-4 pt-28">
  <!-- Hero Section -->
  <div class="flex flex-col lg:flex-row items-center justify-between gap-8 py-16">
    <!-- Left Column - Main Content -->
    <div class="w-full lg:w-1/2 space-y-8">
      <!-- Main Headline -->
      <div class="hero-card backdrop-blur-sm bg-gray-800/25 rounded-2xl p-6 md:p-8"
           style="border: 1px solid {getTailwindColor(borderColor)}; box-shadow: 0 10px 15px -3px {getTailwindColor(shadowColor)};">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          <span class="text-transparent bg-clip-text"
                style="background-image: linear-gradient(to right, {getTailwindColor(titleGradientFrom)}, {getTailwindColor(titleGradientVia)}, {getTailwindColor(titleGradientTo)});">
            {title}
          </span>
        </h2>
        <p class="text-gray-300 text-lg md:text-xl">
          {subtitle}
        </p>
      </div>
      
      <!-- Stats Card -->
      <StatsCard />
    </div>
    
    <!-- Right Column - Feature Cards -->
    <div class="w-full lg:w-1/2">
      <FeatureCardGroup />
    </div>
  </div>
</div> 