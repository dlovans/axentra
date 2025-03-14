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
  
  // Convert Tailwind color classes to CSS variables
  const getTailwindColor = (colorClass) => {
    const colorMap = {
      // Purple
      'purple-400': 'rgb(192, 132, 252)',
      'purple-500/30': 'rgba(168, 85, 247, 0.3)',
      'purple-500/40': 'rgba(168, 85, 247, 0.4)',
      'purple-500/10': 'rgba(168, 85, 247, 0.1)',
      
      // Pink
      'pink-400': 'rgb(244, 114, 182)',
      'pink-500/30': 'rgba(236, 72, 153, 0.3)',
      'pink-500/40': 'rgba(236, 72, 153, 0.4)',
      'pink-500/10': 'rgba(236, 72, 153, 0.1)',
      
      // Rose
      'rose-400': 'rgb(251, 113, 133)',
      'rose-500/30': 'rgba(244, 63, 94, 0.3)',
      'rose-500/40': 'rgba(244, 63, 94, 0.4)',
      'rose-500/10': 'rgba(244, 63, 94, 0.1)',
      
      // Orange
      'orange-400': 'rgb(251, 146, 60)',
      'orange-500/30': 'rgba(249, 115, 22, 0.3)',
      'orange-500/40': 'rgba(249, 115, 22, 0.4)',
      'orange-500/10': 'rgba(249, 115, 22, 0.1)',
      
      // Amber
      'amber-400': 'rgb(251, 191, 36)',
      'amber-500/30': 'rgba(245, 158, 11, 0.3)',
      'amber-500/40': 'rgba(245, 158, 11, 0.4)',
      'amber-500/10': 'rgba(245, 158, 11, 0.1)',
      
      // Yellow
      'yellow-400': 'rgb(250, 204, 21)',
      'yellow-500/30': 'rgba(234, 179, 8, 0.3)',
      'yellow-500/40': 'rgba(234, 179, 8, 0.4)',
      'yellow-500/10': 'rgba(234, 179, 8, 0.1)',
      
      // Emerald
      'emerald-400': 'rgb(52, 211, 153)',
      'emerald-500/30': 'rgba(16, 185, 129, 0.3)',
      'emerald-500/40': 'rgba(16, 185, 129, 0.4)',
      'emerald-500/10': 'rgba(16, 185, 129, 0.1)',
      
      // Teal
      'teal-400': 'rgb(45, 212, 191)',
      'teal-500/30': 'rgba(20, 184, 166, 0.3)',
      'teal-500/40': 'rgba(20, 184, 166, 0.4)',
      'teal-500/10': 'rgba(20, 184, 166, 0.1)',
      
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
      'indigo-500/30': 'rgba(99, 102, 241, 0.3)',
      'indigo-500/40': 'rgba(99, 102, 241, 0.4)',
      'indigo-500/10': 'rgba(99, 102, 241, 0.1)',
      
      // Violet
      'violet-400': 'rgb(167, 139, 250)',
      'violet-500/30': 'rgba(139, 92, 246, 0.3)',
      'violet-500/40': 'rgba(139, 92, 246, 0.4)',
      'violet-500/10': 'rgba(139, 92, 246, 0.1)',
      
      // Fuchsia
      'fuchsia-400': 'rgb(232, 121, 249)',
      'fuchsia-500/30': 'rgba(217, 70, 239, 0.3)',
      'fuchsia-500/40': 'rgba(217, 70, 239, 0.4)',
      'fuchsia-500/10': 'rgba(217, 70, 239, 0.1)'
    };
    
    return colorMap[colorClass] || colorClass;
  };
</script>

<div class="hero-card backdrop-blur-sm bg-gray-800/25 rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px]"
  style="border: 1px solid {getTailwindColor(borderColor)}; box-shadow: 0 10px 15px -3px {getTailwindColor(shadowColor)};">
  <div class="flex items-center gap-4">
    <div class="rounded-full p-3 flex items-center justify-center"
      style="background-color: {getTailwindColor(iconBgColor)}; border: 1px solid {getTailwindColor(iconBorderColor)};">
      <svg class="w-6 h-6" style="color: {getTailwindColor(iconTextColor)};" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={iconPath}></path>
      </svg>
    </div>
    <div>
      <h3 class="text-xl font-bold mb-2 text-transparent bg-clip-text"
        style="background-image: linear-gradient(to right, {getTailwindColor(gradientFrom)}, {getTailwindColor(gradientTo)});">
        {title}
      </h3>
      <p class="text-gray-300">{description}</p>
    </div>
  </div>
</div> 