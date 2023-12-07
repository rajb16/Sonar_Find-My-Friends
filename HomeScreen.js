import mapStyle from "./mapStyle1.json";
import MapView, { Marker, Callout } from "react-native-maps";
import {
  View,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import _ from "lodash";
import askLocation, { myMarker } from "./askLocation";
import ModalOverlay from "./ModalOverlay";
import {} from "react-native-maps";
import { renderMarkers } from "./renderMarkers.js";
import { friendRenderMarkers } from "./renderFriendMarker.js";

export default function HomeScreen() {
  {
    askLocation();
  }

  const logoloading = () => {
    var val = false;
    myMarker.latitude > 0 ? (val = true) : (val = false);

    if (!val) {
      return (
        <View style={{ justifyContent: "center" }}>
          <Marker coordinate={myMarker}>
            <Image
              source={localIcons.logo}
              style={{ height: 300, width: 300 }}
            />
          </Marker>
        </View>
      );
    }

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
        }}
        region={myMarker}
        customMapStyle={mapStyle}
        showsUserLocation={false}
        showsCompass={false}
      >
        {renderMarkers()}
        {friendRenderMarkers()}

        <View>
          <Marker coordinate={myMarker}>
            <Image source={localIcons.logo} style={{ height: 45, width: 45 }} />
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
