<script>
  import ProjectCard from './ProjectCard.svelte';
  
  // Props for the project section
  const {
    title = "My Projects",
    subtitle = "Explore some of the innovative solutions I've built. From APIs to full-scale applications, see how I transform ideas into reality.",
    projects = [
      {
        title: "Vevra",
        description: "Comprehensive community engagement platform designed to drive actionable outcomes. Features activity tracking, real-time communication, and hierarchical project organization to transform passive communities into productive ecosystems.",
        image: "/vevra.png",
        demoUrl: "https://vevra.app",
        variant: "accent",
        developmentTime: "In Progress",
        scope: "Complete Platform"
      },
      {
        title: "Alentra",
        description: "Advanced AI-powered job matching platform that connects candidates with opportunities based on skills and compatibility rather than keyword matching. Revolutionizes recruitment by focusing on meaningful job-candidate alignment.",
        image: "/alentra.png",
        demoUrl: "https://alentra.app",
        variant: "primary",
        developmentTime: "8 weeks",
        scope: "Full System"
      },
      {
        title: "ThinkStep",
        description: "Enterprise-grade AI agent infrastructure platform that simplifies complex AI implementations. Provides Agent-as-Layer API architecture, enabling businesses to deploy sophisticated AI solutions without extensive technical overhead. Production-ready and scalable.",
        image: "/thinkstep.png",
        demoUrl: "https://thinkstep.dev",
        variant: "primary",
        developmentTime: "6 weeks",
        scope: "Full System"
      },
      {
        title: "TrendiFi",
        description: "Sophisticated AI-powered insight generation API that transforms raw data into actionable business intelligence. Features customizable data structures and real-time analysis capabilities for enterprise decision-making.",
        image: "/trendifi.png",
        demoUrl: "https://trendifi.app",
        variant: "secondary",
        developmentTime: "4 weeks",
        scope: "Full System"
      },
      {
        title: "Believers United",
        description: "Community platform designed for Quran-only believers, fostering meaningful connections and discussions in a space built on shared faith and values.",
        image: "/bu.png",
        demoUrl: "https://believers-united.community",
        variant: "secondary",
        developmentTime: "3 weeks",
        scope: "Full Stack App"
      }
    ]
  } = $props();
</script>

<div id="projects-section" class="relative container mx-auto px-4 py-16">
  <!-- Background decoration -->
  <div class="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white to-orange-50/30 rounded-3xl -mx-4"></div>
  
  <div class="relative z-10">
    <div class="text-center mb-16">
      <div class="inline-flex items-center px-4 py-2 bg-orange-100 border border-orange-200 rounded-full text-orange-700 text-sm font-medium mb-6">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
        Portfolio Showcase
      </div>
      
      <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-600 to-orange-500 mb-6">
        {title}
      </h2>
      <p class="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
        {subtitle}
      </p>
      
      <!-- Stats -->
      <div class="flex justify-center items-center gap-8 mt-8 text-sm text-gray-500">
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Average delivery: 4-14 weeks
        </div>
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          100% delivered on time
        </div>
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {#each projects as project}
      <ProjectCard 
        title={project.title}
        description={project.description}
        image={project.image}
        tags={project.tags}
        demoUrl={project.demoUrl}
        variant={project.variant}
        developmentTime={project.developmentTime}
        scope={project.scope}
      />
    {/each}
    </div>
  </div>
</div>