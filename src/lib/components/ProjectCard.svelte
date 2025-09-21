<script>
  // Props for the project card
  const {
    title = "",
    description = "",
    image = "",
    demoUrl = null,
    variant = "primary",
    developmentTime = null,
    scope = null
  } = $props();
  
  const variantStyles = {
    primary: {
      card: "bg-white border-2 border-gray-200 shadow-lg shadow-gray-500/10 hover:shadow-xl hover:shadow-gray-500/20",
      button: "bg-gradient-to-r from-gray-800 to-orange-500 hover:from-gray-700 hover:to-orange-600 text-white shadow-lg hover:shadow-orange-500/25",
      badge: "bg-gradient-to-r from-gray-600 to-gray-700 text-white"
    },
    secondary: {
      card: "bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 shadow-lg shadow-orange-500/10 hover:shadow-xl hover:shadow-orange-500/20",
      button: "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-orange-500/25",
      badge: "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
    },
    accent: {
      card: "bg-gradient-to-br from-gray-50 to-orange-50 border-2 border-gray-300 shadow-lg shadow-gray-500/10 hover:shadow-xl hover:shadow-orange-500/15",
      button: "bg-gradient-to-r from-gray-600 to-orange-500 hover:from-gray-700 hover:to-orange-600 text-white shadow-lg hover:shadow-orange-500/25",
      badge: "bg-gradient-to-r from-gray-500 to-orange-500 text-white"
    }
  };
</script>

<div class="project-card h-full">
  <div class="rounded-xl overflow-hidden h-full flex flex-col {variantStyles[variant].card} transition-all duration-300 hover:translate-y-[-5px]">
    
    <!-- Project Image (Fixed Height) -->
    <div class="relative h-32 overflow-hidden">
      <img
        src={image}
        alt={title}
        class="w-full h-full object-contain bg-white transition-transform duration-500 hover:scale-105"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      
      <!-- Development Time Badge -->
      {#if developmentTime}
        <div class="absolute top-2 right-2">
          <div class="px-2 py-1 rounded-full text-xs font-medium {variantStyles[variant].badge} backdrop-blur-sm">
            <svg class="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            {developmentTime}
          </div>
        </div>
      {/if}
    </div>
    
    <!-- Project Content (Flexible Height) -->
    <div class="p-4 flex flex-col flex-1">
      
      <!-- Project Name -->
      <h4 class="text-lg font-bold text-gray-800 mb-2">
        {title}
      </h4>
      
      <!-- Description (Takes Available Space) -->
      <p class="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
        {description}
      </p>
      
      <!-- Scope Tag -->
      {#if scope}
        <div class="mb-4">
          <div class="inline-flex items-center px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700 font-medium">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            {scope}
          </div>
        </div>
      {/if}
      
      <!-- URL Button (If Available) -->
      {#if demoUrl}
        <div>
          <a 
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center w-full px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-105 {variantStyles[variant].button}"
          >
            <span>View Project</span>
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
        </div>
      {/if}
      
    </div>
  </div>
</div>