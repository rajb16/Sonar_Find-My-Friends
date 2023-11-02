import * as Location from "expo-location";
import mapStyle from "./mapStyle1.json";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import { View, StyleSheet, Image, Text, Button, Modal } from "react-native";
import React, { useState, useEffect, Component } from "react";
import _ from "lodash";
import askLocation, { myMarker } from "./askLocation";
import { markers } from "./App";
import ModalOverlay from "./ModalOverlay";

import { FIREBASE_AUTH } from "./firebaseConfig.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { image } from "./ImagePicker";

/**
 *  Temp list containing the ID, location coordinates, and
 *  username of a user
 */
const markerList = [
  {
    id: 1,
    username: "Francis",
    description:
      "https://media.geeksforgeeks.org/wp-content/uploads/20230306120634/unnamed.jpg",
    coordinate: {
      latitude: 39.710579,
      longitude: -75.120261,
    },
  },
  {
    id: 2,
    username: "Parth",
    description: " sdf",
    coordinate: {
      latitude: 39.712906,
      longitude: -75.1219,
    },
  },
  {
    id: 3,
    username: "Chris",
    description: "sdf",
    coordinate: {
      latitude: 39.718964,
      longitude: -75.113555,
    },
  },
  {
    id: 4,
    username: "Oscar",
    description: "sdf ",
    coordinate: {
      latitude: 39.717518,
      longitude: -75.112928,
    },
  },
];
const renderMarkers = () => {
  const renderedMarkers = _.map(markerList, (marker) => {
    const { username, description, coordinate, id } = marker;

    return (
      <Marker
        key={id}
        title={username}
        description={description}
        coordinate={coordinate}
      />
    );
  });

  return renderedMarkers;
};
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={{ alignSelf: "stretch", height: "100%" }}
        region={myMarker}
        customMapStyle={mapStyle}
        showsUserLocation={false}
        showsCompass={false}
      >
        {renderMarkers()}
        <Marker coordinate={myMarker}>
          <Image
            source={require("./images/marker.png")}
            style={{ height: 35, width: 35 }}
          />
          {/* {image && (
            <Image source={{ uri: image }} style={{ width: 35, height: 35 }} />
          )} */}
        </Marker>
      </MapView>
      <View>{ModalOverlay()}</View>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
