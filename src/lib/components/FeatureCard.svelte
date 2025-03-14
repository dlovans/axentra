<script>
  // Props for the feature card
  const {
    title = "",
    description = "",
    iconPath = "",
    gradientFrom = "purple-400",
    gradientTo = "pink-400",
    borderColor = "purple-500/30",
    shadowColor = "purple-500/10",
    iconBgColor = "purple-500/30",
    iconBorderColor = "purple-500/40",
    iconTextColor = "purple-400"
  } = $props();
</script>

<div class="hero-card backdrop-blur-sm bg-gray-800/25 border border-{borderColor} shadow-lg shadow-{shadowColor} rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px]">
  <div class="flex items-center gap-4">
    <div class="rounded-full bg-{iconBgColor} p-3 border border-{iconBorderColor}">
      <svg class="w-6 h-6 text-{iconTextColor}" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={iconPath}></path>
      </svg>
    </div>
    <div>
      <h3 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-{gradientFrom} to-{gradientTo} mb-2">{title}</h3>
      <p class="text-gray-300">{description}</p>
    </div>
  </div>
</div> 