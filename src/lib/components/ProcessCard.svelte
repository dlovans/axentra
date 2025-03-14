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
  
  // Convert Tailwind color classes to CSS variables
  const getTailwindColor = (colorClass) => {
    const colorMap = {
      // Indigo
      'indigo-400': 'rgb(129, 140, 248)',
      'indigo-500/30': 'rgba(99, 102, 241, 0.3)',
      'indigo-500/40': 'rgba(99, 102, 241, 0.4)',
      'indigo-500/10': 'rgba(99, 102, 241, 0.1)',
      
      // Purple
      'purple-400': 'rgb(192, 132, 252)',
      'purple-500/30': 'rgba(168, 85, 247, 0.3)',
      'purple-500/40': 'rgba(168, 85, 247, 0.4)',
      'purple-500/10': 'rgba(168, 85, 247, 0.1)',
      
      // Violet
      'violet-400': 'rgb(167, 139, 250)',
      'violet-500/30': 'rgba(139, 92, 246, 0.3)',
      'violet-500/40': 'rgba(139, 92, 246, 0.4)',
      'violet-500/10': 'rgba(139, 92, 246, 0.1)',
      
      // Fuchsia
      'fuchsia-400': 'rgb(232, 121, 249)',
      'fuchsia-500/30': 'rgba(217, 70, 239, 0.3)',
      'fuchsia-500/40': 'rgba(217, 70, 239, 0.4)',
      'fuchsia-500/10': 'rgba(217, 70, 239, 0.1)',
      
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
      
      // Red
      'red-400': 'rgb(248, 113, 113)',
      'red-500/30': 'rgba(239, 68, 68, 0.3)',
      'red-500/40': 'rgba(239, 68, 68, 0.4)',
      'red-500/10': 'rgba(239, 68, 68, 0.1)',
    };
    
    return colorMap[colorClass] || colorClass;
  };
</script>

<div class="process-card backdrop-blur-sm bg-gray-800/35 rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px]"
     style="border: 1px solid {getTailwindColor(borderColor)}; box-shadow: 0 10px 15px -3px {getTailwindColor(shadowColor)};">
  <div class="flex items-center justify-between mb-6">
    <div class="rounded-full p-4 w-16 h-16 flex items-center justify-center"
         style="background-color: {getTailwindColor(iconBgColor)}; border: 1px solid {getTailwindColor(iconBorderColor)};">
      <svg class="w-8 h-8" style="color: {getTailwindColor(iconTextColor)};" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d={iconPath}></path>
      </svg>
    </div>
    <div class="text-5xl font-bold" style="color: {getTailwindColor(stepNumberColor)};">{stepNumber}</div>
  </div>
  <h3 class="text-xl font-bold text-transparent bg-clip-text mb-3"
      style="background-image: linear-gradient(to right, {getTailwindColor(gradientFrom)}, {getTailwindColor(gradientTo)});">{title}</h3>
  <p class="text-gray-300">
    {description}
  </p>
</div> 