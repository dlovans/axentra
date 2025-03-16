<script>
  import { onMount } from 'svelte';
  import { getUsers } from '$lib/firebase/user.js';
  
  // Props
  const { adminId, users: initialUsers } = $props();
  
  // State
  let users = $state(initialUsers || []);
  let isLoading = $state(!initialUsers);
  let error = $state(null);
  let isSubmitting = $state(false);
  let formSuccess = $state('');
  
  // New user form state
  let newUser = $state({
    email: '',
    name: '',
    role: 'user',
    companyName: ''
  });
  
  // Form validation errors
  let fieldErrors = $state({
    email: '',
    name: '',
    companyName: ''
  });
  
  // Load users from API
  async function loadUsers() {
    isLoading = true;
    error = null;
    
    try {
      const updatedUsers = await getUsers();
      users = updatedUsers;
      isLoading = false;
    } catch (err) {
      console.error('Error loading users:', err);
      error = 'Failed to load users. Please try again.';
      isLoading = false;
    }
  }
  
  // Format date
  function formatDate(timestamp) {
    if (!timestamp) return 'N/A';
    
    // Handle Firestore Timestamp objects
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    
    return new Intl.DateTimeFormat('sv-SE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }
  
  // Validate form fields
  function validateForm() {
    // Reset errors
    fieldErrors = {
      email: '',
      name: '',
      companyName: ''
    };
    
    let isValid = true;
    
    // Validate email
    if (!newUser.email) {
      fieldErrors.email = 'E-post krävs';
      isValid = false;
    } else if (!newUser.email.includes('@')) {
      fieldErrors.email = 'Ange en giltig e-postadress';
      isValid = false;
    }
    
    // Validate name
    if (!newUser.name) {
      fieldErrors.name = 'Namn krävs';
      isValid = false;
    }
    
    // Validate company name for users
    if (newUser.role === 'user' && !newUser.companyName) {
      fieldErrors.companyName = 'Företagsnamn krävs för användare';
      isValid = false;
    }
    
    return isValid;
  }
  
  // Handle form submission
  async function handleSubmit() {
    isSubmitting = true;
    
    if (!validateForm()) {
      isSubmitting = false;
      return;
    }
    
    try {
      const response = await fetch('/api/newuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
          companyName: newUser.companyName
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Reset form
        newUser = {
          email: '',
          name: '',
          role: 'user',
          companyName: ''
        };
        
        // Show success message
        formSuccess = data.message || 'User created successfully!';
        setTimeout(() => {
          formSuccess = '';
        }, 5000);
        
        // Refresh user list
        loadUsers();
      } else {
        error = data.error || 'Failed to create user';
        setTimeout(() => {
          error = null;
        }, 5000);
      }
    } catch (err) {
      console.error('Error creating user:', err);
      error = 'An unexpected error occurred';
      setTimeout(() => {
        error = null;
      }, 5000);
    }
    
    isSubmitting = false;
  }
  
  // Update users when props change
  $effect(() => {
    if (initialUsers) {
      users = initialUsers;
      isLoading = false;
    }
  });
</script>

<div class="bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-700 mb-8">
  <div class="px-6 py-4 border-b border-gray-700">
    <h2 class="text-lg font-medium text-white">Användare</h2>
  </div>
  
  <!-- Add User Form -->
  <div class="bg-gray-800 rounded-lg p-6 shadow-md mb-8">
    <h3 class="text-xl font-semibold text-white mb-4">Lägg till ny användare</h3>
    
    <!-- Success message -->
    {#if formSuccess}
      <div class="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
        {formSuccess}
      </div>
    {/if}
    
    <!-- Error message -->
    {#if error}
      <div class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
        {error}
      </div>
    {/if}
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-300 mb-1">
          E-post <span class="text-red-400">*</span>
        </label>
        <input
          type="email"
          id="email"
          bind:value={newUser.email}
          class="w-full px-3 py-2 bg-gray-700 border {fieldErrors.email ? 'border-red-500' : 'border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white"
          placeholder="anvandare@exempel.se"
          required
        />
        <div class="h-5 mt-1">
          {#if fieldErrors.email}
            <p class="text-xs text-red-400">{fieldErrors.email}</p>
          {/if}
        </div>
      </div>
      
      <!-- Name -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-300 mb-1">
          Namn <span class="text-red-400">*</span>
        </label>
        <input
          type="text"
          id="name"
          bind:value={newUser.name}
          class="w-full px-3 py-2 bg-gray-700 border {fieldErrors.name ? 'border-red-500' : 'border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white"
          placeholder="Anna Andersson"
          required
        />
        <div class="h-5 mt-1">
          {#if fieldErrors.name}
            <p class="text-xs text-red-400">{fieldErrors.name}</p>
          {/if}
        </div>
      </div>
      
      <!-- Role -->
      <div>
        <label for="role" class="block text-sm font-medium text-gray-300 mb-1">
          Roll <span class="text-red-400">*</span>
        </label>
        <select
          id="role"
          bind:value={newUser.role}
          class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white"
          required
        >
          <option value="user">Användare</option>
          <option value="admin">Administratör</option>
        </select>
      </div>
      
      <!-- Company Name (only for users) -->
      <div>
        <label for="companyName" class="block text-sm font-medium text-gray-300 mb-1">
          Företagsnamn {#if newUser.role === 'user'}<span class="text-red-400">*</span>{/if}
        </label>
        <input
          type="text"
          id="companyName"
          bind:value={newUser.companyName}
          class="w-full px-3 py-2 bg-gray-700 border {fieldErrors.companyName ? 'border-red-500' : 'border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white"
          placeholder="Företag AB"
          disabled={newUser.role !== 'user'}
        />
        <div class="h-5 mt-1">
          {#if fieldErrors.companyName}
            <p class="text-xs text-red-400">{fieldErrors.companyName}</p>
          {/if}
        </div>
      </div>
    </div>
    
    <div class="mt-2 text-sm text-gray-400">
      <p>Ett e-postmeddelande för lösenordsåterställning kommer att skickas till användarens e-postadress.</p>
    </div>
    
    <div class="mt-4 flex justify-end">
      <button
        onclick={handleSubmit}
        disabled={isSubmitting}
        class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {#if isSubmitting}
          <span class="flex items-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Skapar...
          </span>
        {:else}
          Skapa användare
        {/if}
      </button>
    </div>
  </div>
  
  <!-- Users List -->
  {#if isLoading}
    <div class="py-8 text-center text-gray-400">
      <svg class="animate-spin h-8 w-8 mx-auto text-indigo-400 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p>Laddar användare...</p>
    </div>
  {:else if error}
    <div class="py-8 text-center text-red-400">
      <p>{error}</p>
      <button 
        class="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-medium transition"
        onclick={loadUsers}
      >
        Försök igen
      </button>
    </div>
  {:else if users.length === 0}
    <div class="py-8 text-center text-gray-400">
      <p>Inga användare hittades.</p>
    </div>
  {:else}
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-700">
        <thead class="bg-gray-800">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Användare
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Roll
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Företag
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Skapad
            </th>
          </tr>
        </thead>
        <tbody class="bg-gray-900 divide-y divide-gray-800">
          {#each users as user}
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div>
                    <div class="text-sm font-medium text-white">
                      {user.name}
                    </div>
                    <div class="text-sm text-gray-400">
                      {user.email}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full {user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}">
                  {user.role === 'admin' ? 'Administratör' : 'Användare'}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {user.companyName || '-'}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {formatDate(user.createdAt)}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div> 