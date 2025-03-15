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
      {language === 'sv' ? 'Användarvillkor' : 'Terms of Service'}
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
      
      <h2 class="text-cyan-300">1. Acceptans av villkor</h2>
      <p class="text-gray-200">
        Genom att använda tjänsterna som tillhandahålls av Axentra Startups AB ("Axentra", "vi", "oss", eller "vår"), 
        accepterar du att vara bunden av dessa användarvillkor ("Villkor"). Om du inte accepterar alla villkor, 
        vänligen använd inte våra tjänster.
      </p>
      
      <h2 class="text-cyan-300">2. Beskrivning av tjänsten</h2>
      <p class="text-gray-200">
        Axentra tillhandahåller olika digitala tjänster och produkter ("Tjänsterna") som hjälper företag att växa och utvecklas. 
        Vi förbehåller oss rätten att när som helst ändra, pausa eller avsluta någon del av Tjänsterna utan föregående meddelande.
      </p>
      
      <h2 class="text-cyan-300">3. Användarregistrering</h2>
      <p class="text-gray-200">
        För att använda vissa delar av Tjänsterna kan du behöva skapa ett konto. Du ansvarar för att hålla dina kontouppgifter 
        säkra och är ansvarig för all aktivitet som sker under ditt konto. Du måste omedelbart meddela Axentra om eventuell 
        obehörig användning av ditt konto.
      </p>
      
      <h2 class="text-cyan-300">4. Användarinnehåll</h2>
      <p class="text-gray-200">
        Du behåller alla rättigheter till innehåll som du laddar upp, publicerar eller delar via Tjänsterna ("Användarinnehåll"). 
        Genom att tillhandahålla Användarinnehåll, ger du Axentra en global, royaltyfri licens att använda, kopiera, modifiera, 
        distribuera och visa sådant innehåll i samband med att tillhandahålla och marknadsföra Tjänsterna.
      </p>
      
      <h2 class="text-cyan-300">5. Förbjudet beteende</h2>
      <p class="text-gray-200">
        Du får inte använda Tjänsterna för något olagligt eller otillåtet syfte. Du får inte:
      </p>
      <ul class="text-gray-200">
        <li>Bryta mot någon lag eller förordning</li>
        <li>Kränka andras immateriella rättigheter</li>
        <li>Sprida skadlig kod eller försöka få obehörig åtkomst till våra system</li>
        <li>Störa eller avbryta Tjänsterna eller servrar eller nätverk som är anslutna till Tjänsterna</li>
        <li>Samla in eller lagra personuppgifter om andra användare utan deras samtycke</li>
      </ul>
      
      <h2 class="text-cyan-300">6. Betalning och prenumerationer</h2>
      <p class="text-gray-200">
        Vissa av våra Tjänster kan kräva betalning eller prenumeration. Betalningsvillkor kommer att tillhandahållas vid köptillfället. 
        Alla betalningar är icke-återbetalningsbara om inte annat anges.
      </p>
      
      <h2 class="text-cyan-300">7. Uppsägning</h2>
      <p class="text-gray-200">
        Vi förbehåller oss rätten att avsluta eller begränsa din åtkomst till Tjänsterna om du bryter mot dessa Villkor. 
        Du kan när som helst avsluta ditt konto genom att kontakta oss.
      </p>
      
      <h2 class="text-cyan-300">8. Ansvarsfriskrivning</h2>
      <p class="text-gray-200">
        Tjänsterna tillhandahålls "i befintligt skick" och "som tillgängliga" utan några garantier av något slag, 
        vare sig uttryckliga eller underförstådda.
      </p>
      
      <h2 class="text-cyan-300">9. Ansvarsbegränsning</h2>
      <p class="text-gray-200">
        I den utsträckning som tillåts enligt lag, ska Axentra inte vara ansvarig för några indirekta, tillfälliga, 
        särskilda, följd- eller straffskador, eller förlust av vinst eller intäkter.
      </p>
      
      <h2 class="text-cyan-300">10. Ändringar av villkoren</h2>
      <p class="text-gray-200">
        Vi kan uppdatera dessa Villkor från tid till annan. Vi kommer att meddela dig om väsentliga ändringar genom att 
        publicera de nya Villkoren på denna sida.
      </p>
      
      <h2 class="text-cyan-300">11. Tillämplig lag</h2>
      <p class="text-gray-200">
        Dessa Villkor ska regleras av och tolkas i enlighet med svensk lag, utan hänsyn till dess lagvalsregler.
      </p>
      
      <h2 class="text-cyan-300">12. Kontakta oss</h2>
      <p class="text-gray-200">
        Om du har några frågor om dessa Villkor, vänligen kontakta oss på <a href="mailto:legal@axentra.agency" class="text-blue-300 hover:text-blue-200">legal@axentra.agency</a>.
      </p>
    </div>
  {:else}
    <!-- English Content -->
    <div class="prose prose-invert max-w-none">
      <p class="text-lg mb-6 text-gray-200">
        Last updated: March 15, 2025
      </p>
      
      <h2 class="text-cyan-300">1. Acceptance of Terms</h2>
      <p class="text-gray-200">
        By using the services provided by Axentra Startups AB ("Axentra", "we", "us", or "our"), 
        you agree to be bound by these Terms of Service ("Terms"). If you do not accept all of the Terms, 
        please do not use our services.
      </p>
      
      <h2 class="text-cyan-300">2. Description of Service</h2>
      <p class="text-gray-200">
        Axentra provides various digital services and products ("Services") that help businesses grow and develop. 
        We reserve the right to modify, suspend, or discontinue any part of the Services at any time without prior notice.
      </p>
      
      <h2 class="text-cyan-300">3. User Registration</h2>
      <p class="text-gray-200">
        To use certain parts of the Services, you may need to create an account. You are responsible for keeping your account 
        details secure and are liable for all activity that occurs under your account. You must immediately notify Axentra 
        of any unauthorized use of your account.
      </p>
      
      <h2 class="text-cyan-300">4. User Content</h2>
      <p class="text-gray-200">
        You retain all rights to content that you upload, post, or share through the Services ("User Content"). 
        By providing User Content, you grant Axentra a worldwide, royalty-free license to use, copy, modify, 
        distribute, and display such content in connection with providing and marketing the Services.
      </p>
      
      <h2 class="text-cyan-300">5. Prohibited Conduct</h2>
      <p class="text-gray-200">
        You may not use the Services for any illegal or unauthorized purpose. You may not:
      </p>
      <ul class="text-gray-200">
        <li>Violate any law or regulation</li>
        <li>Infringe upon others' intellectual property rights</li>
        <li>Distribute malicious code or attempt to gain unauthorized access to our systems</li>
        <li>Interfere with or disrupt the Services or servers or networks connected to the Services</li>
        <li>Collect or store personal data about other users without their consent</li>
      </ul>
      
      <h2 class="text-cyan-300">6. Payment and Subscriptions</h2>
      <p class="text-gray-200">
        Some of our Services may require payment or subscription. Payment terms will be provided at the time of purchase. 
        All payments are non-refundable unless stated otherwise.
      </p>
      
      <h2 class="text-cyan-300">7. Termination</h2>
      <p class="text-gray-200">
        We reserve the right to terminate or restrict your access to the Services if you violate these Terms. 
        You may terminate your account at any time by contacting us.
      </p>
      
      <h2 class="text-cyan-300">8. Disclaimer</h2>
      <p class="text-gray-200">
        The Services are provided "as is" and "as available" without warranties of any kind, either express or implied.
      </p>
      
      <h2 class="text-cyan-300">9. Limitation of Liability</h2>
      <p class="text-gray-200">
        To the extent permitted by law, Axentra shall not be liable for any indirect, incidental, special, 
        consequential, or punitive damages, or any loss of profits or revenues.
      </p>
      
      <h2 class="text-cyan-300">10. Changes to Terms</h2>
      <p class="text-gray-200">
        We may update these Terms from time to time. We will notify you of material changes by posting the new Terms on this page.
      </p>
      
      <h2 class="text-cyan-300">11. Governing Law</h2>
      <p class="text-gray-200">
        These Terms shall be governed by and construed in accordance with the laws of Sweden, without regard to its conflict of law provisions.
      </p>
      
      <h2 class="text-cyan-300">12. Contact Us</h2>
      <p class="text-gray-200">
        If you have any questions about these Terms, please contact us at <a href="mailto:legal@axentra.agency" class="text-blue-300 hover:text-blue-200">legal@axentra.agency</a>.
      </p>
    </div>
  {/if}
</div> 