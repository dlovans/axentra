<script>
  // Props for the feature card
  const {
    title = "",
    description = "",
    iconPath = "",
    variant = "primary" // primary, secondary, accent
  } = $props();
  
  const variantStyles = {
    primary: {
      card: "bg-white border-2 border-green-200 shadow-lg shadow-green-500/10 hover:shadow-green-500/20",
      icon: "bg-gradient-to-br from-green-500 to-emerald-500 text-white",
      title: "text-green-700"
    },
    secondary: {
      card: "bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20",
      icon: "bg-gradient-to-br from-orange-500 to-red-500 text-white",
      title: "text-orange-700"
    },
    accent: {
      card: "bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 shadow-lg shadow-gray-500/10 hover:shadow-gray-500/20",
      icon: "bg-gradient-to-br from-gray-600 to-gray-700 text-white",
      title: "text-gray-700"
    }
  };
</script>

<div class="group transform transition-all duration-300 hover:translate-y-[-2px]">
  <div class="rounded-xl p-6 {variantStyles[variant].card}">
    <div class="flex items-center gap-4">
      <div class="rounded-full p-3 flex items-center justify-center {variantStyles[variant].icon} group-hover:scale-110 transition-transform duration-300">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={iconPath}></path>
        </svg>
      </div>
      <div class="flex-1">
        <h3 class="text-xl font-bold mb-2 {variantStyles[variant].title} group-hover:scale-105 transition-transform duration-300">
          {title}
        </h3>
        <p class="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
</div>