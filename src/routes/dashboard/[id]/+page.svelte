<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { logout } from '$lib/firebase/auth';
  import firebaseInstance from '$lib/firebase/client';
  import { collection, addDoc, getDocs, query, where, orderBy, Timestamp } from 'firebase/firestore';
  
  export let data;
  
  let userId = $page.params.id;
  let tickets = [];
  let loading = true;
  let error = null;
  
  // Form data
  let title = '';
  let description = '';
  let priority = 'medium'; // default priority
  let submitting = false;
  let submitSuccess = false;
  let submitError = null;
  
  // Priority options
  const priorityOptions = [
    { value: 'low', label: 'Low', color: 'bg-blue-500 text-white' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500 text-white' },
    { value: 'high', label: 'High', color: 'bg-orange-500 text-white' },
    { value: 'critical', label: 'Critical', color: 'bg-red-500 text-white' }
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
  
  // Submit new ticket
  async function submitTicket() {
    if (!title || !description) {
      submitError = 'Please fill in all required fields';
      return;
    }
    
    submitting = true;
    submitError = null;
    
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
      submitError = 'Failed to submit ticket. Please try again.';
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
        title: 'Website loading slowly',
        description: 'My website is taking more than 10 seconds to load on all browsers.',
        priority: 'high',
        status: 'open',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        userId
      },
      {
        id: 'ticket-2',
        title: 'Contact form not working',
        description: 'Customers report that the contact form is not sending emails.',
        priority: 'critical',
        status: 'in-progress',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        userId
      },
      {
        id: 'ticket-3',
        title: 'Update logo on homepage',
        description: 'Need to update our company logo on the homepage with the new design.',
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

<div class="min-h-screen bg-gray-900 text-gray-100">
  <!-- Header -->
  <header class="bg-gray-800 shadow-lg border-b border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-white">Support Dashboard</h1>
      <div class="flex items-center space-x-4">
        <span class="text-sm text-gray-300">Welcome, {userId}</span>
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
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Ticket Creation Form -->
      <div class="lg:col-span-1">
        <div class="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700">
          <h2 class="text-lg font-medium text-white mb-4">Create New Support Ticket</h2>
          
          {#if submitSuccess}
            <div class="mb-4 p-3 bg-green-900 text-green-100 rounded-md border border-green-700">
              Ticket submitted successfully!
            </div>
          {/if}
          
          {#if submitError}
            <div class="mb-4 p-3 bg-red-900 text-red-100 rounded-md border border-red-700">
              {submitError}
            </div>
          {/if}
          
          <form on:submit|preventDefault={submitTicket} class="space-y-4">
            <div>
              <label for="title" class="block text-sm font-medium text-gray-300 mb-1">
                Title <span class="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="title"
                bind:value={title}
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white"
                placeholder="Brief description of the issue"
                required
              />
            </div>
            
            <div>
              <label for="description" class="block text-sm font-medium text-gray-300 mb-1">
                Description <span class="text-red-400">*</span>
              </label>
              <textarea
                id="description"
                bind:value={description}
                rows="4"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white"
                placeholder="Detailed explanation of your issue"
                required
              ></textarea>
            </div>
            
            <div>
              <label for="priority" class="block text-sm font-medium text-gray-300 mb-1">
                Priority
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
            
            <div class="pt-2">
              <button
                type="submit"
                disabled={submitting}
                class="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Ticket'}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <!-- Tickets List -->
      <div class="lg:col-span-2">
        <div class="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700">
          <h2 class="text-lg font-medium text-white mb-4">Your Support Tickets</h2>
          
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
          {:else if tickets.length === 0}
            <div class="py-8 text-center text-gray-400">
              <p>You haven't created any tickets yet.</p>
            </div>
          {:else}
            <div class="overflow-hidden">
              <ul class="divide-y divide-gray-700">
                {#each tickets as ticket}
                  <li class="py-4">
                    <div class="flex flex-col sm:flex-row justify-between">
                      <div class="mb-2 sm:mb-0">
                        <div class="flex items-center">
                          <h3 class="text-md font-medium text-white">{ticket.title}</h3>
                          <span class="ml-2 px-2 py-0.5 text-xs rounded-full {getPriorityColor(ticket.priority)}">
                            {priorityOptions.find(o => o.value === ticket.priority)?.label || 'Unknown'}
                          </span>
                          <span class="ml-2 px-2 py-0.5 text-xs rounded-full 
                            {ticket.status === 'open' ? 'bg-green-600 text-white' : 
                             ticket.status === 'in-progress' ? 'bg-purple-600 text-white' : 
                             'bg-gray-600 text-white'}">
                            {ticket.status === 'in-progress' ? 'In Progress' : 
                             ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                          </span>
                        </div>
                        <p class="mt-1 text-sm text-gray-400 line-clamp-2">{ticket.description}</p>
                      </div>
                      <div class="text-sm text-gray-400 whitespace-nowrap">
                        {formatDate(ticket.createdAt)}
                      </div>
                    </div>
                  </li>
                {/each}
              </ul>
            </div>
          {/if}
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
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
