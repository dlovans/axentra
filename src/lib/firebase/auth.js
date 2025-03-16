import firebaseInstance from '$lib/firebase/client';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

export async function login(email, password) {
    try {
        const result = await signInWithEmailAndPassword(firebaseInstance.auth, email, password);
        
        return {
            success: true,
            message: 'Login successful'
        };
    } catch (error) {
        console.error('Login error:', error);
        
        // Return appropriate error messages based on Firebase error codes
        let message = 'Ett fel uppstod vid inloggning.';
        
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
            message = 'Felaktig e-post eller lösenord.';
        } else if (error.code === 'auth/too-many-requests') {
            message = 'För många inloggningsförsök. Försök igen senare.';
        } else if (error.code === 'auth/user-disabled') {
            message = 'Detta konto har inaktiverats.';
        } else if (error.code === 'auth/invalid-email') {
            message = 'Ogiltig e-postadress.';
        }
        
        return {
            success: false,
            message: message,
            error: error.code
        };
    }
}

export function logout() {
  return signOut(firebaseInstance.auth);
}
