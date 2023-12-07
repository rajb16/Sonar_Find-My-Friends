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
import { getAuth } from "firebase/auth";
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
    userPostMarkerList.push(newResult);
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
  }, [val]);

  if (isLoading) {
    return <Marker coordinate={{ latitude: 155, longitude: 515 }} />;
  }
  if (val.length !== 0 && typeof val[0] !== "undefined") {
    const renderedMarkers = _.map(val, (marker) => {
      const { name, createdAt, fileType, lat, long, postId, url } = marker;

      const displyMedia = () => {
        if (marker === undefined) {
          return;
        } else {
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
            return (
              <View style={styles.vidcontainer}>
                <Video
                  source={{ uri: url }} 
                  resizeMode={ResizeMode.CONTAIN}
                  style={styles.video}
                  isLooping
                  useNativeControls={true}
                  shouldPlay
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
            return (
              <View style={styles.vidcontainer}>
                <Video
                  source={{ uri: url }}
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

      var lati = lat || 0;
      var longi = long || 0;

      return (
        <Marker
          key={postId}
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
                  borderWidth: 1.2,
                  borderColor: "rgba(0,0,0,1)",
                  fontSize: 14,
                  color: "#FFFFFF",
                  paddingLeft: "1%",
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(32,32,32, 0.9)",
  },
  touchable: {
    backgroundColor: "#04da12",
    width: 38,
    height: 38,
    borderRadius: 56,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.3,
  },
  backModal: {
    backgroundColor: "#f0da37",
    width: 45,
    height: 45,
    borderRadius: 100,
    marginLeft: "2%",
    marginTop: "10%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
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
  },
});
