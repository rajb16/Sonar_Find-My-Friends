import { useEffect, useState } from "react";
import { getUserPosts } from "./getPosts.js";
import { getAuth } from "firebase/auth";
import { getFriends } from "./friendFunctions.js";
import { map } from "lodash";

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
      const newResult = [];

      const friendResponse = await getFriends(uid);
      const friendsList = [];
      const friendPostMarkerList = [];

      const friends = map(friendResponse, (friend) => {
        const { email, friends, name, userId } = friend;
        friendsList.push(userId);
      });

      const fetchPostsPromises = friendsList.map(async (value) => {
        const FUP = await getUserPosts(value);

        return FUP[0];
      });

      const fetchedPosts = await Promise.all(fetchPostsPromises);

      friendPostMarkerList.push(...fetchedPosts);
      // console.log(friendPostMarkerList);
      if (typeof friendPostMarkerList[0] === "undefined") {
        // newResult.push(friendPostMarkerList[]);
        console.log("friendPostMarkerList: " + friendPostMarkerList);
      } else {
        friendPostMarkerList.map((value) => {
          newResult.push(value);
        });
      }

      // console.log(newResult);
      setResult(newResult);
      onResultChange(newResult);
    } catch (error) {
      console.error(error);
    }
  };

  return result;
};

export default fetchFriendsPosts;
