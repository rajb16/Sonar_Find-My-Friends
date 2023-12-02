import { useEffect, useState } from 'react';
import { getUserPosts } from "./getPosts.js";
import { getAuth } from "firebase/auth";
import { getFriends } from "./friendFunctions.js";
import { map } from 'lodash';


const fetchFriendsPosts = (interval = 10000, onResultChange) => {



  const [result, setResult] = useState([]);

  let completedIterations = 0;

  useEffect(() => {
    fetchFriendData(); // Fetch data initially


    const intervalId = setInterval(fetchFriendData, interval); // Fetch data on interval


    return () => clearInterval(intervalId); 
  }, [interval]);

  const fetchFriendData = async () => {

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const uid = user.uid;
      var newResult;

      const friendResponse = await getFriends(uid);
      var FUP = [];
      const friendsList = [];
      const friendPostMarkerList = [];

      const friends = map(friendResponse, (friend) => {
        const { email, friends, name, userId } = friend;
        friendsList.push(userId);
      });

      friendsList.forEach(async (value) => {
        FUP = await getUserPosts(value);
        friendPostMarkerList.push(FUP[0]);
        newResult = friendPostMarkerList;
        console.log(newResult);
        setResult(newResult);
        onResultChange(newResult);
      });





 // Notify the updated result
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return result;
};

export default fetchFriendsPosts;
