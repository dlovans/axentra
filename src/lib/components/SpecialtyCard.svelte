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
  
  // Convert Tailwind color classes to CSS variables
  const getTailwindColor = (colorClass) => {
    const colorMap = {
      // Cyan
      'cyan-400': 'rgb(34, 211, 238)',
      'cyan-500/30': 'rgba(6, 182, 212, 0.3)',
      'cyan-500/40': 'rgba(6, 182, 212, 0.4)',
      'cyan-500/10': 'rgba(6, 182, 212, 0.1)',
      
      // Blue
      'blue-400': 'rgb(96, 165, 250)',
      'blue-500/30': 'rgba(59, 130, 246, 0.3)',
      'blue-500/40': 'rgba(59, 130, 246, 0.4)',
      'blue-500/10': 'rgba(59, 130, 246, 0.1)',
      
      // Indigo
      'indigo-400': 'rgb(129, 140, 248)',
      
      // Teal
      'teal-400': 'rgb(45, 212, 191)',
      'teal-500/30': 'rgba(20, 184, 166, 0.3)',
      'teal-500/40': 'rgba(20, 184, 166, 0.4)',
      'teal-500/10': 'rgba(20, 184, 166, 0.1)',
      
      // Emerald
      'emerald-400': 'rgb(52, 211, 153)'
    };
    
    return colorMap[colorClass] || colorClass;
  };
</script>

<div class="specialty-card backdrop-blur-sm bg-gray-800/25 rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px]"
     style="border: 1px solid {getTailwindColor(borderColor)}; box-shadow: 0 10px 15px -3px {getTailwindColor(shadowColor)};">
  <div class="rounded-full p-4 w-16 h-16 mb-6 flex items-center justify-center"
       style="background-color: {getTailwindColor(iconBgColor)}; border: 1px solid {getTailwindColor(iconBorderColor)};">
    <svg class="w-8 h-8" style="color: {getTailwindColor(iconTextColor)};" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d={iconPath}></path>
    </svg>
  </div>
  <h3 class="text-xl font-bold text-transparent bg-clip-text mb-3"
      style="background-image: linear-gradient(to right, {getTailwindColor(gradientFrom)}, {getTailwindColor(gradientTo)});">{title}</h3>
  <p class="text-gray-300">
    {description}
  </p>
</div> 