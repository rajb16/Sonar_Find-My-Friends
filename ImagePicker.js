import React, { useState, useEffect, Component } from "react";

import {
  View,
  StyleSheet,
  Image,
  Text,
  Button,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Callout } from "react-native-maps";
import Entypo from "react-native-vector-icons/Entypo";
// import { storage } from "./firebaseConfig";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { FIREBASE_DB, storage, FIREBASE_AUTH } from "./firebaseConfig.js";
import { Video } from "expo-av";
import { UploadingAndroid } from "./components/UploadingAndroid.js";
import { myMarker } from "./askLocation.js";

export default function PickImage() {
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(FIREBASE_DB, "files"),
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            // console.log("New file", change.doc.data());
            setFiles((prevFiles) => [...prevFiles, change.doc.data()]);
          }
        });
      }
    );
    return () => unsubscribe();
  }, []);

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [3, 4],
      // quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // upload the image
      await uploadImage(result.assets[0].uri, "image");
    }
  }

  async function pickVideo() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await uploadImage(result.assets[0].uri, "video");
    }
  }

  async function uploadImage(uri, fileType) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, "Images/" + new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // listen for events
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(progress.toFixed());
      },
      (error) => {
        // handle error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at: ", downloadURL);
          // save record
          await saveRecord(fileType, downloadURL, new Date().toISOString(), myMarker.latitude, myMarker.longitude);
          setImage("");
          setVideo("");
        });
      }
    );
  }

  async function saveRecord(fileType, url, createdAt, lat, long) {
    try {
      const filesCollection = collection(FIREBASE_DB, "files");
      const userID = FIREBASE_AUTH.currentUser.uid;
      const userFilesCollection = collection(filesCollection, userID, "userFiles");
  
      const docRef = await addDoc(userFilesCollection, {
        fileType,
        url,
        createdAt,
        lat,
        long,
      });
  
      console.log("Document saved correctly: ", docRef.id);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Callout>
      <View style={styles.buttonCallout}>
        <TouchableOpacity>
          <View style={{ paddingLeft: "10%", width: 55 }}>
            {/* 
            <Entypo.Button
              name="camera"
              backgroundColor={"transparent"}
              onPress={pickImage}
              suppressHighlighting={false}
            /> */}
            <View style={styles.container}>
              <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
                <Text style={styles.touchableText}>📷</Text>
              </TouchableOpacity>
              <View style={styles.imageContainer}>
                {image && (
                  <Image
                    source={{ uri: image }}
                    style={{ width: 300, height: 300 }}
                  />
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.searchButton}>
        <TouchableOpacity onPress={pickVideo}>
          <Text style={styles.touchableText}>🎥</Text>
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
  cameraButton: {
    marginLeft: "10%",
  },
  searchButton: { paddingLeft: "20%", width: 50, size: 30 },
});
