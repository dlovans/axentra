<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { logout } from '$lib/firebase/auth';
  import firebaseInstance from '$lib/firebase/client';
  import { collection, getDocs, updateDoc, doc, query, orderBy, Timestamp } from 'firebase/firestore';
  
  export let data;
  
  let adminId = $page.params.id;
  let tickets = [];
  let filteredTickets = [];
  let loading = true;
  let error = null;
  
  // Filters
  let statusFilter = 'all';
  let priorityFilter = 'all';
  let searchQuery = '';
  
  // Priority options
  const priorityOptions = [
    { value: 'low', label: 'Low', color: 'bg-blue-500 text-white' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500 text-white' },
    { value: 'high', label: 'High', color: 'bg-orange-500 text-white' },
    { value: 'critical', label: 'Critical', color: 'bg-red-500 text-white' }
  ];
  
  // Status options
  const statusOptions = [
    { value: 'open', label: 'Open', color: 'bg-green-600 text-white' },
    { value: 'in-progress', label: 'In Progress', color: 'bg-purple-600 text-white' },
    { value: 'closed', label: 'Closed', color: 'bg-gray-600 text-white' }
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
    return date.toLocaleDateString('en-US', { 
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
      // In a real app, you would update Firestore:
      // await updateDoc(doc(firebaseInstance.db, 'tickets', ticketId), {
      //   status: newStatus,
      //   updatedAt: Timestamp.now()
      // });
      
      // Update local state for demo
      tickets = tickets.map(ticket => {
        if (ticket.id === ticketId) {
          return { ...ticket, status: newStatus };
        }
        return ticket;
      });
      
      // Re-apply filters
      applyFilters();
      
    } catch (err) {
      console.error('Error updating ticket status:', err);
      error = 'Failed to update ticket status. Please try again.';
    }
  }
  
  onMount(async () => {
    // In a real app, you would fetch all tickets from Firestore:
    // const q = query(
    //   collection(firebaseInstance.db, 'tickets'),
    //   orderBy('createdAt', 'desc')
    // );
    // const querySnapshot = await getDocs(q);
    // tickets = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // For demo, create some sample tickets
    tickets = [
      {
        id: 'ticket-1',
        title: 'Website loading slowly',
        description: 'My website is taking more than 10 seconds to load on all browsers.',
        priority: 'high',
        status: 'open',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        userId: 'user123',
        userEmail: 'user@example.com'
      },
      {
        id: 'ticket-2',
        title: 'Contact form not working',
        description: 'Customers report that the contact form is not sending emails.',
        priority: 'critical',
        status: 'in-progress',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        userId: 'user456',
        userEmail: 'client@example.com'
      },
      {
        id: 'ticket-3',
        title: 'Update logo on homepage',
        description: 'Need to update our company logo on the homepage with the new design.',
        priority: 'low',
        status: 'closed',
        createdAt: new Date(Date.now() - 432000000), // 5 days ago
        userId: 'user789',
        userEmail: 'business@example.com'
      },
      {
        id: 'ticket-4',
        title: 'SSL certificate expired',
        description: 'Our SSL certificate has expired and visitors are seeing security warnings.',
        priority: 'critical',
        status: 'open',
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        userId: 'user123',
        userEmail: 'user@example.com'
      },
      {
        id: 'ticket-5',
        title: 'Mobile menu not working',
        description: 'The hamburger menu on mobile devices is not opening when clicked.',
        priority: 'medium',
        status: 'open',
        createdAt: new Date(Date.now() - 129600000), // 1.5 days ago
        userId: 'user456',
        userEmail: 'client@example.com'
      }
    ];
    
    // Initialize filtered tickets
    filteredTickets = [...tickets];
    
    loading = false;
  });
  
  // Watch for filter changes
  $: {
    if (tickets.length > 0) {
      applyFilters();
    }
  }
  
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
      <h1 class="text-2xl font-bold text-white">Admin Dashboard</h1>
      <div class="flex items-center space-x-4">
        <span class="text-sm text-gray-300">Admin: {adminId}</span>
        <button 
          on:click={handleLogout}
          class="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-md transition text-gray-200"
        >
          Logout
        </button>
      </div>
    </div>
  </header>
  
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Filters -->
    <div class="bg-gray-800 shadow-lg rounded-lg p-6 mb-8 border border-gray-700">
      <h2 class="text-lg font-medium text-white mb-4">Filter Tickets</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Search -->
        <div>
          <label for="search" class="block text-sm font-medium text-gray-300 mb-1">
            Search
          </label>
          <input
            type="text"
            id="search"
            bind:value={searchQuery}
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white"
            placeholder="Search by title or description"
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
            <option value="all">All Statuses</option>
            {#each statusOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>
        
        <!-- Priority Filter -->
        <div>
          <label for="priority" class="block text-sm font-medium text-gray-300 mb-1">
            Priority
          </label>
          <select
            id="priority"
            bind:value={priorityFilter}
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white"
          >
            <option value="all">All Priorities</option>
            {#each priorityOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>
    
    <!-- Tickets Table -->
    <div class="bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-700">
      <div class="px-6 py-4 border-b border-gray-700">
        <h2 class="text-lg font-medium text-white">All Support Tickets</h2>
      </div>
      
      {#if loading}
        <div class="py-8 text-center text-gray-400">
          <svg class="animate-spin h-8 w-8 mx-auto text-indigo-400 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p>Loading tickets...</p>
        </div>
      {:else if error}
        <div class="py-8 text-center text-red-400">
          <p>Error loading tickets: {error}</p>
        </div>
      {:else if filteredTickets.length === 0}
        <div class="py-8 text-center text-gray-400">
          <p>No tickets match your filters.</p>
        </div>
      {:else}
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-700">
            <thead class="bg-gray-700">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Ticket
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Priority
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-gray-800 divide-y divide-gray-700">
              {#each filteredTickets as ticket}
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-white">{ticket.title}</div>
                    <div class="text-sm text-gray-400 line-clamp-1">{ticket.description}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-white">{ticket.userEmail}</div>
                    <div class="text-sm text-gray-400">{ticket.userId}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 text-xs rounded-full {getPriorityColor(ticket.priority)}">
                      {priorityOptions.find(o => o.value === ticket.priority)?.label || 'Unknown'}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 text-xs rounded-full {getStatusColor(ticket.status)}">
                      {ticket.status === 'in-progress' ? 'In Progress' : 
                       ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {formatDate(ticket.createdAt)}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                      {#if ticket.status === 'open'}
                        <button 
                          on:click={() => updateTicketStatus(ticket.id, 'in-progress')}
                          class="text-indigo-400 hover:text-indigo-300"
                        >
                          Start
                        </button>
                      {/if}
                      
                      {#if ticket.status === 'in-progress'}
                        <button 
                          on:click={() => updateTicketStatus(ticket.id, 'closed')}
                          class="text-green-400 hover:text-green-300"
                        >
                          Close
                        </button>
                      {/if}
                      
                      {#if ticket.status === 'closed'}
                        <button 
                          on:click={() => updateTicketStatus(ticket.id, 'open')}
                          class="text-yellow-400 hover:text-yellow-300"
                        >
                          Reopen
                        </button>
                      {/if}
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </div>
    
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
      <!-- Total Tickets -->
      <div class="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700">
        <div class="flex items-center">
          <div class="flex-shrink-0 bg-indigo-900 rounded-md p-3">
            <svg class="h-6 w-6 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div class="ml-5">
            <p class="text-sm font-medium text-gray-400">Total Tickets</p>
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
            <p class="text-sm font-medium text-gray-400">Open Tickets</p>
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
            <p class="text-sm font-medium text-gray-400">In Progress</p>
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
            <p class="text-sm font-medium text-gray-400">Critical Issues</p>
            <p class="text-lg font-semibold text-white">{tickets.filter(t => t.priority === 'critical').length}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>

<style>
  /* Add any custom styles here */
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style> 