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

export const renderMarkers = () => {
  const onResultChange = (newResult) => {
    const userPostMarkerList = [];
    userPostMarkerList.push(newResult);
    setIsLoading(false);
    setData(userPostMarkerList);
  };

  const userPosts = fetchUserPosts(10000, onResultChange);

  const [isLoading, setIsLoading] = useState(true);
  var [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    console.log("user marker reloaded");
  }, [data]);

  if (isLoading) {
    return <Marker coordinate={{ latitude: 155, longitude: 515 }} />;
  }
  if (data.length !== 0 && typeof data[0] !== "undefined") {
    const renderedMarkers = _.map(data, (marker) => {
      const { name, createdAt, fileType, lat, long, postId, url } = marker;

      const displyMedia = () => {
        if (marker === undefined) {
          return;
        } else {
          if (fileType === "image") {
            return (
              <View>
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

                <Text style={styles.userText}>{name}</Text>
              </View>
            );
          } else if (fileType === "video") {
            return (
              <View>
                <View style={styles.vidcontainer}>
                  <Video
                    source={{ uri: url }} // the video file
                    resizeMode={ResizeMode.CONTAIN}
                    style={styles.video}
                    isLooping
                    useNativeControls={true}
                    shouldPlay
                  />
                </View>
                <Text style={styles.userText}>{name}</Text>
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
                {/* <Video
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
                  <View style={{ backgroundColor: "rgba(0,0,0, 1)" }}>
                    <View>
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
                    </View>

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
    return <Marker coordinate={{ latitude: 155, longitude: 515 }} />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0, 1)",
  },
  touchable: {
    backgroundColor: "#ffd500",
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
