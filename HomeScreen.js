import * as Location from "expo-location";
import mapStyle from "./mapStyle1.json";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import { View, StyleSheet, Image, Text, Button } from "react-native";
import React, { useState, useEffect, Component } from "react";
import _ from "lodash";
import PickImage from "./ImagePicker.js";
/**
 *  Temp list containing the ID, location coordinates, and
 *  username of a user
 */
markerList = [
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
let tempLat = 0;
let tempLong = 0;
export default function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [lat, setLatitude] = useState(0);
  const [long, setLongitude] = useState(0);
  const [time, setTime] = useState(Date.now());
  const getPermissions = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log("Permission status: ", status);
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if (
        location.coords.latitude !== null &&
        location.coords.longitude !== null
      ) {
        console.log("Current Location Stored");
        setLatitude(location.coords.latitude);

        setLongitude(location.coords.longitude);

        setLocation(location);
      }
    } catch (e) {
      console.log("Unable to get location", e);
    }
  };
  useEffect(() => {
    const MINUTE_MS = 1000;
    const interval = setInterval(() => {
      getPermissions();
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, []);
  let text = "Waiting..";
  if (errorMsg) {
    console.log(errorMsg);
    text = errorMsg;
  }
  if (location) {
    text = JSON.stringify(location);
  }
  if (+tempLong.toFixed(4) !== +long.toFixed(4)) {
    tempLong = long;
    console.log("Adjusting Longitude to: ", tempLong);
  }
  if (+tempLat.toFixed(4) !== +lat.toFixed(4)) {
    tempLat = lat;
    console.log("Adjusting Latitude to: ", tempLat);
  }

  const myMarker = {
    latitude: tempLat,
    longitude: tempLong,
    latitudeDelta: 0.04,
    longitudeDelta: 0.04,
  };
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
        </Marker>
      </MapView>
      {PickImage()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonCallout: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    borderWidth: 0.5,
    borderRadius: 20,
  },
});
