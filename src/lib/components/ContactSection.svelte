<script>
  import ContactForm from './ContactForm.svelte';
  import ContactInfo from './ContactInfo.svelte';
  
  // Reference to contact section for scrolling
  let contactSection;
</script>

<!-- Contact Section -->
<div id="contact-section" class="relative container mx-auto px-3 md:px-4 pt-12 md:pt-16 pb-12 md:pb-16" bind:this={contactSection}>
  <div class="text-center mb-6 md:mb-8 lg:mb-12">
    <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 mb-2 md:mb-3 lg:mb-4">
      Kontakta Oss
    </h2>
    <p class="text-gray-300 text-sm md:text-base lg:text-lg max-w-3xl mx-auto">
      Redo att ta nästa steg? Fyll i formuläret nedan eller kontakta oss direkt via e-post.
    </p>
  </div>
  
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 lg:gap-8">
    <!-- Contact Form Component -->
    <ContactForm />
    
    <!-- Contact Info Component -->
    <ContactInfo />
  </div>
</div>

<style>
  /* Add margin to the contact section to account for navbar */
  :global(#contact-section) {
    scroll-margin-top: 40px;
  }
</style> 