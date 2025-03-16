import { browser } from '$app/environment';
import { getUserData } from '$lib/firebase/user';
import { listenToUserTickets, listenToClosedTickets } from '$lib/firebase/ticket';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    if (!browser) {
        return { 
            activeTickets: [],
            closedTickets: [],
            userData: []
        };
    }

    const userData = await getUserData(params.id);

    // Set up both ticket subscriptions
    return {
        activeTickets: {
            subscribe: (callback) => {
                const unsubscribe = listenToUserTickets(params.id, callback);
                return unsubscribe;
            }
        },
        closedTickets: {
            subscribe: (callback) => {
                const unsubscribe = listenToClosedTickets(params.id, callback);
                return unsubscribe;
            }
        },
        userData: userData
    };
};
