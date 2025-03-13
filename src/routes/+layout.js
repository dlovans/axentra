import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { goto } from '$app/navigation';
import firebaseInstance from '$lib/firebase/client';

export async function load({ url }) {
    console.log('load function executing');
    if (!browser) {
        console.log('not browser');
        return;
    }
    console.log('browser');
    
    // Return a promise that resolves when we get the auth state
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(firebaseInstance.auth, (user) => {
            console.log('user', user);
            
            // Redirect if needed
            if (user && !url.pathname.startsWith('/dashboard')) {
                if (user.email.endsWith('@axentra.agency')) {   
                    goto(`/dashboard/admin/${user.uid}`);
                } else {
                    goto(`/dashboard/${user.uid}`);
                }
            }
            
            // Resolve the promise with the user data
            resolve({ user });
        });
    });
}
