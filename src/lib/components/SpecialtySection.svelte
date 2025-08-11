<script>
  import SpecialtyCard from './SpecialtyCard.svelte';
  
  // Props for customization
  const {
    title = "My Specialties",
    subtitle = "I excel in modern API technologies, delivering robust backend solutions that power today's applications and services.",
    specialties = [
      {
        title: "API Development",
        description: "Custom API development from ground up with proper architecture, documentation, and testing. I build APIs that are reliable, maintainable, and developer-friendly.",
        iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
        variant: "primary"
      },
      {
        title: "System Integration",
        description: "Seamless integration between different systems and services. I connect your applications with third-party APIs, databases, and external services efficiently.",
        iconPath: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
        variant: "secondary"
      },
      {
        title: "API Maintenance",
        description: "Ongoing support, monitoring, and optimization of existing APIs. I ensure your APIs stay performant, secure, and up-to-date with evolving requirements.",
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