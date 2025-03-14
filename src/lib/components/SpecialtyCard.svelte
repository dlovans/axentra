<script>
  // Props for the specialty card
  const {
    title = "",
    description = "",
    iconPath = "",
    gradientFrom = "cyan-400",
    gradientTo = "blue-400",
    borderColor = "cyan-500/30",
    shadowColor = "cyan-500/10",
    iconBgColor = "cyan-500/30",
    iconBorderColor = "cyan-500/40",
    iconTextColor = "cyan-400"
  } = $props();
</script>

<div class="specialty-card backdrop-blur-sm bg-gray-800/25 border border-{borderColor} shadow-lg shadow-{shadowColor} rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px]">
  <div class="rounded-full bg-{iconBgColor} p-4 w-16 h-16 mb-6 flex items-center justify-center border border-{iconBorderColor}">
    <svg class="w-8 h-8 text-{iconTextColor}" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d={iconPath}></path>
    </svg>
  </div>
  <h3 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-{gradientFrom} to-{gradientTo} mb-3">{title}</h3>
  <p class="text-gray-300">
    {description}
  </p>
</div> 