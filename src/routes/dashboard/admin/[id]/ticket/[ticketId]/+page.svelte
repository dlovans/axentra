<script>
  import { onMount, onDestroy, tick } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import firebaseInstance from '$lib/firebase/client';
  import { doc, getDoc, updateDoc, collection, addDoc, getDocs, query, orderBy, Timestamp, serverTimestamp } from 'firebase/firestore';
  import AdminTicket from '$lib/components/AdminTicket.svelte';
  import { setPageTitle } from '$lib/stores/page-title.js';
  
  const { data } = $props();
  
  let adminId = $page.params.id;
  let ticketId = $page.params.ticketId;
  let ticket = $state(null);
  let comments = $state([]);
  let loading = $state(true);
  let error = $state(null);
  let chatContainer = $state(null); // Reference to chat container for scrolling
  
  // Subscription cleanup
  let unsubscribeTicket;
  let unsubscribeChat;
  
  // New comment
  let newComment = $state('');
  let submittingComment = $state(false);
  
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
  
  // Get user data
  let userData = data.userData || {};
  let userName = userData.name || 'Admin';
  let companyName = userData.companyName || 'Axentra';
  
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
  
  // Scroll chat to bottom
  async function scrollToBottom() {
    await tick(); // Wait for DOM update
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }
  
  // Update ticket status
  async function updateTicketStatus(ticketId, newStatus) {
    try {
      // Update Firestore
      await updateDoc(doc(firebaseInstance.db, 'tickets', ticketId), {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
      
      // Add system message to chat
      await addDoc(collection(firebaseInstance.db, 'tickets', ticketId, 'chat'), {
        content: `Ärendets status ändrades till "${statusOptions.find(s => s.value === newStatus)?.label || newStatus}"`,
        timestamp: serverTimestamp(),
        userId: 'system',
        userEmail: 'system',
        createdBy: 'System @Axentra',
        isSystem: true
      });
      
      // Send email notification to user
      if (ticket && ticket.userEmail) {
        const statusLabel = statusOptions.find(s => s.value === newStatus)?.label || newStatus;
        
        try {
          const response = await fetch('/api/ticketstatus', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              ticketId,
              newStatus,
              statusLabel,
              userEmail: ticket.userEmail,
              ticketTitle: ticket.title
            })
          });
          
          const result = await response.json();
          if (!result.success) {
            console.error('Email notification failed:', result.message);
          }
        } catch (emailErr) {
          console.error('Failed to send email notification:', emailErr);
          // Don't throw here - we still want to update the UI even if email fails
        }
      }
      
      // The listeners will automatically update the UI
      
    } catch (err) {
      console.error('Error updating ticket status:', err);
      error = 'Det gick inte att uppdatera ärendets status. Försök igen.';
    }
  }
  
  // Submit new comment
  async function submitComment(e) {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    submittingComment = true;
    
    try {
      // Add to Firestore
      await addDoc(collection(firebaseInstance.db, 'tickets', ticketId, 'chat'), {
        content: newComment,
        timestamp: serverTimestamp(),
        userId: firebaseInstance.auth.currentUser.uid,
        userEmail: firebaseInstance.auth.currentUser.email,
        createdBy: `${userName} @${companyName}`,
        isAdmin: true
      });
      
      // Reset form
      newComment = '';
      
    } catch (err) {
      console.error('Error submitting comment:', err);
      error = 'Det gick inte att skicka kommentaren. Försök igen.';
    } finally {
      submittingComment = false;
    }
  }
  
  onMount(() => {
    if (ticket) {
      setPageTitle(`Admin: Ärende ${ticket.title}`);
    } else {
      setPageTitle('Admin: Ärende');
    }
    // Subscribe to ticket data
    unsubscribeTicket = data.ticket.subscribe((ticketData) => {
      ticket = ticketData;
      if (ticketData) {
        loading = false;
      }
    });
    
    // Subscribe to chat data
    unsubscribeChat = data.chat.subscribe((chatData) => {
      comments = chatData;
      // Scroll to bottom when new messages arrive
      scrollToBottom();
    });
  });
  
  // Clean up subscriptions when component is destroyed
  onDestroy(() => {
    if (unsubscribeTicket) {
      unsubscribeTicket();
    }
    if (unsubscribeChat) {
      unsubscribeChat();
    }
  });
  
  function goBack() {
    goto(`/dashboard/admin/${adminId}`);
  }
  
  // Effect to scroll to bottom when comments change
  $effect(() => {
    if (comments.length > 0) {
      scrollToBottom();
    }
  });
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
        <h1 class="text-2xl font-bold text-white">Ärendedetaljer</h1>
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
        <p>Laddar ärendedetaljer...</p>
      </div>
    {:else if error}
      <div class="py-8 text-center text-red-400">
        <p>Fel: {error}</p>
      </div>
    {:else if ticket}
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Ticket Details -->
        <div class="lg:col-span-1">
          <AdminTicket 
            ticket={ticket} 
            priorityOptions={priorityOptions} 
            statusOptions={statusOptions} 
            onUpdateStatus={updateTicketStatus}
          />
        </div>
        
        <!-- Comments Section -->
        <div class="lg:col-span-2 flex flex-col h-[calc(100vh-8rem)] sm:h-[calc(100vh-9rem)] md:h-[calc(100vh-10rem)]">
          <div class="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700 flex flex-col h-full">
            <h2 class="text-lg font-medium text-white mb-4">Konversation</h2>
            
            <!-- Comments List -->
            <div 
              bind:this={chatContainer}
              class="space-y-4 mb-6 overflow-y-auto flex-grow"
              style="scrollbar-width: thin; scrollbar-color: #4B5563 #1F2937; min-height: 400px;"
            >
              {#if comments.length === 0}
                <p class="text-center text-gray-400 py-4">Inga kommentarer ännu.</p>
              {:else}
                {#each comments as comment}
                  <div class="p-4 rounded-lg {comment.isSystem ? 'bg-gray-700 border border-gray-600' : comment.isAdmin ? 'bg-indigo-900 bg-opacity-50' : 'bg-gray-700'}">
                    <div class="flex justify-between items-start mb-2">
                      <div class="flex items-center">
                        {#if comment.isSystem}
                          <span class="text-sm font-medium text-gray-400">System</span>
                        {:else}
                          <span class="text-sm font-medium {comment.isAdmin ? 'text-indigo-300' : 'text-gray-300'}">
                            {comment.createdBy || comment.userEmail}
                            {#if comment.isAdmin}
                              <span class="ml-2 px-1.5 py-0.5 text-xs bg-indigo-800 text-indigo-200 rounded">Personal</span>
                            {/if}
                          </span>
                        {/if}
                      </div>
                      <span class="text-xs text-gray-400">{formatDate(comment.timestamp)}</span>
                    </div>
                    <p class="text-sm {comment.isSystem ? 'text-gray-400 italic' : 'text-gray-200'} whitespace-pre-line">
                      {comment.content}
                    </p>
                  </div>
                {/each}
              {/if}
            </div>
            
            <!-- New Comment Form -->
            <div class="border-t border-gray-700 pt-4 mt-auto">
              <h3 class="text-sm font-medium text-gray-300 mb-2">Lägg till ett svar</h3>
              <form onsubmit={submitComment} class="space-y-4">
                <div>
                  <textarea
                    bind:value={newComment}
                    rows="3"
                    class="resize-none w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white"
                    placeholder="Skriv ditt svar här..."
                    required
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={submittingComment || !newComment.trim()}
                    class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submittingComment ? 'Skickar...' : 'Skicka svar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    {:else}
      <div class="py-8 text-center text-gray-400">
        <p>Ärende hittades inte.</p>
      </div>
    {/if}
  </main>
</div> 