<script>
  import PricingCard from './PricingCard.svelte';
  
  // Props for the pricing section
  const {
    title = "Pricing Models",
    subtitle = "We offer flexible collaboration models tailored to your startup's needs and budget. Choose the model that suits you best.",
    pricingOptions = [
      {
        title: "Hourly Rate",
        price: "X",
        unit: "/hour",
        features: [
          "Maximum flexibility",
          "Transparent billing",
          "Perfect for smaller projects",
          "No long-term commitment"
        ],
        iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
        variant: "primary"
      },
      {
        title: "Fixed Price",
        price: "Y",
        unit: "/project",
        features: [
          "Predictable cost",
          "Clearly defined scope",
          "Payment plan in stages",
          "Popular for MVP projects"
        ],
        iconPath: "M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z",
        variant: "secondary"
      },
      {
        title: "Fixed Price + Equity",
        price: "Z",
        unit: "+ equity",
        features: [
          "Lower initial cost",
          "Long-term commitment",
          "Shared interests",
          "Perfect for budget-conscious startups"
        ],
        iconPath: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
        variant: "accent",
        isRecommended: true
      },
      {
        title: "Co-Founder",
        price: "Equity",
        unit: "",
        features: [
          "Full commitment to the project",
          "Technical co-founder",
          "Strategic partnership",
          "Long-term growth focus"
        ],
        iconPath: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
        variant: "primary"
      }
    ]
  } = $props();
</script>

<div id="pricing-section" class="relative container mx-auto px-4 py-16">
  <div class="text-center mb-12">
    <h2 class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-600 to-orange-500 mb-4">
      {title}
    </h2>
    <p class="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
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
        variant={option.variant}
      />
    {/each}
  </div>
</div>