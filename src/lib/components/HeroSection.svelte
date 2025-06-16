<script>
  import StatsCard from '$lib/components/StatsCard.svelte';
  import FeatureCardGroup from '$lib/components/FeatureCardGroup.svelte';
  
  // Props for the hero section
  const {
    title = "Launch Your Startup Faster",
    subtitle = "We build market-ready MVPs in weeks, not months. Transform your vision into reality with our rapid development approach.",
    ctaText = "Get Started",
    ctaSecondaryText = "View Our Process"
  } = $props();
</script>

<div id="hero" class="relative container mx-auto px-4 pt-28">
  <!-- Hero Section -->
  <div class="flex flex-col lg:flex-row items-center justify-between gap-12 py-16">
    <!-- Left Column - Main Content -->
    <div class="w-full lg:w-1/2 space-y-8">
      <!-- Main Headline -->
      <div class="space-y-6">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-600 to-orange-500">
            {title}
          </span>
        </h1>
        <p class="text-gray-600 text-lg md:text-xl leading-relaxed max-w-lg">
          {subtitle}
        </p>
        
        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 pt-4">
          <button class="px-8 py-3 bg-gradient-to-r from-gray-800 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transform hover:scale-105 transition-all duration-300">
            {ctaText}
          </button>
          <button class="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
            {ctaSecondaryText}
          </button>
        </div>
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