<script>
  import { onMount } from 'svelte';
  
  let language = 'sv'; // Default to Swedish
  
  onMount(() => {
    // Check browser language preference
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('en')) {
      language = 'en';
    }
  });
  
  function toggleLanguage() {
    language = language === 'sv' ? 'en' : 'sv';
  }
</script>

<div class="container mx-auto px-4 py-12 max-w-4xl">
  <div class="flex justify-between items-center mb-8">
    <h1 class="text-3xl font-bold text-white dark:text-white">
      {language === 'sv' ? 'Policyer och Villkor' : 'Policies and Terms'}
    </h1>
    <button 
      on:click={toggleLanguage}
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
    >
      {language === 'sv' ? 'English' : 'Svenska'}
    </button>
  </div>
  
  <div class="prose prose-invert max-w-none">
    <p class="text-lg mb-6 text-gray-200">
      {language === 'sv' 
        ? 'Här hittar du alla våra policyer och villkor. Vi är engagerade i transparens och att skydda dina rättigheter.' 
        : 'Here you can find all our policies and terms. We are committed to transparency and protecting your rights.'}
    </p>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <!-- Security Policy Card -->
      <a href="/policies/security" class="block p-6 bg-gray-800 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition border border-gray-700">
        <h2 class="text-xl font-semibold text-white dark:text-white mb-2">
          {language === 'sv' ? 'Säkerhetspolicy' : 'Security Policy'}
        </h2>
        <p class="text-gray-300 dark:text-gray-300">
          {language === 'sv' 
            ? 'Lär dig hur vi skyddar dina data och säkerheten för våra system.' 
            : 'Learn how we protect your data and the security of our systems.'}
        </p>
        <div class="mt-4 flex justify-end">
          <span class="text-cyan-400 hover:text-cyan-300">
            {language === 'sv' ? 'Läs mer →' : 'Read more →'}
          </span>
        </div>
      </a>
      
      <!-- Terms of Service Card -->
      <a href="/policies/terms" class="block p-6 bg-gray-800 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition border border-gray-700">
        <h2 class="text-xl font-semibold text-white dark:text-white mb-2">
          {language === 'sv' ? 'Användarvillkor' : 'Terms of Service'}
        </h2>
        <p class="text-gray-300 dark:text-gray-300">
          {language === 'sv' 
            ? 'Villkoren som gäller när du använder våra tjänster.' 
            : 'The terms that apply when you use our services.'}
        </p>
        <div class="mt-4 flex justify-end">
          <span class="text-cyan-400 hover:text-cyan-300">
            {language === 'sv' ? 'Läs mer →' : 'Read more →'}
          </span>
        </div>
      </a>
      
      <!-- Privacy Policy Card -->
      <a href="/policies/privacy" class="block p-6 bg-gray-800 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition border border-gray-700">
        <h2 class="text-xl font-semibold text-white dark:text-white mb-2">
          {language === 'sv' ? 'Integritetspolicy' : 'Privacy Policy'}
        </h2>
        <p class="text-gray-300 dark:text-gray-300">
          {language === 'sv' 
            ? 'Hur vi samlar in, använder och skyddar dina personuppgifter.' 
            : 'How we collect, use, and protect your personal data.'}
        </p>
        <div class="mt-4 flex justify-end">
          <span class="text-cyan-400 hover:text-cyan-300">
            {language === 'sv' ? 'Läs mer →' : 'Read more →'}
          </span>
        </div>
      </a>
      
      <!-- Contact Card -->
      <div class="p-6 bg-blue-900 dark:bg-blue-900 rounded-lg shadow-md border border-blue-800">
        <h2 class="text-xl font-semibold text-white dark:text-white mb-2">
          {language === 'sv' ? 'Har du frågor?' : 'Have Questions?'}
        </h2>
        <p class="text-gray-300 dark:text-gray-300">
          {language === 'sv' 
            ? 'Om du har några frågor om våra policyer eller villkor, tveka inte att kontakta oss.' 
            : 'If you have any questions about our policies or terms, don\'t hesitate to contact us.'}
        </p>
        <div class="mt-4">
          <a 
            href="mailto:legal@axentra.agency" 
            class="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            {language === 'sv' ? 'Kontakta oss' : 'Contact Us'}
          </a>
        </div>
      </div>
    </div>
  </div>
</div> 