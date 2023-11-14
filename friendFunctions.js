import { collection, query, where, getDocs, updateDoc, arrayUnion, arrayRemove, doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "./firebaseConfig"; 

export async function sendFriendRequest(senderId, recipientId) {

    await updateDoc(doc(FIREBASE_DB, "users", senderId), {
      pendingRequests: arrayUnion(recipientId),
    });
  
}

export async function acceptFriendRequest(recipientId, senderId) {
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

export async function removeFriend(currentUserId, friendId) {
  await updateDoc(doc(FIREBASE_DB, 'users', currentUserId), {
    friends: arrayRemove(friendId),
  });

  await updateDoc(doc(FIREBASE_DB, 'users', friendId), {
    friends: arrayRemove(currentUserId),
  });
}


export const getFriends = async (userId) => {
  const userRef = doc(FIREBASE_DB, 'users', userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const friends = userDoc.data().friends || [];
    const friendsData = await Promise.all(
      friends.map(async (friendId) => {
        const friendRef = doc(FIREBASE_DB, 'users', friendId);
        const friendDoc = await getDoc(friendRef);
        const friendData = friendDoc.data();
        return { ...friendData, userId: friendId }; // Include userId property
      })
    );
    return friendsData;
  }

  return [];
};

export const searchUsers = async (name) => {
  const usersRef = collection(FIREBASE_DB, 'users');
  const q = query(usersRef, where('displayName', '>=', name));

  const querySnapshot = await getDocs(q);

  const results = [];
  querySnapshot.forEach((doc) => {
    results.push(doc.data());
  });

  return results;
};

export const declineFriendRequest = async (recipientId, senderId) => {

  await updateDoc(doc(FIREBASE_DB, "users", recipientId), {
    pendingRequests: arrayRemove(senderId),
  });

};

export const getPendingRequests = async (userId) => {
  const userRef = doc(FIREBASE_DB, 'users', userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const pendingRequestsIds = userDoc.data().pendingRequests || [];
    const pendingRequestsData = await Promise.all(
      pendingRequestsIds.map(async (requestId) => {
        const requestRef = doc(FIREBASE_DB, 'users', requestId);
        const requestDoc = await getDoc(requestRef);
        const requestData = requestDoc.data();
        console.log('Pending request data:', requestData); 

        // Include the userId in the requestData
        return { ...requestData, userId: requestId };
      })
    );
    return pendingRequestsData;
  }

  return [];
};