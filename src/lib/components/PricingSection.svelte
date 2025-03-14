<script>
  import PricingCard from './PricingCard.svelte';
  
  // Props for the pricing section
  const {
    title = "Prismodeller",
    subtitle = "Vi erbjuder flexibla samarbetsformer anpassade efter din startups behov och budget. Välj den modell som passar dig bäst.",
    pricingOptions = [
      {
        title: "Timpris",
        price: "X",
        unit: "/timme",
        features: [
          "Maximal flexibilitet",
          "Transparent fakturering",
          "Perfekt för mindre projekt",
          "Ingen långsiktig bindning"
        ],
        iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
        gradientFrom: "emerald-400",
        gradientTo: "teal-400",
        borderColor: "emerald-500/30",
        shadowColor: "emerald-500/10",
        iconBgColor: "emerald-500/30",
        iconBorderColor: "emerald-500/40",
        iconTextColor: "emerald-400",
        isRecommended: false
      },
      {
        title: "Fast Pris",
        price: "Y",
        unit: "/projekt",
        features: [
          "Förutsägbar kostnad",
          "Tydligt definierat scope",
          "Betalningsplan i etapper",
          "Populärt för MVP-projekt"
        ],
        iconPath: "M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z",
        gradientFrom: "blue-400",
        gradientTo: "cyan-400",
        borderColor: "blue-500/30",
        shadowColor: "blue-500/10",
        iconBgColor: "blue-500/30",
        iconBorderColor: "blue-500/40",
        iconTextColor: "blue-400",
        isRecommended: false
      },
      {
        title: "Fast Pris + Aktier",
        price: "Z",
        unit: "+ aktier",
        features: [
          "Lägre initial kostnad",
          "Långsiktigt engagemang",
          "Delade intressen",
          "Perfekt för startups med begränsad budget"
        ],
        iconPath: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
        gradientFrom: "purple-400",
        gradientTo: "fuchsia-400",
        borderColor: "purple-500/30",
        shadowColor: "purple-500/10",
        iconBgColor: "purple-500/30",
        iconBorderColor: "purple-500/40",
        iconTextColor: "purple-400",
        isRecommended: true
      },
      {
        title: "Medgrundare",
        price: "Equity",
        unit: "",
        features: [
          "Fullt engagemang i projektet",
          "Teknisk medgrundare",
          "Strategiskt partnerskap",
          "Långsiktig tillväxtfokus"
        ],
        iconPath: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
        gradientFrom: "rose-400",
        gradientTo: "red-400",
        borderColor: "rose-500/30",
        shadowColor: "rose-500/10",
        iconBgColor: "rose-500/30",
        iconBorderColor: "rose-500/40",
        iconTextColor: "rose-400",
        isRecommended: false
      }
    ]
  } = $props();
  
  // Convert Tailwind color classes to CSS variables
  const getTailwindColor = (colorClass) => {
    const colorMap = {
      // Cyan
      'cyan-400': 'rgb(34, 211, 238)',
      
      // Blue
      'blue-400': 'rgb(96, 165, 250)',
      
      // Teal
      'teal-400': 'rgb(45, 212, 191)'
    };
    
    return colorMap[colorClass] || colorClass;
  };
</script>

<div id="pricing-section" class="relative container mx-auto px-4 py-16">
  <div class="text-center mb-12">
    <h2 class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text mb-4"
        style="background-image: linear-gradient(to right, {getTailwindColor('cyan-400')}, {getTailwindColor('blue-400')}, {getTailwindColor('teal-400')});">
      {title}
    </h2>
    <p class="text-gray-300 text-lg max-w-3xl mx-auto">
      {subtitle}
    </p>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    {#each pricingOptions as option}
      <PricingCard 
        title={option.title}
        price={option.price}
        unit={option.unit}
        features={option.features}
        iconPath={option.iconPath}
        isRecommended={option.isRecommended}
        gradientFrom={option.gradientFrom}
        gradientTo={option.gradientTo}
        borderColor={option.borderColor}
        shadowColor={option.shadowColor}
        iconBgColor={option.iconBgColor}
        iconBorderColor={option.iconBorderColor}
        iconTextColor={option.iconTextColor}
      />
    {/each}
  </div>
</div> 