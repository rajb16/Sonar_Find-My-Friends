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
import React, { useState, useRef, useEffect } from "react";
import _ from "lodash";
import askLocation, { myMarker } from "./askLocation";
import ModalOverlay from "./ModalOverlay";
import {} from "react-native-maps";
import { Video, ResizeMode } from "expo-av";
import { sendFriendRequest, acceptFriendRequest } from "./friendFunctions";
import { getDoc, collection, onSnapshot } from "firebase/firestore";
import { FIREBASE_DB, storage, FIREBASE_AUTH } from "./firebaseConfig.js";
import { renderMarkers } from "./renderMarkers.js";
import { friendRenderMarkers } from "./renderFriendMarker.js";
import { getAuth } from "firebase/auth";

export default function HomeScreen() {
  {
    askLocation();
  }

  const logoloading = () => {
    // let img;
    var val = false;
    myMarker.latitude > 0 ? (val = true) : (val = false);
    // val ? (img = localIcons.markerImg) : (img = localIcons.logo);
    if (!val) {
      return (
        <View style={{ justifyContent: "center" }}>
          <Marker coordinate={myMarker}>
            <Image
              // source={require("./images/marker.png")}
              source={localIcons.logo}
              style={{ height: 150, width: 150 }}
            />
          </Marker>
        </View>
      );
    }

    // return img;
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
  /** Temp icons dictionary. it will be replaced by firebase */

  const localIcons = {
    logo: require("./images/logo.gif"),
    markerImg: require("./images/marker.png"),
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
        {friendRenderMarkers()}
        {/* {image && (
            <Image source={{ uri: image }} style={{ width: 35, height: 35 }} />
          )} */}

        <View>
          <Marker coordinate={myMarker}>
            <Image source={localIcons.logo} style={{ height: 60, width: 60 }} />
          </Marker>
        </View>
        <View style={{ justifyContent: "center", marginBottom: "-125%" }}>
          {logoloading()}
        </View>
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
