import { getUsers } from '$lib/firebase/user.js';
import { listenToAllTickets } from '$lib/firebase/ticket.js';
import { error } from '@sveltejs/kit';

export const ssr = false;

export async function load() {
  try {
    const users = await getUsers();
    
    // Create a subscribable tickets object
    const tickets = {
      subscribe: (callback) => {
        const unsubscribe = listenToAllTickets(callback);
        return unsubscribe;
      }
    };
    
    return {
      users,
      tickets
    };
  } catch (err) {
    console.error('Error loading users:', err);
    throw error(500, 'Failed to load users');
  }
} 