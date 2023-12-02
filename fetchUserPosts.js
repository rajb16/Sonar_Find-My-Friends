import { useEffect, useState } from 'react';
import { getUserPosts } from "./getPosts.js";
import { getAuth } from "firebase/auth";

const fetchUserPosts = (interval = 10000, onResultChange) => {

  const [result, setResult] = useState([]);

  useEffect(() => {
    fetchData(); // Fetch data initially

    const intervalId = setInterval(fetchData, interval); // Fetch data on interval


    return () => clearInterval(intervalId); 
  }, [interval]);

  const fetchData = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const uid = user.uid;
      const response = await getUserPosts(uid);
      const newResult = response[0];

      setResult(newResult);
      onResultChange(newResult); // Notify the updated result
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return result;
};

export default fetchUserPosts;
