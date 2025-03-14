<script>
  import ProcessCard from './ProcessCard.svelte';
  
  // Props for the process section
  const {
    title = "Vår Process",
    subtitle = "En enkel och effektiv väg från idé till färdig produkt. Vi håller processen transparent och fokuserad på dina behov.",
    steps = [
      {
        stepNumber: "01",
        title: "Första Kontakt",
        description: "Du kontaktar oss genom formuläret på vår hemsida. Berätta kort om din idé och vilken typ av lösning du söker. Vi återkommer vanligtvis inom 24 timmar.",
        iconPath: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
        gradientFrom: "indigo-400",
        gradientTo: "purple-400",
        borderColor: "indigo-500/30",
        shadowColor: "indigo-500/10",
        iconBgColor: "indigo-500/30",
        iconBorderColor: "indigo-500/40",
        iconTextColor: "indigo-400",
        stepNumberColor: "indigo-500/40"
      },
      {
        stepNumber: "02",
        title: "Möte i Stockholm",
        description: "Vi bokar ett personligt möte i Stockholm för att diskutera ditt projekt i detalj. Här får vi en djupare förståelse för din vision, mål och tekniska behov.",
        iconPath: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z",
        gradientFrom: "violet-400",
        gradientTo: "fuchsia-400",
        borderColor: "violet-500/30",
        shadowColor: "violet-500/10",
        iconBgColor: "violet-500/30",
        iconBorderColor: "violet-500/40",
        iconTextColor: "violet-400",
        stepNumberColor: "violet-500/40"
      },
      {
        stepNumber: "03",
        title: "Planering & Avtal",
        description: "Vi diskuterar prissättning, samarbetsform och projektets omfattning. Tillsammans definierar vi tydliga mål, tidsramar och leverabler för att säkerställa ett framgångsrikt projekt.",
        iconPath: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
        gradientFrom: "fuchsia-400",
        gradientTo: "pink-400",
        borderColor: "fuchsia-500/30",
        shadowColor: "fuchsia-500/10",
        iconBgColor: "fuchsia-500/30",
        iconBorderColor: "fuchsia-500/40",
        iconTextColor: "fuchsia-400",
        stepNumberColor: "fuchsia-500/40"
      },
      {
        stepNumber: "04",
        title: "Utveckling & Feedback",
        description: "Vi påbörjar utvecklingen med kontinuerlig feedbackloop. Du får regelbundna uppdateringar och möjlighet att testa och ge feedback under hela processen, vilket säkerställer att slutprodukten möter dina förväntningar.",
        iconPath: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
        gradientFrom: "rose-400",
        gradientTo: "red-400",
        borderColor: "rose-500/30",
        shadowColor: "rose-500/10",
        iconBgColor: "rose-500/30",
        iconBorderColor: "rose-500/40",
        iconTextColor: "rose-400",
        stepNumberColor: "rose-500/40"
      }
    ]
  } = $props();
</script>

<div id="process-section" class="relative container mx-auto px-4 py-16">
  <div class="text-center mb-12">
    <h2 class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 mb-4">
      {title}
    </h2>
    <p class="text-gray-300 text-lg max-w-3xl mx-auto">
      {subtitle}
    </p>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    {#each steps as step}
      <ProcessCard 
        stepNumber={step.stepNumber}
        title={step.title}
        description={step.description}
        iconPath={step.iconPath}
        gradientFrom={step.gradientFrom}
        gradientTo={step.gradientTo}
        borderColor={step.borderColor}
        shadowColor={step.shadowColor}
        iconBgColor={step.iconBgColor}
        iconBorderColor={step.iconBorderColor}
        iconTextColor={step.iconTextColor}
        stepNumberColor={step.stepNumberColor}
      />
    {/each}
  </div>
</div> 