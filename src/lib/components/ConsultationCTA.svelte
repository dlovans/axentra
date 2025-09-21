<script>
  const {
    title = "Ready to Build Your API?",
    subtitle = "Get a free consultation to discuss your API requirements, architecture, and implementation timeline.",
    ctaText = "Book Free Consultation",
    secondaryText = "Or message me directly"
  } = $props();
</script>

<div class="relative container mx-auto px-4 py-16">
  <div class="max-w-4xl mx-auto">
    <div class="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 shadow-lg shadow-orange-500/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-0 right-0 w-64 h-64 bg-orange-100/30 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-amber-100/30 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div class="relative z-10 text-center">
        <!-- Main heading -->
        <h2 class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-600 to-orange-500 mb-4">
          {title}
        </h2>
        
        <!-- Subtitle -->
        <p class="text-gray-600 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>
        
        <!-- Benefits list -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div class="flex items-center justify-center md:justify-start space-x-3">
            <div class="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <span class="text-gray-700 font-medium">30-minute call</span>
          </div>
          <div class="flex items-center justify-center md:justify-start space-x-3">
            <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <span class="text-gray-700 font-medium">API architecture review</span>
          </div>
          <div class="flex items-center justify-center md:justify-start space-x-3">
            <div class="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <span class="text-gray-700 font-medium">Integration strategy</span>
          </div>
        </div>
        
        <!-- CTA buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="https://calendly.com/axentra-agency/30min"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-gray-800 to-orange-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 text-lg group"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            {ctaText}
            <svg class="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </a>
          
          <a 
            href="#contact-section"
            onclick={() => document.getElementById('contact-section').scrollIntoView({ behavior: 'smooth' })}
            class="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-orange-300 hover:text-orange-600 transition-all duration-300"
          >
            {secondaryText}
          </a>
        </div>
        
        <!-- Trust indicator -->
        <p class="text-gray-500 text-sm mt-6">
          💬 Usually respond within 2 hours • 🚀 25+ APIs delivered
        </p>
      </div>
    </div>
  </div>
</div>