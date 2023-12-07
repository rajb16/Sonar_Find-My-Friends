import {
  getFirestore,
  collection,
  query,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;
export async function getUserPosts(userId) {
  try {
    const db = getFirestore();

    // Reference to the user's subcollection within the "files" collection
    const userFilesCollection = collection(db, "files", userId, "userFiles");

    const q = query(userFilesCollection);

    const querySnapshot = await getDocs(q);

    const userPosts = [];
    querySnapshot.forEach((doc) => {
      userPosts.push({ postId: doc.id, ...doc.data() });
    });

    const sorted = userPosts.sort((a, b) => {
      const dateA = new Date(`${a.createdAt}`).valueOf();
      const dateB = new Date(`${b.createdAt}`).valueOf();
      if (dateA > dateB) {
        return -1; // return -1 here for DESC order
      }
      return 1; // return 1 here for DESC Order
    });

    return sorted;
  } catch (error) {
    console.error("Error getting user posts:", error);
  }
}
