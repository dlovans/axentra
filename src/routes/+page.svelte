<script>
  import { onMount } from 'svelte';
  import { setPageTitle } from '$lib/stores/page-title.js';
  import SupportPackageCard from '$lib/components/SupportPackageCard.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import ContactSection from '$lib/components/ContactSection.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import ParticleBackground from '$lib/components/ParticleBackground.svelte';
  import SpecialtySection from '$lib/components/SpecialtySection.svelte';
  import HeroSection from '$lib/components/HeroSection.svelte';
  import ProcessSection from '$lib/components/ProcessSection.svelte';
  import PricingSection from '$lib/components/PricingSection.svelte';
  
  onMount(() => {
    // Set the page title for the home page
    setPageTitle('Snabb MVP-utveckling för innovativa startups');
  });
  
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
  <div class="relative container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <SupportPackageCard {scrollToContact} />
          </div>
        </div>
        
  <!-- Contact Section Component -->
  <ContactSection />
  
  <!-- Footer Component -->
  <Footer />
  
  <!-- Fixed Contact Button -->
  <a 
    href="#contact-section" 
    class="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500/90 via-blue-500/90 to-teal-500/90 text-white font-medium shadow-lg shadow-cyan-500/20 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 group no-underline"
    onclick={(e) => {
      e.preventDefault();
      scrollToContact();
    }}
  >
    <span>Kontakta Oss</span>
    <div class="rounded-full bg-white/20 p-1 group-hover:bg-white/30 transition-all">
      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7 7 7-7"></path>
      </svg>
    </div>
  </a>
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
</style>
