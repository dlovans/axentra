<script>
  import { onMount } from 'svelte';
  import { login } from '$lib/firebase/auth';
  
  // Login form state
  let email = $state('');
  let password = $state('');
  let isSubmitting = $state(false);
  let loginError = $state('');
  
  // Form validation state
  let errors = $state({
    email: '',
    password: ''
  });
  
  // Validate email format
  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  // Real-time validation for email
  function validateEmail() {
    if (!email) {
      errors.email = 'E-post krävs';
    } else if (!isValidEmail(email)) {
      errors.email = 'Ogiltig e-postadress';
    } else {
      errors.email = '';
    }
  }
  
  // Real-time validation for password
  function validatePassword() {
    if (!password) {
      errors.password = 'Lösenord krävs';
    } else {
      errors.password = '';
    }
  }
  
  // Handle login form submission
  async function handleLogin(event) {
    event.preventDefault();
    // Validate form
    validateEmail();
    validatePassword();
    
    // Clear login error
    loginError = '';
    
    // Check if form is valid
    if (errors.email || errors.password) {
      return;
    }
    
    // Submit form
    isSubmitting = true;
    
    const result = await login(email, password);
      console.log('result', result);
      
      if (!result.success) {
        // Display the error message from the login function
        loginError = result.message;
        isSubmitting = false;
        return;
      }
  }
</script>

<svelte:head>
  <title>Logga In | Axentra</title>
</svelte:head>

<div class="min-h-screen bg-gray-900 text-white flex flex-col">
  <!-- Glowing accent line at top -->
  <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
  
  <!-- Navbar -->
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
      
      <!-- Home Button -->
      <a href="/" class="px-4 py-2 md:px-6 md:py-2 rounded-full bg-gray-800/50 text-white font-medium text-sm md:text-base hover:bg-gray-700/50 transition-all duration-300">
        Tillbaka
      </a>
    </div>
  </div>
  
  <!-- Login Form Container -->
  <div class="flex-1 flex items-center justify-center px-4 pt-28">
    <div class="w-full max-w-md">
      <!-- Login Card -->
      <div class="backdrop-blur-sm bg-gray-800/25 border border-cyan-500/30 shadow-lg shadow-cyan-500/10 rounded-2xl p-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 mb-2">
            Logga In
          </h2>
          <p class="text-gray-300">
            Ange dina uppgifter för att fortsätta
          </p>
        </div>
        
        <!-- Login Form -->
        <form onsubmit={handleLogin} class="space-y-3">
          <!-- Email Field -->
          <div class="space-y-1">
            <label for="email" class="block text-sm font-medium text-gray-300">E-post</label>
            <div class="relative">
              <input
                type="email"
                id="email"
                bind:value={email}
                oninput={validateEmail}
                onblur={validateEmail}
                class="w-full px-4 py-3 bg-gray-800/50 border {errors.email ? 'border-red-500/50' : 'border-cyan-500/30'} rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-white placeholder-gray-500"
                placeholder="din@email.se"
              />
              <div class="h-5 mt-1">
                {#if errors.email}
                  <p class="text-sm text-red-400">{errors.email}</p>
                {/if}
              </div>
            </div>
          </div>
          
          <!-- Password Field -->
          <div class="space-y-1">
            <label for="password" class="block text-sm font-medium text-gray-300">Lösenord</label>
            <div class="relative">
              <input
                type="password"
                id="password"
                bind:value={password}
                oninput={validatePassword}
                onblur={validatePassword}
                class="w-full px-4 py-3 bg-gray-800/50 border {errors.password ? 'border-red-500/50' : 'border-cyan-500/30'} rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-white placeholder-gray-500"
                placeholder="••••••••"
              />
              <div class="h-5 mt-1">
                {#if errors.password}
                  <p class="text-sm text-red-400">{errors.password}</p>
                {/if}
              </div>
            </div>
          </div>
          
          <!-- Login Error Message - Fixed height container -->
          <div class="h-6 flex items-center mb-1">
            {#if loginError}
              <div class="w-full p-1.5 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200 text-xs">
                {loginError}
              </div>
            {/if}
          </div>
          
          <!-- Login Button -->
          <button
            type="submit"
            disabled={isSubmitting}
            class="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500/80 via-blue-500/80 to-teal-500/80 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {#if isSubmitting}
              <span class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loggar in...
              </span>
            {:else}
              Logga In
            {/if}
          </button>
          
          <!-- Forgot Password Link -->
          <div class="text-center">
            <a href="/forgot-password" class="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
              Glömt lösenord?
            </a>
          </div>
        </form>
      </div>
      
      <!-- Footer with increased margin to compensate for removed register section -->
      <div class="mt-12 text-center">
        <p class="text-gray-500 text-sm">© {new Date().getFullYear()} Axentra. Alla rättigheter förbehållna.</p>
      </div>
    </div>
  </div>
  
  <!-- Subtle radial gradient background -->
  <div class="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.05),rgba(15,23,42,0))]"></div>
</div>

<style>
  /* Global styles */
  :global(html) {
    scroll-behavior: smooth;
    background-color: #0f172a; /* Tailwind's gray-900 */
  }
  
  :global(body) {
    scroll-behavior: smooth;
    scroll-padding-top: 40px;
  }
  
  /* Subtle background animation */
  @keyframes pulse {
    0%, 100% { opacity: 0.05; }
    50% { opacity: 0.1; }
  }
  
  /* Input focus animation */
  input:focus {
    animation: glow 2s ease-in-out infinite alternate;
  }
  
  @keyframes glow {
    from { box-shadow: 0 0 5px rgba(14, 165, 233, 0.2); }
    to { box-shadow: 0 0 10px rgba(14, 165, 233, 0.4); }
  }
  
  /* Fix for autocomplete background color */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px rgb(31, 41, 55) inset !important; /* Tailwind's gray-800 */
    -webkit-text-fill-color: white !important;
    transition: background-color 5000s ease-in-out 0s;
  }
  
  /* Firefox specific autocomplete styling */
  input:autofill {
    background-color: rgb(31, 41, 55) !important; /* Tailwind's gray-800 */
    color: white !important;
  }
</style>
