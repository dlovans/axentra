<!-- Contact Info -->
<div class="flex flex-col gap-4 md:gap-6">
  <!-- Email Card -->
  <div class="contact-card backdrop-blur-sm bg-gray-800/35 border border-blue-500/30 shadow-lg shadow-blue-500/10 rounded-2xl p-4 md:p-6 transform transition-all duration-300 hover:translate-y-[-5px]">
    <div class="flex items-center gap-3 md:gap-4">
      <div class="rounded-full bg-blue-500/30 p-3 md:p-4 flex items-center justify-center border border-blue-500/40 flex-shrink-0">
        <svg class="w-6 h-6 md:w-8 md:h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      </div>
      <div class="overflow-hidden">
        <h3 class="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-1 md:mb-2">E-post</h3>
        <p class="text-gray-300 mb-1 md:mb-2 text-sm md:text-base">Skicka oss ett mail direkt:</p>
        <a href="mailto:dlovan@axentra.agency" class="text-sm md:text-lg font-medium text-white hover:text-cyan-400 transition-colors break-all">dlovan@axentra.agency</a>
      </div>
    </div>
  </div>
  
  <!-- Location Card -->
  <div class="contact-card backdrop-blur-sm bg-gray-800/35 border border-purple-500/30 shadow-lg shadow-purple-500/10 rounded-2xl p-4 md:p-6 transform transition-all duration-300 hover:translate-y-[-5px]">
    <div class="flex items-center gap-3 md:gap-4">
      <div class="rounded-full bg-purple-500/30 p-3 md:p-4 flex items-center justify-center border border-purple-500/40 flex-shrink-0">
        <svg class="w-6 h-6 md:w-8 md:h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      </div>
      <div>
        <h3 class="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400 mb-1 md:mb-2">Plats</h3>
        <p class="text-gray-300 mb-1 md:mb-2 text-sm md:text-base">Vi finns i:</p>
        <p class="text-sm md:text-lg font-medium text-white">Stockholm, Sverige</p>
      </div>
    </div>
  </div>
  
  <!-- Response Time Card -->
  <div class="contact-card backdrop-blur-sm bg-gray-800/35 border border-emerald-500/30 shadow-lg shadow-emerald-500/10 rounded-2xl p-4 md:p-6 transform transition-all duration-300 hover:translate-y-[-5px]">
    <div class="flex items-center gap-3 md:gap-4">
      <div class="rounded-full bg-emerald-500/30 p-3 md:p-4 flex items-center justify-center border border-emerald-500/40 flex-shrink-0">
        <svg class="w-6 h-6 md:w-8 md:h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <div>
        <h3 class="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-1 md:mb-2">Svarstid</h3>
        <p class="text-gray-300 mb-1 md:mb-2 text-sm md:text-base">Vi svarar vanligtvis inom:</p>
        <p class="text-sm md:text-lg font-medium text-white">24 timmar</p>
      </div>
    </div>
  </div>
</div>

<style>
  /* Hover effect for contact cards */
  .contact-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    width: 100%;
    box-sizing: border-box;
  }
  
  .contact-card:hover {
    box-shadow: 0 10px 25px -5px rgba(14, 165, 233, 0.2);
  }
</style> 