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
</script>

<div class="relative container mx-auto px-4 pt-28">
  <!-- Hero Section -->
  <div class="flex flex-col lg:flex-row items-center justify-between gap-8 py-16">
    <!-- Left Column - Main Content -->
    <div class="w-full lg:w-1/2 space-y-8">
      <!-- Main Headline -->
      <div class="hero-card backdrop-blur-sm bg-gray-800/25 border border-{borderColor} shadow-lg shadow-{shadowColor} rounded-2xl p-6 md:p-8">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-{titleGradientFrom} via-{titleGradientVia} to-{titleGradientTo}">
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