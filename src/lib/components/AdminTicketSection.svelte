<script>
  import AdminTicketContainer from './AdminTicketContainer.svelte';
  
  // Props
  const { 
    filteredTickets, 
    loading, 
    error, 
    priorityOptions, 
    statusOptions, 
    onUpdateStatus,
    adminId 
  } = $props();
</script>

<div class="bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-700">
  <div class="px-6 py-4 border-b border-gray-700">
    <h2 class="text-lg font-medium text-white">Ärenden</h2>
  </div>
  
  {#if loading}
    <div class="py-8 text-center text-gray-400">
      <svg class="animate-spin h-8 w-8 mx-auto text-indigo-400 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p>Laddar ärenden...</p>
    </div>
  {:else if error}
    <div class="py-8 text-center text-red-400">
      <p>Fel vid laddning av ärenden: {error}</p>
    </div>
  {:else if filteredTickets.length === 0}
    <div class="py-8 text-center text-gray-400">
      <p>Inga ärenden matchar dina filter.</p>
    </div>
  {:else}
    <div class="overflow-x-auto">
      <div class="max-h-[410px] overflow-y-auto">
        <table class="w-full divide-y divide-gray-700 table-fixed">
          <thead class="bg-gray-700 sticky top-0 z-10">
            <tr>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-[25%]">
                Ärende
              </th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-[20%]">
                Användare
              </th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-[10%]">
                Prioritet
              </th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-[10%]">
                Status
              </th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-[20%]">
                Datum
              </th>
              <th scope="col" class="px-2 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider w-[5%]">
                Öppna
              </th>
            </tr>
          </thead>
          <tbody class="bg-gray-800 divide-y divide-gray-700">
            {#each filteredTickets as ticket}
              <AdminTicketContainer 
                ticket={ticket} 
                priorityOptions={priorityOptions} 
                statusOptions={statusOptions} 
                onUpdateStatus={onUpdateStatus}
                adminId={adminId}
              />
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  {/if}
</div> 