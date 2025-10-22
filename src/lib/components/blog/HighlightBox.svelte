<script>
  let {
    children,
    title = null,
    icon = null
  } = $props();
</script>

<div class="my-8 p-6 bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-300 rounded-xl shadow-sm">
  {#if title || icon}
    <div class="flex items-center gap-3 mb-4">
      {#if icon}
        <span class="text-3xl">{icon}</span>
      {/if}
      {#if title}
        <h4 class="text-xl font-bold text-amber-900">{title}</h4>
      {/if}
    </div>
  {/if}
  <div class="text-amber-950">
    {@render children()}
  </div>
</div>
