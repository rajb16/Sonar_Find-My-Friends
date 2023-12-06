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
import fetchFriendsPosts from "./fetchFriendsPosts.js";
export const friendRenderMarkers = () => {
  const onResultChange = (newResult) => {
    setFriendData(newResult);
    setIsLoading(false);
  };

  const friendPosts = fetchFriendsPosts(10000, onResultChange);

  const [isLoading, setIsLoading] = useState(true);
  const [friendModalVisible, setFriendModalVisible] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  var   [friendsData, setFriendData] = useState([]);

  useEffect(() => {
    console.log("friends markers reloaded");
  }, [friendsData]);

  const displyMedia = () => {
    if (!selectedFriend) {
      // console.log("empty");
      return null;
    } else {
      const { fileType, url } = selectedFriend;
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

  // const displayMediaHomeScreen = () => {
  //   if (value === undefined) {
  //     return;
  //   } else {
  //     // console.log(lastElementId[0].fileType);
  //     if (fileType === "image") {
  //       return (
  //         <Image
  //           source={{ uri: url }}
  //           style={{
  //             height: 30,
  //             width: 30,
  //             borderRadius: 30,
  //             borderColor: "rgba(0,0,0,1.0)",
  //             borderWidth: 0.5,
  //           }}
  //         />
  //       );
  //     } else if (fileType === "video") {
  //       // const player = useRef(null);
  //       return (
  //         <View style={styles.vidcontainer}>
  //           <Video
  //             source={{ uri: url }}
  //             // ref={player}
  //             paused={true}
  //             style={{
  //               height: 30,
  //               width: 30,
  //               borderRadius: 30,
  //               borderColor: "rgba(0,0,0,1.0)",
  //               borderWidth: 0.5,
  //             }}
  //           />
  //         </View>
  //       );
  //     }
  //   }
  // };

  const handleBack = () => {
    navigation.goBack();
  };

  if (isLoading) {
    return <Marker coordinate={{ latitude: 155, longitude: 515 }} />;
  }
  if (friendsData.length !== 0 && typeof friendsData[0] !== "undefined") {
    const friendsRenderedMarkers = _.map(friendsData, (value) => {
      const { name, createdAt, fileType, lat, long, postId, url } = value;
      // console.log(createdAt, fileType, lat, long, postId);

      const displayMediaHomeScreen = () => {
        if (value === undefined) {
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
                {/* <Video
                  source={{ uri: url }}
                  // ref={player}
                  shouldPlay
                  useNativeControls={true}
                  isMuted={true}
                  paused={false}
                  resizeMode={ResizeMode.CONTAIN}
                  isLooping
                  style={styles.video}
                  // style={{
                  //   height: 30,
                  //   width: 30,
                  //   borderRadius: 30,
                  //   borderColor: "rgba(0,0,0,1.0)",
                  //   borderWidth: 0.5,
                  // }}
                /> */}
                <View
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 30,
                    borderColor: "#000000",
                    borderWidth: 0.5,
                    backgroundColor: "#115284",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View style={{ marginTop: "-5%" }}>
                    <Text style={{ fontSize: 16 }}>▶️</Text>
                  </View>
                </View>
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
            setSelectedFriend(value);
            setFriendModalVisible(!friendModalVisible);
            console.log("modalVisible");
          }}
        >
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View style={styles.touchable}>
              <Callout>
                {displayMediaHomeScreen()}
                <Modal
                  visible={friendModalVisible}
                  animationType="fade"
                  statusBarTranslucent={true}
                  transparent={true}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}

                  // transparent={true}
                >
                  <View style={{ backgroundColor: "rgba(0,0,0, 1)" }}>
                    <TouchableOpacity
                      style={styles.backModal}
                      onPress={() => {
                        setFriendModalVisible(!friendModalVisible);
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

    return friendsRenderedMarkers;
  } else {
    console.log("No Markers to Render");
    return <Marker coordinate={{ latitude: 55, longitude: 55 }} />;
  }
};

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
