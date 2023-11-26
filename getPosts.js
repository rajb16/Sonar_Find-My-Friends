import { getFirestore, collection, query, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import React, { useState, useRef, useEffect } from "react";

let lastElementId = "";
const auth = getAuth();
const user = auth.currentUser;
export default async function getUserPosts(userId) {
  try {
    const db = getFirestore();

    // Reference to the user's subcollection within the "files" collection
    const userFilesCollection = collection(db, "files", userId, "userFiles");

    // Create a query  to get all documents in the user's subcollection
    const q = query(userFilesCollection);

    // Execute  query
    const querySnapshot = await getDocs(q);

    // Put posts in array
    const userPosts = [];
    querySnapshot.forEach((doc) => {
      userPosts.push({ postId: doc.id, ...doc.data() });
    });

    lastElementId = userPosts.pop();
    // console.log(lastElementId.fileType);
    return lastElementId;
  } catch (error) {
    console.error("Error getting user posts:", error);
    return [];
  }
}
export { lastElementId };
// const example = [];
// async function componentDidMount() {
//   if (user !== null) {
//     // const uid = String(user.uid);
//     // get Images from Firestore & save To State

//     const querySnapshot = await getDocs(collection(FIREBASE_DB, "users/"));
//     querySnapshot.forEach((doc) => {
//       example.push({
//         name: doc.data().name, //Work
//         id: doc.data().id, //Work
//         //text: doc.data().text, //Work
//         //timestamp: doc.data().timestamp, //Work
//         //imageRef: doc.data().profilePic, // saved in saveToFireStore(): Working
//       });
//     });
//   }

//   console.log(example);
// }
