<script>
  let {
    title,
    description,
    buttonText = "Learn More",
    buttonHref = "#",
    variant = "primary"
  } = $props();

  const variantStyles = {
    primary: {
      card: "bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 shadow-lg shadow-orange-500/10",
      title: "text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-600 to-orange-500",
      desc: "text-gray-600",
      button: "bg-gradient-to-r from-gray-800 to-orange-500 hover:shadow-xl hover:shadow-orange-500/25 text-white"
    },
    secondary: {
      card: "bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-gray-700 shadow-lg shadow-gray-900/20",
      title: "text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-300 to-orange-400",
      desc: "text-gray-300",
      button: "bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-xl hover:shadow-orange-500/25 text-white"
    },
    accent: {
      card: "bg-gradient-to-br from-slate-100 via-gray-50 to-slate-100 border-2 border-gray-300 shadow-xl shadow-gray-400/20",
      title: "text-slate-700 font-extrabold",
      desc: "text-slate-600",
      button: "bg-gradient-to-br from-slate-600 to-slate-700 hover:shadow-xl hover:shadow-slate-500/25 text-white"
    }
  };
</script>

<div class="relative my-8 p-8 md:p-12 rounded-2xl transition-all duration-300 {variantStyles[variant].card} overflow-hidden">
  <!-- Background decoration -->
  <div class="absolute top-0 right-0 w-64 h-64 bg-orange-100/30 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
  <div class="absolute bottom-0 left-0 w-64 h-64 bg-amber-100/30 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/2"></div>

  <div class="relative z-10 max-w-2xl mx-auto text-center">
    <h3 class="text-3xl md:text-4xl font-bold mb-4 {variantStyles[variant].title}">{title}</h3>
    <p class="text-lg md:text-xl mb-8 leading-relaxed {variantStyles[variant].desc}">{description}</p>
    <a
      href={buttonHref}
      class="group inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 {variantStyles[variant].button}"
    >
      <span>{buttonText}</span>
      <svg class="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
      </svg>
    </a>
  </div>
</div>
