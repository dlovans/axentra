<script>
  import { onMount } from 'svelte';
  
  let particles = $state([]);
  let dustParticles = $state([]);
  let connectionLines = $state([]);
  const particleCount = 20;
  const dustParticleCount = 30;
  const connectionDistance = 15;
  
  // Contact form state
  let name = $state('');
  let email = $state('');
  let message = $state('');
  let isSubmitting = $state(false);
  let submitStatus = $state(null); // null, 'success', 'error'
  let errorMessage = $state('');
  
  // Reference to contact section for scrolling
  let contactSection;
  
  // Function to scroll to contact section
  function scrollToContact() {
    const contactElement = document.getElementById('contact-section');
    if (contactElement) {
      // Get the navbar height (approximately)
      const navbarHeight = 40; // Reduced offset for more subtle adjustment
      
      // Scroll to element with offset
      window.scrollTo({
        top: contactElement.offsetTop - navbarHeight,
        behavior: 'smooth'
      });
    }
  }
  
  // Form validation state
  let errors = $state({
    name: '',
    email: '',
    message: ''
  });
  
  // Validate email format
  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  // Handle contact form submission
  async function handleSubmit(event) {
    event.preventDefault();
    
    // Reset status and errors
    submitStatus = null;
    errorMessage = '';
    errors = {
      name: '',
      email: '',
      message: ''
    };
    
    // Validate form fields
    let isValid = true;
    
    if (!name.trim()) {
      errors.name = 'Namn är obligatoriskt';
      isValid = false;
    }
    
    if (!email.trim()) {
      errors.email = 'E-post är obligatoriskt';
      isValid = false;
    } else if (!isValidEmail(email)) {
      errors.email = 'Ange en giltig e-postadress';
      isValid = false;
    }
    
    if (!message.trim()) {
      errors.message = 'Meddelande är obligatoriskt';
      isValid = false;
    }
    
    if (!isValid) {
      return;
    }
    
    isSubmitting = true;
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        submitStatus = 'success';
        // Reset form on success
        name = '';
        email = '';
        message = '';
      } else {
        submitStatus = 'error';
        errorMessage = result.error || 'Ett fel uppstod. Försök igen senare.';
      }
    } catch (error) {
      submitStatus = 'error';
      errorMessage = 'Ett fel uppstod vid anslutning till servern. Kontrollera din internetanslutning.';
      console.error('Form submission error:', error);
    } finally {
      isSubmitting = false;
    }
  }
  
  // Soft color palettes for particles
  const softColors = [
    { hue: 5, sat: 80, light: 75 },    // Soft red
    { hue: 120, sat: 70, light: 75 },  // Soft green
    { hue: 210, sat: 80, light: 75 }   // Soft blue
  ];
  
  onMount(() => {
    // Create main particles with three color types
    for (let i = 0; i < particleCount; i++) {
      // Select one of the three color types
      const colorType = softColors[Math.floor(Math.random() * softColors.length)];
      
      particles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1.5,
        speedX: (Math.random() - 0.5) * 0.04,
        speedY: (Math.random() - 0.5) * 0.04,
        opacity: Math.random() * 0.7 + 0.3,
        hue: colorType.hue,
        sat: colorType.sat,
        light: colorType.light,
        pulse: Math.random() * 2 + 1
      });
    }
    
    // Create dust particles (smaller, more subtle)
    for (let i = 0; i < dustParticleCount; i++) {
      // Use a random soft color for dust particles too
      const colorType = softColors[Math.floor(Math.random() * softColors.length)];
      
      dustParticles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1 + 0.2,
        speedX: (Math.random() - 0.5) * 0.015,
        speedY: (Math.random() - 0.5) * 0.015,
        opacity: Math.random() * 0.15 + 0.05,
        hue: colorType.hue,
        sat: colorType.sat * 0.7, // More desaturated for dust
        light: colorType.light
      });
    }
    
    // Animate particles
    const animate = () => {
      // Update main particles
      particles = particles.map(p => ({
        ...p,
        x: (p.x + p.speedX + 100) % 100,
        y: (p.y + p.speedY + 100) % 100,
        opacity: p.opacity * (0.95 + 0.05 * Math.sin(Date.now() / (1000 * p.pulse)))
      }));
      
      // Update dust particles
      dustParticles = dustParticles.map(p => ({
        ...p,
        x: (p.x + p.speedX + 100) % 100,
        y: (p.y + p.speedY + 100) % 100
      }));
      
      // Calculate connection lines (Stranger Things "web" effect)
      connectionLines = [];
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = Math.abs(particles[i].x - particles[j].x);
          const dy = Math.abs(particles[i].y - particles[j].y);
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.2;
            // Use a color that's a blend of the two connected particles
            const hue = (particles[i].hue + particles[j].hue) / 2;
            connectionLines.push({
              x1: particles[i].x,
              y1: particles[i].y,
              x2: particles[j].x,
              y2: particles[j].y,
              opacity,
              hue
            });
          }
        }
      }
      
      // Slow down the animation by requesting the next frame less frequently
      setTimeout(() => {
        requestAnimationFrame(animate);
      }, 30); // Add a small delay between frames
    };
    
    animate();
  });
  
  // Language state management
  let currentLanguage = $state('sv'); // Default to Swedish
  
  // Text content for different languages
  const translations = {
    sv: {
      // Navbar
      home: 'Hem',
      process: 'Process',
      pricing: 'Priser',
      contact: 'Kontakt',
      login: 'Logga In',
      
      // Hero section
      heroTitle: 'Supersnabb MVP-utveckling för startups',
      heroSubtitle: 'Vi hjälper dig att bygga din produkt på rekordtid',
      heroButton: 'Läs Mer',
      
      // Feature cards
      featureTitle: 'Vad Vi Erbjuder',
      
      // Specialty cards
      specialtyTitle: 'Vår Specialitet',
      specialty1: 'Supersnabb Utveckling',
      specialty2: 'Startup Fokus',
      specialty3: 'Webbutveckling',
      
      // Process section
      processTitle: 'Vår Process',
      process1Title: 'Första Kontakt',
      process1Desc: 'Kontakta oss via formuläret på vår hemsida. Berätta kort om din idé, så återkommer vi inom 24 timmar.',
      process2Title: 'Möte i Stockholm',
      process2Desc: 'Vi träffas personligen i Stockholm för att diskutera projektet i detalj och få en djupare förståelse för din vision, mål och tekniska behov.',
      process3Title: 'Planering & Avtal',
      process3Desc: 'Vi diskuterar priser, samarbetsformer och projektets omfattning. Vi definierar tydliga mål, tidslinjer och leverabler för att säkerställa projektets framgång.',
      process4Title: 'Utveckling & Feedback',
      process4Desc: 'Vi påbörjar utvecklingen med kontinuerlig feedback-loop. Du får regelbundna uppdateringar och möjlighet att testa och ge feedback under hela processen.',
      
      // Pricing section
      pricingTitle: 'Prismodeller',
      pricing1Title: 'Timpris',
      pricing1Price: 'SEK X',
      pricing1Unit: '/timme',
      pricing1Point1: 'Flexibelt och transparent',
      pricing1Point2: 'Perfekt för mindre projekt',
      pricing1Point3: 'Ingen långsiktig förbindelse',
      pricing1Point4: 'Betalning efter utfört arbete',
      
      pricing2Title: 'Fast Pris',
      pricing2Price: 'SEK Y',
      pricing2Unit: '/projekt',
      pricing2Point1: 'Förutsägbara kostnader',
      pricing2Point2: 'Tydligt definierad omfattning',
      pricing2Point3: 'Etappvis betalningsplan',
      pricing2Point4: 'Populärt för MVP-projekt',
      
      pricing3Title: 'Fast Pris + Aktier',
      pricing3Price: 'SEK Z + aktier',
      pricing3Unit: '',
      pricing3Point1: 'Lägre initial kostnad',
      pricing3Point2: 'Delade intressen',
      pricing3Point3: 'Perfekt för startups med begränsad budget',
      pricing3Point4: 'Långsiktig vision',
      pricing3Recommended: 'Rekommenderad',
      
      pricing4Title: 'Medgrundare',
      pricing4Price: 'Equity',
      pricing4Unit: '',
      pricing4Point1: 'Fullt engagemang i projektet',
      pricing4Point2: 'Teknisk medgrundare',
      pricing4Point3: 'Strategisk partner',
      pricing4Point4: 'Långsiktig tillväxtfokus',
      
      // Contact section
      contactTitle: 'Kontakta Oss',
      contactSubtitle: 'Redo att ta nästa steg? Fyll i formuläret nedan eller kontakta oss direkt via e-post.',
      contactFormTitle: 'Skicka ett Meddelande',
      contactName: 'Ditt Namn',
      contactEmail: 'Din E-post',
      contactSubject: 'Ämne',
      contactMessage: 'Meddelande',
      contactSend: 'Skicka Meddelande',
      contactSuccess: 'Tack för ditt meddelande! Vi återkommer så snart som möjligt.',
      contactError: 'Ett fel uppstod. Vänligen försök igen.',
      
      // Footer
      footerDesc: 'Vi hjälper startups att bygga marknadsfärdiga MVPs på rekordtid. Vår expertis inom webbutveckling och startup-fokuserade lösningar gör oss till den perfekta partnern för din digitala resa.',
      footerLinks: 'Snabblänkar',
      footerInnovation: 'Digital Innovation',
      footerQuote: 'Turning ideas into digital reality',
      footerCopyright: 'Alla rättigheter förbehållna.',
      
      // Fixed button
      contactButton: 'Kontakta Oss'
    },
    en: {
      // Navbar
      home: 'Home',
      process: 'Process',
      pricing: 'Pricing',
      contact: 'Contact',
      login: 'Log In',
      
      // Hero section
      heroTitle: 'Superfast MVP Development for Startups',
      heroSubtitle: 'We help you build your product in record time',
      heroButton: 'Learn More',
      
      // Feature cards
      featureTitle: 'What We Offer',
      
      // Specialty cards
      specialtyTitle: 'Our Specialty',
      specialty1: 'Supercharged Development',
      specialty2: 'Startup Focus',
      specialty3: 'Web Development',
      
      // Process section
      processTitle: 'Our Process',
      process1Title: 'First Contact',
      process1Desc: 'Contact us through the form on our website. Briefly tell us about your idea, and we will get back to you within 24 hours.',
      process2Title: 'Meeting in Stockholm',
      process2Desc: 'We meet in person in Stockholm to discuss the project in detail and gain a deeper understanding of your vision, goals, and technical needs.',
      process3Title: 'Planning & Agreement',
      process3Desc: 'We discuss pricing, collaboration forms, and project scope. We define clear goals, timelines, and deliverables to ensure project success.',
      process4Title: 'Development & Feedback',
      process4Desc: 'We begin development with a continuous feedback loop. You receive regular updates and opportunities to test and provide feedback throughout the process.',
      
      // Pricing section
      pricingTitle: 'Pricing Models',
      pricing1Title: 'Hourly Rate',
      pricing1Price: 'SEK X',
      pricing1Unit: '/hour',
      pricing1Point1: 'Flexible and transparent',
      pricing1Point2: 'Perfect for smaller projects',
      pricing1Point3: 'No long-term commitment',
      pricing1Point4: 'Payment after work completed',
      
      pricing2Title: 'Fixed Sum',
      pricing2Price: 'SEK Y',
      pricing2Unit: '/project',
      pricing2Point1: 'Predictable costs',
      pricing2Point2: 'Clearly defined scope',
      pricing2Point3: 'Staged payment plan',
      pricing2Point4: 'Popular for MVP projects',
      
      pricing3Title: 'Fixed Sum + Stocks',
      pricing3Price: 'SEK Z + stocks',
      pricing3Unit: '',
      pricing3Point1: 'Lower initial cost',
      pricing3Point2: 'Shared interests',
      pricing3Point3: 'Perfect for startups with limited budget',
      pricing3Point4: 'Long-term vision',
      pricing3Recommended: 'Recommended',
      
      pricing4Title: 'Cofounder Package',
      pricing4Price: 'Equity',
      pricing4Unit: '',
      pricing4Point1: 'Full project engagement',
      pricing4Point2: 'Technical co-founder',
      pricing4Point3: 'Strategic partner',
      pricing4Point4: 'Long-term growth focus',
      
      // Contact section
      contactTitle: 'Contact Us',
      contactSubtitle: 'Ready to take the next step? Fill out the form below or contact us directly via email.',
      contactFormTitle: 'Send a Message',
      contactName: 'Your Name',
      contactEmail: 'Your Email',
      contactSubject: 'Subject',
      contactMessage: 'Message',
      contactSend: 'Send Message',
      contactSuccess: 'Thank you for your message! We will get back to you as soon as possible.',
      contactError: 'An error occurred. Please try again.',
      
      // Footer
      footerDesc: 'We help startups build market-ready MVPs in record time. Our expertise in web development and startup-focused solutions makes us the perfect partner for your digital journey.',
      footerLinks: 'Quick Links',
      footerInnovation: 'Digital Innovation',
      footerQuote: 'Turning ideas into digital reality',
      footerCopyright: 'All rights reserved.',
      
      // Fixed button
      contactButton: 'Contact Us'
    }
  };
  
  // Function to toggle language
  function toggleLanguage() {
    currentLanguage = currentLanguage === 'sv' ? 'en' : 'sv';
  }
  
  // Helper function to get text based on current language
  function t(key) {
    return translations[currentLanguage][key];
  }
</script>

<div class="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
  <!-- Grid overlay -->
  <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDYwTDYwIDBIMFY2MHoiIGZpbGw9IiMxYTFhMWEiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
  
  <!-- Animated gradient orbs -->
  <div class="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-10 blur-3xl animate-pulse"></div>
  <div class="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 opacity-10 blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
  <div class="absolute top-3/4 right-1/3 w-72 h-72 rounded-full bg-gradient-to-r from-teal-400 to-blue-600 opacity-10 blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
  
  <!-- Upside-down effect (Stranger Things inspired) -->
  <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30"></div>
  
  <!-- Capsule Navbar -->
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
      
      <!-- Login Button -->
      <a href="/login" class="login-btn px-4 py-2 md:px-6 md:py-2 rounded-full bg-gradient-to-r from-cyan-500/80 via-blue-500/80 to-teal-500/80 text-white font-medium text-sm md:text-base hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 transform hover:scale-105">
        Logga In
      </a>
    </div>
  </div>
  
  <!-- Connection lines (Stranger Things web effect) -->
  {#each connectionLines as line}
    <div 
      class="absolute"
      style="
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: {line.opacity};
        background: transparent;
        transform-origin: 0 0;
        transform: translate({line.x1}vw, {line.y1}vh) rotate(${Math.atan2(line.y2 - line.y1, line.x2 - line.x1)}rad);
        width: ${Math.sqrt(Math.pow(line.x2 - line.x1, 2) + Math.pow(line.y2 - line.y1, 2))}vw;
        height: 1px;
        background-color: hsl({line.hue}, 70%, 75%);
      "
    ></div>
  {/each}
  
  <!-- Main particles (with soft red, green, blue colors) -->
  {#each particles as particle}
    <div 
      class="absolute rounded-full animate-flicker"
      style="
        left: {particle.x}%; 
        top: {particle.y}%; 
        width: {particle.size}px; 
        height: {particle.size}px; 
        opacity: {particle.opacity};
        background-color: hsl({particle.hue}, {particle.sat}%, {particle.light}%);
        box-shadow: 0 0 {particle.size * 1.2}px {particle.size * 0.6}px hsl({particle.hue}, {particle.sat}%, {particle.light}%, 0.4);
        animation-delay: {Math.random() * 5}s;
      "
    ></div>
  {/each}
  
  <!-- Dust particles (with soft colors) -->
  {#each dustParticles as particle}
    <div 
      class="absolute rounded-full"
      style="
        left: {particle.x}%; 
        top: {particle.y}%; 
        width: {particle.size}px; 
        height: {particle.size}px; 
        opacity: {particle.opacity};
        background-color: hsl({particle.hue}, {particle.sat}%, {particle.light}%);
      "
    ></div>
  {/each}
  
  <!-- Glowing accent line at top only -->
  <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
  
  <!-- Content container with hero section -->
  <div class="relative container mx-auto px-4 min-h-screen pt-28">
    <!-- Hero Section -->
    <div class="flex flex-col lg:flex-row items-center justify-between gap-8 py-16">
      <!-- Left Column - Main Content -->
      <div class="w-full lg:w-1/2 space-y-8">
        <!-- Main Headline -->
        <div class="hero-card backdrop-blur-sm bg-gray-800/25 border border-emerald-500/30 shadow-lg shadow-emerald-500/10 rounded-2xl p-6 md:p-8">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
              Lansera Din Startup Snabbare
            </span>
          </h2>
          <p class="text-gray-300 text-lg md:text-xl">
            Vi bygger marknadsfärdiga MVPs på veckor, inte månader. Förvandla din vision till verklighet med vår snabba utvecklingsmetod.
          </p>
        </div>
        
        <!-- Stats Card -->
        <div class="hero-card backdrop-blur-sm bg-gray-800/25 border border-blue-500/30 shadow-lg shadow-blue-500/10 rounded-2xl p-6">
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div class="text-center">
              <p class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">~4 Veckor</p>
              <p class="text-gray-400 text-sm">Från Idé till MVP</p>
            </div>
            <div class="text-center">
              <p class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">100%</p>
              <p class="text-gray-400 text-sm">Startup Fokuserad</p>
            </div>
            <div class="text-center col-span-2 md:col-span-1">
              <p class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">24/7</p>
              <p class="text-gray-400 text-sm">Support & Samarbete</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Right Column - Feature Cards -->
      <div class="w-full lg:w-1/2 space-y-4">
        <!-- Feature Card 1 -->
        <div class="hero-card backdrop-blur-sm bg-gray-800/25 border border-purple-500/30 shadow-lg shadow-purple-500/10 rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px]">
          <div class="flex items-center gap-4">
            <div class="rounded-full bg-purple-500/30 p-3 border border-purple-500/40">
              <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">Snabb Prototyping</h3>
              <p class="text-gray-300">Från koncept till klickbar prototyp på dagar. Testa dina idéer snabbare och iterera med självförtroende.</p>
            </div>
          </div>
        </div>
        
        <!-- Feature Card 2 -->
        <div class="hero-card backdrop-blur-sm bg-gray-800/25 border border-rose-500/30 shadow-lg shadow-rose-500/10 rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px]">
          <div class="flex items-center gap-4">
            <div class="rounded-full bg-rose-500/30 p-3 border border-rose-500/40">
              <svg class="w-6 h-6 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400 mb-2">Investeringsklara MVPs</h3>
              <p class="text-gray-300">Bygg produkter som imponerar på både investerare och tidiga användare. Fokusera på kärnfunktioner som skapar värde.</p>
            </div>
          </div>
        </div>
        
        <!-- Feature Card 3 -->
        <div class="hero-card backdrop-blur-sm bg-gray-800/25 border border-amber-500/30 shadow-lg shadow-amber-500/10 rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px]">
          <div class="flex items-center gap-4">
            <div class="rounded-full bg-amber-500/30 p-3 border border-amber-500/40">
              <svg class="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400 mb-2">Kostnadseffektiv Utveckling</h3>
              <p class="text-gray-300">Maximera din runway med vår effektiva utvecklingsprocess. Nå marknaden utan att tömma kassan.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Our Specialty Section -->
  <div class="relative container mx-auto px-4 py-16">
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 mb-4">
        Vår Specialitet
      </h2>
      <p class="text-gray-300 text-lg max-w-3xl mx-auto">
        Vi fokuserar på det vi gör bäst - att bygga snabba, skalbara och användarvänliga digitala lösningar för startups.
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Specialty Card 1: Supercharged Development -->
      <div class="specialty-card backdrop-blur-sm bg-gray-800/25 border border-cyan-500/30 shadow-lg shadow-cyan-500/10 rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px]">
        <div class="rounded-full bg-cyan-500/30 p-4 w-16 h-16 mb-6 flex items-center justify-center border border-cyan-500/40">
          <svg class="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-3">Supersnabb Utveckling</h3>
        <p class="text-gray-300">
          Vår optimerade utvecklingsprocess levererar resultat på rekordtid utan att kompromissa med kvalitet. Vi använder moderna verktyg och metoder för att maximera effektiviteten.
        </p>
      </div>
      
      <!-- Specialty Card 2: Startup Focus -->
      <div class="specialty-card backdrop-blur-sm bg-gray-800/25 border border-blue-500/30 shadow-lg shadow-blue-500/10 rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px]">
        <div class="rounded-full bg-blue-500/30 p-4 w-16 h-16 mb-6 flex items-center justify-center border border-blue-500/40">
          <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-3">Startup Fokus</h3>
        <p class="text-gray-300">
          Vi förstår startups unika utmaningar och behov. Vår approach är anpassad för att hjälpa dig validera idéer snabbt, attrahera investerare och nå marknaden innan konkurrenterna.
        </p>
      </div>
      
      <!-- Specialty Card 3: Web Development -->
      <div class="specialty-card backdrop-blur-sm bg-gray-800/25 border border-teal-500/30 shadow-lg shadow-teal-500/10 rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px]">
        <div class="rounded-full bg-teal-500/30 p-4 w-16 h-16 mb-6 flex items-center justify-center border border-teal-500/40">
          <svg class="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 mb-3">Webbutveckling</h3>
        <p class="text-gray-300">
          Vi bygger moderna, responsiva och snabba webbapplikationer med fokus på användarupplevelse. Våra lösningar är skalbara, säkra och byggda med framtidssäkra teknologier.
        </p>
      </div>
    </div>
  </div>

  <!-- Process Section -->
  <div class="relative container mx-auto px-4 py-16">
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 mb-4">
        Vår Process
      </h2>
      <p class="text-gray-300 text-lg max-w-3xl mx-auto">
        En enkel och effektiv väg från idé till färdig produkt. Vi håller processen transparent och fokuserad på dina behov.
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <!-- Process Step 1 -->
      <div class="process-card backdrop-blur-sm bg-gray-800/35 border border-indigo-500/30 shadow-lg shadow-indigo-500/10 rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px]">
        <div class="flex items-center justify-between mb-6">
          <div class="rounded-full bg-indigo-500/30 p-4 w-16 h-16 flex items-center justify-center border border-indigo-500/40">
            <svg class="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div class="text-5xl font-bold text-indigo-500/40">01</div>
        </div>
        <h3 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-3">Första Kontakt</h3>
        <p class="text-gray-300">
          Du kontaktar oss genom formuläret på vår hemsida. Berätta kort om din idé och vilken typ av lösning du söker. Vi återkommer vanligtvis inom 24 timmar.
        </p>
      </div>
      
      <!-- Process Step 2 -->
      <div class="process-card backdrop-blur-sm bg-gray-800/35 border border-violet-500/30 shadow-lg shadow-violet-500/10 rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px]">
        <div class="flex items-center justify-between mb-6">
          <div class="rounded-full bg-violet-500/30 p-4 w-16 h-16 flex items-center justify-center border border-violet-500/40">
            <svg class="w-8 h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div class="text-5xl font-bold text-violet-500/40">02</div>
        </div>
        <h3 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 mb-3">Möte i Stockholm</h3>
        <p class="text-gray-300">
          Vi bokar ett personligt möte i Stockholm för att diskutera ditt projekt i detalj. Här får vi en djupare förståelse för din vision, mål och tekniska behov.
        </p>
      </div>
      
      <!-- Process Step 3 -->
      <div class="process-card backdrop-blur-sm bg-gray-800/35 border border-fuchsia-500/30 shadow-lg shadow-fuchsia-500/10 rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px]">
        <div class="flex items-center justify-between mb-6">
          <div class="rounded-full bg-fuchsia-500/30 p-4 w-16 h-16 flex items-center justify-center border border-fuchsia-500/40">
            <svg class="w-8 h-8 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div class="text-5xl font-bold text-fuchsia-500/40">03</div>
        </div>
        <h3 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-400 mb-3">Planering & Avtal</h3>
        <p class="text-gray-300">
          Vi diskuterar prissättning, samarbetsform och projektets omfattning. Tillsammans definierar vi tydliga mål, tidsramar och leverabler för att säkerställa ett framgångsrikt projekt.
        </p>
      </div>
      
      <!-- Process Step 4 -->
      <div class="process-card backdrop-blur-sm bg-gray-800/35 border border-rose-500/30 shadow-lg shadow-rose-500/10 rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px]">
        <div class="flex items-center justify-between mb-6">
          <div class="rounded-full bg-rose-500/30 p-4 w-16 h-16 flex items-center justify-center border border-rose-500/40">
            <svg class="w-8 h-8 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
            </svg>
          </div>
          <div class="text-5xl font-bold text-rose-500/40">04</div>
        </div>
        <h3 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-400 mb-3">Utveckling & Feedback</h3>
        <p class="text-gray-300">
          Vi påbörjar utvecklingen med kontinuerlig feedbackloop. Du får regelbundna uppdateringar och möjlighet att testa och ge feedback under hela processen, vilket säkerställer att slutprodukten möter dina förväntningar.
        </p>
      </div>
    </div>
  </div>

  <!-- Pricing Section -->
  <div class="relative container mx-auto px-4 py-16">
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 mb-4">
        Prismodeller
      </h2>
      <p class="text-gray-300 text-lg max-w-3xl mx-auto">
        Vi erbjuder flexibla samarbetsformer anpassade efter din startups behov och budget. Välj den modell som passar dig bäst.
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <!-- Pricing Model 1: Hourly Rate -->
      <div class="pricing-card backdrop-blur-sm bg-gray-800/35 border border-emerald-500/30 shadow-lg shadow-emerald-500/10 rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px]">
        <div class="flex flex-col items-center mb-6">
          <div class="rounded-full bg-emerald-500/30 p-4 w-16 h-16 flex items-center justify-center border border-emerald-500/40 mb-4">
            <svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-1">Timpris</h3>
          <div class="flex items-baseline">
            <span class="text-3xl font-bold text-white">SEK</span>
            <span class="text-5xl font-bold text-white mx-1">X</span>
            <span class="text-xl text-gray-400">/timme</span>
          </div>
        </div>
        
        <ul class="space-y-3">
          <li class="flex items-start">
            <svg class="w-5 h-5 text-emerald-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-gray-300">Maximal flexibilitet</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-emerald-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-gray-300">Transparent fakturering</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-emerald-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-gray-300">Perfekt för mindre projekt</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-emerald-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-gray-300">Ingen långsiktig bindning</span>
          </li>
        </ul>
      </div>
      
      <!-- Pricing Model 2: Fixed Sum -->
      <div class="pricing-card backdrop-blur-sm bg-gray-800/35 border border-blue-500/30 shadow-lg shadow-blue-500/10 rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px]">
        <div class="flex flex-col items-center mb-6">
          <div class="rounded-full bg-blue-500/30 p-4 w-16 h-16 flex items-center justify-center border border-blue-500/40 mb-4">
            <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-1">Fast Pris</h3>
          <div class="flex items-baseline">
            <span class="text-3xl font-bold text-white">SEK</span>
            <span class="text-5xl font-bold text-white mx-1">Y</span>
            <span class="text-xl text-gray-400">/projekt</span>
          </div>
        </div>
        
        <ul class="space-y-3">
          <li class="flex items-start">
            <svg class="w-5 h-5 text-blue-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-gray-300">Förutsägbar kostnad</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-blue-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-gray-300">Tydligt definierat scope</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-blue-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-gray-300">Betalningsplan i etapper</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-blue-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-gray-300">Populärt för MVP-projekt</span>
          </li>
        </ul>
      </div>
      
      <!-- Pricing Model 3: Fixed Sum + Stocks -->
      <div class="pricing-card relative backdrop-blur-sm bg-gray-800/35 border border-purple-500/30 shadow-lg shadow-purple-500/10 rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px]">
        <!-- Recommended Tag -->
        <div class="absolute -top-3 right-4 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          Rekommenderad
        </div>
        
        <div class="flex flex-col items-center mb-6">
          <div class="rounded-full bg-purple-500/30 p-4 w-16 h-16 flex items-center justify-center border border-purple-500/40 mb-4">
            <svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400 mb-1">Fast Pris + Aktier</h3>
          <div class="flex items-baseline">
            <span class="text-3xl font-bold text-white">SEK</span>
            <span class="text-5xl font-bold text-white mx-1">Z</span>
            <span class="text-xl text-gray-400">+ aktier</span>
          </div>
        </div>
        
        <ul class="space-y-3">
          <li class="flex items-start">
            <svg class="w-5 h-5 text-purple-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-gray-300">Lägre initial kostnad</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-purple-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-gray-300">Långsiktigt engagemang</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-purple-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-gray-300">Delade intressen</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-purple-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-gray-300">Perfekt för startups med begränsad budget</span>
          </li>
        </ul>
      </div>
      
      <!-- Pricing Model 4: Cofounder Package -->
      <div class="pricing-card backdrop-blur-sm bg-gray-800/35 border border-rose-500/30 shadow-lg shadow-rose-500/10 rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px]">
        <div class="flex flex-col items-center mb-6">
          <div class="rounded-full bg-rose-500/30 p-4 w-16 h-16 flex items-center justify-center border border-rose-500/40 mb-4">
            <svg class="w-8 h-8 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-400 mb-1">Medgrundare</h3>
          <div class="flex items-baseline">
            <span class="text-5xl font-bold text-white">Equity</span>
          </div>
        </div>
        
        <ul class="space-y-3">
          <li class="flex items-start">
            <svg class="w-5 h-5 text-rose-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-gray-300">Fullt engagemang i projektet</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-rose-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-gray-300">Teknisk medgrundare</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-rose-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-gray-300">Strategiskt partnerskap</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-rose-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-gray-300">Långsiktig tillväxtfokus</span>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Contact Section -->
  <div id="contact-section" class="relative container mx-auto px-4 pt-20 pb-16" ref={contactSection}>
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 mb-4">
        Kontakta Oss
      </h2>
      <p class="text-gray-300 text-lg max-w-3xl mx-auto">
        Redo att ta nästa steg? Fyll i formuläret nedan eller kontakta oss direkt via e-post.
      </p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Contact Form -->
      <div class="contact-form backdrop-blur-sm bg-gray-800/35 border border-cyan-500/30 shadow-lg shadow-cyan-500/10 rounded-2xl p-6 md:p-8">
        <div class="flip-container {submitStatus === 'success' ? 'flipped' : ''}">
          <div class="flipper">
            <!-- Front side (form) -->
            <div class="front pb-0">
              <h3 class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-6">Skicka ett Meddelande</h3>
              
              {#if submitStatus === 'error'}
                <div class="error-message bg-rose-500/20 border border-rose-500/30 rounded-lg p-4 mb-6">
                  <div class="flex items-center">
                    <svg class="w-6 h-6 text-rose-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                    <p class="text-white">{errorMessage}</p>
                  </div>
                </div>
              {/if}
              
              <form class="space-y-6 form-container" onsubmit={handleSubmit}>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="name" class="block text-gray-300 mb-2">Namn</label>
                    <div class="relative">
                      <input 
                        type="text" 
                        id="name" 
                        bind:value={name}
                        class="w-full px-4 py-3 bg-gray-800/50 border {errors.name ? 'border-rose-500' : 'border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent text-white" 
                        placeholder="Ditt namn">
                      <p class="text-rose-500 text-sm mt-1 min-h-[20px]">{errors.name}</p>
                    </div>
                  </div>
                  <div>
                    <label for="email" class="block text-gray-300 mb-2">E-post</label>
                    <div class="relative">
                      <input 
                        type="email" 
                        id="email" 
                        bind:value={email}
                        class="w-full px-4 py-3 bg-gray-800/50 border {errors.email ? 'border-rose-500' : 'border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent text-white" 
                        placeholder="din.email@exempel.se">
                      <p class="text-rose-500 text-sm mt-1 min-h-[20px]">{errors.email}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label for="message" class="block text-gray-300 mb-2">Meddelande</label>
                  <div class="relative">
                    <textarea 
                      id="message" 
                      rows="5" 
                      bind:value={message}
                      class="w-full px-4 py-3 bg-gray-800/50 border {errors.message ? 'border-rose-500' : 'border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent text-white resize-none" 
                      placeholder="Berätta mer om ditt projekt..."></textarea>
                    <p class="text-rose-500 text-sm mt-1 min-h-[20px]">{errors.message}</p>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  class="submit-btn w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500/90 via-blue-500/90 to-teal-500/90 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 relative overflow-hidden disabled:opacity-70 disabled:hover:shadow-none mb-0">
                  {#if isSubmitting}
                    <span class="flex items-center justify-center">
                      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Skickar...
                    </span>
                  {:else}
                    Skicka Meddelande
                  {/if}
                </button>
              </form>
            </div>
            
            <!-- Back side (success message) -->
            <div class="back bg-gray-800/35 border border-emerald-500/30 shadow-lg shadow-emerald-500/10 rounded-2xl">
              <div class="flex flex-col items-center justify-center h-full text-center p-6">
                <div class="success-icon mb-6">
                  <div class="rounded-full bg-emerald-500/30 p-6 flex items-center justify-center border border-emerald-500/40">
                    <svg class="w-16 h-16 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                </div>
                <h3 class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-4">Meddelande Skickat!</h3>
                <p class="text-gray-300 text-lg mb-8">Tack för ditt meddelande! Vi återkommer till dig inom kort.</p>
                <button 
                  type="button" 
                  onclick={() => {
                    submitStatus = null;
                    // Reset form fields for a fresh start
                    name = '';
                    email = '';
                    message = '';
                  }}
                  class="submit-btn px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500/90 to-teal-500/90 text-white font-medium hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 relative overflow-hidden z-10">
                  Skicka ett nytt meddelande
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Contact Info -->
      <div class="flex flex-col gap-6">
        <!-- Email Card -->
        <div class="contact-card backdrop-blur-sm bg-gray-800/35 border border-blue-500/30 shadow-lg shadow-blue-500/10 rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px]">
          <div class="flex items-center gap-4">
            <div class="rounded-full bg-blue-500/30 p-4 flex items-center justify-center border border-blue-500/40">
              <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">E-post</h3>
              <p class="text-gray-300 mb-2">Skicka oss ett mail direkt:</p>
              <a href="mailto:dlovan@axentra.agency" class="text-lg font-medium text-white hover:text-cyan-400 transition-colors">dlovan@axentra.agency</a>
            </div>
          </div>
        </div>
        
        <!-- Location Card -->
        <div class="contact-card backdrop-blur-sm bg-gray-800/35 border border-purple-500/30 shadow-lg shadow-purple-500/10 rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px]">
          <div class="flex items-center gap-4">
            <div class="rounded-full bg-purple-500/30 p-4 flex items-center justify-center border border-purple-500/40">
              <svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400 mb-2">Plats</h3>
              <p class="text-gray-300 mb-2">Vi finns i:</p>
              <p class="text-lg font-medium text-white">Stockholm, Sverige</p>
            </div>
          </div>
        </div>
        
        <!-- Response Time Card -->
        <div class="contact-card backdrop-blur-sm bg-gray-800/35 border border-emerald-500/30 shadow-lg shadow-emerald-500/10 rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-5px]">
          <div class="flex items-center gap-4">
            <div class="rounded-full bg-emerald-500/30 p-4 flex items-center justify-center border border-emerald-500/40">
              <svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-2">Svarstid</h3>
              <p class="text-gray-300 mb-2">Vi svarar vanligtvis inom:</p>
              <p class="text-lg font-medium text-white">24 timmar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer Section -->
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
          <div class="flex items-center space-x-3 mb-6">
            <div class="logo-container h-10 w-10 rounded-full bg-gray-800/35 flex items-center justify-center border border-cyan-500/40">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" stroke="url(#footerLogoGradient)" stroke-width="1.5" fill="none" />
                <path d="M12 3V10.5M12 21V15M20 7.5L15 10.5M4 7.5L9 10.5M12 10.5L17 13.5L12 15L7 13.5L12 10.5Z" stroke="url(#footerLogoGradient)" stroke-width="1.5" stroke-linecap="round" />
                <defs>
                  <linearGradient id="footerLogoGradient" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#22d3ee" />
                    <stop offset="50%" stop-color="#0ea5e9" />
                    <stop offset="100%" stop-color="#2dd4bf" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
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
              <a href="#" class="text-gray-300 hover:text-white transition-colors flex items-center">
                <svg class="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
                Hem
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-300 hover:text-white transition-colors flex items-center">
                <svg class="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
                Vår Process
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-300 hover:text-white transition-colors flex items-center">
                <svg class="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
                Prismodeller
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-300 hover:text-white transition-colors flex items-center">
                <svg class="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
                Kontakta Oss
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-300 hover:text-white transition-colors flex items-center">
                <svg class="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
                Våra Arbeten
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
        <p>&copy; {new Date().getFullYear()} Axentra. Alla rättigheter förbehållna.</p>
      </div>
    </div>
  </div>

  <!-- Fixed Background Elements -->
  <div class="fixed inset-0 -z-10">
    <!-- Grid overlay -->
    <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDYwTDYwIDBIMFY2MHoiIGZpbGw9IiMxYTFhMWEiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
    
    <!-- Animated gradient orbs -->
    <div class="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-10 blur-3xl animate-pulse"></div>
    <div class="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 opacity-10 blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
    <div class="absolute top-3/4 right-1/3 w-72 h-72 rounded-full bg-gradient-to-r from-teal-400 to-blue-600 opacity-10 blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
    
    <!-- Upside-down effect (Stranger Things inspired) -->
    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30"></div>
    
    <!-- Glowing accent line at top only -->
    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
  </div>
  
  <!-- Connection lines (Stranger Things web effect) -->
  {#each connectionLines as line}
    <div 
      class="fixed"
      style="
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: {line.opacity};
        background: transparent;
        transform-origin: 0 0;
        transform: translate({line.x1}vw, {line.y1}vh) rotate(${Math.atan2(line.y2 - line.y1, line.x2 - line.x1)}rad);
        width: ${Math.sqrt(Math.pow(line.x2 - line.x1, 2) + Math.pow(line.y2 - line.y1, 2))}vw;
        height: 1px;
        background-color: hsl({line.hue}, 70%, 75%);
        pointer-events: none;
      "
    ></div>
  {/each}
  
  <!-- Main particles (with soft red, green, blue colors) -->
  {#each particles as particle}
    <div 
      class="fixed rounded-full animate-flicker pointer-events-none"
      style="
        left: {particle.x}%; 
        top: {particle.y}%; 
        width: {particle.size}px; 
        height: {particle.size}px; 
        opacity: {particle.opacity};
        background-color: hsl({particle.hue}, {particle.sat}%, {particle.light}%);
        box-shadow: 0 0 {particle.size * 1.2}px {particle.size * 0.6}px hsl({particle.hue}, {particle.sat}%, {particle.light}%, 0.4);
        animation-delay: {Math.random() * 5}s;
      "
    ></div>
  {/each}
  
  <!-- Dust particles (with soft colors) -->
  {#each dustParticles as particle}
    <div 
      class="fixed rounded-full pointer-events-none"
      style="
        left: {particle.x}%; 
        top: {particle.y}%; 
        width: {particle.size}px; 
        height: {particle.size}px; 
        opacity: {particle.opacity};
        background-color: hsl({particle.hue}, {particle.sat}%, {particle.light}%);
      "
    ></div>
  {/each}
  
  <!-- Fixed Contact Button -->
  <a 
    href="#contact-section" 
    class="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500/90 via-blue-500/90 to-teal-500/90 text-white font-medium shadow-lg shadow-cyan-500/20 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 group no-underline"
    onclick={(e) => {
      e.preventDefault();
      const contactElement = document.getElementById('contact-section');
      if (contactElement) {
        // Get the navbar height (approximately)
        const navbarHeight = 40; // Reduced offset for more subtle adjustment
        
        // Scroll to element with offset
        window.scrollTo({
          top: contactElement.offsetTop - navbarHeight,
          behavior: 'smooth'
        });
      }
    }}
  >
    <span>Kontakta Oss</span>
    <div class="rounded-full bg-white/20 p-1 group-hover:bg-white/30 transition-all">
      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7 7 7-7"></path>
      </svg>
    </div>
  </a>
</div>

<style>
  /* Global smooth scrolling */
  :global(html) {
    scroll-behavior: smooth;
    scroll-padding-top: 40px; /* Reduced padding */
  }
  
  :global(body) {
    scroll-behavior: smooth;
  }
  
  /* Add margin to the contact section to account for navbar */
  :global(#contact-section) {
    scroll-margin-top: 40px;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.1; }
    50% { opacity: 0.2; }
  }
  
  .animate-pulse {
    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  @keyframes flicker {
    0%, 100% { opacity: var(--opacity, 0.7); }
    50% { opacity: calc(var(--opacity, 0.7) * 0.6); }
  }
  
  .animate-flicker {
    animation: flicker 3s ease-in-out infinite;
    animation-duration: calc(2s + (var(--delay, 0) * 3s));
  }
  
  .navbar-capsule {
    transition: all 0.3s ease;
  }
  
  .get-in-touch-btn {
    position: relative;
    overflow: hidden;
  }
  
  .get-in-touch-btn::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: 0.5s;
  }
  
  .get-in-touch-btn:hover::after {
    left: 100%;
  }
  
  /* Form input styling */
  input, textarea {
    border-width: 1.5px !important;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05);
    border-color: rgba(100, 116, 139, 0.5) !important; /* slate-500 at 50% opacity */
  }
  
  input:focus, textarea:focus {
    border-color: transparent !important;
  }
  
  .form-container {
    padding: 0 2px;
    margin-bottom: 0;
  }
  
  /* 3D Flip Animation for Contact Form */
  .flip-container {
    perspective: 1000px;
    width: 100%;
    height: 100%;
    min-height: 470px; /* Further reduced height to remove extra space below button */
  }
  
  .flip-container.flipped .flipper {
    transform: rotateY(180deg);
  }
  
  .flipper {
    transition: 0.8s;
    transform-style: preserve-3d;
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .front, .back {
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto; /* Allow scrolling if content is too tall */
    border-radius: 1rem; /* Match the rounded-2xl class */
  }
  
  .front {
    z-index: 2;
    transform: rotateY(0deg);
    padding-bottom: 0; /* Remove bottom padding */
  }
  
  .back {
    transform: rotateY(180deg);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* Success icon animation */
  .success-icon {
    animation: scale-in 0.5s ease-out 0.3s both;
  }
  
  @keyframes scale-in {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  /* Success message animations */
  .back h3 {
    animation: fade-in-up 0.6s ease-out 0.5s both;
  }
  
  .back p {
    animation: fade-in-up 0.6s ease-out 0.7s both;
  }
  
  .back button {
    animation: fade-in-up 0.6s ease-out 0.9s both;
  }
  
  @keyframes fade-in-up {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Fix for autocomplete white background */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  textarea:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px rgba(31, 41, 55, 0.8) inset !important;
    -webkit-text-fill-color: white !important;
    transition: background-color 5000s ease-in-out 0s;
    caret-color: white;
  }
  
  /* For Firefox */
  input:autofill,
  textarea:autofill {
    background-color: rgba(31, 41, 55, 0.8) !important;
    color: white !important;
  }
  
  /* Ensure text remains visible during autofill for non-webkit browsers */
  @supports not (-webkit-appearance: none) {
    input:-internal-autofill-selected {
      background-color: rgba(31, 41, 55, 0.8) !important;
      color: white !important;
    }
  }
  
  /* Decorative element animations */
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  .animate-pulse-slow {
    animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes pulse-slow {
    0%, 100% { opacity: 0.8; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }
  
  .code-pattern {
    background-image: 
      repeating-linear-gradient(
        rgba(255, 255, 255, 0.1) 0px,
        rgba(255, 255, 255, 0.1) 1px,
        transparent 1px,
        transparent 8px
      ),
      repeating-linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.1) 0px,
        rgba(255, 255, 255, 0.1) 1px,
        transparent 1px,
        transparent 8px
      );
    background-size: 8px 8px;
    height: 100%;
    width: 100%;
  }
  
  /* Glass effect for submit buttons */
  .submit-btn {
    position: relative;
    overflow: hidden;
  }
  
  .submit-btn::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: 0.6s;
  }
  
  .submit-btn:hover::after {
    left: 100%;
  }
  
  /* Remove extra space at the bottom of the form */
  .form-container > :last-child {
    margin-bottom: 0;
  }
</style>
