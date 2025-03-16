import { listenToTicket, listenToTicketChat } from "$lib/firebase/ticket";
import { getUserData } from "$lib/firebase/user";
import { browser } from "$app/environment";

export async function load({ params }) {
    if (!browser) {
        return {
            ticket: [],
            chat: []
        }
    }

    // Get current user data
    const userData = await getUserData(params.id);

    return {
        ticket: {
            subscribe: (callback) => {
                const unsubscribe = listenToTicket(params.ticketId, callback);
                return unsubscribe;
            }
        },
        chat: {
            subscribe: (callback) => {
                const unsubscribe = listenToTicketChat(params.ticketId, callback);
                return unsubscribe;
            }
        },
        userData
    };
}