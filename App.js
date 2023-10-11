import React, { useState, useEffect, Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import _ from "lodash";
import mapStyle from "./mapStyle1.json";
import { NavigationContainer } from "@react-navigation/native";
import * as Location from "expo-location";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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

const Stack = createNativeStackNavigator();
const getIsSignedIn = () => {
  // custom logic
  return true;
};
export default App = () => {
  const isSignedIn = getIsSignedIn();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

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
const HomeScreen = () => {
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
        // console.log(location.coords.latitude);
        // console.log(location.coords.longitude);
        console.log("Current Location Stored");
        setLatitude(location.coords.latitude);

        setLongitude(location.coords.longitude);

        // await delay(6000);
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
    </View>
  );
};

function ProfileScreen() {
  return <View />;
}

function SettingsScreen() {
  return <View />;
}

function SignInScreen() {
  return <View />;
}

function SignUpScreen() {
  return <View />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
