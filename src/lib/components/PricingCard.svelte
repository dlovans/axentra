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
      card: "bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-blue-400 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20",
      icon: "bg-gradient-to-br from-blue-500 to-blue-600 text-white",
      title: "text-blue-400",
      price: "text-white",
      feature: "text-gray-300",
      checkIcon: "text-blue-400"
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
      card: "bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-green-400 shadow-lg shadow-green-500/20 hover:shadow-green-500/30",
      icon: "bg-gradient-to-br from-green-500 to-green-600 text-white",
      title: "text-green-400",
      price: "text-white",
      feature: "text-gray-300",
      checkIcon: "text-green-400"
    },
    enterprise: {
      card: "bg-gradient-to-br from-slate-100 via-gray-50 to-slate-100 border-2 border-gray-300 shadow-xl shadow-gray-400/20 hover:shadow-gray-400/30 relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:animate-pulse before:rounded-xl",
      icon: "bg-gradient-to-br from-slate-600 via-gray-500 to-slate-700 text-white shadow-lg",
      title: "text-slate-700 font-extrabold",
      price: "text-slate-800 bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent",
      feature: "text-slate-600",
      checkIcon: "text-slate-600"
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
      <div class="flex flex-col items-center">
        {#if price.toLowerCase() === 'equity'}
          <span class="text-2xl font-bold {variantStyles[variant].price}">{price}</span>
        {:else}
          <span class="text-lg font-bold {variantStyles[variant].price}">{price}</span>
          <span class="text-xs font-medium mt-1 {variantStyles[variant].price} opacity-60">{unit}</span>
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