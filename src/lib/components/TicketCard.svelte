<script>
  const {
    ticket,
    priorityOptions,
    userId
  } = $props();
  
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
</script>

<li class="py-4 px-3 rounded-lg transition-colors border border-gray-700/50">
  <div class="flex flex-col sm:flex-row justify-between">
    <div class="mb-2 sm:mb-0">
      <div class="flex flex-wrap items-center gap-2">
        <h3 class="text-md font-medium text-white">{ticket.title}</h3>
        <span class="px-2 py-0.5 text-xs rounded-full {getPriorityColor(ticket.priority)}">
          {priorityOptions.find(o => o.value === ticket.priority)?.label || 'Okänd'}
        </span>
        <span class="px-2 py-0.5 text-xs rounded-full whitespace-nowrap
          {ticket.status === 'open' ? 'bg-green-600 text-white' : 
           ticket.status === 'in-progress' ? 'bg-purple-600 text-white' : 
           'bg-gray-600 text-white'}">
          {ticket.status === 'in-progress' ? 'Pågående' : 
           ticket.status === 'open' ? 'Öppet' :
           ticket.status === 'closed' ? 'Avslutat' :
           ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
        </span>
      </div>
      <p class="mt-1 text-sm text-gray-400 line-clamp-2">{ticket.description}</p>
    </div>
    <div class="text-sm text-gray-400 whitespace-nowrap">
      {formatDate(ticket.createdAt)}
    </div>
  </div>
  <div class="mt-2 flex justify-end">
    <a href={`/dashboard/${userId}/ticket/${ticket.id}`} class="text-sm text-indigo-400 hover:text-indigo-300">
      Öppna →
    </a>
  </div>
</li>

<style>
  /* Add hover effect for ticket items */
  li:hover {
    background-color: rgba(55, 65, 81, 0.3);
    border-radius: 0.5rem;
  }
  
  /* Line clamp for description */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style> 