<script>
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';
  import { logout } from '$lib/firebase/auth';
  import firebaseInstance from '$lib/firebase/client';
  import { collection, getDocs, updateDoc, doc, query, orderBy, Timestamp } from 'firebase/firestore';
  import AdminTicketContainer from '$lib/components/AdminTicketContainer.svelte';
  import AdminTicketSection from '$lib/components/AdminTicketSection.svelte';
  import AdminUserSection from '$lib/components/AdminUserSection.svelte';
  
  const { data } = $props();
  
  let adminId = $page.params.id;
  let tickets = $state([]);
  let filteredTickets = $state([]);
  let loading = $state(true);
  let error = $state(null);
  
  // Subscription cleanup
  let unsubscribeTickets;
  
  // Filters
  let statusFilter = $state('all');
  let priorityFilter = $state('all');
  let searchQuery = $state('');
  
  // Priority options
  const priorityOptions = [
    { value: 'low', label: 'Låg', color: 'bg-blue-500 text-white' },
    { value: 'medium', label: 'Medel', color: 'bg-yellow-500 text-white' },
    { value: 'high', label: 'Hög', color: 'bg-orange-500 text-white' },
    { value: 'critical', label: 'Kritisk', color: 'bg-red-500 text-white' }
  ];
  
  // Status options
  const statusOptions = [
    { value: 'open', label: 'Öppen', color: 'bg-green-600 text-white' },
    { value: 'in-progress', label: 'Pågående', color: 'bg-purple-600 text-white' },
    { value: 'closed', label: 'Stängd', color: 'bg-gray-600 text-white' }
  ];
  
  // Get priority color class
  function getPriorityColor(priority) {
    return priorityOptions.find(option => option.value === priority)?.color || 'bg-gray-600';
  }
  
  // Get status color class
  function getStatusColor(status) {
    return statusOptions.find(option => option.value === status)?.color || 'bg-gray-600';
  }
  
  // Format date
  function formatDate(timestamp) {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('sv-SE', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  // Apply filters
  function applyFilters() {
    filteredTickets = tickets.filter(ticket => {
      // Status filter
      if (statusFilter !== 'all' && ticket.status !== statusFilter) {
        return false;
      }
      
      // Priority filter
      if (priorityFilter !== 'all' && ticket.priority !== priorityFilter) {
        return false;
      }
      
      // Search query
      if (searchQuery && !ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !ticket.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }
  
  // Update ticket status
  async function updateTicketStatus(ticketId, newStatus) {
    try {
      // Update Firestore
      await updateDoc(doc(firebaseInstance.db, 'tickets', ticketId), {
        status: newStatus,
        updatedAt: Timestamp.now()
      });
      
      // The listener will automatically update the UI
      
    } catch (err) {
      console.error('Error updating ticket status:', err);
      error = 'Det gick inte att uppdatera ärendets status. Försök igen.';
    }
  }
  
  onMount(() => {
    // Subscribe to tickets
    unsubscribeTickets = data.tickets.subscribe((loadedTickets) => {
      tickets = loadedTickets;
      filteredTickets = [...loadedTickets];
      loading = false;
    });
  });
  
  // Clean up subscriptions when component is destroyed
  onDestroy(() => {
    if (unsubscribeTickets) {
      unsubscribeTickets();
    }
  });
  
  // Watch for filter changes
  $effect(() => {
    if (tickets.length > 0) {
      applyFilters();
    }
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

<div class="min-h-screen bg-gray-900 text-gray-100">
  <!-- Header -->
  <header class="bg-gray-800 shadow-lg border-b border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-white">Administratörspanel</h1>
      <div class="flex items-center space-x-4">
        <span class="text-sm text-gray-300">Admin: {data.user?.name ?? "Admin"}</span>
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
    <!-- User Management Section -->
    <AdminUserSection adminId={adminId} users={data.users} />
    
    <!-- Filters -->
    <div class="bg-gray-800 shadow-lg rounded-lg p-6 mb-8 border border-gray-700">
      <h2 class="text-lg font-medium text-white mb-4">Filtrera ärenden</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Search -->
        <div>
          <label for="search" class="block text-sm font-medium text-gray-300 mb-1">
            Sök
          </label>
          <input
            type="text"
            id="search"
            bind:value={searchQuery}
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white"
            placeholder="Sök på titel eller beskrivning"
          />
        </div>
        
        <!-- Status Filter -->
        <div>
          <label for="status" class="block text-sm font-medium text-gray-300 mb-1">
            Status
          </label>
          <select
            id="status"
            bind:value={statusFilter}
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white"
          >
            <option value="all">Alla statusar</option>
            {#each statusOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>
        
        <!-- Priority Filter -->
        <div>
          <label for="priority" class="block text-sm font-medium text-gray-300 mb-1">
            Prioritet
          </label>
          <select
            id="priority"
            bind:value={priorityFilter}
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white"
          >
            <option value="all">Alla prioriteter</option>
            {#each priorityOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>
    
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <!-- Total Tickets -->
      <div class="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700">
        <div class="flex items-center">
          <div class="flex-shrink-0 bg-indigo-900 rounded-md p-3">
            <svg class="h-6 w-6 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div class="ml-5">
            <p class="text-sm font-medium text-gray-400">Totalt antal ärenden</p>
            <p class="text-lg font-semibold text-white">{tickets.length}</p>
          </div>
        </div>
      </div>
      
      <!-- Open Tickets -->
      <div class="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700">
        <div class="flex items-center">
          <div class="flex-shrink-0 bg-green-900 rounded-md p-3">
            <svg class="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div class="ml-5">
            <p class="text-sm font-medium text-gray-400">Öppna ärenden</p>
            <p class="text-lg font-semibold text-white">{tickets.filter(t => t.status === 'open').length}</p>
          </div>
        </div>
      </div>
      
      <!-- In Progress Tickets -->
      <div class="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700">
        <div class="flex items-center">
          <div class="flex-shrink-0 bg-purple-900 rounded-md p-3">
            <svg class="h-6 w-6 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <div class="ml-5">
            <p class="text-sm font-medium text-gray-400">Pågående</p>
            <p class="text-lg font-semibold text-white">{tickets.filter(t => t.status === 'in-progress').length}</p>
          </div>
        </div>
      </div>
      
      <!-- Critical Tickets -->
      <div class="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700">
        <div class="flex items-center">
          <div class="flex-shrink-0 bg-red-900 rounded-md p-3">
            <svg class="h-6 w-6 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div class="ml-5">
            <p class="text-sm font-medium text-gray-400">Kritiska ärenden</p>
            <p class="text-lg font-semibold text-white">{tickets.filter(t => t.priority === 'critical').length}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Tickets Table -->
    <AdminTicketSection
      filteredTickets={filteredTickets}
      loading={loading}
      error={error}
      priorityOptions={priorityOptions}
      statusOptions={statusOptions}
      onUpdateStatus={updateTicketStatus}
      adminId={adminId}
    />
  </main>
</div>

<style>
  /* Add any custom styles here */
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style> 