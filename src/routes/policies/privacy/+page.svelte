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
  <title>{language === 'sv' ? 'Integritetspolicy | Axentra' : 'Privacy Policy | Axentra'}</title>
  <meta name="description" content={language === 'sv' ? 'Hur vi samlar in, använder och skyddar dina personuppgifter. Läs om dina rättigheter enligt GDPR.' : 'How we collect, use, and protect your personal data. Read about your rights under GDPR.'} />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://axentra.agency/policies/privacy" />

  <!-- Open Graph -->
  <meta property="og:title" content={language === 'sv' ? 'Integritetspolicy | Axentra' : 'Privacy Policy | Axentra'} />
  <meta property="og:description" content={language === 'sv' ? 'Hur vi samlar in, använder och skyddar dina personuppgifter. Läs om dina rättigheter enligt GDPR.' : 'How we collect, use, and protect your personal data. Read about your rights under GDPR.'} />
  <meta property="og:url" content="https://axentra.agency/policies/privacy" />
  <meta property="og:type" content="website" />

  <!-- Twitter -->
  <meta name="twitter:title" content={language === 'sv' ? 'Integritetspolicy | Axentra' : 'Privacy Policy | Axentra'} />
  <meta name="twitter:description" content={language === 'sv' ? 'Hur vi samlar in, använder och skyddar dina personuppgifter. Läs om dina rättigheter enligt GDPR.' : 'How we collect, use, and protect your personal data. Read about your rights under GDPR.'} />
</svelte:head>

<div class="container mx-auto px-4 py-12 max-w-4xl">
  <div class="flex justify-between items-center mb-8">
    <h1 class="text-3xl font-bold text-white dark:text-white">
      {language === 'sv' ? 'Integritetspolicy' : 'Privacy Policy'}
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
      
      <h2 class="text-cyan-300">Introduktion</h2>
      <p class="text-gray-200">
        Axentra Startups AB ("Axentra", "vi", "oss", eller "vår") respekterar din integritet och är engagerad i att skydda dina personuppgifter. 
        Denna integritetspolicy informerar dig om hur vi samlar in, använder och skyddar dina personuppgifter när du använder vår webbplats och tjänster.
      </p>
      
      <h2 class="text-cyan-300">Personuppgiftsansvarig</h2>
      <p class="text-gray-200">
        Axentra Startups AB är personuppgiftsansvarig för behandlingen av dina personuppgifter. Om du har några frågor om denna policy eller 
        vår hantering av dina personuppgifter, vänligen kontakta oss på <a href="mailto:privacy@axentra.agency" class="text-blue-300 hover:text-blue-200">privacy@axentra.agency</a>.
      </p>
      
      <h2 class="text-cyan-300">Vilka personuppgifter vi samlar in</h2>
      <p class="text-gray-200">
        Vi kan samla in följande typer av personuppgifter:
      </p>
      <ul class="text-gray-200">
        <li><strong class="text-white">Identifieringsuppgifter:</strong> Namn, e-postadress, telefonnummer</li>
        <li><strong class="text-white">Kontoinformation:</strong> Användarnamn, lösenord (krypterat)</li>
        <li><strong class="text-white">Teknisk information:</strong> IP-adress, enhetstyp, webbläsartyp, operativsystem</li>
        <li><strong class="text-white">Användningsinformation:</strong> Hur du interagerar med vår webbplats och tjänster</li>
        <li><strong class="text-white">Kommunikation:</strong> E-postmeddelanden och annan kommunikation med oss</li>
      </ul>
      
      <h2 class="text-cyan-300">Hur vi samlar in personuppgifter</h2>
      <p class="text-gray-200">
        Vi samlar in personuppgifter genom:
      </p>
      <ul class="text-gray-200">
        <li>Direkt interaktion när du skapar ett konto eller kontaktar oss</li>
        <li>Automatiserad teknik när du använder vår webbplats (cookies, serverloggar)</li>
        <li>Tredje parter (t.ex. affärspartners, analysföretag)</li>
      </ul>
      
      <h2 class="text-cyan-300">Hur vi använder dina personuppgifter</h2>
      <p class="text-gray-200">
        Vi använder dina personuppgifter för att:
      </p>
      <ul class="text-gray-200">
        <li>Tillhandahålla och förbättra våra tjänster</li>
        <li>Hantera ditt konto</li>
        <li>Kommunicera med dig</li>
        <li>Anpassa innehåll och marknadsföring</li>
        <li>Analysera användningsmönster</li>
        <li>Förhindra bedrägerier och säkerställa säkerheten</li>
      </ul>
      
      <h2 class="text-cyan-300">Rättslig grund för behandling</h2>
      <p class="text-gray-200">
        Vi behandlar dina personuppgifter baserat på:
      </p>
      <ul class="text-gray-200">
        <li><strong class="text-white">Avtal:</strong> När behandlingen är nödvändig för att uppfylla vårt avtal med dig</li>
        <li><strong class="text-white">Berättigat intresse:</strong> När behandlingen är nödvändig för våra legitima intressen</li>
        <li><strong class="text-white">Samtycke:</strong> När du har gett oss ditt samtycke</li>
        <li><strong class="text-white">Rättslig förpliktelse:</strong> När behandlingen är nödvändig för att uppfylla en rättslig förpliktelse</li>
      </ul>
      
      <h2 class="text-cyan-300">Delning av personuppgifter</h2>
      <p class="text-gray-200">
        Vi kan dela dina personuppgifter med:
      </p>
      <ul class="text-gray-200">
        <li>Tjänsteleverantörer som hjälper oss att driva vår verksamhet</li>
        <li>Professionella rådgivare (t.ex. advokater, revisorer)</li>
        <li>Myndigheter när det krävs enligt lag</li>
      </ul>
      
      <h2 class="text-cyan-300">Internationella överföringar</h2>
      <p class="text-gray-200">
        Vi kan överföra dina personuppgifter utanför Europeiska ekonomiska samarbetsområdet (EES). 
        När vi gör det, säkerställer vi att lämpliga skyddsåtgärder finns på plats.
      </p>
      
      <h2 class="text-cyan-300">Dataskydd</h2>
      <p class="text-gray-200">
        Vi har implementerat lämpliga säkerhetsåtgärder för att skydda dina personuppgifter mot oavsiktlig förlust, 
        obehörig åtkomst, användning, ändring och avslöjande.
      </p>
      
      <h2 class="text-cyan-300">Datalagring</h2>
      <p class="text-gray-200">
        Vi behåller dina personuppgifter endast så länge som är nödvändigt för de ändamål för vilka de samlades in, 
        inklusive för att uppfylla rättsliga, redovisnings- eller rapporteringskrav.
      </p>
      
      <h2 class="text-cyan-300">Dina rättigheter</h2>
      <p class="text-gray-200">
        Under dataskyddslagstiftningen har du rätt att:
      </p>
      <ul class="text-gray-200">
        <li>Begära tillgång till dina personuppgifter</li>
        <li>Begära rättelse av dina personuppgifter</li>
        <li>Begära radering av dina personuppgifter</li>
        <li>Invända mot behandling av dina personuppgifter</li>
        <li>Begära begränsning av behandlingen av dina personuppgifter</li>
        <li>Begära överföring av dina personuppgifter</li>
        <li>Dra tillbaka ditt samtycke</li>
      </ul>
      
      <h2 class="text-cyan-300">Cookies</h2>
      <p class="text-gray-200">
        Vi använder cookies och liknande tekniker för att förbättra din upplevelse på vår webbplats. 
        Du kan ställa in din webbläsare att vägra alla eller vissa cookies, eller att varna dig när webbplatser sätter eller använder cookies.
      </p>
      
      <h2 class="text-cyan-300">Ändringar av denna policy</h2>
      <p class="text-gray-200">
        Vi kan uppdatera denna integritetspolicy från tid till annan. Vi kommer att meddela dig om väsentliga ändringar genom att 
        publicera den nya policyn på denna sida.
      </p>
      
      <h2 class="text-cyan-300">Kontakta oss</h2>
      <p class="text-gray-200">
        Om du har några frågor om denna integritetspolicy, vänligen kontakta oss på <a href="mailto:privacy@axentra.agency" class="text-blue-300 hover:text-blue-200">privacy@axentra.agency</a>.
      </p>
      
      <h2 class="text-cyan-300">Klagomål</h2>
      <p class="text-gray-200">
        Du har rätt att lämna in ett klagomål till Integritetsskyddsmyndigheten om du är missnöjd med hur vi behandlar dina personuppgifter.
      </p>
    </div>
  {:else}
    <!-- English Content -->
    <div class="prose prose-invert max-w-none">
      <p class="text-lg mb-6 text-gray-200">
        Last updated: March 15, 2025
      </p>
      
      <h2 class="text-cyan-300">Introduction</h2>
      <p class="text-gray-200">
        Axentra Startups AB ("Axentra", "we", "us", or "our") respects your privacy and is committed to protecting your personal data. 
        This privacy policy informs you about how we collect, use, and safeguard your personal data when you use our website and services.
      </p>
      
      <h2 class="text-cyan-300">Data Controller</h2>
      <p class="text-gray-200">
        Axentra Startups AB is the data controller responsible for processing your personal data. If you have any questions about this policy or 
        our handling of your personal data, please contact us at <a href="mailto:privacy@axentra.agency" class="text-blue-300 hover:text-blue-200">privacy@axentra.agency</a>.
      </p>
      
      <h2 class="text-cyan-300">Personal Data We Collect</h2>
      <p class="text-gray-200">
        We may collect the following types of personal data:
      </p>
      <ul class="text-gray-200">
        <li><strong class="text-white">Identity Data:</strong> Name, email address, phone number</li>
        <li><strong class="text-white">Account Data:</strong> Username, password (encrypted)</li>
        <li><strong class="text-white">Technical Data:</strong> IP address, device type, browser type, operating system</li>
        <li><strong class="text-white">Usage Data:</strong> How you interact with our website and services</li>
        <li><strong class="text-white">Communication Data:</strong> Emails and other communications with us</li>
      </ul>
      
      <h2 class="text-cyan-300">How We Collect Personal Data</h2>
      <p class="text-gray-200">
        We collect personal data through:
      </p>
      <ul class="text-gray-200">
        <li>Direct interactions when you create an account or contact us</li>
        <li>Automated technologies when you use our website (cookies, server logs)</li>
        <li>Third parties (e.g., business partners, analytics providers)</li>
      </ul>
      
      <h2 class="text-cyan-300">How We Use Your Personal Data</h2>
      <p class="text-gray-200">
        We use your personal data to:
      </p>
      <ul class="text-gray-200">
        <li>Provide and improve our services</li>
        <li>Manage your account</li>
        <li>Communicate with you</li>
        <li>Personalize content and marketing</li>
        <li>Analyze usage patterns</li>
        <li>Prevent fraud and ensure security</li>
      </ul>
      
      <h2 class="text-cyan-300">Legal Basis for Processing</h2>
      <p class="text-gray-200">
        We process your personal data based on:
      </p>
      <ul class="text-gray-200">
        <li><strong class="text-white">Contract:</strong> When processing is necessary to fulfill our contract with you</li>
        <li><strong class="text-white">Legitimate Interest:</strong> When processing is necessary for our legitimate interests</li>
        <li><strong class="text-white">Consent:</strong> When you have given us your consent</li>
        <li><strong class="text-white">Legal Obligation:</strong> When processing is necessary to comply with a legal obligation</li>
      </ul>
      
      <h2 class="text-cyan-300">Sharing Personal Data</h2>
      <p class="text-gray-200">
        We may share your personal data with:
      </p>
      <ul class="text-gray-200">
        <li>Service providers who help us operate our business</li>
        <li>Professional advisers (e.g., lawyers, accountants)</li>
        <li>Authorities when required by law</li>
      </ul>
      
      <h2 class="text-cyan-300">International Transfers</h2>
      <p class="text-gray-200">
        We may transfer your personal data outside the European Economic Area (EEA). 
        When we do so, we ensure appropriate safeguards are in place.
      </p>
      
      <h2 class="text-cyan-300">Data Security</h2>
      <p class="text-gray-200">
        We have implemented appropriate security measures to protect your personal data against accidental loss, 
        unauthorized access, use, alteration, and disclosure.
      </p>
      
      <h2 class="text-cyan-300">Data Retention</h2>
      <p class="text-gray-200">
        We retain your personal data only for as long as necessary for the purposes for which it was collected, 
        including to satisfy legal, accounting, or reporting requirements.
      </p>
      
      <h2 class="text-cyan-300">Your Rights</h2>
      <p class="text-gray-200">
        Under data protection legislation, you have the right to:
      </p>
      <ul class="text-gray-200">
        <li>Request access to your personal data</li>
        <li>Request correction of your personal data</li>
        <li>Request erasure of your personal data</li>
        <li>Object to processing of your personal data</li>
        <li>Request restriction of processing your personal data</li>
        <li>Request transfer of your personal data</li>
        <li>Withdraw consent</li>
      </ul>
      
      <h2 class="text-cyan-300">Cookies</h2>
      <p class="text-gray-200">
        We use cookies and similar technologies to enhance your experience on our website. 
        You can set your browser to refuse all or some cookies, or to alert you when websites set or access cookies.
      </p>
      
      <h2 class="text-cyan-300">Changes to This Policy</h2>
      <p class="text-gray-200">
        We may update this privacy policy from time to time. We will notify you of significant changes by posting the new policy on this page.
      </p>
      
      <h2 class="text-cyan-300">Contact Us</h2>
      <p class="text-gray-200">
        If you have any questions about this privacy policy, please contact us at <a href="mailto:privacy@axentra.agency" class="text-blue-300 hover:text-blue-200">privacy@axentra.agency</a>.
      </p>
      
      <h2 class="text-cyan-300">Complaints</h2>
      <p class="text-gray-200">
        You have the right to lodge a complaint with the Swedish Authority for Privacy Protection if you are dissatisfied with how we process your personal data.
      </p>
    </div>
  {/if}
</div> 