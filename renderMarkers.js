import { Marker, Callout } from "react-native-maps";
import {
  View,
  Image,
  TouchableOpacity,
  Modal,
  Text,
  StyleSheet,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import _ from "lodash";
import {} from "react-native-maps";
import { Video, ResizeMode } from "expo-av";

import { getUserPosts, getFriendPosts } from "./getPosts.js";
import { getAuth } from "firebase/auth";
import { getDocs } from "firebase/firestore";
import { postWait } from "./HomeScreen.js";
import { getFriends } from "./friendFunctions.js";
import fetchUserPosts from "./fetchUserPosts.js";

/** Temp icons dictionary. it will be replaced by firebase */

export const localIcons = {
  logo: require("./images/logo.gif"),
  markerImg: require("./images/marker.png"),
  miata: require("./images/rx7.jpg"),
  sunset: require("./images/sunset.jpg"),
  skyline: require("./images/r30.jpg"),
  loading: require("./images/earth.gif"),
  video: "./images/burnout.mp4",
};
// import askLocation, { myMarker } from "./askLocation";
/**
 *  Temp list containing the ID, location coordinates, and
 *  username of a user
 */

const markerList = [
  {
    id: 1,
    username: "Francis",
    type: "image",
    img: localIcons.miata,
    video: "",
    coordinate: {
      latitude: 39.710579,
      longitude: -75.120261,
    },
  },
  {
    id: 2,
    username: "Parth",
    type: "video",
    video: localIcons.video,
    coordinate: {
      latitude: 39.712906,
      longitude: -75.1219,
    },
  },
  {
    id: 3,
    username: "Chris",
    type: "image",
    video: "",
    img: localIcons.skyline,
    coordinate: {
      latitude: 39.720622,
      longitude: -75.119014,
    },
  },
  {
    id: 4,
    username: "Oscar",
    type: "image",
    video: "",
    img: localIcons.sunset,
    coordinate: {
      latitude: 39.717518,
      longitude: -75.112928,
    },
  },
];
var elem = "";
var name = "";

export const renderMarkers = () => {



  const onResultChange = (newResult) => {
    const userPostMarkerList = [];
    userPostMarkerList.push(newResult)
    setIsLoading(false);
    setData(userPostMarkerList);
  };

  const userPosts = fetchUserPosts(10000, onResultChange);



  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  var   [val, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [flag, setFlag] = useState(true);
  const [result, setResult] = useState([]);


  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;

 useEffect(() => {
    console.log("user marker reloaded");
 },[val]);

  
  if (isLoading) {
    return <Marker coordinate={{ latitude: 155, longitude: 515 }} />;
  }
  // console.log(val, val.length, typeof val);
  if (val.length !== 0 && typeof val[0] !== "undefined") {
    const renderedMarkers = _.map(val, (marker) => {
      const { name, createdAt, fileType, lat, long, postId, url } = marker;

      const displyMedia = () => {
        if (marker === undefined) {
          // console.log("empty");
          return;
        } else {
          // console.log(lastElementId[0].fileType);
          if (fileType === "image") {
            return (
              <Image
                source={{
                  uri: url,
                }}
                style={{
                  flex: 0,
                  width: "100%",
                  height: "100%",
                  resizeMode: "contain",
                }}
              />
            );
          } else if (fileType === "video") {
            // const videoRef = useRef(null);
            return (
              <View style={styles.vidcontainer}>
                <Video
                  source={{ uri: url }} // the video file
                  resizeMode={ResizeMode.CONTAIN}
                  style={styles.video}
                  isLooping
                  useNativeControls={true}
                  shouldPlay
                  // onReadyForDisplay={}
                />
              </View>
            );
          }
        }
      };

      const displayMediaHomeScreen = () => {
        if (marker === undefined) {
          return;
        } else {
          // console.log(lastElementId[0].fileType);
          if (fileType === "image") {
            return (
              <Image
                source={{ uri: url }}
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 30,
                  borderColor: "rgba(0,0,0,1.0)",
                  borderWidth: 0.5,
                }}
              />
            );
          } else if (fileType === "video") {
            // const player = useRef(null);
            return (
              <View style={styles.vidcontainer}>
                <Video
                  source={{ uri: url }}
                  // ref={player}
                  paused={true}
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 30,
                    borderColor: "rgba(0,0,0,1.0)",
                    borderWidth: 0.5,
                  }}
                />
              </View>
            );
          }
        }
      };

      // console.log(lati, longi);
      var lati = lat || 0;
      var longi = long || 0;
      // console.log(lati, longi);
      //   try {
      // if (typeof lati !== "undefined" && lati) {
      return (
        <Marker
          key={postId}
          // title={username}
          coordinate={{
            latitude: lati,
            longitude: longi,
          }}
          onPress={() => {
            setModalVisible(!modalVisible);
            console.log("modalVisible");
          }}
        >
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View style={styles.touchable}>
              <Callout>
                {displayMediaHomeScreen()}
                <Modal
                  visible={modalVisible}
                  animationType="fade"
                  statusBarTranslucent={true}
                  transparent={true}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  // transparent={true}
                >
                  <View style={{ backgroundColor: "rgba(0,0,0, 0.9)" }}>
                    <TouchableOpacity
                      style={styles.backModal}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <View>
                        <Text style={styles.touchableText}>ᐊ</Text>
                      </View>
                    </TouchableOpacity>
                    <Text style={styles.userText}>{name}</Text>
                    <View
                      style={{
                        flex: 0,
                        marginBottom: "130%",
                      }}
                    >
                      {displyMedia()}
                    </View>
                  </View>
                </Modal>
              </Callout>
            </View>
            <View
              style={{
                alignSelf: "center",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  backgroundColor: "rgba(5,35,74,0.85)",
                  borderRadius: 5,
                  alignSelf: "center",
                  alignContent: "center",
                  // color: "white",
                  borderWidth: 1.2,
                  borderColor: "rgba(0,0,0,1)",
                  fontSize: 14,
                  color: "#FFFFFF",
                  paddingLeft: "1%",
                  // paddingRight: ".5%",
                  textShadowColor: "#585858",
                  textShadowOffset: { width: 5, height: 5 },
                  textShadowRadius: 50,
                }}
              >
                {name}
              </Text>
            </View>
          </View>
        </Marker>
      );
    });

    return renderedMarkers;
  } else {
    return <Marker coordinate={{ latitude: 55, longitude: 55 }} />;
  }
};

// export const friendRenderMarkers = () => {
//   const auth = getAuth();
//   const user = auth.currentUser;
//   const friendPostMarkerList = [];

//   const friendsList = [];
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [friendModalVisible, setFriendModalVisible] = useState(false);
//   var [friendsData, setFriendData] = useState([]);
//   const [flag, setFlag] = useState(true);
//   useEffect(() => {
//     fetchFriendData();
//   }, []);
//   var time = 2000;
//   const fetchFriendData = async () => {
//     try {
//       // Simulate a delay of 2 seconds

//       await new Promise((resolve) => {
//         // if (flag) {
//         //   time = 5000;
//         //   setFlag(false);
//         // }
//         setTimeout(resolve, time);
//       });
//       const uid = user.uid;

//       const friendResponse = await getFriends(uid);
//       var FUP = [];
//       // console.log(friendResponse);
//       const friends = _.map(friendResponse, (friend) => {
//         const { email, friends, name, userId } = friend;
//         // console.log(email, friends, name, pendingRequests, userId);
//         friendsList.push(friends[0]);
//       });
//       // console.log(friends);
//       const friendsUserPosts = friendsList.forEach(async (value) => {
//         FUP = await getUserPosts(value);
//         friendPostMarkerList.push(FUP);
//         setFriendData(friendPostMarkerList);
//         console.log(friendPostMarkerList);
//       });

//       setIsLoading(false);
//     } catch (error) {
//       setError(error.message);
//       console.log(error);
//       setIsLoading(false);
//     }
//   };
//   if (isLoading) {
//     return <Marker coordinate={{ latitude: 155, longitude: 515 }} />;
//   }
//   // console.log(val, val.length, typeof val);
//   if (friendsData.length !== 0 && typeof friendsData[0] !== "undefined") {
//     const friendsRenderedMarkers = _.map(friendsData, (marker) => {
//       const { name, createdAt, fileType, lat, long, postId, url } = marker;
//       // console.log(createdAt, fileType, lat, long, postId);

//       const displyMedia = () => {
//         if (marker === undefined) {
//           // console.log("empty");
//           return;
//         } else {
//           // console.log(lastElementId[0].fileType);
//           if (fileType === "image") {
//             return (
//               <Image
//                 source={{
//                   uri: url,
//                 }}
//                 style={{
//                   flex: 0,
//                   width: "100%",
//                   height: "100%",
//                   resizeMode: "contain",
//                 }}
//               />
//             );
//           } else if (fileType === "video") {
//             // const videoRef = useRef(null);
//             return (
//               <View style={styles.vidcontainer}>
//                 <Video
//                   source={{ uri: url }} // the video file
//                   resizeMode={ResizeMode.CONTAIN}
//                   style={styles.video}
//                   isLooping
//                   useNativeControls={true}
//                   shouldPlay
//                   // onReadyForDisplay={}
//                 />
//               </View>
//             );
//           }
//         }
//       };

//       const displayMediaHomeScreen = () => {
//         if (marker === undefined) {
//           return;
//         } else {
//           // console.log(lastElementId[0].fileType);
//           if (fileType === "image") {
//             return (
//               <Image
//                 source={{ uri: url }}
//                 style={{
//                   height: 30,
//                   width: 30,
//                   borderRadius: 30,
//                   borderColor: "rgba(0,0,0,1.0)",
//                   borderWidth: 0.5,
//                 }}
//               />
//             );
//           } else if (fileType === "video") {
//             // const player = useRef(null);
//             return (
//               <View style={styles.vidcontainer}>
//                 <Video
//                   source={{ uri: url }}
//                   // ref={player}
//                   paused={true}
//                   style={{
//                     height: 30,
//                     width: 30,
//                     borderRadius: 30,
//                     borderColor: "rgba(0,0,0,1.0)",
//                     borderWidth: 0.5,
//                   }}
//                 />
//               </View>
//             );
//           }
//         }
//       };

//       // console.log(lati, longi);
//       var lati = lat || 0;
//       var longi = long || 0;
//       // console.log(lati, longi);
//       //   try {
//       // if (typeof lati !== "undefined" && lati) {
//       return (
//         <Marker
//           key={postId}
//           // title={username}
//           coordinate={{
//             latitude: lati,
//             longitude: longi,
//           }}
//           onPress={() => {
//             setFriendModalVisible(!friendModalVisible);
//             console.log("modalVisible");
//           }}
//         >
//           <View style={{ alignItems: "center", justifyContent: "center" }}>
//             <View style={styles.touchable}>
//               <Callout>
//                 {displayMediaHomeScreen()}
//                 <Modal
//                   visible={friendModalVisible}
//                   animationType="fade"
//                   statusBarTranslucent={true}
//                   transparent={true}
//                   style={{
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                   // transparent={true}
//                 >
//                   <View style={{ backgroundColor: "rgba(0,0,0, 0.9)" }}>
//                     <TouchableOpacity
//                       style={styles.backModal}
//                       onPress={() => {
//                         setFriendModalVisible(!friendModalVisible);
//                       }}
//                     >
//                       <View>
//                         <Text style={styles.touchableText}>ᐊ</Text>
//                       </View>
//                     </TouchableOpacity>
//                     <Text style={styles.userText}>{name}</Text>
//                     <View
//                       style={{
//                         flex: 0,
//                         marginBottom: "130%",
//                       }}
//                     >
//                       {displyMedia()}
//                     </View>
//                   </View>
//                 </Modal>
//               </Callout>
//             </View>
//             <View
//               style={{
//                 alignSelf: "center",
//                 alignContent: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <Text
//                 style={{
//                   backgroundColor: "rgba(5,35,74,0.85)",
//                   borderRadius: 5,
//                   alignSelf: "center",
//                   alignContent: "center",
//                   // color: "white",
//                   borderWidth: 1.2,
//                   borderColor: "rgba(0,0,0,1)",
//                   fontSize: 14,
//                   color: "#FFFFFF",
//                   paddingLeft: "1%",
//                   // paddingRight: ".5%",
//                   textShadowColor: "#585858",
//                   textShadowOffset: { width: 5, height: 5 },
//                   textShadowRadius: 50,
//                 }}
//               >
//                 {name}
//               </Text>
//             </View>
//           </View>
//         </Marker>
//       );
//     });

//     return friendsRenderedMarkers;
//   } else {
//     return <Marker coordinate={{ latitude: 55, longitude: 55 }} />;
//   }
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(32,32,32, 0.9)",
  },
  touchable: {
    // backgroundColor: "orange",
    backgroundColor: "#04da12",
    width: 38,
    height: 38,
    borderRadius: 56,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.3,
  },
  backModal: {
    // backgroundColor: "orange",
    backgroundColor: "#f0da37",
    width: 45,
    height: 45,
    borderRadius: 100,
    marginLeft: "2%",
    marginTop: "10%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    // marginRight: "5%",
    // visibility: plusVisible ? "visible" : "hidden",
  },
  touchableText: {
    alignSelf: "center",
    fontSize: 24,
    marginRight: "10%",
  },
  userText: {
    alignSelf: "center",
    fontSize: 40,
    color: "white",
  },
  vidcontainer: {
    // flex: 1,
    justifyContent: "center",
  },
  video: {
    alignSelf: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0, 1)",
  },
  videoHome: {
    alignSelf: "center",
    width: 30,
    height: 30,
    borderRadius: 30,
    // backgroundColor: "rgba(0,0,0, 1)",
  },
});
