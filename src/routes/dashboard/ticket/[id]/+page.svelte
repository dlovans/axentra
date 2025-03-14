<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import firebaseInstance from '$lib/firebase/client';
  import { doc, getDoc, updateDoc, collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
  
  const { data } = $props();
  
  let ticketId = $page.params.id;
  let ticket = $state(null);
  let comments = $state([]);
  let loading = $state(true);
  let error = $state(null);
  
  // New comment
  let newComment = $state('');
  let submittingComment = $state(false);
  
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
  
  // Submit new comment
  async function submitComment(e) {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    submittingComment = true;
    
    try {
      // This is just UI, so we'll simulate adding a comment
      const comment = {
        id: `comment-${Date.now()}`,
        ticketId,
        content: newComment,
        createdAt: new Date(),
        userId: 'current-user', // In a real app, this would be the current user's ID
        userEmail: 'you@example.com', // In a real app, this would be the current user's email
        isAdmin: true // In a real app, this would be determined by the user's role
      };
      
      // In a real app, you would add to Firestore:
      // await addDoc(collection(firebaseInstance.db, 'comments'), comment);
      
      // Add to local state for demo
      comments = [...comments, comment];
      
      // Reset form
      newComment = '';
      
    } catch (err) {
      console.error('Error submitting comment:', err);
      error = 'Failed to submit comment. Please try again.';
    } finally {
      submittingComment = false;
    }
  }
  
  // Update ticket status
  async function updateTicketStatus(newStatus) {
    try {
      // In a real app, you would update Firestore:
      // await updateDoc(doc(firebaseInstance.db, 'tickets', ticketId), {
      //   status: newStatus,
      //   updatedAt: Timestamp.now()
      // });
      
      // Update local state for demo
      ticket = { ...ticket, status: newStatus };
      
      // Add a system comment
      const comment = {
        id: `comment-${Date.now()}`,
        ticketId,
        content: `Ticket status changed to "${statusOptions.find(s => s.value === newStatus)?.label || newStatus}"`,
        createdAt: new Date(),
        userId: 'system',
        userEmail: 'system',
        isSystem: true
      };
      
      comments = [...comments, comment];
      
    } catch (err) {
      console.error('Error updating ticket status:', err);
      error = 'Failed to update ticket status. Please try again.';
    }
  }
  
  onMount(async () => {
    try {
      // In a real app, you would fetch the ticket from Firestore:
      // const ticketDoc = await getDoc(doc(firebaseInstance.db, 'tickets', ticketId));
      // if (ticketDoc.exists()) {
      //   ticket = { id: ticketDoc.id, ...ticketDoc.data() };
      // } else {
      //   error = 'Ticket not found';
      // }
      
      // For demo, create a sample ticket
      ticket = {
        id: ticketId,
        title: 'Website loading slowly',
        description: 'My website is taking more than 10 seconds to load on all browsers. I have checked my internet connection and it seems fine. The issue started yesterday after we deployed new content to the site. Please help resolve this as it is affecting our user experience significantly.',
        priority: 'high',
        status: 'open',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        userId: 'user123',
        userEmail: 'client@example.com'
      };
      
      // In a real app, you would fetch comments from Firestore:
      // const q = query(
      //   collection(firebaseInstance.db, 'comments'),
      //   where('ticketId', '==', ticketId),
      //   orderBy('createdAt', 'asc')
      // );
      // const querySnapshot = await getDocs(q);
      // comments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // For demo, create some sample comments
      comments = [
        {
          id: 'comment-1',
          ticketId,
          content: 'Thank you for reporting this issue. Could you please provide more details about your browser and operating system?',
          createdAt: new Date(Date.now() - 72000000), // 20 hours ago
          userId: 'admin1',
          userEmail: 'support@axentra.agency',
          isAdmin: true
        },
        {
          id: 'comment-2',
          ticketId,
          content: 'I am using Chrome 96 on Windows 10. The issue happens on all browsers including Firefox and Edge.',
          createdAt: new Date(Date.now() - 64800000), // 18 hours ago
          userId: 'user123',
          userEmail: 'client@example.com',
          isAdmin: false
        },
        {
          id: 'comment-3',
          ticketId,
          content: 'Ticket status changed to "In Progress"',
          createdAt: new Date(Date.now() - 57600000), // 16 hours ago
          userId: 'system',
          userEmail: 'system',
          isSystem: true
        },
        {
          id: 'comment-4',
          ticketId,
          content: 'We are investigating the issue. It appears to be related to large image files that were recently uploaded. We will optimize these and update you shortly.',
          createdAt: new Date(Date.now() - 43200000), // 12 hours ago
          userId: 'admin1',
          userEmail: 'support@axentra.agency',
          isAdmin: true
        }
      ];
      
    } catch (err) {
      console.error('Error fetching ticket data:', err);
      error = 'Failed to load ticket data. Please try again.';
    } finally {
      loading = false;
    }
  });
  
  function goBack() {
    window.history.back();
  }
</script>

<div class="min-h-screen bg-gray-900 text-gray-100">
  <!-- Header -->
  <header class="bg-gray-800 shadow-lg border-b border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <div class="flex items-center">
        <button 
          onclick={goBack}
          class="mr-4 text-gray-400 hover:text-gray-200"
        >
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 class="text-2xl font-bold text-white">Ticket Details</h1>
      </div>
    </div>
  </header>
  
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {#if loading}
      <div class="py-8 text-center text-gray-400">
        <svg class="animate-spin h-8 w-8 mx-auto text-indigo-400 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p>Loading ticket details...</p>
      </div>
    {:else if error}
      <div class="py-8 text-center text-red-400">
        <p>Error: {error}</p>
      </div>
    {:else if ticket}
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Ticket Details -->
        <div class="lg:col-span-1">
          <div class="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700">
            <div class="flex justify-between items-start">
              <h2 class="text-lg font-medium text-white mb-4">Ticket Information</h2>
              <span class="px-2 py-1 text-xs rounded-full {getPriorityColor(ticket.priority)}">
                {priorityOptions.find(o => o.value === ticket.priority)?.label || 'Unknown'}
              </span>
            </div>
            
            <div class="mb-6">
              <span class="px-2 py-1 text-xs rounded-full {getStatusColor(ticket.status)}">
                {ticket.status === 'in-progress' ? 'In Progress' : 
                 ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
              </span>
            </div>
            
            <div class="mb-4">
              <h3 class="text-xl font-medium text-white">{ticket.title}</h3>
              <p class="text-sm text-gray-400 mt-1">Submitted on {formatDate(ticket.createdAt)}</p>
              <p class="text-sm text-gray-400">by {ticket.userEmail}</p>
            </div>
            
            <div class="mb-6">
              <h4 class="text-sm font-medium text-gray-300 mb-2">Description</h4>
              <p class="text-sm text-gray-400 whitespace-pre-line">{ticket.description}</p>
            </div>
            
            <!-- Status Actions -->
            <div class="border-t border-gray-700 pt-4">
              <h4 class="text-sm font-medium text-gray-300 mb-2">Actions</h4>
              <div class="flex flex-wrap gap-2">
                {#if ticket.status === 'open'}
                  <button 
                    onclick={() => updateTicketStatus('in-progress')}
                    class="px-3 py-1 text-sm bg-indigo-900 text-indigo-300 hover:bg-indigo-800 rounded-md transition"
                  >
                    Start Working
                  </button>
                {/if}
                
                {#if ticket.status === 'in-progress'}
                  <button 
                    onclick={() => updateTicketStatus('closed')}
                    class="px-3 py-1 text-sm bg-green-900 text-green-300 hover:bg-green-800 rounded-md transition"
                  >
                    Mark as Resolved
                  </button>
                {/if}
                
                {#if ticket.status === 'closed'}
                  <button 
                    onclick={() => updateTicketStatus('open')}
                    class="px-3 py-1 text-sm bg-yellow-900 text-yellow-300 hover:bg-yellow-800 rounded-md transition"
                  >
                    Reopen Ticket
                  </button>
                {/if}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Comments Section -->
        <div class="lg:col-span-2">
          <div class="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700">
            <h2 class="text-lg font-medium text-white mb-4">Conversation</h2>
            
            <!-- Comments List -->
            <div class="space-y-4 mb-6">
              {#if comments.length === 0}
                <p class="text-center text-gray-400 py-4">No comments yet.</p>
              {:else}
                {#each comments as comment}
                  <div class="p-4 rounded-lg {comment.isSystem ? 'bg-gray-700 border border-gray-600' : comment.isAdmin ? 'bg-indigo-900 bg-opacity-50' : 'bg-gray-700'}">
                    <div class="flex justify-between items-start mb-2">
                      <div class="flex items-center">
                        {#if comment.isSystem}
                          <span class="text-sm font-medium text-gray-400">System</span>
                        {:else}
                          <span class="text-sm font-medium {comment.isAdmin ? 'text-indigo-300' : 'text-gray-300'}">
                            {comment.userEmail}
                            {#if comment.isAdmin}
                              <span class="ml-2 px-1.5 py-0.5 text-xs bg-indigo-800 text-indigo-200 rounded">Staff</span>
                            {/if}
                          </span>
                        {/if}
                      </div>
                      <span class="text-xs text-gray-400">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p class="text-sm {comment.isSystem ? 'text-gray-400 italic' : 'text-gray-200'} whitespace-pre-line">
                      {comment.content}
                    </p>
                  </div>
                {/each}
              {/if}
            </div>
            
            <!-- New Comment Form -->
            {#if ticket.status !== 'closed'}
              <div class="border-t border-gray-700 pt-4">
                <h3 class="text-sm font-medium text-gray-300 mb-2">Add a Response</h3>
                <form onsubmit={submitComment} class="space-y-4">
                  <div>
                    <textarea
                      bind:value={newComment}
                      rows="4"
                      class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white"
                      placeholder="Type your response here..."
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={submittingComment || !newComment.trim()}
                      class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submittingComment ? 'Sending...' : 'Send Response'}
                    </button>
                  </div>
                </form>
              </div>
            {:else}
              <div class="border-t border-gray-700 pt-4">
                <p class="text-center text-gray-400 py-2">This ticket is closed. Reopen it to add more responses.</p>
              </div>
            {/if}
          </div>
        </div>
      </div>
    {:else}
      <div class="py-8 text-center text-gray-400">
        <p>Ticket not found.</p>
      </div>
    {/if}
  </main>
</div> 