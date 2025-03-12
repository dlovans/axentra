<script>
  import { fade, fly, scale, blur, slide } from 'svelte/transition';
  import { cubicOut, backOut, elasticOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  
  // Navigation items
  const navItems = [
    { name: 'Hem', href: '#' },
    { name: 'Tjänster', href: '#services' },
    { name: 'Priser', href: '#pricing' },
    { name: 'Kontakt', href: '#contact' }
  ];
  
  // Mobile menu state
  let mobileMenuOpen = $state(false);
  
  // Scroll to top button visibility
  let showScrollButton = $state(false);
  
  // Hero animation state
  let heroVisible = $state(false);
  
  // Services section visibility
  let servicesVisible = $state(false);
  
  // Process section visibility
  let processVisible = $state(false);
  
  // Pricing section visibility
  let pricingVisible = $state(false);
  
  // Contact section visibility
  let contactVisible = $state(false);
  
  // Footer section visibility
  let footerVisible = $state(false);
  
  // Services section reference
  let servicesSection;
  
  // Process section reference
  let processSection;
  
  // Pricing section reference
  let pricingSection;
  
  // Contact section reference
  let contactSection;
  
  // Footer section reference
  let footerSection;
  
  // Form handling
  let name = $state('');
  let email = $state('');
  let message = $state('');
  let isSubmitting = $state(false);
  let formStatus = $state({ type: '', message: '' });
  let formTouched = $state({ name: false, email: false, message: false });
  
  // Form validation
  let nameError = $derived(formTouched.name && !name ? 'Namn krävs' : '');
  let emailError = $derived(formTouched.email && (!email || !/^\S+@\S+\.\S+$/.test(email)) 
      ? 'Ange en giltig e-postadress' : '');
  let messageError = $derived(formTouched.message && !message ? 'Meddelande krävs' : '');
  let isFormValid = $derived(name && email && message && !nameError && !emailError && !messageError);
  
  // Initialize hero animation when component is mounted
  onMount(() => {
    // Small delay to ensure DOM is ready
    heroVisible = true;
    
    // Set up Intersection Observer for services section
    const servicesObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !servicesVisible) {
          servicesVisible = true;
          // Once visible, disconnect the observer (only trigger once)
          servicesObserver.disconnect();
        }
      });
    }, { threshold: 0.2 }); // Trigger when 20% of the section is visible
    
    // Start observing the services section
    if (servicesSection) {
      servicesObserver.observe(servicesSection);
    }
    
    // Set up Intersection Observer for process section
    const processObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !processVisible) {
          processVisible = true;
          // Once visible, disconnect the observer (only trigger once)
          processObserver.disconnect();
        }
      });
    }, { threshold: 0.2 }); // Trigger when 20% of the section is visible
    
    // Start observing the process section
    if (processSection) {
      processObserver.observe(processSection);
    }
    
    // Set up Intersection Observer for pricing section
    const pricingObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !pricingVisible) {
          pricingVisible = true;
          // Once visible, disconnect the observer (only trigger once)
          pricingObserver.disconnect();
        }
      });
    }, { threshold: 0.2 }); // Trigger when 20% of the section is visible
    
    // Start observing the pricing section
    if (pricingSection) {
      pricingObserver.observe(pricingSection);
    }
    
    // Set up Intersection Observer for contact section
    const contactObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !contactVisible) {
          contactVisible = true;
          // Once visible, disconnect the observer (only trigger once)
          contactObserver.disconnect();
        }
      });
    }, { threshold: 0.2 }); // Trigger when 20% of the section is visible
    
    // Start observing the contact section
    if (contactSection) {
      contactObserver.observe(contactSection);
    }
    
    // Set up Intersection Observer for footer section
    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !footerVisible) {
          footerVisible = true;
          // Once visible, disconnect the observer (only trigger once)
          footerObserver.disconnect();
        }
      });
    }, { threshold: 0.1 }); // Trigger when 10% of the section is visible
    
    // Start observing the footer section
    if (footerSection) {
      footerObserver.observe(footerSection);
    }
  });
  
  // Custom transition for title parts with combination of effects
  function heroTitleTransition(node, { delay = 0, duration = 800 }) {
    return {
      delay,
      duration,
      css: (t) => {
        const eased = cubicOut(t);
        return `
          opacity: ${eased};
          transform: translateY(${(1 - eased) * 30}px) scale(${0.95 + eased * 0.05});
          filter: blur(${(1 - eased) * 5}px);
        `;
      }
    };
  }
  
  // Custom transition for cards that won't affect layout
  function cardSlideIn(node, { delay = 0, duration = 800, direction = 'right' }) {
    const xValue = direction === 'left' ? -40 : 40;
    return {
      delay,
      duration,
      css: (t) => {
        const eased = cubicOut(t);
        return `
          opacity: ${eased};
          transform: translateX(${(1 - eased) * xValue}px);
          transform-origin: center center;
        `;
      }
    };
  }
  
  // Custom transition for services cards that won't affect layout
  function servicesCardTransition(node, { delay = 0, duration = 800, direction = 'none' }) {
    let transform;
    if (direction === 'left') {
      transform = `translateX(${-30}px)`;
    } else if (direction === 'right') {
      transform = `translateX(${30}px)`;
    } else {
      transform = 'translateY(30px)';
    }
    
    return {
      delay,
      duration,
      css: (t) => {
        const eased = cubicOut(t);
        return `
          opacity: ${eased};
          transform-origin: center center;
          transform: scale(${0.95 + eased * 0.05}) ${direction !== 'none' ? `translateX(${(1 - eased) * (direction === 'left' ? -30 : 30)}px)` : `translateY(${(1 - eased) * 30}px)`};
          position: relative;
          z-index: 1;
        `;
      }
    };
  }
  
  // Improved transition function that won't affect layout or push elements out of view
  function safeTransition(node, { delay = 0, duration = 800, direction = 'none', scale = true }) {
    return {
      delay,
      duration,
      css: (t) => {
        const eased = cubicOut(t);
        let transform = '';
        
        // Apply scale if requested
        if (scale) {
          transform += `scale(${0.95 + eased * 0.05}) `;
        }
        
        // Apply translation based on direction
        if (direction === 'left') {
          transform += `translateX(${(1 - eased) * -20}px)`;
        } else if (direction === 'right') {
          transform += `translateX(${(1 - eased) * 20}px)`;
        } else if (direction === 'up') {
          transform += `translateY(${(1 - eased) * -20}px)`;
        } else if (direction === 'down') {
          transform += `translateY(${(1 - eased) * 20}px)`;
        }
        
        return `
          opacity: ${eased};
          transform: ${transform};
          transform-origin: center center;
          position: relative;
          z-index: 1;
          will-change: transform, opacity;
        `;
      }
    };
  }
  
  // Creative transition for contact form elements with a twist
  function revealTransition(node, { delay = 0, duration = 800, index = 0 }) {
    // Calculate a unique delay based on the element's index
    const staggerDelay = delay + (index * 120);
    
    return {
      delay: staggerDelay,
      duration,
      css: (t) => {
        const eased = cubicOut(t);
        
        // Create a wave-like effect with a slight bounce
        const wave = Math.sin(t * Math.PI) * (1 - t) * 8;
        
        // Add a slight rotation for a more dynamic feel
        const rotation = (1 - eased) * (index % 2 === 0 ? -2 : 2);
        
        return `
          opacity: ${eased};
          transform: translateY(${(1 - eased) * 25 + wave}px) rotate(${rotation}deg);
          transform-origin: center center;
          position: relative;
          z-index: 1;
          will-change: transform, opacity;
          box-shadow: 0 ${(1 - eased) * 20}px ${eased * 30}px rgba(139, 92, 246, ${(1 - eased) * 0.2});
          border-radius: ${4 + (1 - eased) * 8}px;
        `;
      }
    };
  }
  
  // Glowing text transition for headings
  function glowTextTransition(node, { delay = 0, duration = 1200 }) {
    return {
      delay,
      duration,
      css: (t) => {
        const eased = cubicOut(t);
        
        // Create a pulsing glow effect
        const glow = Math.sin(t * Math.PI * 2) * 0.5 + 0.5;
        
        return `
          opacity: ${eased};
          transform: scale(${0.9 + eased * 0.1});
          text-shadow: 0 0 ${10 * glow}px rgba(139, 92, 246, ${0.3 * glow + 0.2}),
                       0 0 ${20 * glow}px rgba(217, 70, 239, ${0.2 * glow + 0.1});
          position: relative;
          z-index: 1;
          will-change: transform, opacity, text-shadow;
        `;
      }
    };
  }
  
  // Sexy reveal transition for footer elements
  function sexyReveal(node, { delay = 0, duration = 800, index = 0, direction = 'up' }) {
    // Calculate a unique delay based on the element's index
    const staggerDelay = delay + (index * 100);
    
    return {
      delay: staggerDelay,
      duration,
      css: (t) => {
        const eased = cubicOut(t);
        
        // Create a subtle bounce effect
        const bounce = Math.sin(t * Math.PI) * (1 - t) * 5;
        
        // Direction-based translation
        let transform = '';
        if (direction === 'up') {
          transform = `translateY(${(1 - eased) * 20 + bounce}px)`;
        } else if (direction === 'left') {
          transform = `translateX(${(1 - eased) * -20 + bounce}px)`;
        } else if (direction === 'right') {
          transform = `translateX(${(1 - eased) * 20 + bounce}px)`;
        }
        
        // Add a subtle scale effect
        transform += ` scale(${0.95 + eased * 0.05})`;
        
        // Create a sexy gradient border effect
        const borderGlow = eased * 100;
        
        return `
          opacity: ${eased};
          transform: ${transform};
          transform-origin: center center;
          position: relative;
          z-index: 1;
          will-change: transform, opacity;
          box-shadow: 0 ${(1 - eased) * 10}px ${eased * 20}px rgba(139, 92, 246, ${(1 - eased) * 0.1});
          background-position: ${borderGlow}% 0;
        `;
      }
    };
  }
  
  // Gradient text reveal for footer
  function gradientTextReveal(node, { delay = 0, duration = 1000 }) {
    return {
      delay,
      duration,
      css: (t) => {
        const eased = cubicOut(t);
        
        // Create a gradient reveal effect
        const gradientPos = (1 - eased) * 200;
        
        return `
          opacity: ${eased};
          background: linear-gradient(90deg, transparent ${gradientPos}%, rgba(139, 92, 246, 0.8) ${gradientPos + 10}%, rgba(217, 70, 239, 0.8) ${gradientPos + 50}%, transparent ${gradientPos + 60}%);
          background-clip: text;
          -webkit-background-clip: text;
          color: ${t < 0.7 ? 'transparent' : 'inherit'};
          transform: scale(${0.95 + eased * 0.05});
          position: relative;
          z-index: 1;
          will-change: transform, opacity, background;
        `;
      }
    };
  }
  
  // Form submission handler
  async function handleSubmit(event) {
    // Prevent default form submission
    event.preventDefault();
    
    // Mark all fields as touched
    formTouched = { name: true, email: true, message: true };
    
    // Don't submit if form is invalid
    if (!isFormValid) return;
    
    // Set submitting state
    isSubmitting = true;
    formStatus = { type: '', message: '' };
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Show success message
        formStatus = { type: 'success', message: result.message };
        // Reset form fields
        name = '';
        email = '';
        message = '';
        formTouched = { name: false, email: false, message: false };
      } else {
        // Show error message
        formStatus = { type: 'error', message: result.error };
      }
    } catch (error) {
      // Show generic error message
      formStatus = { 
        type: 'error', 
        message: 'Ett fel uppstod när meddelandet skulle skickas. Försök igen senare.'
      };
    } finally {
      isSubmitting = false;
    }
  }
  
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
  
  // Smooth scroll to section when clicking nav links
  function handleNavClick(e, href) {
    e.preventDefault();
    
    // If it's a hash link, handle smooth scrolling
    if (href.startsWith('#')) {
      const targetId = href === '#' ? 'body' : href.substring(1);
      const targetElement = targetId === 'body' 
        ? document.body 
        : document.getElementById(targetId);
      
      if (targetElement) {
        // Close mobile menu if open
        if (mobileMenuOpen) {
          closeMenu();
        }
        
        // Scroll to the target element smoothly
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // For non-hash links, navigate normally
      window.location.href = href;
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
  
  // Handle scroll event to show/hide scroll button
  $effect(() => {
    const handleScroll = () => {
      showScrollButton = window.scrollY > 500;
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up on component unmount
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
    <div class="container mx-auto px-4 py-3 sm:py-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <div class="mr-2 sm:mr-3 w-8 h-8 sm:w-10 sm:h-10">
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
          <div class="text-xl sm:text-2xl font-bold text-violet-400">Axentra</div>
        </div>
        <nav class="hidden md:block">
          <ul class="flex space-x-8">
            {#each navItems as item}
              <li>
                <a 
                  href={item.href} 
                  class="relative px-2 py-1 font-medium group"
                  onclick={(e) => handleNavClick(e, item.href)}
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
    class="md:hidden fixed top-[1.2rem] sm:top-[1.45rem] right-4 z-[100] w-10 h-10 flex items-center justify-center" 
    onclick={toggleMobileMenu}
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
                onclick={(e) => handleNavClick(e, item.href)}
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
  <section class="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 bg-gradient-to-b from-gray-950 to-gray-900 relative overflow-hidden">
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
          <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#8B5CF6" />
            <stop offset="100%" stop-color="#D946EF" />
            <animateTransform
              attributeName="gradientTransform"
              type="rotate"
              from="0 0.5 0.5"
              to="360 0.5 0.5"
              dur="10s"
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>
      </svg>
    </div>
    
    <div class="container mx-auto text-center relative z-10">
      <!-- Hero Title with Transitions - Fixed Height Container -->
      <div class="min-h-[6rem] sm:min-h-[5rem] h-auto sm:h-24 md:h-28 mb-4 sm:mb-6 flex items-center justify-center overflow-visible">
        <!-- Always render the title elements for space, but conditionally apply visibility and transitions -->
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold relative px-1 leading-tight">
          <!-- Wrap each part in a container to help with mobile layout -->
          <div class="inline-block sm:inline">
            <!-- First Part: "Snabb" -->
            <span class="inline-block opacity-0 absolute leading-tight" style="left: 0; right: 0; margin: auto;">
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-500">Snabb</span>
            </span>
            {#if heroVisible}
              <span 
                class="inline-block leading-tight"
                in:slide={{ delay: 300, duration: 800, easing: elasticOut, axis: 'y' }}
                out:fade
              >
                <span class="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-500">Snabb</span>
              </span>
            {/if}
          </div>
          
          <div class="inline-block sm:inline">
            <!-- Second Part: "utveckling för" -->
            <span class="inline-block opacity-0 absolute leading-tight px-1 sm:px-2" style="left: 0; right: 0; margin: auto;">
              utveckling för
            </span>
            {#if heroVisible}
              <span 
                class="inline-block leading-tight px-1 sm:px-2"
                in:slide={{ delay: 600, duration: 800, easing: elasticOut, axis: 'y' }}
                out:fade
              >
                utveckling för
              </span>
            {/if}
          </div>
          
          <div class="inline-block sm:inline">
            <!-- Third Part: "startups" -->
            <span class="inline-block opacity-0 absolute leading-tight" style="left: 0; right: 0; margin: auto;">
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-500">startups</span>
            </span>
            {#if heroVisible}
              <span 
                class="inline-block leading-tight"
                in:slide={{ delay: 900, duration: 800, easing: elasticOut, axis: 'y' }}
                out:fade
              >
                <span class="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-500 hero-gradient-text">startups</span>
              </span>
            {/if}
          </div>
        </h1>
      </div>
      
      <!-- Subtitle with Fixed Height Container -->
      <div class="min-h-[5rem] h-auto sm:h-16 md:h-20 mb-6 sm:mb-10 flex items-center justify-center overflow-visible">
        {#if heroVisible}
          <p 
            class="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto px-1"
            in:fly={{ y: 30, duration: 800, delay: 1200, opacity: 0, easing: cubicOut }}
          >
            Vi hjälper innovativa startups att lansera sina MVP-webbappar på rekordtid.
          </p>
        {:else}
          <!-- Invisible placeholder to maintain layout -->
          <p class="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto opacity-0 px-1">
            Vi hjälper innovativa startups att lansera sina MVP-webbappar på rekordtid.
          </p>
        {/if}
      </div>
      
      <!-- CTA Button with fixed container -->
      <div class="h-auto min-h-[3rem] sm:h-16 overflow-visible mb-4">
        {#if heroVisible}
          <div 
            in:scale={{ start: 0.85, opacity: 0.5, duration: 800, delay: 1500, easing: backOut }}
          >
            <a 
              href="#contact" 
              class="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-all shadow-pulse hover:shadow-violet-500/20 inline-block"
              onclick={(e) => handleNavClick(e, '#contact')}
            >
              Kom igång idag
            </a>
          </div>
        {:else}
          <!-- Invisible placeholder -->
          <a
            class="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold py-3 px-8 rounded-full text-lg inline-block opacity-0 pointer-events-none"
          >
            Kom igång idag
          </a>
        {/if}
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section id="services" class="py-20 px-4 bg-gray-900 overflow-hidden" bind:this={servicesSection}>
    <div class="container mx-auto">
      {#if servicesVisible}
        <h2 
          class="text-4xl font-bold text-center mb-16"
          in:safeTransition={{ direction: 'down', duration: 800, delay: 100 }}
        >
          Vår specialitet
        </h2>
        <div class="grid md:grid-cols-2 gap-10">
          <div 
            class="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-violet-500 transition-colors shadow-lg"
            in:safeTransition={{ direction: 'left', duration: 800, delay: 300 }}
          >
            <div class="text-violet-400 text-5xl mb-4">⚡</div>
            <h3 class="text-2xl font-bold mb-4">Snabb utveckling</h3>
            <p class="text-gray-300">
              Vi fokuserar på att leverera fungerande MVP-lösningar på kortast möjliga tid. 
              Från idé till lansering på veckor, inte månader.
            </p>
          </div>
          <div 
            class="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-fuchsia-500 transition-colors shadow-lg"
            in:safeTransition={{ direction: 'right', duration: 800, delay: 500 }}
          >
            <div class="text-fuchsia-400 text-5xl mb-4">🚀</div>
            <h3 class="text-2xl font-bold mb-4">Startup-fokus</h3>
            <p class="text-gray-300">
              Vi förstår startups unika behov och utmaningar. Vår process är anpassad för 
              att maximera värdet för din startup med begränsade resurser.
            </p>
          </div>
        </div>
      {:else}
        <!-- Invisible placeholders to maintain layout -->
        <h2 class="text-4xl font-bold text-center mb-16 opacity-0">Vår specialitet</h2>
        <div class="grid md:grid-cols-2 gap-10">
          <div class="bg-gray-800 p-8 rounded-lg border border-gray-700 opacity-0">
            <div class="text-violet-400 text-5xl mb-4">⚡</div>
            <h3 class="text-2xl font-bold mb-4">Snabb utveckling</h3>
            <p class="text-gray-300">
              Vi fokuserar på att leverera fungerande MVP-lösningar på kortast möjliga tid. 
              Från idé till lansering på veckor, inte månader.
            </p>
          </div>
          <div class="bg-gray-800 p-8 rounded-lg border border-gray-700 opacity-0">
            <div class="text-fuchsia-400 text-5xl mb-4">🚀</div>
            <h3 class="text-2xl font-bold mb-4">Startup-fokus</h3>
            <p class="text-gray-300">
              Vi förstår startups unika behov och utmaningar. Vår process är anpassad för 
              att maximera värdet för din startup med begränsade resurser.
            </p>
          </div>
        </div>
      {/if}
    </div>
  </section>

  <!-- Process Section -->
  <section id="process" class="py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden" bind:this={processSection}>
    <div class="container mx-auto">
      {#if processVisible}
        <h2 
          class="text-4xl font-bold text-center mb-6"
          in:safeTransition={{ direction: 'down', duration: 800, delay: 100 }}
        >
          Arbetsprocess
        </h2>
        <p 
          class="text-xl text-center text-gray-300 max-w-3xl mx-auto mb-16"
          in:safeTransition={{ direction: 'down', duration: 800, delay: 200 }}
        >
          Enkel och effektiv process för att snabbt komma igång med ditt projekt.
        </p>
        
        <div class="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <!-- Step 1 -->
          <div class="relative" in:safeTransition={{ direction: 'down', duration: 800, delay: 300 }}>
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
          <div class="relative" in:safeTransition={{ direction: 'down', duration: 800, delay: 500 }}>
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
                Vi bokar ett möte i Stockholm för att diskutera ditt projekt i detalj.
              </p>
            </div>
            <div class="hidden md:block absolute top-1/2 right-0 w-1/2 h-0.5 bg-gradient-to-r from-violet-400 to-fuchsia-500 transform translate-x-4"></div>
          </div>
          
          <!-- Step 3 -->
          <div class="relative" in:safeTransition={{ direction: 'down', duration: 800, delay: 700 }}>
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
          <div class="relative" in:safeTransition={{ direction: 'down', duration: 800, delay: 900 }}>
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
      {:else}
        <!-- Invisible placeholders to maintain layout -->
        <h2 class="text-4xl font-bold text-center mb-6 opacity-0">Arbetsprocess</h2>
        <p class="text-xl text-center text-gray-300 max-w-3xl mx-auto mb-16 opacity-0">
          Enkel och effektiv process för att snabbt komma igång med ditt projekt.
        </p>
        
        <div class="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <!-- Step 1 -->
          <div class="relative opacity-0">
            <div class="bg-gray-800 p-8 rounded-lg border border-gray-700 h-full">
              <div class="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-center text-xl font-bold">1</div>
              
              <!-- Email SVG Icon -->
              <div class="w-20 h-20 mx-auto mb-6 text-violet-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
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
          <div class="relative opacity-0">
            <div class="bg-gray-800 p-8 rounded-lg border border-gray-700 h-full">
              <div class="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-center text-xl font-bold">2</div>
              
              <!-- Meeting SVG Icon -->
              <div class="w-20 h-20 mx-auto mb-6 text-fuchsia-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
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
          <div class="relative opacity-0">
            <div class="bg-gray-800 p-8 rounded-lg border border-gray-700 h-full">
              <div class="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-center text-xl font-bold">3</div>
              
              <!-- Document SVG Icon -->
              <div class="w-20 h-20 mx-auto mb-6 text-violet-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
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
          <div class="relative opacity-0">
            <div class="bg-gray-800 p-8 rounded-lg border border-gray-700 h-full">
              <div class="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-center text-xl font-bold">4</div>
              
              <!-- Code SVG Icon -->
              <div class="w-20 h-20 mx-auto mb-6 text-fuchsia-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
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
      {/if}
    </div>
  </section>

  <!-- Pricing Section -->
  <section id="pricing" class="py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden" bind:this={pricingSection}>
    <div class="container mx-auto">
      {#if pricingVisible}
        <h2 
          class="text-4xl font-bold text-center mb-6"
          in:safeTransition={{ direction: 'down', duration: 800, delay: 100 }}
        >
          Flexibla prismodeller
        </h2>
        <p 
          class="text-xl text-center text-gray-300 max-w-3xl mx-auto mb-16"
          in:safeTransition={{ direction: 'down', duration: 800, delay: 200 }}
        >
          Vi erbjuder olika samarbetsformer anpassade efter din startups behov och budget.
        </p>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Timbaserad -->
          <div 
            class="bg-gray-800 border border-gray-700 rounded-xl p-8 hover:border-violet-400 transition-colors shadow-lg hover:shadow-violet-500/10"
            in:safeTransition={{ direction: 'right', duration: 800, delay: 300 }}
          >
            <!-- Time SVG Icon -->
            <div class="w-16 h-16 mb-4 mx-auto text-violet-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-full h-full animate-pulse-slow">
                <circle cx="12" cy="12" r="10" stroke-width="1.5" />
                <path d="M12 6v6l4 2" stroke-width="1.5" />
                <path d="M18 12a6 6 0 1 1-12 0 6 6 0 0 1 12 0z" stroke-width="0.75" opacity="0.5" />
              </svg>
            </div>
            
            <h3 class="text-2xl font-bold mb-4 text-center">Timbaserad</h3>
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
          <div 
            class="bg-gray-800 border border-gray-700 rounded-xl p-8 hover:border-fuchsia-400 transition-colors shadow-lg hover:shadow-fuchsia-500/10"
            in:safeTransition={{ direction: 'right', duration: 800, delay: 400 }}
          >
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
          <div 
            class="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 border border-violet-500 rounded-xl p-8 hover:border-violet-400 transition-colors shadow-lg hover:shadow-violet-500/20 relative"
            in:safeTransition={{ direction: 'right', duration: 800, delay: 500 }}
          >
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
          <div 
            class="bg-gray-800 border border-gray-700 rounded-xl p-8 hover:border-fuchsia-400 transition-colors shadow-lg hover:shadow-fuchsia-500/10"
            in:safeTransition={{ direction: 'right', duration: 800, delay: 600 }}
          >
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
      {:else}
        <!-- Invisible placeholders to maintain layout -->
        <h2 class="text-4xl font-bold text-center mb-6 opacity-0">Flexibla prismodeller</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Timbaserad -->
          <div class="bg-gray-800 border border-gray-700 rounded-xl p-8 opacity-0">
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
          <div class="bg-gray-800 border border-gray-700 rounded-xl p-8 opacity-0">
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
          <div 
            class="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 border border-violet-500 rounded-xl p-8 opacity-0"
            in:safeTransition={{ direction: 'right', duration: 800, delay: 500 }}
          >
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
          <div 
            class="bg-gray-800 border border-gray-700 rounded-xl p-8 opacity-0"
            in:safeTransition={{ direction: 'right', duration: 800, delay: 600 }}
          >
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
      {/if}
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="py-20 px-4 bg-gray-900 overflow-hidden" bind:this={contactSection}>
    <div class="container mx-auto max-w-xl">
      {#if contactVisible}
        <h2 
          class="text-4xl font-bold text-center mb-10"
          in:glowTextTransition={{ delay: 100, duration: 1200 }}
        >
          Kontakta oss
        </h2>
        <form class="space-y-6" onsubmit={handleSubmit}>
          {#if formStatus.message}
            <div 
              class="p-4 rounded-lg mb-6 {formStatus.type === 'success' ? 'bg-green-800/30 border border-green-700 text-green-300' : 'bg-red-800/30 border border-red-700 text-red-300'}"
              transition:fade={{ duration: 200 }}
            >
              {formStatus.message}
            </div>
          {/if}
          
          <div in:revealTransition={{ delay: 300, duration: 800, index: 0 }}>
            <label for="name" class="block text-sm font-medium mb-2">Namn</label>
            <input 
              type="text" 
              id="name" 
              bind:value={name}
              onblur={() => formTouched.name = true}
              class="w-full px-4 py-3 bg-gray-800 border {nameError ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300"
            >
            {#if nameError}
              <p class="mt-1 text-sm text-red-400">{nameError}</p>
            {/if}
          </div>
          
          <div in:revealTransition={{ delay: 300, duration: 800, index: 1 }}>
            <label for="email" class="block text-sm font-medium mb-2">E-post</label>
            <input 
              type="email" 
              id="email" 
              bind:value={email}
              onblur={() => formTouched.email = true}
              class="w-full px-4 py-3 bg-gray-800 border {emailError ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300"
            >
            {#if emailError}
              <p class="mt-1 text-sm text-red-400">{emailError}</p>
            {/if}
          </div>
          
          <div in:revealTransition={{ delay: 300, duration: 800, index: 2 }}>
            <label for="message" class="block text-sm font-medium mb-2">Idé</label>
            <textarea 
              id="message" 
              rows="4" 
              bind:value={message}
              onblur={() => formTouched.message = true}
              class="w-full px-4 py-3 bg-gray-800 border {messageError ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 resize-none transition-all duration-300"
            ></textarea>
            {#if messageError}
              <p class="mt-1 text-sm text-red-400">{messageError}</p>
            {/if}
          </div>
          
          <div in:revealTransition={{ delay: 300, duration: 800, index: 3 }}>
            <button 
              type="submit" 
              class="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-violet-500/20 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {#if isSubmitting}
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Skickar...
              {:else}
                Skicka
              {/if}
            </button>
          </div>
        </form>
      {:else}
        <!-- Invisible placeholders to maintain layout -->
        <h2 class="text-4xl font-bold text-center mb-10 opacity-0">Kontakta oss</h2>
        <form class="space-y-6 opacity-0">
          <div>
            <label for="name" class="block text-sm font-medium mb-2">Namn</label>
            <input 
              type="text" 
              id="name-placeholder" 
              class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg"
              disabled
            >
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium mb-2">E-post</label>
            <input 
              type="email" 
              id="email-placeholder" 
              class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg"
              disabled
            >
          </div>
          
          <div>
            <label for="message" class="block text-sm font-medium mb-2">Idé</label>
            <textarea 
              id="message-placeholder" 
              rows="4" 
              class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg resize-none"
              disabled
            ></textarea>
          </div>
          
          <button 
            class="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold py-3 px-6 rounded-lg"
            disabled
          >
            Skicka
          </button>
        </form>
      {/if}
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-16 px-4 bg-gray-900 border-t border-gray-800 overflow-hidden" bind:this={footerSection}>
    <div class="container mx-auto">
      {#if footerVisible}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <!-- Company Info -->
          <div in:sexyReveal={{ delay: 100, duration: 800, index: 0, direction: 'up' }}>
            <div class="flex items-center mb-6">
              <div class="mr-3 w-8 h-8 relative overflow-visible">
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
              <div class="text-xl font-bold text-violet-400" in:gradientTextReveal={{ delay: 300, duration: 1000 }}>Axentra Startups AB</div>
            </div>
            <p class="text-gray-400 mb-4">
              Snabb MVP-utveckling för startups med flexibla prismodeller.
            </p>
          </div>
          
          <!-- Contact Info -->
          <div in:sexyReveal={{ delay: 100, duration: 800, index: 1, direction: 'up' }}>
            <h3 class="text-lg font-bold mb-4 text-white" in:gradientTextReveal={{ delay: 400, duration: 1000 }}>Kontaktuppgifter</h3>
            <ul class="space-y-3 text-gray-400">
              <li class="flex items-start" in:sexyReveal={{ delay: 500, duration: 800, index: 0, direction: 'left' }}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-violet-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
                <span>Edingekroken 12<br>163 63 Spånga<br>Stockholm, Sweden</span>
              </li>
              <li class="flex items-start" in:sexyReveal={{ delay: 600, duration: 800, index: 1, direction: 'left' }}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-violet-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href="mailto:dlovan@axentra.agency" class="hover:text-violet-400 transition-colors">dlovan@axentra.agency</a>
              </li>
            </ul>
          </div>
          
          <!-- Quick Links -->
          <div in:sexyReveal={{ delay: 100, duration: 800, index: 2, direction: 'up' }}>
            <h3 class="text-lg font-bold mb-4 text-white" in:gradientTextReveal={{ delay: 500, duration: 1000 }}>Snabblänkar</h3>
            <ul class="space-y-2 text-gray-400">
              {#each navItems as item, i}
                <li in:sexyReveal={{ delay: 600 + (i * 100), duration: 800, index: i, direction: 'right' }}>
                  <a href={item.href} 
                     class="hover:text-violet-400 transition-colors flex items-center"
                     onclick={(e) => handleNavClick(e, item.href)}
                  >
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
          <div class="text-gray-500 text-sm mb-4 md:mb-0" in:sexyReveal={{ delay: 800, duration: 800, index: 0, direction: 'up' }}>
            © {new Date().getFullYear()} Axentra AB. Alla rättigheter förbehållna.
          </div>
          <div class="flex space-x-4" in:sexyReveal={{ delay: 900, duration: 800, index: 1, direction: 'up' }}>
            <a href="https://www.linkedin.com/company/axentra-startups-ab" class="text-gray-400 hover:text-violet-400 transition-colors transform hover:scale-110 duration-300" target="_blank" rel="noopener noreferrer">
              <span class="sr-only">LinkedIn</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      {:else}
        <!-- Invisible placeholders to maintain layout -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 opacity-0">
          <!-- Company Info -->
          <div>
            <div class="flex items-center mb-6">
              <div class="mr-3 w-8 h-8">
                <svg viewBox="0 0 100 100" class="w-full h-full"></svg>
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
                <span>Edingekroken 12<br>163 63 Spånga<br>Stockholm, Sweden</span>
              </li>
              <li class="flex items-start">
                <a href="mailto:dlovan@axentra.agency">dlovan@axentra.agency</a>
              </li>
            </ul>
          </div>
          
          <!-- Quick Links -->
          <div>
            <h3 class="text-lg font-bold mb-4 text-white">Snabblänkar</h3>
            <ul class="space-y-2 text-gray-400">
              {#each navItems as item}
                <li>
                  <a href={item.href}>{item.name}</a>
                </li>
              {/each}
            </ul>
          </div>
        </div>
        
        <div class="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center opacity-0">
          <div class="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Axentra Startups AB. Alla rättigheter förbehållna.
          </div>
          <div class="flex space-x-4">
            <a href="https://www.linkedin.com/company/axentra-startups-ab" target="_blank" rel="noopener noreferrer">
              <span class="sr-only">LinkedIn</span>
              <svg class="h-6 w-6"></svg>
            </a>
          </div>
        </div>
      {/if}
    </div>
  </footer>

  <!-- Scroll to top button - mobile only -->
  {#if showScrollButton}
    <button 
      onclick={scrollToTop}
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
  
  @keyframes shadow-pulse {
    0%, 100% {
      box-shadow: 0 0 8px 2px rgba(139, 92, 246, 0.3);
    }
    50% {
      box-shadow: 0 0 20px 6px rgba(217, 70, 239, 0.4);
    }
  }
  
  @keyframes gradient-shift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  
  .hero-gradient-text {
    background-size: 200% auto;
    animation: gradient-shift 8s ease infinite;
  }
  
  .shadow-pulse {
    animation: shadow-pulse 3s ease-in-out infinite;
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
