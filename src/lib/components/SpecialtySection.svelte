<script>
  import SpecialtyCard from './SpecialtyCard.svelte';
  
  // Props for customization
  const {
    title = "Our Specialties",
    subtitle = "We focus on what we do best - building fast, scalable, and user-friendly digital solutions for startups.",
    specialties = [
      {
        title: "Lightning-Fast Development",
        description: "Our optimized development process delivers results in record time without compromising quality. We use modern tools and methods to maximize efficiency.",
        iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
        variant: "primary"
      },
      {
        title: "Startup Focus",
        description: "We understand startups' unique challenges and needs. Our approach is tailored to help you validate ideas quickly, attract investors, and reach the market before competitors.",
        iconPath: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
        variant: "secondary"
      },
      {
        title: "Modern Web Development",
        description: "We build modern, responsive, and fast web applications focused on user experience. Our solutions are scalable, secure, and built with future-proof technologies.",
        iconPath: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
        variant: "accent"
      }
    ]
  } = $props();
</script>

<div id="features" class="relative container mx-auto px-4 py-16">
  <div class="text-center mb-12">
    <h2 class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-600 to-orange-500 mb-4">
      {title}
    </h2>
    <p class="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
      {subtitle}
    </p>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    {#each specialties as specialty}
      <SpecialtyCard 
        title={specialty.title}
        description={specialty.description}
        iconPath={specialty.iconPath}
        variant={specialty.variant}
      />
    {/each}
  </div>
</div>