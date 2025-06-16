<script>
  const {
    title = "Multiple Ways to Reach Us",
    subtitle = "Choose the communication method that works best for you."
  } = $props();
  
  const contactOptions = [
    {
      name: "Schedule a Call",
      description: "Book a free 30-minute consultation",
      icon: "calendar",
      href: "https://calendly.com/axentra-agency/30min",
      cta: "Book Now",
      badge: "Most Popular",
      color: "orange"
    },
    {
      name: "WhatsApp",
      description: "Quick questions and instant responses",
      icon: "whatsapp",
      href: "https://wa.me/46728652474",
      cta: "Message Us",
      badge: "Fastest",
      color: "green"
    },
    {
      name: "Email",
      description: "Detailed project discussions",
      icon: "email",
      href: "mailto:dlovan@axentra.agency",
      cta: "Send Email",
      badge: null,
      color: "blue"
    },
    {
      name: "Project Form",
      description: "Get timeline & cost estimate",
      icon: "form",
      href: "#estimator-section",
      cta: "Get Estimate",
      badge: "Recommended",
      color: "purple"
    }
  ];
  
  function getIconSVG(icon) {
    switch (icon) {
      case 'calendar':
        return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>`;
      case 'whatsapp':
        return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>`;
      case 'email':
        return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>`;
      case 'form':
        return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>`;
      default:
        return '';
    }
  }
  
  function getColorClasses(color, type) {
    const colors = {
      orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        icon: 'bg-orange-100 text-orange-600',
        button: 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600',
        badge: 'bg-orange-100 text-orange-700 border-orange-200'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        icon: 'bg-green-100 text-green-600',
        button: 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600',
        badge: 'bg-green-100 text-green-700 border-green-200'
      },
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        icon: 'bg-blue-100 text-blue-600',
        button: 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600',
        badge: 'bg-blue-100 text-blue-700 border-blue-200'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        icon: 'bg-purple-100 text-purple-600',
        button: 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600',
        badge: 'bg-purple-100 text-purple-700 border-purple-200'
      }
    };
    return colors[color]?.[type] || '';
  }
  
  function scrollToSection(href) {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
</script>

<div class="relative container mx-auto px-4 py-16">
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-600 to-orange-500 mb-4">
        {title}
      </h2>
      <p class="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each contactOptions as option}
        <div class="relative group h-full">
          <div class="h-full p-6 {getColorClasses(option.color, 'bg')} border-2 {getColorClasses(option.color, 'border')} rounded-xl transition-all duration-300 hover:transform hover:translate-y-[-5px] hover:shadow-lg flex flex-col">
            
            <!-- Badge -->
            {#if option.badge}
              <div class="absolute -top-2 -right-2">
                <div class="px-3 py-1 {getColorClasses(option.color, 'badge')} border rounded-full text-xs font-bold">
                  {option.badge}
                </div>
              </div>
            {/if}
            
            <!-- Icon -->
            <div class="w-12 h-12 {getColorClasses(option.color, 'icon')} rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {@html getIconSVG(option.icon)}
              </svg>
            </div>
            
            <!-- Content -->
            <h3 class="text-lg font-bold text-gray-800 mb-2">{option.name}</h3>
            <p class="text-gray-600 text-sm mb-6 flex-grow">{option.description}</p>
            
            <!-- CTA Button -->
            <div class="mt-auto">
              {#if option.href.startsWith('#')}
                <button
                  onclick={() => scrollToSection(option.href)}
                  class="w-full py-2.5 {getColorClasses(option.color, 'button')} text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  {option.cta}
                </button>
              {:else}
                <a
                  href={option.href}
                  target={option.href.startsWith('http') ? '_blank' : '_self'}
                  rel={option.href.startsWith('http') ? 'noopener noreferrer' : ''}
                  class="block w-full py-2.5 {getColorClasses(option.color, 'button')} text-white font-medium rounded-lg text-center transition-all duration-300 transform hover:scale-105"
                >
                  {option.cta}
                </a>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>
    
    <!-- Response time indicator -->
    <div class="text-center mt-8">
      <div class="inline-flex items-center px-6 py-3 bg-gray-100 border border-gray-200 rounded-full">
        <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span class="text-gray-700 font-medium">Average response time: 2 hours</span>
      </div>
    </div>
  </div>
</div>