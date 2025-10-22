<script>
  let {
    children,
    type = "info" // info, warning, success, error
  } = $props();

  const typeConfig = {
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-900",
      icon: "ℹ️"
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-900",
      icon: "⚠️"
    },
    success: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-900",
      icon: "✓"
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-900",
      icon: "✕"
    }
  };

  const config = typeConfig[type];
</script>

<div class="my-6 p-4 {config.bg} border-l-4 {config.border} rounded-r-lg">
  <div class="flex items-start gap-3">
    <span class="text-2xl flex-shrink-0">{config.icon}</span>
    <div class="{config.text} flex-1">
      {@render children()}
    </div>
  </div>
</div>
