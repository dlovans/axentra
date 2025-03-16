import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { goto } from '$app/navigation';
import firebaseInstance from '$lib/firebase/client';

export async function load({ url }) {
    if (!browser) {
        return;
    }
    
    // Return a promise that resolves when we get the auth state
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(firebaseInstance.auth, (user) => {
            
            // Redirect if needed
            if (user && !url.pathname.startsWith('/dashboard')) {
                if (user.email.endsWith('@axentra.agency')) {   
                    goto(`/dashboard/admin/${user.uid}`);
                } else {
                    goto(`/dashboard/${user.uid}`);
                }
            } else if (!user && url.pathname.startsWith('/dashboard')) {
                goto('/');
            }
            
            // Resolve the promise with the user data
            resolve({ user });
        });
    });
}
