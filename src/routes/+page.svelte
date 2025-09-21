<script>
  import SupportPackageCard from '$lib/components/SupportPackageCard.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import ContactSection from '$lib/components/ContactSection.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import ParticleBackground from '$lib/components/ParticleBackground.svelte';
  import SpecialtySection from '$lib/components/SpecialtySection.svelte';
  import HeroSection from '$lib/components/HeroSection.svelte';
  import ProcessSection from '$lib/components/ProcessSection.svelte';
  import PricingSection from '$lib/components/PricingSection.svelte';
  import ProjectSection from '$lib/components/ProjectSection.svelte';
  import ConsultationCTA from '$lib/components/ConsultationCTA.svelte';
  import ProjectEstimator from '$lib/components/ProjectEstimator.svelte';
  import MultiContactOptions from '$lib/components/MultiContactOptions.svelte';

  // Function to scroll to contact section
  function scrollToContact() {
    const contactElement = document.getElementById('contact-section');
    if (contactElement) {
      // Get the navbar height and add additional offset for better positioning
      const navbarHeight = 30; // Increased offset for more scrolling

      // Scroll to element with offset
      window.scrollTo({
        top: contactElement.offsetTop - navbarHeight,
        behavior: 'smooth'
      });
    }
  }
</script>

<svelte:head>
  <title>Axentra | Custom API Development & Backend Solutions | Stockholm</title>
  <meta name="description" content="Expert API development services in Stockholm. I build custom REST APIs, solve integration challenges, optimize performance bottlenecks, and create scalable backend systems for modern applications." />
  <meta name="keywords" content="custom API development, backend solutions, REST API Stockholm, API integration services, microservices development, API performance optimization, scalable backend systems, API consulting, webhook implementation, database optimization" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://axentra.agency/" />
  <meta property="og:title" content="Axentra | Custom API Development & Backend Solutions" />
  <meta property="og:description" content="Turn your app ideas into reality with robust backend systems. I solve integration headaches, performance bottlenecks, and scaling challenges." />
  <meta property="og:image" content="https://axentra.agency/og-image.png" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://axentra.agency/" />
  <meta property="twitter:title" content="Axentra | Custom API Development & Backend Solutions" />
  <meta property="twitter:description" content="Expert API development services. Custom REST APIs, integrations, and scalable backend systems." />
  <meta property="twitter:image" content="https://axentra.agency/og-image.png" />

  <!-- Canonical URL -->
  <link rel="canonical" href="https://axentra.agency/" />

  <!-- Language and region -->
  <meta property="og:locale" content="sv_SE" />
  <meta property="og:locale:alternate" content="en_US" />

  <!-- Additional SEO tags -->
  <meta name="author" content="Axentra" />
  <meta name="robots" content="index, follow" />
  <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />

  <!-- Structured Data / Schema.org -->
  {@html `<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Axentra",
    "url": "https://axentra.agency/",
    "logo": "https://axentra.agency/favicon-192.png",
    "description": "Custom API development and backend solutions specialist. I solve integration challenges, optimize API performance, and build scalable backend systems.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Stockholm",
      "addressCountry": "SE"
    },
    "sameAs": [
      "https://github.com/dlovans/axentra",
      "https://linkedin.com/company/axentra-startups-ab"
    ]
  }
  </script>`}

  {@html `<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://axentra.agency/",
    "name": "Axentra | Custom API Development & Backend Solutions",
    "description": "Expert API development services. I build custom REST APIs, solve integration challenges, and create scalable backend systems.",
    "keywords": "custom API development, backend solutions, API integration, REST API, microservices",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://axentra.agency/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
  </script>`}

  {@html `<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Axentra",
    "image": "https://axentra.agency/favicon.png",
    "url": "https://axentra.agency",
    "priceRange": "$$-$$$",
    "description": "Professional API development and backend engineering services in Stockholm.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Stockholm",
      "addressCountry": "SE"
    },
    "areaServed": ["United States", "Europe", "Sweden", "Stockholm"],
    "serviceType": [
      "Custom API Development",
      "Backend System Architecture",
      "API Integration Services",
      "Microservices Development",
      "API Performance Optimization"
    ]
  }
  </script>`}
</svelte:head>

<ParticleBackground>
  <!-- Navbar Component -->
  <Navbar />
  
  <!-- Hero Section Component -->
  <HeroSection />

  <!-- Our Specialty Section -->
  <SpecialtySection />

  <!-- Process Section -->
  <ProcessSection />

  <!-- Pricing Section -->
  <PricingSection />

  <!-- Comprehensive Support Option Card -->
  <div class="container relative px-4 py-12 mx-auto">
    <div class="max-w-4xl mx-auto">
      <SupportPackageCard {scrollToContact} />
          </div>
        </div>

  <!-- Projects Section -->
  <ProjectSection />
  
  <!-- Consultation CTA -->
  <ConsultationCTA />
  
  <!-- Project Estimator -->
  <ProjectEstimator />
  
  <!-- Multiple Contact Options -->
  <MultiContactOptions />
        
  <!-- Contact Section Component -->
  <ContactSection />
  
  <!-- Footer Component -->
  <Footer />
</ParticleBackground>

<style>
  /* Global smooth scrolling */
  :global(html) {
    scroll-behavior: smooth;
    scroll-padding-top: 80px; /* Increased to match the new offset */
  }
  
  :global(body) {
    scroll-behavior: smooth;
  }
</style>
