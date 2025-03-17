<script>
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';
  import { logout } from '$lib/firebase/auth';
  import { createTicket } from '$lib/firebase/ticket';
  import TicketCard from '$lib/components/TicketCard.svelte';
  import { setPageTitle } from '$lib/stores/page-title.js';
  
  const { data } = $props();
  
  let userId = $page.params.id;
  let activeTickets = $state([]);
  let closedTickets = $state([]);
  let loading = $state(true);
  let error = $state(null);
  
  // Form data
  let title = $state('');
  let description = $state('');
  let priority = $state('medium'); // default priority
  let submitting = $state(false);
  let submitSuccess = $state(false);
  let titleError = $state('');
  let descriptionError = $state('');
  
  // User data
  let userData = data.userData;
  let userName = userData?.name || 'Unknown User';
  let companyName = userData?.companyName || 'Unknown Company';
  
  // Priority options
  const priorityOptions = [
    { value: 'low', label: 'Låg', color: 'bg-blue-500 text-white' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500 text-white' },
    { value: 'high', label: 'Hög', color: 'bg-orange-500 text-white' },
    { value: 'critical', label: 'Kritisk', color: 'bg-red-500 text-white' },
    { value: 'emergency', label: 'Akut', color: 'bg-black text-white border border-red-500' }
  ];
  
  // Get priority color class
  function getPriorityColor(priority) {
    return priorityOptions.find(option => option.value === priority)?.color || 'bg-gray-600';
  }
  
  // Format date
  function formatDate(timestamp) {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  // Clear errors on input
  function clearTitleError() {
    if (titleError) titleError = '';
  }
  
  function clearDescriptionError() {
    if (descriptionError) descriptionError = '';
  }
  
  // Submit new ticket
  async function submitTicket(e) {
    e.preventDefault();
    // Reset errors
    titleError = '';
    descriptionError = '';
    let hasError = false;
    
    // Validate fields
    if (!title.trim()) {
      titleError = 'Titel krävs';
      hasError = true;
    }
    
    if (!description.trim()) {
      descriptionError = 'Beskrivning krävs';
      hasError = true;
    }
    
    if (hasError) return;
    
    submitting = true;
    
    try {
      const result = await createTicket(title, description, priority, 'open', userId, userName, companyName, userData.email);
      
      if (result.status) {
        // Reset form
        title = '';
        description = '';
        priority = 'medium';
        submitSuccess = true;
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          submitSuccess = false;
        }, 3000);
      } else {
        error = result.message;
      }
    } catch (err) {
      console.error('Error submitting ticket:', err);
      error = err.message;
    } finally {
      submitting = false;
    }
  }
  
  // Set up ticket listeners
  let unsubscribeActive;
  let unsubscribeClosed;
  
  onMount(() => {
    setPageTitle('Dashboard');
    loading = true;
    unsubscribeActive = data.activeTickets.subscribe((updatedTickets) => {
      activeTickets = updatedTickets;
      loading = false;
    });

    unsubscribeClosed = data.closedTickets.subscribe((updatedTickets) => {
      closedTickets = updatedTickets;
      loading = false;
    });
  });
  
  onDestroy(() => {
    if (unsubscribeActive) unsubscribeActive();
    if (unsubscribeClosed) unsubscribeClosed();
  });
  
  // Compute stats from both active and closed tickets
  const stats = $derived({
    openTickets: activeTickets.length,
    resolvedTickets: closedTickets.length,
    lastLogin: new Date(Date.now() - 172800000) // 2 days ago
  });
  
  async function handleLogout() {
    try {
      await logout();
      window.location.href = '/';
    } catch (err) {
      console.error('Logout error:', err);
    }
  }
</script>

<div class="min-h-screen bg-gray-900 text-gray-100 relative">
  <!-- Success Message Overlay -->
  {#if submitSuccess}
    <div class="fixed inset-0 flex items-center justify-center z-50 bg-gray-900/70">
      <div class="bg-green-900 text-green-100 rounded-md border border-green-700 p-4 shadow-lg max-w-md mx-auto animate-fade-in">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <p class="font-medium">Ärende skickat!</p>
        </div>
      </div>
    </div>
  {/if}

  <!-- Header -->
  <header class="bg-gray-800 shadow-lg border-b border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-white">Supportpanel <span class="text-indigo-400">Axentra</span></h1>
      <div class="flex items-center space-x-4">
        <span class="text-sm text-gray-300">Välkommen, {data.userData.name}</span>
        <button 
          onclick={handleLogout}
          class="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-md transition text-gray-200"
        >
          Logga ut
        </button>
      </div>
    </div>
  </header>
  
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Stats Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <!-- Open Tickets -->
      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-500/10">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-medium text-white">Öppna ärenden</h3>
            <p class="text-2xl font-bold text-green-400">{stats.openTickets}</p>
          </div>
        </div>
      </div>

      <!-- Emergency Contact -->
      <div class="bg-gray-800 rounded-lg p-6 border border-red-500">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-red-500/10">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500 animate-heartbeat" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-medium text-white">Akutärende</h3>
            <p class="text-sm text-gray-300 mt-1">Ring: <a href="tel:+46728652474" class="text-red-400 hover:text-red-300">072-865 24 74</a></p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <!-- Left Column - Ticket Creation Form -->
      <div class="lg:col-span-1">
        <div class="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700 h-full flex flex-col">
          <h2 class="text-lg font-medium text-white mb-4">Skapa nytt ärende</h2>
          
          <form onsubmit={submitTicket} class="space-y-4 flex-grow flex flex-col">
            <div>
              <label for="title" class="block text-sm font-medium text-gray-300 mb-1">
                Titel <span class="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="title"
                bind:value={title}
                oninput={clearTitleError}
                class="w-full px-3 py-2 bg-gray-700 border {titleError ? 'border-red-500' : 'border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white"
                placeholder="Kort beskrivning av problemet"
              />
              {#if titleError}
                <p class="text-red-400 text-xs mt-1">{titleError}</p>
              {:else}
                <div class="h-4"></div> <!-- Placeholder to prevent layout shift -->
              {/if}
            </div>
            
            <div class="flex-grow flex flex-col">
              <label for="description" class="block text-sm font-medium text-gray-300 mb-1">
                Beskrivning <span class="text-red-400">*</span>
              </label>
              <textarea
                id="description"
                bind:value={description}
                oninput={clearDescriptionError}
                rows="4"
                class="resize-none w-full px-3 py-2 bg-gray-700 border {descriptionError ? 'border-red-500' : 'border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white flex-grow min-h-[120px]"
                placeholder="Detaljerad förklaring av ditt problem"
                style="resize: none;"
              ></textarea>
              {#if descriptionError}
                <p class="text-red-400 text-xs mt-1 mb-4">{descriptionError}</p>
              {:else}
                <div class="h-4 mb-4"></div> <!-- Placeholder to prevent layout shift -->
              {/if}
            </div>
            
            <div class="mt-auto">
              <label for="priority" class="block text-sm font-medium text-gray-300 mb-1">
                Prioritet
              </label>
              <select
                id="priority"
                bind:value={priority}
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white"
              >
                {#each priorityOptions as option}
                  <option value={option.value}>{option.label}</option>
                {/each}
              </select>
            </div>
            
            <div class="pt-4">
              <button
                type="submit"
                disabled={submitting}
                class="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Skickar...' : 'Skicka ärende'}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <!-- Right Column - Tickets Lists -->
      <div class="lg:col-span-2">
        <div class="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700 h-full flex flex-col space-y-6">
          <!-- Active Tickets Section -->
          <div>
            <h2 class="text-lg font-medium text-white mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Aktiva ärenden
            </h2>
            
            <div class="ticket-container">
              {#if loading}
                <div class="py-8 text-center text-gray-400">
                  <svg class="animate-spin h-8 w-8 mx-auto text-indigo-400 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p>Laddar ärenden...</p>
                </div>
              {:else if activeTickets.length === 0}
                <div class="py-8 text-center text-gray-400">
                  <p>Inga aktiva ärenden</p>
                </div>
              {:else}
                <div class="overflow-y-auto pr-2">
                  <ul class="space-y-2">
                    {#each activeTickets as ticket}
                      <TicketCard {ticket} {priorityOptions} {userId} />
                    {/each}
                  </ul>
                </div>
              {/if}
            </div>
          </div>

          <!-- Closed Tickets Section -->
          <div>
            <h2 class="text-lg font-medium text-white mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Avslutade ärenden
            </h2>
            
            <div class="ticket-container">
              {#if loading}
                <div class="py-8 text-center text-gray-400">
                  <svg class="animate-spin h-8 w-8 mx-auto text-indigo-400 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p>Laddar ärenden...</p>
                </div>
              {:else if closedTickets.length === 0}
                <div class="py-8 text-center text-gray-400">
                  <p>Inga avslutade ärenden</p>
                </div>
              {:else}
                <div class="overflow-y-auto pr-2">
                  <ul class="space-y-2">
                    {#each closedTickets as ticket}
                      <TicketCard {ticket} {priorityOptions} {userId} />
                    {/each}
                  </ul>
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Account Information (Moved to Bottom) -->
    <div class="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700">
      <h2 class="text-lg font-medium text-white mb-4">Kontoinformation</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="flex flex-col">
          <span class="text-sm text-gray-400 mb-1">Namn</span>
          <span class="text-sm text-white">{data.userData.name}</span>
        </div>
        
        <div class="flex flex-col">
          <span class="text-sm text-gray-400 mb-1">E-post</span>
          <span class="text-sm text-white">{data.userData.email}</span>
        </div>
        
        <div class="flex flex-col">
          <span class="text-sm text-gray-400 mb-1">Företag</span>
          <span class="text-sm text-white">{data.userData.companyName}</span>
        </div>
        
        <div class="flex flex-col">
          <span class="text-sm text-gray-400 mb-1">Medlem sedan</span>
          <span class="text-sm text-white">{formatDate(data.userData.joinDate)}</span>
        </div>
      </div>
    </div>
  </main>
</div>

<style>
  /* Add any custom styles here */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  /* Animation for success message */
  .animate-fade-in {
    animation: fadeIn 0.3s ease-in-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  /* Update the ticket container height to be smaller since we now have two containers */
  .ticket-container {
    height: 300px; /* Reduced height to accommodate both containers */
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  
  /* Scrollable ticket list */
  .ticket-container .overflow-y-auto {
    height: 100%;
    scrollbar-width: thin;
    scrollbar-color: rgba(107, 114, 128, 0.5) rgba(31, 41, 55, 0.5);
  }
  
  /* Scrollbar styling for webkit browsers */
  .ticket-container .overflow-y-auto::-webkit-scrollbar {
    width: 6px;
  }
  
  .ticket-container .overflow-y-auto::-webkit-scrollbar-track {
    background: rgba(31, 41, 55, 0.5);
    border-radius: 3px;
  }
  
  .ticket-container .overflow-y-auto::-webkit-scrollbar-thumb {
    background-color: rgba(107, 114, 128, 0.5);
    border-radius: 3px;
  }
</style>
