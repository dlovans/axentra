<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { logout } from '$lib/firebase/auth';
  import firebaseInstance from '$lib/firebase/client';
  import { collection, addDoc, getDocs, query, where, orderBy, Timestamp } from 'firebase/firestore';
  import TicketCard from '$lib/components/TicketCard.svelte';
  
  const { data } = $props();
  
  let userId = $page.params.id;
  let tickets = $state([]);
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
  let userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    company: 'Acme AB',
    plan: 'Företag',
    joinDate: new Date(Date.now() - 7776000000) // 90 days ago
  };
  
  // Dashboard stats
  let stats = {
    openTickets: 2,
    resolvedTickets: 1,
    lastLogin: new Date(Date.now() - 172800000) // 2 days ago
  };
  
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
      // This is just UI, so we'll simulate adding a ticket
      const newTicket = {
        id: `ticket-${Date.now()}`,
        title,
        description,
        priority,
        status: 'open',
        createdAt: Timestamp.now(),
        userId
      };
      
      // In a real app, you would add to Firestore:
      // await addDoc(collection(firebaseInstance.db, 'tickets'), newTicket);
      
      // Add to local state for demo
      tickets = [newTicket, ...tickets];
      
      // Reset form
      title = '';
      description = '';
      priority = 'medium';
      submitSuccess = true;
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        submitSuccess = false;
      }, 3000);
      
    } catch (err) {
      console.error('Error submitting ticket:', err);
    } finally {
      submitting = false;
    }
  }
  
  onMount(async () => {
    // In a real app, you would fetch tickets from Firestore:
    // const q = query(
    //   collection(firebaseInstance.db, 'tickets'),
    //   where('userId', '==', userId),
    //   orderBy('createdAt', 'desc')
    // );
    // const querySnapshot = await getDocs(q);
    // tickets = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // For demo, create some sample tickets
    tickets = [
      {
        id: 'ticket-1',
        title: 'Webbplatsen laddar långsamt',
        description: 'Min webbplats tar mer än 10 sekunder att ladda i alla webbläsare.',
        priority: 'high',
        status: 'open',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        userId
      },
      {
        id: 'ticket-2',
        title: 'Kontaktformuläret fungerar inte',
        description: 'Kunder rapporterar att kontaktformuläret inte skickar e-post.',
        priority: 'critical',
        status: 'in-progress',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        userId
      },
      {
        id: 'ticket-3',
        title: 'Uppdatera logotypen på hemsidan',
        description: 'Behöver uppdatera vår företagslogotyp på hemsidan med den nya designen.',
        priority: 'low',
        status: 'closed',
        createdAt: new Date(Date.now() - 432000000), // 5 days ago
        userId
      }
    ];
    
    loading = false;
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
        <span class="text-sm text-gray-300">Välkommen, {userData.name}</span>
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
      
      <!-- Right Column - Tickets List -->
      <div class="lg:col-span-2">
        <div class="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700 h-full flex flex-col">
          <!-- Ticket Stats -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-700">
            <div class="flex items-center bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
              <div class="p-2.5 rounded-full bg-blue-500/20 text-blue-400 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div class="flex-1">
                <p class="text-xs text-gray-400 mb-0.5">Öppna ärenden</p>
                <div class="flex items-center justify-between">
                  <p class="text-xl font-semibold text-white">{stats.openTickets}</p>
                  <div class="h-8 w-12">
                    <div class="flex items-end h-full space-x-0.5">
                      <div class="bg-blue-500/30 w-1 h-3 rounded-t"></div>
                      <div class="bg-blue-500/30 w-1 h-5 rounded-t"></div>
                      <div class="bg-blue-500/30 w-1 h-2 rounded-t"></div>
                      <div class="bg-blue-500/30 w-1 h-4 rounded-t"></div>
                      <div class="bg-blue-500/50 w-1 h-6 rounded-t"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="flex items-center bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
              <div class="p-2.5 rounded-full bg-green-500/20 text-green-400 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div class="flex-1">
                <p class="text-xs text-gray-400 mb-0.5">Lösta ärenden</p>
                <div class="flex items-center justify-between">
                  <p class="text-xl font-semibold text-white">{stats.resolvedTickets}</p>
                  <div class="h-8 w-8">
                    <svg viewBox="0 0 36 36" class="h-8 w-8">
                      <path class="stroke-current text-green-500/20" stroke-width="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path class="stroke-current text-green-400" stroke-width="3" fill="none" stroke-dasharray="75, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <text x="18" y="20.5" class="text-xs text-green-400 fill-current font-semibold text-center" dominant-baseline="middle" text-anchor="middle">75%</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="flex items-center bg-red-900/20 p-3 rounded-lg border border-red-700/30 hover:bg-red-900/30 transition-colors">
              <div class="p-2.5 rounded-full bg-red-500/20 text-red-400 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div class="flex-1">
                <div class="flex items-center whitespace-nowrap">
                  <p class="text-xs text-red-300 mb-0.5 truncate">Akutärenden</p>
                  <span class="relative flex h-2 w-2 ml-1 flex-shrink-0">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                </div>
                <div class="flex items-center justify-between">
                  <a href="tel:+46728652474" class="text-xl font-semibold text-white whitespace-nowrap overflow-hidden text-ellipsis hover:text-red-300 transition-colors">+46728652474</a>
                </div>
              </div>
            </div>
          </div>
          
          <h2 class="text-lg font-medium text-white mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Dina supportärenden
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
            {:else if error}
              <div class="py-8 text-center text-gray-400">
                <p class="text-red-400">Fel vid laddning av ärenden: {error}</p>
              </div>
            {:else if tickets.length === 0}
              <div class="py-8 text-center text-gray-400">
                <p>Du har inte skapat några ärenden ännu.</p>
              </div>
            {:else}
              <div class="overflow-y-auto pr-2">
                <ul class="space-y-2">
                  {#each tickets as ticket}
                    <TicketCard {ticket} {priorityOptions} />
                  {/each}
                </ul>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
    
    <!-- Account Information (Moved to Bottom) -->
    <div class="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700">
      <h2 class="text-lg font-medium text-white mb-4">Kontoinformation</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div class="flex flex-col">
          <span class="text-sm text-gray-400 mb-1">Namn</span>
          <span class="text-sm text-white">{userData.name}</span>
        </div>
        
        <div class="flex flex-col">
          <span class="text-sm text-gray-400 mb-1">E-post</span>
          <span class="text-sm text-white">{userData.email}</span>
        </div>
        
        <div class="flex flex-col">
          <span class="text-sm text-gray-400 mb-1">Företag</span>
          <span class="text-sm text-white">{userData.company}</span>
        </div>
        
        <div class="flex flex-col">
          <span class="text-sm text-gray-400 mb-1">Abonnemang</span>
          <span class="text-sm px-2 py-1 bg-indigo-900 text-indigo-200 rounded-full text-xs font-medium inline-block w-fit">{userData.plan}</span>
        </div>
        
        <div class="flex flex-col">
          <span class="text-sm text-gray-400 mb-1">Medlem sedan</span>
          <span class="text-sm text-white">{formatDate(userData.joinDate)}</span>
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
  
  /* Fixed height ticket container */
  .ticket-container {
    height: 380px; /* Further decreased height to make scrollability more obvious */
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
