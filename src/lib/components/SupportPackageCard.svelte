<script>
  // Import necessary functions
  const { scrollToContact } = $props();
</script>

<div class="backdrop-blur-sm bg-gray-800/35 border border-indigo-500/30 shadow-lg shadow-indigo-500/10 rounded-2xl p-4 sm:p-8 relative overflow-hidden">
  <!-- Decorative elements -->
  <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
  <div class="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/2"></div>
  
  <div class="relative z-10">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
      <h3 class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Komplett Supportpaket</h3>
      <div class="px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-full self-start">
        <span class="text-indigo-300 text-sm font-medium whitespace-nowrap">Rekommenderad</span>
      </div>
    </div>
    
    <p class="text-gray-300 mb-8">
      Vårt kompletta supportpaket ger dig tillgång till all hjälp du behöver för att hålla din produkt i toppskick. Från teknisk support till mindre ändringar och akuthjälp.
    </p>
    
    <!-- Feature cards using CSS Grid for better alignment -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <!-- First column -->
      <div class="space-y-4 md:grid md:grid-cols-1 md:grid-rows-2 md:gap-4 md:space-y-0">
        <!-- Teknisk Support -->
        <div class="flex items-start">
          <div class="rounded-full bg-indigo-500/20 p-2 mr-4 mt-1 flex-shrink-0">
            <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
          </div>
          <div>
            <h4 class="text-lg font-medium text-white mb-1">Teknisk Support</h4>
            <p class="text-gray-400 text-sm">Obegränsad support via vår Ticketing Dashboard där du kan skapa och följa ärenden. Svar inom 24 timmar. Hjälp med tekniska frågor, felsökning och användning av din produkt.</p>
          </div>
        </div>
        
        <!-- Mindre Ändringar -->
        <div class="flex items-start">
          <div class="rounded-full bg-purple-500/20 p-2 mr-4 mt-1 flex-shrink-0">
            <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
          </div>
          <div>
            <h4 class="text-lg font-medium text-white mb-1">Mindre Ändringar</h4>
            <p class="text-gray-400 text-sm">Upp till 5 timmars arbete per månad för mindre ändringar och uppdateringar. Större ändringar kan kräva separat offert.</p>
          </div>
        </div>
      </div>
      
      <!-- Second column -->
      <div class="space-y-4 md:grid md:grid-cols-1 md:grid-rows-2 md:gap-4 md:space-y-0">
        <!-- Akutsupport -->
        <div class="flex items-start">
          <div class="rounded-full bg-pink-500/20 p-2 mr-4 mt-1 flex-shrink-0">
            <svg class="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
          </div>
          <div>
            <h4 class="text-lg font-medium text-white mb-1">Akutsupport</h4>
            <p class="text-gray-400 text-sm">Tillgång till akutsupport för kritiska problem. Garanterad respons inom 2 timmar, dygnet runt, alla dagar.</p>
          </div>
        </div>
        
        <!-- Proaktiv Övervakning -->
        <div class="flex items-start">
          <div class="rounded-full bg-blue-500/20 p-2 mr-4 mt-1 flex-shrink-0">
            <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
          </div>
          <div>
            <h4 class="text-lg font-medium text-white mb-1">Proaktiv Övervakning</h4>
            <p class="text-gray-400 text-sm">Vi övervakar din applikation för att upptäcka och åtgärda problem innan de påverkar dina användare.</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="bg-gray-700/30 rounded-lg p-4 mb-6 border border-gray-600/50">
      <div class="flex items-start">
        <svg class="w-5 h-5 text-amber-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-sm text-gray-300">
          <span class="font-medium text-amber-300">Notera:</span> Större ändringar och utvecklingsarbete som överstiger 5 timmar per månad kan kräva separat offert. Kontakta oss för mer information.
        </p>
      </div>
    </div>
    
    <div class="flex flex-col sm:flex-row gap-4 items-center justify-between">
      <div>
        <div class="flex items-center mb-1">
          <span class="text-2xl font-bold text-white mr-2">Kontakta oss</span>
          <span class="text-sm text-gray-400">för prisuppgift</span>
        </div>
        <p class="text-gray-400 text-sm">Anpassat efter dina specifika behov</p>
      </div>
      <div class="flex gap-4 w-full sm:w-auto">
        <a href="#contact-section" onclick={() => scrollToContact()} class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-cyan-500/90 via-blue-500/90 to-teal-500/90 text-white font-medium rounded-md shadow-lg shadow-cyan-500/20 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
          Kontakta oss
        </a>
      </div>
    </div>
  </div>
</div> 