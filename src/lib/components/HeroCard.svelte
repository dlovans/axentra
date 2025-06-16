<script>
  // Props for the hero card
  const {
    title = "",
    description = "",
    icon = "🚀",
    variant = "primary", // primary, secondary, accent
    className = ""
  } = $props();
  
  const variantStyles = {
    primary: "bg-white border-2 border-green-200 shadow-lg shadow-green-500/10 hover:shadow-green-500/20",
    secondary: "bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20",
    accent: "bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 shadow-lg shadow-gray-500/10 hover:shadow-gray-500/20"
  };
</script>

<div class="group cursor-pointer transform hover:scale-105 transition-all duration-300 {className}">
  <div class="rounded-xl p-6 h-full {variantStyles[variant]}">
    <div class="flex items-start space-x-4">
      <div class="flex-shrink-0">
        <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>
      <div class="flex-1 min-w-0">
        {#if title}
          <h3 class="text-lg font-semibold text-gray-800 mb-2 group-hover:text-green-700 transition-colors duration-300">
            {title}
          </h3>
        {/if}
        {#if description}
          <p class="text-gray-600 text-sm leading-relaxed">
            {description}
          </p>
        {/if}
      </div>
    </div>
  </div>
</div>