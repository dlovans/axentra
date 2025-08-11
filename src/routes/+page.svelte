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
  import ProjectSection from '$lib/components/ProjectSection.svelte';
  import ConsultationCTA from '$lib/components/ConsultationCTA.svelte';
  import ProjectEstimator from '$lib/components/ProjectEstimator.svelte';
  import MultiContactOptions from '$lib/components/MultiContactOptions.svelte';
  
  onMount(() => {
    // Set the page title for the home page
    setPageTitle('API Development - REST, GraphQL, and gRPC');
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
