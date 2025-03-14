<script>
  // Props for the process card
  const {
    stepNumber = "01",
    title = "",
    description = "",
    iconPath = "",
    gradientFrom = "indigo-400",
    gradientTo = "purple-400",
    borderColor = "indigo-500/30",
    shadowColor = "indigo-500/10",
    iconBgColor = "indigo-500/30",
    iconBorderColor = "indigo-500/40",
    iconTextColor = "indigo-400",
    stepNumberColor = "indigo-500/40"
  } = $props();
</script>

<div class="process-card backdrop-blur-sm bg-gray-800/35 border border-{borderColor} shadow-lg shadow-{shadowColor} rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px]">
  <div class="flex items-center justify-between mb-6">
    <div class="rounded-full bg-{iconBgColor} p-4 w-16 h-16 flex items-center justify-center border border-{iconBorderColor}">
      <svg class="w-8 h-8 text-{iconTextColor}" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d={iconPath}></path>
      </svg>
    </div>
    <div class="text-5xl font-bold text-{stepNumberColor}">{stepNumber}</div>
  </div>
  <h3 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-{gradientFrom} to-{gradientTo} mb-3">{title}</h3>
  <p class="text-gray-300">
    {description}
  </p>
</div> 