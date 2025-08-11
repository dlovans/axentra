<!-- Contact Info -->
<div class="flex flex-col gap-4 md:gap-6">
  <!-- Email Card -->
  <div class="contact-card bg-white border-2 border-gray-200 shadow-lg shadow-gray-500/10 rounded-xl p-4 md:p-6 transform transition-all duration-300 hover:translate-y-[-5px]">
    <div class="flex items-center gap-3 md:gap-4">
      <div class="rounded-full bg-orange-100 p-3 md:p-4 flex items-center justify-center border border-orange-200 flex-shrink-0">
        <svg class="w-6 h-6 md:w-8 md:h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      </div>
      <div class="overflow-hidden">
        <h3 class="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-orange-500 mb-1 md:mb-2">Email</h3>
        <p class="text-gray-600 mb-1 md:mb-2 text-sm md:text-base">Send me an email directly:</p>
        <a href="mailto:dlovan@axentra.agency" class="text-sm md:text-lg font-medium text-gray-800 hover:text-orange-600 transition-colors break-all">dlovan@axentra.agency</a>
      </div>
    </div>
  </div>
  
  <!-- Location Card -->
  <div class="contact-card bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 shadow-lg shadow-gray-500/10 rounded-xl p-4 md:p-6 transform transition-all duration-300 hover:translate-y-[-5px]">
    <div class="flex items-center gap-3 md:gap-4">
      <div class="rounded-full bg-gray-200 p-3 md:p-4 flex items-center justify-center border border-gray-300 flex-shrink-0">
        <svg class="w-6 h-6 md:w-8 md:h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      </div>
      <div>
        <h3 class="text-lg md:text-xl font-bold text-gray-700 mb-1 md:mb-2">Location</h3>
        <p class="text-gray-600 mb-1 md:mb-2 text-sm md:text-base">I'm located in:</p>
        <p class="text-sm md:text-lg font-medium text-gray-800">Stockholm, Sweden</p>
      </div>
    </div>
  </div>
  
  <!-- Response Time Card -->
  <div class="contact-card bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 shadow-lg shadow-green-500/10 rounded-xl p-4 md:p-6 transform transition-all duration-300 hover:translate-y-[-5px]">
    <div class="flex items-center gap-3 md:gap-4">
      <div class="rounded-full bg-green-100 p-3 md:p-4 flex items-center justify-center border border-green-200 flex-shrink-0">
        <svg class="w-6 h-6 md:w-8 md:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <div>
        <h3 class="text-lg md:text-xl font-bold text-green-700 mb-1 md:mb-2">Response Time</h3>
        <p class="text-gray-600 mb-1 md:mb-2 text-sm md:text-base">I usually respond within:</p>
        <p class="text-sm md:text-lg font-medium text-gray-800">24 hours</p>
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
    box-shadow: 0 10px 25px -5px rgba(249, 115, 22, 0.15);
  }
</style>