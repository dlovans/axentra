<script>
  // Props for the process card
  const {
    stepNumber = "01",
    title = "",
    description = "",
    iconPath = "",
    variant = "primary" // primary, secondary, accent
  } = $props();
  
  const variantStyles = {
    primary: {
      card: "bg-white border-2 border-green-200 shadow-lg shadow-green-500/10 hover:shadow-green-500/20",
      icon: "bg-gradient-to-br from-green-500 to-emerald-500 text-white",
      title: "text-green-700",
      stepNumber: "text-green-400"
    },
    secondary: {
      card: "bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20",
      icon: "bg-gradient-to-br from-orange-500 to-red-500 text-white",
      title: "text-orange-700",
      stepNumber: "text-orange-400"
    },
    accent: {
      card: "bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 shadow-lg shadow-gray-500/10 hover:shadow-gray-500/20",
      icon: "bg-gradient-to-br from-gray-600 to-gray-700 text-white",
      title: "text-gray-700",
      stepNumber: "text-gray-400"
    }
  };
</script>

<div class="process-card group transform transition-all duration-300 hover:translate-y-[-5px]">
  <div class="rounded-xl p-6 h-full {variantStyles[variant].card}">
    <div class="flex items-center justify-between mb-6">
      <div class="rounded-full p-4 w-16 h-16 flex items-center justify-center {variantStyles[variant].icon} group-hover:scale-110 transition-transform duration-300">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d={iconPath}></path>
        </svg>
      </div>
      <div class="text-5xl font-bold {variantStyles[variant].stepNumber} group-hover:scale-105 transition-transform duration-300">
        {stepNumber}
      </div>
    </div>
    <h3 class="text-xl font-bold mb-3 {variantStyles[variant].title} group-hover:scale-105 transition-transform duration-300">
      {title}
    </h3>
    <p class="text-gray-600 leading-relaxed">
      {description}
    </p>
  </div>
</div>