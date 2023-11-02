import * as Location from "expo-location";
import { useState, useEffect } from "react";
// import _ from "lodash";
let currentlat = 1;
let currentLong = 1;
let myMarker = {
  latitude: currentlat,
  longitude: currentLong,
  latitudeDelta: 0.04,
  longitudeDelta: 0.04,
};
export default function askLocation() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [lat, setLatitude] = useState(0);
  const [long, setLongitude] = useState(0);
  const [time, setTime] = useState(Date.now());
  const getPermissions = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      // console.log("Permission status: ", status);
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Lowest,
      });
      if (
        location.coords.latitude !== null &&
        location.coords.longitude !== null
      ) {
        // console.log("Current Location Stored");
        setLatitude(location.coords.latitude);

        setLongitude(location.coords.longitude);

        setLocation(location);
      }
    } catch (e) {
      console.log("Unable to get location", e);
    }
  };
  useEffect(() => {
    const MINUTE_MS = 2000;
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
  if (+currentLong.toFixed(4) !== +long.toFixed(4)) {
    currentLong = long;
    console.log("Adjusting Longitude to: ", currentLong);
  }
  if (+currentlat.toFixed(4) !== +lat.toFixed(4)) {
    currentlat = lat;
    console.log("Adjusting Latitude to: ", currentlat);
  }
  myMarker = {
    latitude: currentlat,
    longitude: currentLong,
    latitudeDelta: 0.04,
    longitudeDelta: 0.04,
  };
}

export { myMarker };
