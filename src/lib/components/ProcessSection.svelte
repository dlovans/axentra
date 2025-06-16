<script>
  import ProcessCard from './ProcessCard.svelte';
  
  // Props for the process section
  const {
    title = "Our Process",
    subtitle = "A simple and efficient path from idea to finished product. We keep the process transparent and focused on your needs.",
    steps = [
      {
        stepNumber: "01",
        title: "Initial Contact",
        description: "You contact us through the form on our website. Tell us briefly about your idea and what type of solution you're looking for. We usually get back to you within 24 hours.",
        iconPath: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
        variant: "primary"
      },
      {
        stepNumber: "02",
        title: "Discovery Meeting",
        description: "We schedule a personal meeting to discuss your project in detail. Here we gain a deeper understanding of your vision, goals, and technical requirements.",
        iconPath: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z",
        variant: "secondary"
      },
      {
        stepNumber: "03",
        title: "Planning & Agreement",
        description: "We discuss pricing, collaboration format, and project scope. Together we define clear goals, timelines, and deliverables to ensure a successful project.",
        iconPath: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
        variant: "accent"
      },
      {
        stepNumber: "04",
        title: "Development & Feedback",
        description: "We begin development with a continuous feedback loop. You get regular updates and opportunities to test and provide feedback throughout the process, ensuring the final product meets your expectations.",
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