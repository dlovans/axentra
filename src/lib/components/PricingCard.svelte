<script>
  // Props for the pricing card
  const {
    title = "",
    price = "",
    unit = "",
    features = [],
    iconPath = "",
    isRecommended = false,
    variant = "primary" // primary, secondary, accent
  } = $props();
  
  const variantStyles = {
    primary: {
      card: "bg-white border-2 border-gray-200 shadow-lg shadow-gray-500/10 hover:shadow-gray-500/20",
      icon: "bg-gradient-to-br from-gray-600 to-gray-700 text-white",
      title: "text-gray-700",
      price: "text-gray-800",
      feature: "text-gray-600",
      checkIcon: "text-gray-600"
    },
    secondary: {
      card: "bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20",
      icon: "bg-gradient-to-br from-orange-500 to-red-500 text-white",
      title: "text-orange-700",
      price: "text-orange-800",
      feature: "text-gray-600",
      checkIcon: "text-orange-600"
    },
    accent: {
      card: "bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-orange-400 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30",
      icon: "bg-gradient-to-br from-orange-500 to-orange-600 text-white",
      title: "text-orange-400",
      price: "text-white",
      feature: "text-gray-300",
      checkIcon: "text-orange-400"
    }
  };
</script>

<div class="pricing-card relative group transform transition-all duration-300 hover:translate-y-[-5px]">
  <div class="rounded-xl p-6 h-full {variantStyles[variant].card}">
    {#if isRecommended}
      <!-- Recommended Tag -->
      <div class="absolute -top-3 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
        Recommended
      </div>
    {/if}
    
    <div class="flex flex-col items-center mb-6">
      <div class="rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4 {variantStyles[variant].icon} group-hover:scale-110 transition-transform duration-300">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d={iconPath}></path>
        </svg>
      </div>
      <h3 class="text-xl font-bold mb-1 {variantStyles[variant].title} group-hover:scale-105 transition-transform duration-300">
        {title}
      </h3>
      <div class="flex items-baseline">
        {#if price.toLowerCase() === 'equity'}
          <span class="text-5xl font-bold {variantStyles[variant].price}">{price}</span>
        {:else}
          <span class="text-3xl font-bold {variantStyles[variant].price}">$</span>
          <span class="text-5xl font-bold {variantStyles[variant].price} mx-1">{price}</span>
          <span class="text-xl {variantStyles[variant].feature}">{unit}</span>
        {/if}
      </div>
    </div>
    
    <ul class="space-y-3">
      {#each features as feature}
        <li class="flex items-start">
          <div class="flex-shrink-0 mt-0.5 mr-2">
            <svg class="w-5 h-5 {variantStyles[variant].checkIcon}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <span class="{variantStyles[variant].feature}">{feature}</span>
        </li>
      {/each}
    </ul>
  </div>
</div>