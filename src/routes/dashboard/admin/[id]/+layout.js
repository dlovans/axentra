import { getUserData } from '$lib/firebase/user';
import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import firebaseInstance from '$lib/firebase/client';
import { onAuthStateChanged } from 'firebase/auth';

export const ssr = false;

export async function load({ params, url }) {
    // Only run this check on the client side
    if (browser) {
        try {
            // Wait for auth state to be determined
            const authUser = await new Promise((resolve, reject) => {
                const unsubscribe = onAuthStateChanged(firebaseInstance.auth, (user) => {
                    unsubscribe();
                    resolve(user);
                }, reject);
            });
            
            // If not logged in, redirect to login
            if (!authUser) {
                console.log('No user logged in, redirecting to login');
                throw redirect(302, '/login');
            }
            
            // Check if URL user ID matches logged-in user ID
            if (params.id !== authUser.uid) {
                console.log('URL user ID does not match logged-in user, redirecting');
                throw redirect(302, `/dashboard/admin/${authUser.uid}`);
            }
            
            // Get user data from Firestore
            const userData = await getUserData(authUser.uid);
            
            // Check if user is admin
            if (userData.role !== 'admin') {
                console.log('User is not admin, redirecting to home');
                throw redirect(302, '/');
            }
            
            // Return user data for the page
            return {
                user: userData
            };
        } catch (error) {
            if (error.status === 302) {
                throw error; // Re-throw redirect
            }
            console.error('Error in admin layout load:', error);
            throw redirect(302, '/login');
        }
    }
    
    // Return empty data for SSR
    return {
        user: null
    };
}
