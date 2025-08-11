<script>
  import ProcessCard from './ProcessCard.svelte';
  
  // Props for the process section
  const {
    title = "My Process",
    subtitle = "A structured approach to API development that ensures quality, performance, and seamless integration from concept to deployment.",
    steps = [
      {
        stepNumber: "01",
        title: "Requirements Analysis",
        description: "I start by understanding your API needs, data models, and integration requirements. I analyze your existing systems and define the API specifications together.",
        iconPath: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
        variant: "primary"
      },
      {
        stepNumber: "02",
        title: "API Design & Documentation",
        description: "I create detailed API specifications, endpoint definitions, and comprehensive documentation. This includes data schemas, authentication methods, and error handling strategies.",
        iconPath: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z",
        variant: "secondary"
      },
      {
        stepNumber: "03",
        title: "Development & Testing",
        description: "I build your API with clean, maintainable code following best practices. Every endpoint is thoroughly tested for functionality, performance, and security.",
        iconPath: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
        variant: "accent"
      },
      {
        stepNumber: "04",
        title: "Deployment & Support",
        description: "I deploy your API to production with proper monitoring and logging. I provide ongoing support, performance optimization, and help with integration challenges.",
        iconPath: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
        variant: "primary"
      }
    ]
  } = $props();
</script>

<div id="process" class="relative container mx-auto px-4 py-16">
  <div class="text-center mb-12">
    <h2 class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-600 to-orange-500 mb-4">
      {title}
    </h2>
    <p class="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
      {subtitle}
    </p>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    {#each steps as step}
      <ProcessCard 
        stepNumber={step.stepNumber}
        title={step.title}
        description={step.description}
        iconPath={step.iconPath}
        variant={step.variant}
      />
    {/each}
  </div>
</div>