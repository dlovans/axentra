<script>
  let {
    children,
    title = null,
    icon = null,
    variant = "primary"
  } = $props();

  const variantStyles = {
    primary: {
      card: "bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-blue-400 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20",
      iconBg: "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg",
      title: "text-blue-400",
      text: "text-gray-200"
    },
    secondary: {
      card: "bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20",
      iconBg: "bg-gradient-to-r from-gray-800 to-orange-500 text-white shadow-lg",
      title: "text-orange-700",
      text: "text-gray-700"
    },
    accent: {
      card: "bg-gradient-to-br from-slate-100 via-gray-50 to-slate-100 border-2 border-gray-300 shadow-lg shadow-gray-400/20 hover:shadow-gray-400/30",
      iconBg: "bg-gradient-to-br from-slate-600 to-slate-700 text-white shadow-lg",
      title: "text-slate-700",
      text: "text-gray-700"
    },
    info: {
      card: "bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20",
      iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg",
      title: "text-blue-700",
      text: "text-gray-700"
    }
  };
</script>

<div class="group relative my-8 p-6 rounded-2xl transition-all duration-300 hover:translate-y-[-2px] {variantStyles[variant].card} overflow-hidden">
  <!-- Background decoration for primary variant -->
  {#if variant === "primary"}
    <div class="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
  {/if}

  <div class="relative z-10">
    {#if title || icon}
      <div class="flex items-center gap-3 mb-4">
        {#if icon}
          <div class="rounded-full p-3 flex items-center justify-center {variantStyles[variant].iconBg} group-hover:scale-110 transition-transform duration-300">
            <span class="text-xl">{icon}</span>
          </div>
        {/if}
        {#if title}
          <h4 class="text-xl font-bold {variantStyles[variant].title}">{title}</h4>
        {/if}
      </div>
    {/if}
    <div class="{variantStyles[variant].text} leading-relaxed">
      {@render children()}
    </div>
  </div>
</div>
