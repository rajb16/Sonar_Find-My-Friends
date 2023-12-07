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
import { renderMarkers, localIcons } from "./renderMarkers.js";
import { friendRenderMarkers } from "./renderFriendMarker.js";

export default function HomeScreen() {
  
  const [modalVisible, setModalVisible] = useState(false);

  const onPlusPress = () => {
    setModalVisible(!modalVisible);
    console.log("modalVisible");
  };

  {
    askLocation();
  }

  const changeIcon = () => {
    let img;
    let val = false;
    myMarker.latitude > 0 ? (val = true) : (val = false);
    val ? (img = localIcons.markerImg) : (img = localIcons.logo);

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

        <Marker coordinate={myMarker}>
          <Image
            source={changeIcon()}
            style={{ height: 35, width: 35 }}
          />
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
