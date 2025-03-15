<script>
  // Get current year for copyright
  const currentYear = new Date().getFullYear();
  
  // Function to scroll to specific sections
  function scrollToSection(sectionId, e) {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      // Add offset for navbar
      const navbarHeight = 80;
      window.scrollTo({
        top: element.offsetTop - navbarHeight,
        behavior: 'smooth'
      });
    } else if (sectionId === 'top') {
      // Scroll to top if "Hem" is clicked
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
</script>

<div class="relative container mx-auto px-4 py-16 pb-8">
  <div class="footer-container backdrop-blur-sm bg-gray-800/35 border border-cyan-500/30 shadow-lg shadow-cyan-500/10 rounded-2xl p-8 relative overflow-hidden">
    <!-- Inward curved corners effect -->
    <div class="absolute top-0 left-0 w-8 h-8 bg-gray-900 rounded-br-xl"></div>
    <div class="absolute top-0 right-0 w-8 h-8 bg-gray-900 rounded-bl-xl"></div>
    <div class="absolute bottom-0 left-0 w-8 h-8 bg-gray-900 rounded-tr-xl"></div>
    <div class="absolute bottom-0 right-0 w-8 h-8 bg-gray-900 rounded-tl-xl"></div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
      <!-- Company Info -->
      <div>
        <div class="flex items-center mb-6">
          <h3 class="text-xl font-bold text-white">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400">Axentra</span>
          </h3>
        </div>
        <p class="text-gray-300 mb-4">
          Vi hjälper startups att bygga marknadsfärdiga MVPs på rekordtid. Vår expertis inom webbutveckling och startup-fokuserade lösningar gör oss till den perfekta partnern för din digitala resa.
        </p>
        <div class="flex space-x-4">
          <a href="https://www.linkedin.com/company/axentra-startups-ab" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd"></path>
            </svg>
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
      
      <!-- Quick Links -->
      <div>
        <h3 class="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-6">Snabblänkar</h3>
        <ul class="space-y-3">
          <li>
            <a href="#" onclick={(e) => scrollToSection('top', e)} class="text-gray-300 hover:text-white transition-colors flex items-center">
              <svg class="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
              Start
            </a>
        </li>
          <li>
            <a href="#" onclick={(e) => scrollToSection('process-section', e)} class="text-gray-300 hover:text-white transition-colors flex items-center">
              <svg class="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
              Vår Process
            </a>
        </li>
          <li>
            <a href="#" onclick={(e) => scrollToSection('pricing-section', e)} class="text-gray-300 hover:text-white transition-colors flex items-center">
              <svg class="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
              Prismodeller
            </a>
        </li>
          <li>
            <a href="#" onclick={(e) => scrollToSection('contact-section', e)} class="text-gray-300 hover:text-white transition-colors flex items-center">
              <svg class="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
              Kontakta Oss
            </a>
        </li>
      </ul>
      </div>
      
      <!-- Decorative Element -->
      <div>
        <h3 class="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 mb-6">Digital Innovation</h3>
        <div class="relative h-48 w-full rounded-xl overflow-hidden backdrop-blur-sm bg-gray-800/20 border border-teal-500/30 shadow-lg shadow-teal-500/10">
          <!-- Animated code pattern background -->
          <div class="absolute inset-0 opacity-20">
            <div class="code-pattern"></div>
      </div>
          
          <!-- Floating tech icons -->
          <div class="absolute top-4 left-4 rounded-full bg-teal-500/30 p-3 border border-teal-500/40 animate-float" style="animation-delay: 0s;">
            <svg class="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
            </svg>
          </div>
    
          <div class="absolute top-6 right-6 rounded-full bg-cyan-500/30 p-3 border border-cyan-500/40 animate-float" style="animation-delay: 0.5s;">
            <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
          </div>
          
          <div class="absolute bottom-6 left-8 rounded-full bg-emerald-500/30 p-3 border border-emerald-500/40 animate-float" style="animation-delay: 1s;">
            <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          
          <div class="absolute bottom-8 right-4 rounded-full bg-blue-500/30 p-3 border border-blue-500/40 animate-float" style="animation-delay: 1.5s;">
            <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          
          <!-- Central element -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="rounded-full bg-gradient-to-r from-teal-500/40 via-cyan-500/40 to-blue-500/40 p-6 backdrop-blur-sm border border-white/20 shadow-lg shadow-cyan-500/20 animate-pulse-slow">
              <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
              </svg>
            </div>
          </div>
          
          <!-- Connecting lines -->
          <div class="absolute inset-0">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="20" y1="20" x2="50" y2="50" stroke="rgba(45, 212, 191, 0.3)" stroke-width="0.5" />
              <line x1="80" y1="20" x2="50" y2="50" stroke="rgba(6, 182, 212, 0.3)" stroke-width="0.5" />
              <line x1="20" y1="80" x2="50" y2="50" stroke="rgba(16, 185, 129, 0.3)" stroke-width="0.5" />
              <line x1="80" y1="80" x2="50" y2="50" stroke="rgba(59, 130, 246, 0.3)" stroke-width="0.5" />
            </svg>
          </div>
        </div>
        
        <p class="text-gray-400 text-sm mt-4 text-center italic">
          "Turning ideas into digital reality"
        </p>
      </div>
    </div>
    
    <!-- Divider -->
    <div class="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent my-8"></div>
    
    <!-- Copyright -->
    <div class="text-center text-gray-400 text-sm">
      <p>&copy; {currentYear} Axentra Startups AB. Alla rättigheter förbehållna.</p>
      <div class="mt-2 flex justify-center">
        <a href="/policies" class="text-gray-400 hover:text-cyan-400 transition-colors">Policyer och Villkor</a>
      </div>
    </div>
  </div>
</div>

<style>
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes pulse-slow {
    0%, 100% { opacity: 0.7; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }
  
  .animate-pulse-slow {
    animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
</style> 