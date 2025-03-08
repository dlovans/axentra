<script>
  import { fade, fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  
  // Navigation items
  const navItems = [
    { name: 'Hem', href: '#' },
    { name: 'Tjänster', href: '#services' },
    { name: 'Priser', href: '#pricing' },
    { name: 'Kontakt', href: '#contact' }
  ];
  
  // Mobile menu state
  let mobileMenuOpen = false;
  
  // Scroll to top button visibility
  let showScrollButton = false;
  
  // Toggle mobile menu
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    
    // Toggle body scroll lock
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
  
  // Close mobile menu when clicking a link
  function closeMenu() {
    mobileMenuOpen = false;
    document.body.style.overflow = '';
  }
  
  // Scroll to top function
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  // Clean up on component unmount
  onMount(() => {
    // Handle scroll event to show/hide scroll button
    const handleScroll = () => {
      showScrollButton = window.scrollY > 500;
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<svelte:head>
  <title>Axentra | Snabb MVP-utveckling för startups</title>
  <meta name="description" content="Vi hjälper startups att snabbt utveckla MVP-webbappar med flexibla prismodeller." />
</svelte:head>

<div class="min-h-screen bg-gray-950 text-white">
  <!-- Header/Navigation -->
  <header class="fixed w-full bg-gray-950/90 backdrop-blur-sm z-50">
    <div class="container mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <div class="mr-3 w-10 h-10">
            <svg viewBox="0 0 100 100" class="w-full h-full">
              <!-- Code brackets -->
              <path 
                d="M30,20 L10,50 L30,80" 
                fill="none" 
                stroke="url(#gradientLine)" 
                stroke-width="5" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                class="animate-pulse-slow"
              />
              <path 
                d="M70,20 L90,50 L70,80" 
                fill="none" 
                stroke="url(#gradientLine)" 
                stroke-width="5" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                class="animate-pulse-slow"
              />
              
              <!-- Rocket -->
              <g class="animate-float">
                <path 
                  d="M50,20 L60,40 L50,70 L40,40 Z" 
                  fill="url(#gradientFill)" 
                  stroke="white" 
                  stroke-width="1"
                />
                <!-- Rocket flames -->
                <path 
                  d="M45,70 L50,85 L55,70" 
                  fill="url(#flameFill)" 
                  class="animate-flicker"
                />
              </g>
              
              <!-- Gradients -->
              <defs>
                <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#8B5CF6" />
                  <stop offset="100%" stop-color="#D946EF" />
                </linearGradient>
                <linearGradient id="gradientFill" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#8B5CF6" />
                  <stop offset="100%" stop-color="#D946EF" />
                </linearGradient>
                <linearGradient id="flameFill" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#D946EF" />
                  <stop offset="100%" stop-color="#EC4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div class="text-2xl font-bold text-violet-400">Axentra</div>
        </div>
        <nav class="hidden md:block">
          <ul class="flex space-x-8">
            {#each navItems as item}
              <li>
                <a 
                  href={item.href} 
                  class="relative px-2 py-1 font-medium group"
                >
                  <span class="relative z-10 transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-fuchsia-500">{item.name}</span>
                  <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-fuchsia-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            {/each}
          </ul>
        </nav>
      </div>
    </div>
  </header>
  
  <!-- Mobile Menu Button (fixed position with correct alignment) -->
  <button 
    class="md:hidden fixed top-[1.45rem] right-4 z-[100] w-10 h-10 flex items-center justify-center" 
    on:click={toggleMobileMenu}
    aria-label="Toggle menu"
  >
    <div class="relative w-6 h-6">
      <span 
        class="absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out"
        class:rotate-45={mobileMenuOpen}
        class:translate-y-0={mobileMenuOpen}
        class:-translate-y-2={!mobileMenuOpen}
      ></span>
      <span 
        class="absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out"
        class:opacity-0={mobileMenuOpen}
      ></span>
      <span 
        class="absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out"
        class:-rotate-45={mobileMenuOpen}
        class:translate-y-0={mobileMenuOpen}
        class:translate-y-2={!mobileMenuOpen}
      ></span>
    </div>
  </button>
    
  <!-- Mobile Menu Overlay -->
  {#if mobileMenuOpen}
    <div 
      class="fixed inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/98 to-black/95 backdrop-blur-md z-[90] md:hidden"
      transition:fade={{ duration: 200 }}
    >
      <div class="h-full flex flex-col justify-center items-center px-6">
        <ul class="space-y-8 text-center w-full">
          {#each navItems as item, i}
            <li 
              in:fly={{ y: 20, delay: i * 100, duration: 300 }}
              class="transform transition-all duration-300 hover:scale-105"
            >
              <a 
                href={item.href} 
                class="text-2xl font-bold relative group inline-block"
                on:click={closeMenu}
              >
                <span class="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-500">
                  {item.name}
                </span>
                <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-fuchsia-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  {/if}

  <!-- Hero Section -->
  <section class="pt-32 pb-20 px-4 bg-gradient-to-b from-gray-950 to-gray-900 relative overflow-hidden">
    <!-- Animated SVG Background -->
    <div class="absolute inset-0 z-0 opacity-20">
      <svg viewBox="0 0 1000 600" class="w-full h-full">
        <!-- Grid Lines -->
        <g class="grid-lines">
          {#each Array(10) as _, i}
            <line 
              x1="0" 
              y1={i * 60} 
              x2="1000" 
              y2={i * 60} 
              stroke="url(#gridGradient)" 
              stroke-width="1" 
              stroke-dasharray="5,5"
              class="animate-pulse-slow"
              style="animation-delay: {i * 0.2}s"
            />
          {/each}
          {#each Array(10) as _, i}
            <line 
              x1={i * 100} 
              y1="0" 
              x2={i * 100} 
              y2="600" 
              stroke="url(#gridGradient)" 
              stroke-width="1" 
              stroke-dasharray="5,5"
              class="animate-pulse-slow"
              style="animation-delay: {i * 0.2}s"
            />
          {/each}
        </g>
        
        <!-- Code Symbols -->
        <g class="code-symbols">
          {#each Array(15) as _, i}
            <text 
              x={Math.random() * 900 + 50} 
              y={Math.random() * 500 + 50} 
              fill="url(#textGradient)" 
              font-family="monospace" 
              font-size="20"
              opacity="0.7"
              class="animate-float"
              style="animation-delay: {i * 0.3}s; animation-duration: {4 + Math.random() * 3}s"
            >
              {['{ }', '[ ]', '( )', '</>', '/*', '*/', '=>', '&&', '||', '++', '==', '!=', '>=', '<=', '...'][i % 15]}
            </text>
          {/each}
        </g>
        
        <!-- Animated Paths -->
        <g class="animated-paths">
          <path 
            d="M100,300 C200,100 300,500 400,300 C500,100 600,500 700,300 C800,100 900,500 1000,300" 
            fill="none" 
            stroke="url(#pathGradient)" 
            stroke-width="3" 
            stroke-linecap="round"
            class="animate-draw"
          />
          <path 
            d="M100,350 C250,550 350,150 500,350 C650,550 750,150 900,350" 
            fill="none" 
            stroke="url(#pathGradient2)" 
            stroke-width="3" 
            stroke-linecap="round"
            class="animate-draw"
            style="animation-delay: 1s"
          />
        </g>
        
        <!-- Floating Circles -->
        <g class="floating-circles">
          {#each Array(8) as _, i}
            <circle 
              cx={150 + i * 100} 
              cy={250 + (i % 2) * 100} 
              r={5 + Math.random() * 10}
              fill="url(#circleGradient)"
              class="animate-pulse-float"
              style="animation-delay: {i * 0.5}s"
            />
          {/each}
        </g>
        
        <!-- Gradients -->
        <defs>
          <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.3" />
            <stop offset="100%" stop-color="#D946EF" stop-opacity="0.3" />
          </linearGradient>
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#8B5CF6" />
            <stop offset="100%" stop-color="#D946EF" />
          </linearGradient>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#8B5CF6" />
            <stop offset="100%" stop-color="#D946EF" />
          </linearGradient>
          <linearGradient id="pathGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#D946EF" />
            <stop offset="100%" stop-color="#8B5CF6" />
          </linearGradient>
          <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#8B5CF6" />
            <stop offset="100%" stop-color="#D946EF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    
    <div class="container mx-auto text-center relative z-10">
      <h1 class="text-5xl md:text-6xl font-bold mb-6">
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-500">Snabb</span> utveckling för 
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-500">startups</span>
      </h1>
      <p class="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
        Vi hjälper innovativa startups att lansera sina MVP-webbappar på rekordtid.
      </p>
      <a href="#contact" class="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-all shadow-lg hover:shadow-violet-500/20">
        Kom igång idag
      </a>
    </div>
  </section>

  <!-- Services Section -->
  <section id="services" class="py-20 px-4 bg-gray-900">
    <div class="container mx-auto">
      <h2 class="text-4xl font-bold text-center mb-16">Vår specialitet</h2>
      <div class="grid md:grid-cols-2 gap-10">
        <div class="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-violet-500 transition-colors shadow-lg">
          <div class="text-violet-400 text-5xl mb-4">⚡</div>
          <h3 class="text-2xl font-bold mb-4">Snabb utveckling</h3>
          <p class="text-gray-300">
            Vi fokuserar på att leverera fungerande MVP-lösningar på kortast möjliga tid. 
            Från idé till lansering på veckor, inte månader.
          </p>
        </div>
        <div class="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-fuchsia-500 transition-colors shadow-lg">
          <div class="text-fuchsia-400 text-5xl mb-4">🚀</div>
          <h3 class="text-2xl font-bold mb-4">Startup-fokus</h3>
          <p class="text-gray-300">
            Vi förstår startups unika behov och utmaningar. Vår process är anpassad för 
            att maximera värdet för din startup med begränsade resurser.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Process Section -->
  <section id="process" class="py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-950">
    <div class="container mx-auto">
      <h2 class="text-4xl font-bold text-center mb-6">Arbetsprocess</h2>
      <p class="text-xl text-center text-gray-300 max-w-3xl mx-auto mb-16">
        Enkel och effektiv process för att snabbt komma igång med ditt projekt.
      </p>
      
      <div class="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
        <!-- Step 1 -->
        <div class="relative">
          <div class="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-violet-400 transition-colors shadow-lg h-full">
            <div class="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-center text-xl font-bold">1</div>
            
            <!-- Email SVG Icon -->
            <div class="w-20 h-20 mx-auto mb-6 text-violet-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full animate-pulse-slow">
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
            </div>
            
            <h3 class="text-xl font-bold mb-4 mt-2 text-center">Kontakt</h3>
            <p class="text-gray-300 text-center">
              Skicka ett mail med en kort beskrivning av ditt projekt och dina behov.
            </p>
          </div>
          <div class="hidden md:block absolute top-1/2 right-0 w-1/2 h-0.5 bg-gradient-to-r from-violet-400 to-fuchsia-500 transform translate-x-4"></div>
        </div>
        
        <!-- Step 2 -->
        <div class="relative">
          <div class="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-violet-400 transition-colors shadow-lg h-full">
            <div class="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-center text-xl font-bold">2</div>
            
            <!-- Meeting SVG Icon -->
            <div class="w-20 h-20 mx-auto mb-6 text-fuchsia-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full animate-float">
                <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
              </svg>
            </div>
            
            <h3 class="text-xl font-bold mb-4 mt-2 text-center">Möte</h3>
            <p class="text-gray-300 text-center">
              Vi bokar ett möte på ett café i Stockholm för att diskutera ditt projekt i detalj.
            </p>
          </div>
          <div class="hidden md:block absolute top-1/2 right-0 w-1/2 h-0.5 bg-gradient-to-r from-violet-400 to-fuchsia-500 transform translate-x-4"></div>
        </div>
        
        <!-- Step 3 -->
        <div class="relative">
          <div class="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-violet-400 transition-colors shadow-lg h-full">
            <div class="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-center text-xl font-bold">3</div>
            
            <!-- Document SVG Icon -->
            <div class="w-20 h-20 mx-auto mb-6 text-violet-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full animate-pulse-slow">
                <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clip-rule="evenodd" />
                <path fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
              </svg>
            </div>
            
            <h3 class="text-xl font-bold mb-4 mt-2 text-center">Överenskommelse</h3>
            <p class="text-gray-300 text-center">
              Vi diskuterar prissättning och samarbetsform, och kommer överens om projektets omfattning.
            </p>
          </div>
          <div class="hidden md:block absolute top-1/2 right-0 w-1/2 h-0.5 bg-gradient-to-r from-violet-400 to-fuchsia-500 transform translate-x-4"></div>
        </div>
        
        <!-- Step 4 -->
        <div class="relative">
          <div class="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-violet-400 transition-colors shadow-lg h-full">
            <div class="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-center text-xl font-bold">4</div>
            
            <!-- Code SVG Icon -->
            <div class="w-20 h-20 mx-auto mb-6 text-fuchsia-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full animate-float">
                <path fill-rule="evenodd" d="M14.447 3.027a.75.75 0 01.527.92l-4.5 16.5a.75.75 0 01-1.448-.394l4.5-16.5a.75.75 0 01.921-.526zM16.72 6.22a.75.75 0 011.06 0l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 11-1.06-1.06L21.44 12l-4.72-4.72a.75.75 0 010-1.06zm-9.44 0a.75.75 0 010 1.06L2.56 12l4.72 4.72a.75.75 0 11-1.06 1.06L.97 12.53a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0z" clip-rule="evenodd" />
              </svg>
            </div>
            
            <h3 class="text-xl font-bold mb-4 mt-2 text-center">Utveckling</h3>
            <p class="text-gray-300 text-center">
              Snabb utveckling påbörjas med kontinuerlig kommunikation och regelbundna uppdateringar.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Pricing Section -->
  <section id="pricing" class="py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-950">
    <div class="container mx-auto">
      <h2 class="text-4xl font-bold text-center mb-6">Flexibla prismodeller</h2>
      <p class="text-xl text-center text-gray-300 max-w-3xl mx-auto mb-16">
        Vi erbjuder olika samarbetsformer anpassade efter din startups behov och budget.
      </p>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Timbaserad -->
        <div class="bg-gray-800 border border-gray-700 rounded-xl p-8 hover:border-violet-400 transition-colors shadow-lg hover:shadow-violet-500/10">
          <!-- Time SVG Icon -->
          <div class="w-16 h-16 mb-4 mx-auto text-violet-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-full h-full animate-pulse-slow">
              <circle cx="12" cy="12" r="10" stroke-width="1.5" />
              <path d="M12 6v6l4 2" stroke-width="1.5" />
              <path d="M18 12a6 6 0 1 1-12 0 6 6 0 0 1 12 0z" stroke-width="0.75" opacity="0.5" />
            </svg>
          </div>
          
          <h3 class="text-2xl font-bold mb-4 text-center">Timbaserad</h3>
          <div class="mb-4 text-center">
            <span class="text-3xl font-bold text-violet-400">900 SEK</span>
            <span class="text-gray-400 text-sm">/h (exkl. moms)</span>
          </div>
          <p class="text-gray-300 mb-6 text-center">
            Flexibel utveckling efter dina behov med transparent timdebitering.
          </p>
          <ul class="space-y-3 mb-8">
            <li class="flex items-start">
              <span class="text-violet-400 mr-2">✓</span>
              <span>Maximal flexibilitet</span>
            </li>
            <li class="flex items-start">
              <span class="text-violet-400 mr-2">✓</span>
              <span>Transparent fakturering</span>
            </li>
            <li class="flex items-start">
              <span class="text-violet-400 mr-2">✓</span>
              <span>Ingen långsiktig bindning</span>
            </li>
          </ul>
        </div>
        
        <!-- Fast pris -->
        <div class="bg-gray-800 border border-gray-700 rounded-xl p-8 hover:border-fuchsia-400 transition-colors shadow-lg hover:shadow-fuchsia-500/10">
          <!-- Document SVG Icon -->
          <div class="w-16 h-16 mb-4 mx-auto text-fuchsia-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-full h-full animate-float">
              <path d="M14 3v4a1 1 0 0 0 1 1h4" stroke-width="1.5" />
              <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" stroke-width="1.5" />
              <path d="M9 9h1" stroke-width="1.5" stroke-linecap="round" />
              <path d="M9 13h6" stroke-width="1.5" stroke-linecap="round" />
              <path d="M9 17h6" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </div>
          
          <h3 class="text-2xl font-bold mb-4 text-center">Fast pris</h3>
          <p class="text-gray-300 mb-6 text-center">
            Förutsägbar kostnad med tydligt definierat scope och leveransdatum.
          </p>
          <ul class="space-y-3 mb-8">
            <li class="flex items-start">
              <span class="text-fuchsia-400 mr-2">✓</span>
              <span>Förutsägbar budget</span>
            </li>
            <li class="flex items-start">
              <span class="text-fuchsia-400 mr-2">✓</span>
              <span>Tydlig leveransplan</span>
            </li>
            <li class="flex items-start">
              <span class="text-fuchsia-400 mr-2">✓</span>
              <span>Definierat scope</span>
            </li>
          </ul>
        </div>
        
        <!-- Fast pris + aktier -->
        <div class="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 border border-violet-500 rounded-xl p-8 hover:border-violet-400 transition-colors shadow-lg hover:shadow-violet-500/20 relative">
          <!-- Recommended badge that doesn't disrupt layout -->
          <div class="absolute top-3 right-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-xs font-bold text-white px-2 py-1 rounded-full">Rekommenderad</div>
          
          <!-- Chart/Growth SVG Icon - slightly enhanced -->
          <div class="w-16 h-16 mb-4 mx-auto text-violet-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-full h-full animate-pulse-slow">
              <path d="M21 21H4.6c-.56 0-1.1-.22-1.48-.62a2.1 2.1 0 0 1-.62-1.48V3" stroke-width="1.5" stroke-linecap="round" />
              <path d="M7 14l3.5-3.5L14 14l5.5-5.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M17 8.5h2.5V11" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <!-- Enhanced sparkles -->
              <path d="M12 7l1-1 1 1-1 1z" stroke-width="1" opacity="0.9" class="animate-pulse-slow" />
              <path d="M18 12l1-1 1 1-1 1z" stroke-width="1" opacity="0.9" class="animate-pulse-slow" style="animation-delay: 1s" />
              <path d="M15 17l0.5-0.5 0.5 0.5-0.5 0.5z" stroke-width="0.75" opacity="0.8" class="animate-pulse-slow" style="animation-delay: 0.5s" />
            </svg>
          </div>
          
          <h3 class="text-2xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">Fast pris + aktier</h3>
          <p class="text-gray-300 mb-6 text-center">
            Reducerad kontantkostnad i utbyte mot delägarskap i din startup.
          </p>
          <ul class="space-y-3 mb-8">
            <li class="flex items-start">
              <span class="text-violet-400 font-bold mr-2">✓</span>
              <span>Lägre initial kostnad</span>
            </li>
            <li class="flex items-start">
              <span class="text-violet-400 font-bold mr-2">✓</span>
              <span>Långsiktigt engagemang</span>
            </li>
            <li class="flex items-start">
              <span class="text-violet-400 font-bold mr-2">✓</span>
              <span>Delad framgång</span>
            </li>
            <li class="flex items-start">
              <span class="text-violet-400 font-bold mr-2">✓</span>
              <span>Strategisk rådgivning</span>
            </li>
          </ul>
        </div>
        
        <!-- Medgrundare -->
        <div class="bg-gray-800 border border-gray-700 rounded-xl p-8 hover:border-fuchsia-400 transition-colors shadow-lg hover:shadow-fuchsia-500/10">
          <!-- Building/Organization SVG Icon -->
          <div class="w-16 h-16 mb-4 mx-auto text-fuchsia-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-full h-full animate-float">
              <path d="M3 21h18" stroke-width="1.5" stroke-linecap="round" />
              <path d="M5 21V7l8-4v18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M19 21V11l-6-4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M9 9v2" stroke-width="1.5" stroke-linecap="round" />
              <path d="M9 15v2" stroke-width="1.5" stroke-linecap="round" />
              <path d="M14 13v2" stroke-width="1.5" stroke-linecap="round" />
              <path d="M14 17v2" stroke-width="1.5" stroke-linecap="round" />
              <!-- Person at top -->
              <circle cx="12" cy="4" r="1.5" stroke-width="0.75" />
            </svg>
          </div>
          
          <h3 class="text-2xl font-bold mb-4 text-center">Medgrundare</h3>
          <p class="text-gray-300 mb-6 text-center">
            Fullt engagemang som teknisk medgrundare i ditt startup-team.
          </p>
          <ul class="space-y-3 mb-8">
            <li class="flex items-start">
              <span class="text-fuchsia-400 mr-2">✓</span>
              <span>Teknisk partner</span>
            </li>
            <li class="flex items-start">
              <span class="text-fuchsia-400 mr-2">✓</span>
              <span>Strategiskt engagemang</span>
            </li>
            <li class="flex items-start">
              <span class="text-fuchsia-400 mr-2">✓</span>
              <span>Långsiktig vision</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="py-20 px-4 bg-gray-900">
    <div class="container mx-auto max-w-xl">
      <h2 class="text-4xl font-bold text-center mb-10">Kontakta oss</h2>
      <form class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium mb-2">Namn</label>
          <input type="text" id="name" class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500">
        </div>
        <div>
          <label for="email" class="block text-sm font-medium mb-2">E-post</label>
          <input type="email" id="email" class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500">
        </div>
        <div>
          <label for="message" class="block text-sm font-medium mb-2">Idé</label>
          <textarea id="message" rows="4" class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 resize-none"></textarea>
        </div>
        <button type="submit" class="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-violet-500/20">
          Skicka
        </button>
      </form>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-16 px-4 bg-gray-900 border-t border-gray-800">
    <div class="container mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <!-- Company Info -->
        <div>
          <div class="flex items-center mb-6">
            <div class="mr-3 w-8 h-8">
              <svg viewBox="0 0 100 100" class="w-full h-full">
                <!-- Code brackets -->
                <path 
                  d="M30,20 L10,50 L30,80" 
                  fill="none" 
                  stroke="url(#gradientLine)" 
                  stroke-width="5" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"
                  class="animate-pulse-slow"
                />
                <path 
                  d="M70,20 L90,50 L70,80" 
                  fill="none" 
                  stroke="url(#gradientLine)" 
                  stroke-width="5" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"
                  class="animate-pulse-slow"
                />
                
                <!-- Rocket -->
                <g class="animate-float">
                  <path 
                    d="M50,20 L60,40 L50,70 L40,40 Z" 
                    fill="url(#gradientFill)" 
                    stroke="white" 
                    stroke-width="1"
                  />
                  <!-- Rocket flames -->
                  <path 
                    d="M45,70 L50,85 L55,70" 
                    fill="url(#flameFill)" 
                    class="animate-flicker"
                  />
                </g>
              </svg>
            </div>
            <div class="text-xl font-bold text-violet-400">Axentra AB</div>
          </div>
          <p class="text-gray-400 mb-4">
            Snabb MVP-utveckling för startups med flexibla prismodeller.
          </p>
        </div>
        
        <!-- Contact Info -->
        <div>
          <h3 class="text-lg font-bold mb-4 text-white">Kontaktuppgifter</h3>
          <ul class="space-y-3 text-gray-400">
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-violet-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
              <span>Edingekroken 12<br>163 63 Spånga<br>Stockholm, Sweden</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-violet-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <a href="mailto:dlovan@axentra.app" class="hover:text-violet-400 transition-colors">dlovan@axentra.app</a>
            </li>
          </ul>
        </div>
        
        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-bold mb-4 text-white">Snabblänkar</h3>
          <ul class="space-y-2 text-gray-400">
            {#each navItems as item}
              <li>
                <a href={item.href} class="hover:text-violet-400 transition-colors flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-violet-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                  {item.name}
                </a>
              </li>
            {/each}
          </ul>
        </div>
      </div>
      
      <div class="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
        <div class="text-gray-500 text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} Axentra AB. Alla rättigheter förbehållna.
        </div>
        <div class="flex space-x-4">
          <a href="https://www.linkedin.com/company/axentra-ab" class="text-gray-400 hover:text-violet-400 transition-colors" target="_blank" rel="noopener noreferrer">
            <span class="sr-only">LinkedIn</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="https://github.com/dlovans" class="text-gray-400 hover:text-violet-400 transition-colors" target="_blank" rel="noopener noreferrer">
            <span class="sr-only">GitHub</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Scroll to top button - mobile only -->
  {#if showScrollButton}
    <button 
      on:click={scrollToTop}
      class="md:hidden fixed bottom-6 right-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full w-12 h-12 flex items-center justify-center shadow-lg z-40 transition-all hover:scale-105"
      transition:fade={{ duration: 200 }}
      aria-label="Scroll to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  {/if}
</div>

<style>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes pulse-slow {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }
  
  @keyframes flicker {
    0%, 100% {
      opacity: 1;
      transform: scaleY(1);
    }
    50% {
      opacity: 0.8;
      transform: scaleY(0.8);
    }
  }
  
  @keyframes pulse-float {
    0%, 100% {
      opacity: 0.7;
      transform: translateY(0) scale(1);
    }
    50% {
      opacity: 1;
      transform: translateY(-10px) scale(1.1);
    }
  }
  
  @keyframes draw {
    0% {
      stroke-dasharray: 1500;
      stroke-dashoffset: 1500;
    }
    50% {
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dasharray: 1500;
      stroke-dashoffset: -1500;
    }
  }
  
  @keyframes blink {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
  
  .animate-pulse-slow {
    animation: pulse-slow 3s infinite;
  }
  
  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
  
  .animate-flicker {
    animation: flicker 0.5s ease-in-out infinite;
  }
  
  .animate-pulse-float {
    animation: pulse-float 5s ease-in-out infinite;
  }
  
  .animate-draw {
    animation: draw 15s linear infinite;
  }
</style>
