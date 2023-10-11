import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Callout } from "react-native-maps";

export default function PickImage() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <Callout style={styles.buttonCallout}>
      <TouchableOpacity
        style={[styles.touchable]}
        //   onPress={() => console.log("press")}
        onPress={pickImage}
      >
        <Text style={styles.touchableText}>Press me</Text>
      </TouchableOpacity>
    </Callout>
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
  touchableText: {
    fontSize: 24,
  },
});
