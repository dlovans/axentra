<script>
  let projectType = $state('');
  let timeline = $state('');
  let budget = $state('');
  let features = $state([]);
  let email = $state('');
  let projectDescription = $state('');
  let showResults = $state(false);
  let estimatedWeeks = $state(0);
  let estimatedCost = $state('');
  
  const projectTypes = [
    { value: 'api-integration', label: 'API Integration', weeks: 2 },
    { value: 'microservices', label: 'Microservices Architecture', weeks: 8 },
    { value: 'api-maintenance', label: 'API Maintenance & Support', weeks: 1 }
  ];
  
  const budgetRanges = [
    { value: '2k-8k', label: '$2k - $8k' },
    { value: '8k-20k', label: '$8k - $20k' },
    { value: '20k-40k', label: '$20k - $40k' },
    { value: '40k+', label: '$40k+' }
  ];
  
  const availableFeatures = [
    'Authentication & Authorization',
    'Rate Limiting & Throttling',
    'API Documentation',
    'Database Integration',
    'Caching Layer',
    'Error Handling & Logging',
    'Data Validation',
    'File Upload/Storage',
    'Third-party Integrations',
    'Real-time Features',
    'Security Hardening',
    'Performance Monitoring'
  ];
  
  function toggleFeature(feature) {
    if (features.includes(feature)) {
      features = features.filter(f => f !== feature);
    } else {
      features = [...features, feature];
    }
  }
  
  function calculateEstimate() {
    if (!projectType || !timeline) return;
    
    const baseWeeks = projectTypes.find(p => p.value === projectType)?.weeks || 4;
    const featureWeeks = features.length * 0.5;
    const urgencyMultiplier = timeline === 'asap' ? 1.3 : timeline === '1-2months' ? 1 : 0.8;
    
    estimatedWeeks = Math.ceil((baseWeeks + featureWeeks) * urgencyMultiplier);
    
    if (budget === '2k-8k') estimatedCost = 'Basic API solution';
    else if (budget === '8k-20k') estimatedCost = 'Full-featured API';
    else if (budget === '20k-40k') estimatedCost = 'Enterprise-grade API';
    else estimatedCost = 'Custom enterprise solution';
    
    showResults = true;
  }
  
  function submitEstimate() {
    // Here you could send to your backend or email service
    console.log('Estimate submitted:', {
      projectType, timeline, budget, features, email, projectDescription
    });
    alert('Thanks! I\'ll send your detailed estimate within 24 hours.');
  }
</script>

<div id="estimator-section" class="relative container mx-auto px-4 py-16">
  <div class="max-w-4xl mx-auto">
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-600 to-orange-500 mb-4">
        API Project Estimator
      </h2>
      <p class="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
        Get an instant timeline and cost estimate for your API development, integration, or maintenance project.
      </p>
    </div>
    
    <div class="bg-white border-2 border-gray-200 shadow-lg shadow-gray-500/10 rounded-2xl p-8">
      <form class="space-y-8">
        <!-- Project Type -->
        <div>
          <label class="block text-lg font-semibold text-gray-800 mb-4">What type of API service do you need?</label>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {#each projectTypes as type}
              <button
                type="button"
                onclick={() => { projectType = type.value; calculateEstimate(); }}
                class="p-4 border-2 rounded-lg text-left transition-all duration-200 {projectType === type.value ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}"
              >
                <div class="font-medium text-gray-800">{type.label}</div>
                <div class="text-sm text-gray-500">{type.weeks} {type.weeks === 1 ? 'week' : 'weeks'} baseline</div>
              </button>
            {/each}
          </div>
        </div>
        
        <!-- Timeline -->
        <div>
          <label class="block text-lg font-semibold text-gray-800 mb-4">When do you need it completed?</label>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            {#each [
              { value: 'asap', label: 'ASAP (Rush delivery)', desc: '+30% timeline' },
              { value: '1-2months', label: '1-2 months', desc: 'Standard timeline' },
              { value: '3months+', label: '3+ months', desc: 'Flexible timeline (-20%)' }
            ] as option}
              <button
                type="button"
                onclick={() => { timeline = option.value; calculateEstimate(); }}
                class="p-4 border-2 rounded-lg text-left transition-all duration-200 {timeline === option.value ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}"
              >
                <div class="font-medium text-gray-800">{option.label}</div>
                <div class="text-sm text-gray-500">{option.desc}</div>
              </button>
            {/each}
          </div>
        </div>
        
        <!-- Features -->
        <div>
          <label class="block text-lg font-semibold text-gray-800 mb-4">What API features do you need? (Select all that apply)</label>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {#each availableFeatures as feature}
              <button
                type="button"
                onclick={() => { toggleFeature(feature); calculateEstimate(); }}
                class="p-3 border-2 rounded-lg text-sm font-medium transition-all duration-200 {features.includes(feature) ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 hover:border-gray-300 text-gray-700'}"
              >
                {feature}
              </button>
            {/each}
          </div>
        </div>
        
        <!-- Budget -->
        <div>
          <label class="block text-lg font-semibold text-gray-800 mb-4">What's your budget range?</label>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
            {#each budgetRanges as range}
              <button
                type="button"
                onclick={() => { budget = range.value; calculateEstimate(); }}
                class="p-4 border-2 rounded-lg text-center font-medium transition-all duration-200 {budget === range.value ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}"
              >
                {range.label}
              </button>
            {/each}
          </div>
        </div>
        
        <!-- Results -->
        {#if showResults}
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
            <h3 class="text-xl font-bold text-green-800 mb-4">📊 Your API Project Estimate</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div class="text-3xl font-bold text-green-700">{estimatedWeeks} weeks</div>
                <div class="text-green-600">Estimated timeline</div>
              </div>
              <div>
                <div class="text-lg font-semibold text-green-700">{estimatedCost}</div>
                <div class="text-green-600">Based on your budget</div>
              </div>
            </div>
            <div class="mt-4 p-4 bg-white/50 rounded-lg">
              <p class="text-sm text-gray-600">
                <strong>Note:</strong> This is a rough estimate. Final timeline and cost depend on API complexity, data models, integration requirements, and performance needs.
              </p>
            </div>
          </div>
          
        {/if}
      </form>
    </div>
  </div>
</div>