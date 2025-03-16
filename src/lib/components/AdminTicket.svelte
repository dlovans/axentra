<script>
  // AdminTicket.svelte - Component for displaying a single ticket in detail
  
  // Props
  const { ticket, priorityOptions, statusOptions, onUpdateStatus } = $props();
  
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
</script>

<div class="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700">
  <div class="flex justify-between items-start mb-6">
    <h2 class="text-xl font-medium text-white">{ticket.title}</h2>
    <div class="flex space-x-2">
      <span class="px-2 py-1 text-xs rounded-full {getPriorityColor(ticket.priority)}">
        {priorityOptions.find(o => o.value === ticket.priority)?.label || 'Okänd'}
      </span>
      <span class="px-2 py-1 text-xs rounded-full {getStatusColor(ticket.status)}">
        {statusOptions.find(o => o.value === ticket.status)?.label || 'Okänd'}
      </span>
    </div>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    <div>
      <h3 class="text-sm font-medium text-gray-400 mb-2">Inskickat av</h3>
      <p class="text-white">{ticket.createdBy || ticket.userEmail}</p>
      <p class="text-sm text-gray-400 break-all truncate max-w-full">{ticket.userId}</p>
    </div>
    
    <div>
      <h3 class="text-sm font-medium text-gray-400 mb-2">Datum</h3>
      <p class="text-white">{formatDate(ticket.createdAt)}</p>
      {#if ticket.updatedAt}
        <p class="text-sm text-gray-400">Uppdaterad: {formatDate(ticket.updatedAt)}</p>
      {/if}
    </div>
  </div>
  
  <div class="mb-6">
    <h3 class="text-sm font-medium text-gray-400 mb-2">Beskrivning</h3>
    <p class="text-white whitespace-pre-line">{ticket.description}</p>
  </div>
  
  <div class="border-t border-gray-700 pt-4">
    <h3 class="text-sm font-medium text-gray-400 mb-2">Åtgärder</h3>
    <div class="flex flex-wrap gap-2">
      {#if ticket.status === 'open'}
        <button 
          onclick={() => onUpdateStatus(ticket.id, 'in-progress')}
          class="px-3 py-1 text-sm bg-indigo-900 text-indigo-300 hover:bg-indigo-800 rounded-md transition"
        >
          Börja arbeta
        </button>
      {/if}
      
      {#if ticket.status === 'in-progress'}
        <button 
          onclick={() => onUpdateStatus(ticket.id, 'closed')}
          class="px-3 py-1 text-sm bg-green-900 text-green-300 hover:bg-green-800 rounded-md transition"
        >
          Markera som löst
        </button>
      {/if}
      
      {#if ticket.status === 'closed'}
        <button 
          onclick={() => onUpdateStatus(ticket.id, 'open')}
          class="px-3 py-1 text-sm bg-yellow-900 text-yellow-300 hover:bg-yellow-800 rounded-md transition"
        >
          Återöppna ärende
        </button>
      {/if}
    </div>
  </div>
</div>

<style>
  /* No custom styles needed */
</style> 