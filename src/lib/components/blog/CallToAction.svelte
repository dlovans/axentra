<script>
  let {
    title,
    description,
    buttonText = "Learn More",
    buttonHref = "#",
    variant = "primary" // primary, secondary, success
  } = $props();

  const variantClasses = {
    primary: "bg-blue-800 hover:bg-blue-900 text-white",
    secondary: "bg-gray-700 hover:bg-gray-800 text-white",
    success: "bg-green-700 hover:bg-green-800 text-white"
  };
</script>

<div class="my-8 p-6 md:p-8 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-800 rounded-xl">
  <div class="max-w-2xl mx-auto text-center">
    <h3 class="text-2xl md:text-3xl font-bold text-blue-900 mb-4">{title}</h3>
    <p class="text-lg text-gray-700 mb-6">{description}</p>
    <a
      href={buttonHref}
      class="inline-block px-8 py-3 {variantClasses[variant]} font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
    >
      {buttonText} →
    </a>
  </div>
</div>
