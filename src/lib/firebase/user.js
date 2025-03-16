import { doc, getDoc, getDocs, collection, query, orderBy, where } from 'firebase/firestore';
import firebaseInstance from "$lib/firebase/client";

const defaultUserData = {
    name: "-",
    email: "-",
    company: "-",
    joinDate: new Date().toISOString(),
    role: "user"
};

export async function getUserData(userId) {
    try {
        const userDoc = await getDoc(doc(firebaseInstance.db, "users", userId));
        
        if (!userDoc.exists()) {
            return defaultUserData;
        }

        const userData = userDoc.data();
        
        // Return data with fallbacks for any missing fields
        return {
            name: userData.name ?? defaultUserData.name,
            email: userData.email ?? defaultUserData.email,
            companyName: userData.companyName ?? defaultUserData.companyName,
            joinDate: userData.joinDate ?? defaultUserData.joinDate,
            role: userData.role ?? defaultUserData.role
        };
    } catch (error) {
        console.error('Error fetching user data in getUserData:', error);
        return defaultUserData;
    }
}

export async function getUsers() {
    try {
        const usersQuery = query(
            collection(firebaseInstance.db, "users"),
            orderBy("createdAt", "desc")
        );
        
        const querySnapshot = await getDocs(usersQuery);
        
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error loading users:', error);
        throw error;
    }
}