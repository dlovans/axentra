<script>
  // Props for the stats card
  const {
    stats = [
      {
        value: "REST",
        label: "API Architecture",
        colSpan: 1
      },
      {
        value: "GraphQL",
        label: "Query Language",
        colSpan: 1
      },
      {
        value: "gRPC",
        label: "High Performance",
        colSpan: 1
      }
    ]
  } = $props();
</script>

<div class="bg-white rounded-xl p-6 border-2 border-orange-200 shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 transition-all duration-300">
  <div class="grid grid-cols-3 gap-2 sm:gap-4">
    {#each stats as stat}
      <div class="text-center">
        <p class="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-orange-500">
          {stat.value}
        </p>
        <p class="text-gray-600 text-xs sm:text-sm font-medium mt-1">
          {stat.label}
        </p>
      </div>
    {/each}
  </div>
</div>