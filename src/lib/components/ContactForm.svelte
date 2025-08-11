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
      errors.name = 'Name is required';
      isValid = false;
    }
    
    if (!email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!isValidEmail(email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    if (!message.trim()) {
      errors.message = 'Message is required';
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
        errorMessage = result.error || 'An error occurred. Please try again later.';
      }
    } catch (error) {
      submitStatus = 'error';
      errorMessage = 'A connection error occurred. Please check your internet connection.';
      console.error('Form submission error:', error);
    } finally {
      isSubmitting = false;
    }
  }
</script>

<!-- Contact Form -->
<div class="contact-form bg-white border-2 border-gray-200 shadow-lg shadow-gray-500/10 rounded-xl p-3 md:p-5 lg:p-8">
  <div class="flip-container {submitStatus === 'success' ? 'flipped' : ''}">
    <div class="flipper">
      <!-- Front side (form) -->
      <div class="front pb-0">
        <h3 class="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-orange-500 mb-3 md:mb-5">Send a Message</h3>
        
        {#if submitStatus === 'error'}
          <div class="error-message bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-red-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              <p class="text-red-700 text-sm md:text-base">
                {errorMessage}
              </p>
            </div>
          </div>
        {/if}
        
        <form class="space-y-4 md:space-y-6 form-container" onsubmit={handleSubmit}>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label for="name" class="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base font-medium">Name</label>
              <div class="relative">
                <input 
                  type="text" 
                  id="name" 
                  bind:value={name}
                  class="w-full px-3 py-2 md:px-4 md:py-3 bg-white border-2 {errors.name ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-gray-800 text-sm md:text-base" 
                  placeholder="Your name">
                <p class="text-red-600 text-xs md:text-sm mt-1 min-h-[16px] md:min-h-[20px]">{errors.name}</p>
              </div>
            </div>
            <div>
              <label for="email" class="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base font-medium">Email</label>
              <div class="relative">
                <input 
                  type="email" 
                  id="email" 
                  bind:value={email}
                  class="w-full px-3 py-2 md:px-4 md:py-3 bg-white border-2 {errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-gray-800 text-sm md:text-base" 
                  placeholder="your.email@example.com">
                <p class="text-red-600 text-xs md:text-sm mt-1 min-h-[16px] md:min-h-[20px]">{errors.email}</p>
              </div>
            </div>
          </div>
          
          <div>
            <label for="message" class="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base font-medium">Message</label>
            <div class="relative">
              <textarea 
                id="message" 
                rows="4" 
                bind:value={message}
                class="w-full px-3 py-2 md:px-4 md:py-3 bg-white border-2 {errors.message ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-gray-800 resize-none text-sm md:text-base" 
                placeholder="Tell us more about your project..."></textarea>
              <p class="text-red-600 text-xs md:text-sm mt-1 min-h-[16px] md:min-h-[20px]">{errors.message}</p>
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            class="submit-btn w-full py-2 md:py-3 rounded-lg bg-gradient-to-r from-gray-800 to-orange-500 text-white font-medium hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 relative overflow-hidden disabled:opacity-70 disabled:hover:shadow-none mb-0 text-sm md:text-base">
            {#if isSubmitting}
              <span class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 md:h-5 md:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            {:else}
              Send Message
            {/if}
          </button>
        </form>
      </div>
      
      <!-- Back side (success message) -->
      <div class="back bg-green-50 border-2 border-green-200 shadow-lg shadow-green-500/10 rounded-xl">
        <div class="flex flex-col items-center justify-center h-full text-center p-4 md:p-6">
          <div class="success-icon mb-4 md:mb-6">
            <div class="rounded-full bg-green-100 p-4 md:p-6 flex items-center justify-center border border-green-200">
              <svg class="w-12 h-12 md:w-16 md:h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
          <h3 class="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-3 md:mb-4">Message Sent!</h3>
          <p class="text-gray-700 text-base md:text-lg mb-6 md:mb-8">Thank you for your message! I'll get back to you shortly.</p>
          <button 
            type="button" 
            onclick={() => {
              submitStatus = null;
              // Reset form fields for a fresh start
              name = '';
              email = '';
              message = '';
            }}
            class="submit-btn px-4 md:px-6 py-2 md:py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 relative overflow-hidden z-10 text-sm md:text-base">
            Send another message
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* Form input styling */
  input, textarea {
    border-width: 2px !important;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
  
  input:focus, textarea:focus {
    box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
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
    padding-bottom: 0;
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