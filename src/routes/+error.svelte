{#if $page.error}
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400 mb-8">
        {$page.status}
      </h1>
      <p class="text-2xl text-gray-300 mb-8">
        {$page.error.message || 'Something went wrong'}
      </p>
      <a
        href="/"
        class="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-teal-500 hover:from-cyan-600 hover:via-blue-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-200"
      >
        <svg
          class="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        Return Home
      </a>
    </div>
  </div>
{/if}

<script>
  import { page } from '$app/stores';
</script> 