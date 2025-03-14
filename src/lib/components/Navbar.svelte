<script>
  // Props for the navbar
  let { showBackButton = false } = $props();
</script>

<div class="fixed top-6 left-0 right-0 z-50 flex justify-center">
  <div class="navbar-capsule flex items-center justify-between px-4 py-2 mx-4 md:mx-8 lg:mx-16 w-full max-w-7xl rounded-full backdrop-blur-sm bg-gray-800/10 border border-cyan-500/15 shadow-lg shadow-cyan-500/5">
    <!-- Logo and Brand -->
    <div class="flex items-center space-x-3">
      <div class="logo-container h-10 w-10 rounded-full bg-gray-800/15 flex items-center justify-center border border-cyan-500/25">
        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Abstract modern logo -->
          <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" stroke="url(#logoGradient)" stroke-width="1.5" fill="none" />
          <path d="M12 3V10.5M12 21V15M20 7.5L15 10.5M4 7.5L9 10.5M12 10.5L17 13.5L12 15L7 13.5L12 10.5Z" stroke="url(#logoGradient)" stroke-width="1.5" stroke-linecap="round" />
          <defs>
            <linearGradient id="logoGradient" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#22d3ee" />
              <stop offset="50%" stop-color="#0ea5e9" />
              <stop offset="100%" stop-color="#2dd4bf" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <h1 class="text-xl md:text-2xl font-bold text-white">
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400">Axentra</span>
      </h1>
    </div>
    
    <!-- Action Button (Login or Back) -->
    {#if showBackButton}
      <a href="/" class="px-4 py-2 md:px-6 md:py-2 rounded-full bg-gray-800/50 text-white font-medium text-sm md:text-base hover:bg-gray-700/50 transition-all duration-300">
        Tillbaka
      </a>
    {:else}
      <a href="/login" class="login-btn px-4 py-2 md:px-6 md:py-2 rounded-full bg-gradient-to-r from-cyan-500/80 via-blue-500/80 to-teal-500/80 text-white font-medium text-sm md:text-base hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 transform hover:scale-105">
        Logga In
      </a>
    {/if}
  </div>
</div>

<style>
  .navbar-capsule {
    transition: all 0.3s ease;
  }
</style> 