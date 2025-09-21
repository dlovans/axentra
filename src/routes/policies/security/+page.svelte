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

<svelte:head>
  <title>{language === 'sv' ? 'Säkerhetspolicy | Axentra' : 'Security Policy | Axentra'}</title>
  <meta name="description" content={language === 'sv' ? 'Vårt säkerhetsåtagande och hur vi skyddar våra system och användares data. Rapportera säkerhetsproblem.' : 'Our security commitment and how we protect our systems and user data. Report security issues.'} />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://axentra.agency/policies/security" />

  <!-- Open Graph -->
  <meta property="og:title" content={language === 'sv' ? 'Säkerhetspolicy | Axentra' : 'Security Policy | Axentra'} />
  <meta property="og:description" content={language === 'sv' ? 'Vårt säkerhetsåtagande och hur vi skyddar våra system och användares data. Rapportera säkerhetsproblem.' : 'Our security commitment and how we protect our systems and user data. Report security issues.'} />
  <meta property="og:url" content="https://axentra.agency/policies/security" />
  <meta property="og:type" content="website" />

  <!-- Twitter -->
  <meta name="twitter:title" content={language === 'sv' ? 'Säkerhetspolicy | Axentra' : 'Security Policy | Axentra'} />
  <meta name="twitter:description" content={language === 'sv' ? 'Vårt säkerhetsåtagande och hur vi skyddar våra system och användares data. Rapportera säkerhetsproblem.' : 'Our security commitment and how we protect our systems and user data. Report security issues.'} />
</svelte:head>

<div class="container mx-auto px-4 py-12 max-w-4xl">
  <div class="flex justify-between items-center mb-8">
    <h1 class="text-3xl font-bold text-white dark:text-white">
      {language === 'sv' ? 'Säkerhetspolicy' : 'Security Policy'}
    </h1>
    <button 
      on:click={toggleLanguage}
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
    >
      {language === 'sv' ? 'English' : 'Svenska'}
    </button>
  </div>
  
  {#if language === 'sv'}
    <!-- Swedish Content -->
    <div class="prose prose-invert max-w-none">
      <p class="text-lg mb-6 text-gray-200">
        Senast uppdaterad: 15 mars 2025
      </p>
      
      <h2 class="text-cyan-300">Vårt säkerhetsåtagande</h2>
      <p class="text-gray-200">
        Axentra Startups AB tar säkerheten för våra användare och deras data på största allvar. 
        Denna policy beskriver vårt tillvägagångssätt för att säkerställa säkerheten i våra system och tjänster.
      </p>
      
      <h2 class="text-cyan-300">Rapportering av säkerhetsproblem</h2>
      <p class="text-gray-200">
        Vi uppmuntrar säkerhetsforskare och användare att rapportera potentiella säkerhetsproblem. 
        Om du upptäcker en sårbarhet, vänligen kontakta oss via:
      </p>
      <ul class="text-gray-200">
        <li>E-post: <a href="mailto:security@axentra.agency" class="text-blue-300 hover:text-blue-200">security@axentra.agency</a></li>
      </ul>
      
      <h2 class="text-cyan-300">Vår process</h2>
      <p class="text-gray-200">
        När vi tar emot en säkerhetsrapport:
      </p>
      <ol class="text-gray-200">
        <li>Vi bekräftar mottagandet inom 24 timmar</li>
        <li>Vi utvärderar rapporten och fastställer dess allvarlighetsgrad</li>
        <li>Vi arbetar för att åtgärda bekräftade sårbarheter så snabbt som möjligt</li>
        <li>Vi håller rapportören uppdaterad om våra framsteg</li>
        <li>Efter att sårbarheten har åtgärdats, kan vi offentligt erkänna rapportörens bidrag (med deras tillstånd)</li>
      </ol>
      
      <h2 class="text-cyan-300">Säkerhetsåtgärder</h2>
      <p class="text-gray-200">
        Vi implementerar flera säkerhetsåtgärder, inklusive men inte begränsat till:
      </p>
      <ul class="text-gray-200">
        <li>Regelbundna säkerhetsgranskningar av vår kod och infrastruktur</li>
        <li>Kryptering av känsliga data både vid överföring och lagring</li>
        <li>Säker autentisering och auktorisering</li>
        <li>Regelbundna säkerhetsutbildningar för vår personal</li>
        <li>Kontinuerlig övervakning för att upptäcka och reagera på säkerhetsincidenter</li>
      </ul>
      
      <h2 class="text-cyan-300">Uppdateringar av denna policy</h2>
      <p class="text-gray-200">
        Denna säkerhetspolicy kan uppdateras från tid till annan. Vi kommer att meddela användare om väsentliga ändringar genom att publicera den nya policyn på denna sida.
      </p>
    </div>
  {:else}
    <!-- English Content -->
    <div class="prose prose-invert max-w-none">
      <p class="text-lg mb-6 text-gray-200">
        Last updated: March 15, 2025
      </p>
      
      <h2 class="text-cyan-300">Our Security Commitment</h2>
      <p class="text-gray-200">
        Axentra Startups AB takes the security of our users and their data very seriously. 
        This policy outlines our approach to ensuring the security of our systems and services.
      </p>
      
      <h2 class="text-cyan-300">Reporting Security Issues</h2>
      <p class="text-gray-200">
        We encourage security researchers and users to report potential security issues. 
        If you discover a vulnerability, please contact us via:
      </p>
      <ul class="text-gray-200">
        <li>Email: <a href="mailto:security@axentra.agency" class="text-blue-300 hover:text-blue-200">security@axentra.agency</a></li>
      </ul>
      
      <h2 class="text-cyan-300">Our Process</h2>
      <p class="text-gray-200">
        When we receive a security report:
      </p>
      <ol class="text-gray-200">
        <li>We acknowledge receipt within 24 hours</li>
        <li>We evaluate the report and determine its severity</li>
        <li>We work to fix confirmed vulnerabilities as quickly as possible</li>
        <li>We keep the reporter updated on our progress</li>
        <li>After the vulnerability has been fixed, we may publicly acknowledge the reporter's contribution (with their permission)</li>
      </ol>
      
      <h2 class="text-cyan-300">Security Measures</h2>
      <p class="text-gray-200">
        We implement several security measures, including but not limited to:
      </p>
      <ul class="text-gray-200">
        <li>Regular security reviews of our code and infrastructure</li>
        <li>Encryption of sensitive data both in transit and at rest</li>
        <li>Secure authentication and authorization</li>
        <li>Regular security training for our staff</li>
        <li>Continuous monitoring to detect and respond to security incidents</li>
      </ul>
      
      <h2 class="text-cyan-300">Updates to This Policy</h2>
      <p class="text-gray-200">
        This security policy may be updated from time to time. We will notify users of significant changes by posting the new policy on this page.
      </p>
    </div>
  {/if}
</div> 