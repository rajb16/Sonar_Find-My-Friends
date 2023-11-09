import { updateDoc, arrayUnion, arrayRemove, doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "./firebaseConfig"; 

export async function sendFriendRequest(senderId, recipientId) {

    await updateDoc(doc(FIREBASE_DB, "users", senderId), {
      pendingRequests: arrayUnion(recipientId),
    });
  
}

export async function acceptFriendRequest(senderId, recipientId) {
    await updateDoc(doc(FIREBASE_DB, "users", recipientId), {
      friends: arrayUnion(senderId),
    });
  
    await updateDoc(doc(FIREBASE_DB, "users", senderId), {
      friends: arrayUnion(recipientId),
    });
  
    await updateDoc(doc(FIREBASE_DB, "users", recipientId), {
      pendingRequests: arrayRemove(senderId),
    });
}