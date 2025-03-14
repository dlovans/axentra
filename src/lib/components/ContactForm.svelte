<script>
  // Contact form state
  let name = $state('');
  let email = $state('');
  let message = $state('');
  let isSubmitting = $state(false);
  let submitStatus = $state(null); // null, 'success', 'error'
  let errorMessage = $state('');
  
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
</script>

<!-- Contact Form -->
<div class="contact-form backdrop-blur-sm bg-gray-800/35 border border-cyan-500/30 shadow-lg shadow-cyan-500/10 rounded-2xl p-3 md:p-5 lg:p-8">
  <div class="flip-container {submitStatus === 'success' ? 'flipped' : ''}">
    <div class="flipper">
      <!-- Front side (form) -->
      <div class="front pb-0">
        <h3 class="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-3 md:mb-5">Skicka ett Meddelande</h3>
        
        {#if submitStatus === 'error'}
          <div class="error-message bg-rose-500/20 border border-rose-500/30 rounded-lg p-3 mb-4">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-rose-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              <p class="text-white text-sm md:text-base">
                {errorMessage}
              </p>
            </div>
          </div>
        {/if}
        
        <form class="space-y-4 md:space-y-6 form-container" onsubmit={handleSubmit}>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label for="name" class="block text-gray-300 mb-1 md:mb-2 text-sm md:text-base">Namn</label>
              <div class="relative">
                <input 
                  type="text" 
                  id="name" 
                  bind:value={name}
                  class="w-full px-3 py-2 md:px-4 md:py-3 bg-gray-800/50 border {errors.name ? 'border-rose-500' : 'border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent text-white text-sm md:text-base" 
                  placeholder="Ditt namn">
                <p class="text-rose-500 text-xs md:text-sm mt-1 min-h-[16px] md:min-h-[20px]">{errors.name}</p>
              </div>
            </div>
            <div>
              <label for="email" class="block text-gray-300 mb-1 md:mb-2 text-sm md:text-base">E-post</label>
              <div class="relative">
                <input 
                  type="email" 
                  id="email" 
                  bind:value={email}
                  class="w-full px-3 py-2 md:px-4 md:py-3 bg-gray-800/50 border {errors.email ? 'border-rose-500' : 'border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent text-white text-sm md:text-base" 
                  placeholder="din.email@exempel.se">
                <p class="text-rose-500 text-xs md:text-sm mt-1 min-h-[16px] md:min-h-[20px]">{errors.email}</p>
              </div>
            </div>
          </div>
          
          <div>
            <label for="message" class="block text-gray-300 mb-1 md:mb-2 text-sm md:text-base">Meddelande</label>
            <div class="relative">
              <textarea 
                id="message" 
                rows="4" 
                bind:value={message}
                class="w-full px-3 py-2 md:px-4 md:py-3 bg-gray-800/50 border {errors.message ? 'border-rose-500' : 'border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent text-white resize-none text-sm md:text-base" 
                placeholder="Berätta mer om ditt projekt..."></textarea>
              <p class="text-rose-500 text-xs md:text-sm mt-1 min-h-[16px] md:min-h-[20px]">{errors.message}</p>
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            class="submit-btn w-full py-2 md:py-3 rounded-lg bg-gradient-to-r from-cyan-500/90 via-blue-500/90 to-teal-500/90 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 relative overflow-hidden disabled:opacity-70 disabled:hover:shadow-none mb-0 text-sm md:text-base">
            {#if isSubmitting}
              <span class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 md:h-5 md:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
        <div class="flex flex-col items-center justify-center h-full text-center p-4 md:p-6">
          <div class="success-icon mb-4 md:mb-6">
            <div class="rounded-full bg-emerald-500/30 p-4 md:p-6 flex items-center justify-center border border-emerald-500/40">
              <svg class="w-12 h-12 md:w-16 md:h-16 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
          <h3 class="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-3 md:mb-4">Meddelande Skickat!</h3>
          <p class="text-gray-300 text-base md:text-lg mb-6 md:mb-8">Tack för ditt meddelande! Vi återkommer till dig inom kort.</p>
          <button 
            type="button" 
            onclick={() => {
              submitStatus = null;
              // Reset form fields for a fresh start
              name = '';
              email = '';
              message = '';
            }}
            class="submit-btn px-4 md:px-6 py-2 md:py-3 rounded-lg bg-gradient-to-r from-emerald-500/90 to-teal-500/90 text-white font-medium hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 relative overflow-hidden z-10 text-sm md:text-base">
            Skicka ett nytt meddelande
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
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
    padding: 0;
    margin-bottom: 0;
    width: 100%;
  }
  
  /* 3D Flip Animation for Contact Form */
  .flip-container {
    perspective: 1000px;
    width: 100%;
    height: auto;
    min-height: 450px;
    max-width: 100%;
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
    min-height: 450px;
    overflow: visible;
    box-sizing: border-box;
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
    -webkit-box-shadow: 0 0 0 30px rgba(31, 41, 55, 0.5) inset !important;
    -webkit-text-fill-color: white !important;
  }
  
  /* Submit button styling */
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