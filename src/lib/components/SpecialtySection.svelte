<script>
  import SpecialtyCard from './SpecialtyCard.svelte';
  
  // Props for customization
  const {
    title = "Vår Specialitet",
    subtitle = "Vi fokuserar på det vi gör bäst - att bygga snabba, skalbara och användarvänliga digitala lösningar för startups.",
    specialties = [
      {
        title: "Supersnabb Utveckling",
        description: "Vår optimerade utvecklingsprocess levererar resultat på rekordtid utan att kompromissa med kvalitet. Vi använder moderna verktyg och metoder för att maximera effektiviteten.",
        iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
        gradientFrom: "cyan-400",
        gradientTo: "blue-400",
        borderColor: "cyan-500/30",
        shadowColor: "cyan-500/10",
        iconBgColor: "cyan-500/30",
        iconBorderColor: "cyan-500/40",
        iconTextColor: "cyan-400"
      },
      {
        title: "Startup Fokus",
        description: "Vi förstår startups unika utmaningar och behov. Vår approach är anpassad för att hjälpa dig validera idéer snabbt, attrahera investerare och nå marknaden innan konkurrenterna.",
        iconPath: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
        gradientFrom: "blue-400",
        gradientTo: "indigo-400",
        borderColor: "blue-500/30",
        shadowColor: "blue-500/10",
        iconBgColor: "blue-500/30",
        iconBorderColor: "blue-500/40",
        iconTextColor: "blue-400"
      },
      {
        title: "Webbutveckling",
        description: "Vi bygger moderna, responsiva och snabba webbapplikationer med fokus på användarupplevelse. Våra lösningar är skalbara, säkra och byggda med framtidssäkra teknologier.",
        iconPath: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
        gradientFrom: "teal-400",
        gradientTo: "emerald-400",
        borderColor: "teal-500/30",
        shadowColor: "teal-500/10",
        iconBgColor: "teal-500/30",
        iconBorderColor: "teal-500/40",
        iconTextColor: "teal-400"
      }
    ]
  } = $props();
</script>

<div class="relative container mx-auto px-4 py-8">
  <div class="text-center mb-12">
    <h2 class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 mb-4">
      {title}
    </h2>
    <p class="text-gray-300 text-lg max-w-3xl mx-auto">
      {subtitle}
    </p>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    {#each specialties as specialty}
      <SpecialtyCard 
        title={specialty.title}
        description={specialty.description}
        iconPath={specialty.iconPath}
        gradientFrom={specialty.gradientFrom}
        gradientTo={specialty.gradientTo}
        borderColor={specialty.borderColor}
        shadowColor={specialty.shadowColor}
        iconBgColor={specialty.iconBgColor}
        iconBorderColor={specialty.iconBorderColor}
        iconTextColor={specialty.iconTextColor}
      />
    {/each}
  </div>
</div> 