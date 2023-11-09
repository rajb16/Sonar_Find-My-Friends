import { getFirestore, collection, query, getDocs } from "firebase/firestore";

async function getUserPosts(userId) {
  try {
    const db = getFirestore();

    // Reference to the user's subcollection within the "files" collection
    const userFilesCollection = collection(db, "files", userId, "userFiles");

    // Create a query to get all documents in the user's subcollection
    const q = query(userFilesCollection);

    // Execute  query
    const querySnapshot = await getDocs(q);

    // Put posts in array
    const userPosts = [];
    querySnapshot.forEach((doc) => {
      userPosts.push({ postId: doc.id, ...doc.data() });
    });

    return userPosts;
  } catch (error) {
    console.error("Error getting user posts:", error);
    return [];
  }
}
