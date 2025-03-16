import { collection, doc, addDoc, serverTimestamp, query, where, orderBy, limit, onSnapshot, getDoc } from 'firebase/firestore';
import firebaseInstance from "$lib/firebase/client";

export async function createTicket(title, description, priority, status, userId, userName, companyName, userEmail) {
    if (!firebaseInstance.auth.currentUser || firebaseInstance.auth.currentUser.uid !== userId) {
        throw new Error("Unauthorized");
    }

    try {
        const ticketsRef = collection(firebaseInstance.db, "tickets");
        const newTicket = await addDoc(ticketsRef, {
            title,
            description,
            priority,
            status,
            userId,
            userEmail,
            createdBy: `${userName} @${companyName}`,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            assignedTo: null
        });

        return {
            status: true,
            message: "Ticket created successfully"
        };
    } catch (error) {
        console.error("Error creating ticket:", error);
        return {
            status: false,
            message: "Failed to create ticket. Please try again or contact support."
        }
    }
}

export function listenToUserTickets(userId, callback) {
    if (!firebaseInstance.auth.currentUser || firebaseInstance.auth.currentUser.uid !== userId) {
        throw new Error("Unauthorized");
    }

    try {
        // Query for the last 20 tickets for the user, initially sorted by creation date
        const ticketsRef = collection(firebaseInstance.db, "tickets");
        const ticketsQuery = query(
            ticketsRef,
            where("userId", "==", userId),
            where("status", "!=", "closed"),
            orderBy("updatedAt", "desc")
        );

        // Set up the real-time listener
        const unsubscribe = onSnapshot(ticketsQuery, (snapshot) => {
            const tickets = [];
            snapshot.forEach((docSnapshot) => {
                tickets.push({
                    id: docSnapshot.id,
                    ...docSnapshot.data(),
                    createdAt: docSnapshot.data().createdAt?.toDate(),
                    updatedAt: docSnapshot.data().updatedAt?.toDate()
                });
            });

            callback(tickets);
        }, (error) => {
            console.error("Error listening to tickets:", error);
            callback([]);
        });

        // Return unsubscribe function to clean up the listener
        return unsubscribe;
    } catch (error) {
        console.error("Error setting up ticket listener:", error);
        throw new Error("Failed to set up ticket listener");
    }
}

export function listenToClosedTickets(userId, callback) {
    if (!firebaseInstance.auth.currentUser || firebaseInstance.auth.currentUser.uid !== userId) {
        throw new Error("Unauthorized");
    }
    
    try {
        const ticketsRef = collection(firebaseInstance.db, "tickets");
        const ticketsQuery = query(
            ticketsRef,
            where("userId", "==", userId),
            where("status", "==", "closed"),
            orderBy("updatedAt", "desc")
        );

        const unsubscribe = onSnapshot(ticketsQuery, (snapshot) => {
            const tickets = [];
            snapshot.forEach((docSnapshot) => {
                tickets.push({
                    id: docSnapshot.id,
                    ...docSnapshot.data(),
                    createdAt: docSnapshot.data().createdAt?.toDate(),
                    updatedAt: docSnapshot.data().updatedAt?.toDate()
                });
            });

            callback(tickets);
        }, (error) => {
            console.error("Error listening to closed tickets:", error);
            callback([]);
        });
        
        return unsubscribe;
    } catch (error) {
        console.error("Error setting up closed ticket listener:", error);
        throw new Error("Failed to set up closed ticket listener");
    }
}

export function listenToTicket(ticketId, callback) {
    if (!firebaseInstance.auth.currentUser) {
        throw new Error("Unauthorized");
    }

    try {
        const ticketRef = doc(firebaseInstance.db, "tickets", ticketId);
        
        const unsubscribe = onSnapshot(ticketRef, (docSnapshot) => {
            if (!docSnapshot.exists()) {
                callback({
                    status: false,
                    message: "Ticket not found"
                });
                return;
            }

            const ticketData = docSnapshot.data();

            // Verify the user has access to this ticket
            if (ticketData.userId !== firebaseInstance.auth.currentUser.uid) {
                callback({
                    status: false,
                    message: "Unauthorized"
                });
                return;
            }

            callback({
                status: true,
                data: {
                    id: docSnapshot.id,
                    ...ticketData,
                    createdAt: ticketData.createdAt?.toDate(),
                    updatedAt: ticketData.updatedAt?.toDate()
                }
            });
        }, (error) => {
            console.error("Error listening to ticket:", error);
            callback({
                status: false,
                message: error.message || "Failed to listen to ticket"
            });
        });

        return unsubscribe;
    } catch (error) {
        console.error("Error setting up ticket listener:", error);
        throw new Error("Failed to set up ticket listener");
    }
}

export function listenToTicketChat(ticketId, callback) {
    if (!firebaseInstance.auth.currentUser) {
        throw new Error("Unauthorized");
    }

    try {
        const chatRef = collection(firebaseInstance.db, "tickets", ticketId, "chat");
        const chatQuery = query(
            chatRef,
            orderBy("timestamp", "asc") // Ascending order so newest messages are at the bottom
        );

        const unsubscribe = onSnapshot(chatQuery, (snapshot) => {
            const messages = [];
            snapshot.forEach((docSnapshot) => {
                messages.push({
                    id: docSnapshot.id,
                    ...docSnapshot.data(),
                    timestamp: docSnapshot.data().timestamp?.toDate()
                });
            });

            callback({
                status: true,
                data: messages
            });
        }, (error) => {
            console.error("Error listening to ticket chat:", error);
            callback({
                status: false,
                message: error.message || "Failed to listen to ticket chat"
            });
        });

        return unsubscribe;
    } catch (error) {
        console.error("Error setting up ticket chat listener:", error);
        throw new Error("Failed to set up ticket chat listener");
    }
}

export function listenToAllTickets(callback) {
    if (!firebaseInstance.auth.currentUser) {
        throw new Error("Unauthorized");
    }

    try {
        const ticketsRef = collection(firebaseInstance.db, "tickets");
        const ticketsQuery = query(
            ticketsRef,
            orderBy("updatedAt", "desc")
        );

        const unsubscribe = onSnapshot(ticketsQuery, async (snapshot) => {
            const tickets = [];
            const userPromises = [];
            
            // First pass: collect all tickets and create promises for user data
            snapshot.forEach((docSnapshot) => {
                const ticketData = docSnapshot.data();
                const userId = ticketData.userId;
                
                // Create a promise to get user data
                if (userId) {
                    const userPromise = getDoc(doc(firebaseInstance.db, "users", userId))
                        .then(userDoc => {
                            if (userDoc.exists()) {
                                return {
                                    userId,
                                    userData: userDoc.data()
                                };
                            }
                            return {
                                userId,
                                userData: null
                            };
                        })
                        .catch(error => {
                            console.error(`Error fetching user data for ${userId} in listenToAllTickets:`, error);
                            return {
                                userId,
                                userData: null
                            };
                        });
                    
                    userPromises.push(userPromise);
                }
                
                tickets.push({
                    id: docSnapshot.id,
                    ...ticketData,
                    createdAt: ticketData.createdAt?.toDate(),
                    updatedAt: ticketData.updatedAt?.toDate()
                });
            });
            
            // Wait for all user data to be fetched
            const usersData = await Promise.all(userPromises);
            
            // Create a map of userId to userData for quick lookup
            const userDataMap = {};
            usersData.forEach(({ userId, userData }) => {
                userDataMap[userId] = userData;
            });
            
            // Second pass: add user data to tickets
            tickets.forEach(ticket => {
                if (ticket.userId && userDataMap[ticket.userId]) {
                    ticket.user = userDataMap[ticket.userId];
                }
            });
            
            callback(tickets);
        }, (error) => {
            console.error("Error listening to all tickets:", error);
            callback([]);
        });

        return unsubscribe;
    } catch (error) {
        console.error("Error setting up all tickets listener:", error);
        throw new Error("Failed to set up all tickets listener");
    }
}

export function listenToTicketAdmin(ticketId, callback) {
    if (!firebaseInstance.auth.currentUser) {
        throw new Error("Unauthorized");
    }

    try {
        const ticketRef = doc(firebaseInstance.db, "tickets", ticketId);
        
        const unsubscribe = onSnapshot(ticketRef, (docSnapshot) => {
            if (!docSnapshot.exists()) {
                callback({
                    status: false,
                    message: "Ticket not found"
                });
                return;
            }

            const ticketData = docSnapshot.data();

            callback({
                status: true,
                data: {
                    id: docSnapshot.id,
                    ...ticketData,
                    createdAt: ticketData.createdAt?.toDate(),
                    updatedAt: ticketData.updatedAt?.toDate()
                }
            });
        }, (error) => {
            console.error("Error listening to ticket:", error);
            callback({
                status: false,
                message: error.message || "Failed to listen to ticket"
            });
        });

        return unsubscribe;
    } catch (error) {
        console.error("Error setting up ticket listener:", error);
        throw new Error("Failed to set up ticket listener");
    }
}