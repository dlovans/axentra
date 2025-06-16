<script>
  // Props for the navbar
  let { showBackButton = false } = $props();
  let mobileMenuOpen = $state(false);
  
  function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      mobileMenuOpen = false; // Close mobile menu after navigation
    }
  }
  
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
</script>

<div class="fixed top-6 left-0 right-0 z-50 flex justify-center">
  <div class="navbar-capsule flex items-center justify-between px-6 py-4 mx-4 md:mx-8 w-full max-w-4xl rounded-xl backdrop-blur-sm bg-white/60 border border-gray-200/60 shadow-lg shadow-gray-300/20">
    <!-- Logo and Brand -->
    <div class="flex items-center">
      <h1 class="text-xl md:text-2xl font-bold text-gray-800">
        <span class="flex gap-2 text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-600 to-orange-500">
          <img src="/favicon.png" alt="Axentra Logo" class="w-8">
          Axentra
        </span>
      </h1>
    </div>
    
    <!-- Navigation Buttons or Back Button -->
    {#if showBackButton}
      <a href="/" class="px-6 py-3 md:px-8 md:py-3 rounded-xl bg-gray-100/80 text-gray-700 font-medium text-base md:text-lg hover:bg-gray-200/80 transition-all duration-300">
        Back
      </a>
    {:else}
      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center space-x-1">
        <button 
          onclick={() => scrollToSection('hero')} 
          class="px-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100/50 rounded-lg transition-all duration-200"
        >
          Home
        </button>
        <button 
          onclick={() => scrollToSection('features')} 
          class="px-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100/50 rounded-lg transition-all duration-200"
        >
          Services
        </button>
        <button 
          onclick={() => scrollToSection('process')} 
          class="px-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100/50 rounded-lg transition-all duration-200"
        >
          Process
        </button>
        <button 
          onclick={() => scrollToSection('pricing-section')} 
          class="px-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100/50 rounded-lg transition-all duration-200"
        >
          Pricing
        </button>
        <button 
          onclick={() => scrollToSection('projects-section')} 
          class="px-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100/50 rounded-lg transition-all duration-200"
        >
          Projects
        </button>
        <button 
          onclick={() => scrollToSection('contact-section')} 
          class="px-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100/50 rounded-lg transition-all duration-200"
        >
          Contact
        </button>
      </nav>
      
      <!-- Mobile Menu Button -->
      <button 
        onclick={toggleMobileMenu}
        class="md:hidden p-2 rounded-lg hover:bg-gray-100/50 transition-all duration-200"
        aria-label="Toggle mobile menu"
      >
        <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {#if mobileMenuOpen}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          {:else}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          {/if}
        </svg>
      </button>
    {/if}
  </div>
</div>

<!-- Mobile Dropdown Menu -->
{#if !showBackButton && mobileMenuOpen}
  <div class="fixed top-24 left-4 right-4 z-40 md:hidden">
    <div class="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg shadow-gray-300/20 py-2">
      <button 
        onclick={() => scrollToSection('hero')} 
        class="w-full text-left px-6 py-3 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100/50 transition-all duration-200"
      >
        Home
      </button>
      <button 
        onclick={() => scrollToSection('features')} 
        class="w-full text-left px-6 py-3 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100/50 transition-all duration-200"
      >
        Services
      </button>
      <button 
        onclick={() => scrollToSection('process')} 
        class="w-full text-left px-6 py-3 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100/50 transition-all duration-200"
      >
        Process
      </button>
      <button 
        onclick={() => scrollToSection('pricing-section')} 
        class="w-full text-left px-6 py-3 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100/50 transition-all duration-200"
      >
        Pricing
      </button>
      <button 
        onclick={() => scrollToSection('projects-section')} 
        class="w-full text-left px-6 py-3 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100/50 transition-all duration-200"
      >
        Projects
      </button>
      <button 
        onclick={() => scrollToSection('contact-section')} 
        class="w-full text-left px-6 py-3 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100/50 transition-all duration-200"
      >
        Contact
      </button>
    </div>
  </div>
{/if}

<style>
  .navbar-capsule {
    transition: all 0.3s ease;
  }
</style>