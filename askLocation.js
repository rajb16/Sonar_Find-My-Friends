import * as Location from "expo-location";
import { useState, useEffect } from "react";

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
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if (
        location.coords.latitude !== null &&
        location.coords.longitude !== null
      ) {
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
  if (+currentLong.toFixed(3) !== +long.toFixed(3)) {
    currentLong = long;
    console.log("Adjusting Longitude to: ", currentLong);
  }
  if (+currentlat.toFixed(3) !== +lat.toFixed(3)) {
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
