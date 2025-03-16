<script>
  // AdminTicketContainer.svelte - Component for displaying a ticket in the admin dashboard
  
  // Props
  const { ticket, priorityOptions, statusOptions, onUpdateStatus, adminId } = $props();
  
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

<tr>
  <td class="px-4 py-4">
    <div class="text-sm font-medium text-white break-words">{ticket.title}</div>
  </td>
  <td class="px-4 py-4">
    <div class="text-sm text-white break-all">{ticket.createdBy || ticket.userEmail}</div>
  </td>
  <td class="px-4 py-4">
    <span class="px-2 py-1 text-xs rounded-full {getPriorityColor(ticket.priority)}">
      {priorityOptions.find(o => o.value === ticket.priority)?.label || 'Okänd'}
    </span>
  </td>
  <td class="px-4 py-4">
    <span class="px-2 py-1 text-xs rounded-full {getStatusColor(ticket.status)}">
      {statusOptions.find(o => o.value === ticket.status)?.label || 'Okänd'}
    </span>
  </td>
  <td class="px-4 py-4 text-sm text-gray-400">
    {formatDate(ticket.createdAt)}
  </td>
  <td class="px-2 py-4 text-center">
    <a 
      href={`/dashboard/admin/${adminId}/ticket/${ticket.id}`}
      class="text-indigo-400 hover:text-indigo-300 font-medium"
    >
      Öppna
    </a>
  </td>
  <td class="px-2 py-4 text-sm font-medium text-right">
    <div class="flex flex-col sm:flex-row justify-end sm:space-x-2 space-y-2 sm:space-y-0">
      {#if ticket.status === 'open'}
        <button 
          onclick={() => onUpdateStatus(ticket.id, 'in-progress')}
          class="text-indigo-400 hover:text-indigo-300"
        >
          Starta
        </button>
      {/if}
      
      {#if ticket.status === 'in-progress'}
        <button 
          onclick={() => onUpdateStatus(ticket.id, 'closed')}
          class="text-green-400 hover:text-green-300"
        >
          Stäng
        </button>
      {/if}
      
      {#if ticket.status === 'closed'}
        <button 
          onclick={() => onUpdateStatus(ticket.id, 'open')}
          class="text-yellow-400 hover:text-yellow-300"
        >
          Återöppna
        </button>
      {/if}
    </div>
  </td>
</tr> 