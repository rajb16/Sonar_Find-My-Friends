import mapStyle from "./mapStyle1.json";
import MapView, { Marker, Callout } from "react-native-maps";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Text,
} from "react-native";
import React, { useState, useRef } from "react";
import _ from "lodash";
import askLocation, { myMarker } from "./askLocation";
import ModalOverlay from "./ModalOverlay";
import {} from "react-native-maps";
import { Video, ResizeMode } from "expo-av";
/** Temp icons dictionary. it will be replaced by firebase */
const localIcons = {
  logo: require("./images/logo.png"),
  markerImg: require("./images/marker.png"),
  miata: require("./images/miata.jpg"),
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

const renderMarkers = () => {
  const renderedMarkers = _.map(markerList, (marker) => {
    const { username, type, img, video, coordinate, id } = marker;
    const [image, setImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const displyMedia = () => {
      if (type === "image") {
        return (
          <Image
            source={img}
            style={{
              flex: 0,
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
          />
        );
      } else if (type === "video") {
        const videoRef = useRef(null);
        return (
          <View style={styles.vidcontainer}>
            <Video
              source={require("./images/lambo.mp4")} // the video file
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
    };
    const displayMediaHomeScreen = () => {
      if (type === "image") {
        return (
          <Image
            source={img}
            style={{
              height: 30,
              width: 30,
              borderRadius: 30,
              borderColor: "rgba(0,0,0,1.0)",
              borderWidth: 0.5,
            }}
          />
        );
      } else if (type === "video") {
        const player = useRef(null);
        return (
          <View style={styles.vidcontainer}>
            <Video
              source={{ uri: "./images/lambo.mp4" }}
              ref={player}
              // paused={true}
              style={{
                height: 30,
                width: 30,
                borderRadius: 30,
                borderColor: "rgba(0,0,0,1.0)",
                borderWidth: 0.5,
              }}
              // onLoad={() => {
              //   player.current.seek(1); // this will set first frame of video as thumbnail
              // }}
            />
          </View>
        );
      }
    };
    return (
      <Marker
        key={id}
        // title={username}
        coordinate={coordinate}
        onPress={() => {
          setModalVisible(!modalVisible);
          console.log("modalVisible");
        }}
      >
        <View>
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
                  <Text style={styles.userText}>{username}</Text>
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
                paddingRight: ".5%",
                textShadowColor: "#585858",
                textShadowOffset: { width: 5, height: 5 },
                textShadowRadius: 50,
              }}
            >
              {username}
            </Text>
          </View>
        </View>
      </Marker>

      // </Callout>
    );
  });

  return renderedMarkers;
};

export default function HomeScreen() {
  {
    askLocation();
  }

  const changeIcon = () => {
    let img;
    let val = false;
    myMarker.latitude > 0 ? (val = true) : (val = false);
    val ? (img = localIcons.markerImg) : (img = localIcons.loading);

    return img;
  };
  const changeIconHeight = () => {
    let val = false;
    let height;
    myMarker.latitude > 0 ? (val = true) : (val = false);
    val ? (height = 35) : (height = 135);

    return height;
  };
  const changeIconWidth = () => {
    let val = false;
    let width;
    myMarker.latitude > 0 ? (val = true) : (val = false);
    val ? (width = 35) : (width = 135);

    return width;
  };
  const [modalVisible, setModalVisible] = useState(false);
  const onPlusPress = () => {
    setModalVisible(!modalVisible);
    console.log("modalVisible");
  };
  return (
    <View style={styles.container}>
      <MapView
        style={{
          alignSelf: "stretch",
          height: "100%",
          // bottom: "-3.5%",
        }}
        region={myMarker}
        customMapStyle={mapStyle}
        showsUserLocation={false}
        showsCompass={false}
      >
        {/* <TouchableOpacity>{renderMarkers()}</TouchableOpacity> */}
        {/* <View> */}
        {renderMarkers()}
        {/* </View> */}
        <Marker coordinate={myMarker}>
          <Image
            // source={require("./images/marker.png")}
            source={changeIcon()}
            // style={{
            //   height: changeIconHeight(),
            //   width: changeIconWidth(),
            // }}
            style={{ height: 35, width: 35 }}
          />
          {/* {image && (
            <Image source={{ uri: image }} style={{ width: 35, height: 35 }} />
          )} */}
        </Marker>
      </MapView>
      <View>{ModalOverlay()}</View>
    </View>
  );
}

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
