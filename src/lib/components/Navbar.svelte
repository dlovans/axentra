<script>
  // Props for the navbar
  let { showBackButton = false } = $props();
</script>

<div class="fixed top-6 left-0 right-0 z-50 flex justify-center">
  <div class="navbar-capsule flex items-center justify-between px-4 py-2 mx-4 md:mx-8 lg:mx-16 w-full max-w-7xl rounded-full backdrop-blur-sm bg-gray-800/10 border border-cyan-500/15 shadow-lg shadow-cyan-500/5">
    <!-- Logo and Brand -->
    <div class="flex items-center">
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