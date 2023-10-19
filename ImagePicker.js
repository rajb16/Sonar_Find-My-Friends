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
import Entypo from "react-native-vector-icons/Entypo";

export default function PickImage() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      //   aspect: [16, 9],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <Callout>
      <View style={styles.buttonCallout}>
        <TouchableOpacity>
          <View style={{ paddingLeft: "10%", width: 55 }}>
            {/* <Text style={styles.touchableText}>📷</Text> */}
            <Entypo.Button
              name="camera"
              backgroundColor={"transparent"}
              onPress={pickImage}
              suppressHighlighting={false}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ paddingLeft: "20%", width: 50, size: 30 }}>
        <TouchableOpacity>
          <Text style={styles.touchableText}>👤</Text>
        </TouchableOpacity>
      </View>
    </Callout>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonCallout: {
    flex: 1,
    flexDirection: "column",
    position: "absolute",
    bottom: 40,
    // marginRight: "10%",
    // paddingLeft: 10,
    // justifyContent: "center",
    backgroundColor: "transparent",
    // borderWidth: 0.5,
    // borderRadius: 20,
  },
  touchableText: {
    fontSize: 24,
    color: "white",
  },
  callout: {},
});
