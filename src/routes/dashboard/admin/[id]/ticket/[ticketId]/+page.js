import { listenToTicketAdmin, listenToTicketChat } from '$lib/firebase/ticket.js';
import { getUserData } from '$lib/firebase/user.js';
import { error } from '@sveltejs/kit';

export const ssr = false;

export async function load({ params }) {
  try {
    const { ticketId, id } = params;
    
    // Get current admin user data
    const userData = await getUserData(id);
    
    // Create a subscribable ticket object
    const ticket = {
      subscribe: (callback) => {
        const unsubscribe = listenToTicketAdmin(ticketId, (result) => {
          if (result.status) {
            callback(result.data);
          } else {
            console.error('Error loading ticket:', result.message);
            callback(null);
          }
        });
        return unsubscribe;
      }
    };
    
    // Create a subscribable chat object
    const chat = {
      subscribe: (callback) => {
        const unsubscribe = listenToTicketChat(ticketId, (result) => {
          if (result.status) {
            callback(result.data);
          } else {
            console.error('Error loading chat:', result.message);
            callback([]);
          }
        });
        return unsubscribe;
      }
    };
    
    return {
      ticket,
      chat,
      userData
    };
  } catch (err) {
    console.error('Error setting up ticket listeners:', err);
    throw error(500, 'Failed to load ticket data');
  }
} 