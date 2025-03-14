<script>
  import FeatureCard from './FeatureCard.svelte';
  
  // Props for the feature card group
  const {
    features = [
      {
        title: "Snabb Prototyping",
        description: "Från koncept till klickbar prototyp på dagar. Testa dina idéer snabbare och iterera med självförtroende.",
        iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
        gradientFrom: "purple-400",
        gradientTo: "pink-400",
        borderColor: "purple-500/30",
        shadowColor: "purple-500/10",
        iconBgColor: "purple-500/30",
        iconBorderColor: "purple-500/40",
        iconTextColor: "purple-400"
      },
      {
        title: "Investeringsklara MVPs",
        description: "Bygg produkter som imponerar på både investerare och tidiga användare. Fokusera på kärnfunktioner som skapar värde.",
        iconPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
        gradientFrom: "rose-400",
        gradientTo: "orange-400",
        borderColor: "rose-500/30",
        shadowColor: "rose-500/10",
        iconBgColor: "rose-500/30",
        iconBorderColor: "rose-500/40",
        iconTextColor: "rose-400"
      },
      {
        title: "Kostnadseffektiv Utveckling",
        description: "Maximera din runway med vår effektiva utvecklingsprocess. Nå marknaden utan att tömma kassan.",
        iconPath: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
        gradientFrom: "amber-400",
        gradientTo: "yellow-400",
        borderColor: "amber-500/30",
        shadowColor: "amber-500/10",
        iconBgColor: "amber-500/30",
        iconBorderColor: "amber-500/40",
        iconTextColor: "amber-400"
      }
    ]
  } = $props();
</script>

<div class="w-full space-y-4">
  {#each features as feature}
    <FeatureCard 
      title={feature.title}
      description={feature.description}
      iconPath={feature.iconPath}
      gradientFrom={feature.gradientFrom}
      gradientTo={feature.gradientTo}
      borderColor={feature.borderColor}
      shadowColor={feature.shadowColor}
      iconBgColor={feature.iconBgColor}
      iconBorderColor={feature.iconBorderColor}
      iconTextColor={feature.iconTextColor}
    />
  {/each}
</div> 