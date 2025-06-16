<script>
  import FeatureCard from './FeatureCard.svelte';
  
  // Props for the feature card group
  const {
    features = [
      {
        title: "Rapid Prototyping",
        description: "From concept to clickable prototype in days. Test your ideas faster and iterate with confidence.",
        iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
        variant: "primary"
      },
      {
        title: "Investment-Ready MVPs",
        description: "Build products that impress both investors and early users. Focus on core features that create value.",
        iconPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
        variant: "secondary"
      },
      {
        title: "Cost-Effective Development",
        description: "Maximize your runway with our efficient development process. Reach the market without breaking the bank.",
        iconPath: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
        variant: "accent"
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
      variant={feature.variant}
    />
  {/each}
</div>