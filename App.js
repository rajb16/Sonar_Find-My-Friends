import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import _ from "lodash";
import mapStyle from "./mapStyle1.json";

import * as Location from "expo-location";

/**
 *  Temp list containing the ID, location coordinates, and
 *  username of a user
 */
const markerList = [
  {
    id: 1,
    username: "Francis",
    description: " x",
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
const App = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [lat, setLatitude] = useState(0);
  const [long, setLongitude] = useState(0);
  console.log(lat);
  console.log(long);
  const myMarker = {
    latitude: lat,
    longitude: long,
    latitudeDelta: 0.04,
    longitudeDelta: 0.04,
  };
  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      if (
        location.coords.latitude !== null &&
        location.coords.longitude !== null
      ) {
        console.log(location.coords.latitude);
        console.log(location.coords.longitude);
        setLatitude(location.coords.latitude);
        // setLoc({ latitude: location.coords.latitude });
        setLongitude(location.coords.longitude);
        // setLoc({ longitude: location.coords.longitude });
      } else {
        console.log("Unable to get location");
      }

      setLocation(location);
    };
    getPermissions();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  console.log(text);

  console.log();
  console.log();

  return (
    <View style={styles.container}>
      <MapView
        style={{ alignSelf: "stretch", height: "100%" }}
        region={myMarker}
        // userInterfaceStyle={"dark"}
        customMapStyle={mapStyle}
        showsUserLocation={true}
      >
        {renderMarkers()}
        <Marker coordinate={myMarker}>
          <Image
            source={require("./images/marker.png")}
            style={{ height: 35, width: 35 }}
          />
        </Marker>
      </MapView>
    </View>
  );
};
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
