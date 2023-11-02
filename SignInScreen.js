import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  FIREBASE_AUTH,
  FIREBASE_APP,
  FIREBASE_PERSISTENT,
} from "./firebaseConfig.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  initializeAuth,
  getReactNativePersistence,
} from "@firebase/auth";
import { Alert } from "react-native";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
export default function SignInScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createAccount = async () => {
    try {
      await createUserWithEmailAndPassword(
        FIREBASE_PERSISTENT,
        email,
        password
      ).then((response) => {
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            navigation.navigate("Home", { user: data });
          })
          .catch((error) => {
            alert(error);
          });
      });

      console.log("User registered successfully");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Invalid email", "Please check your email and try again.", [
        {
          text: "OK",
          onPress: () => {
            setEmail("");
          },
        },
      ]);
      console.error(error.message);
    }
  };

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(FIREBASE_PERSISTENT, email, password);
      console.log("User registered successfully");
      navigation.navigate("Home");
    } catch (error) {
      console.error(error.message);
      Alert.alert(
        "Incorrect username or password",
        "Please check your email and password and try again.",
        [
          {
            text: "OK",
            onPress: () => {
              setEmail("");
              setPassword("");
            },
          },
        ]
      );
    }
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Find My Friend</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCompleteType="off"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />
      <View style={styles.buttons}>
        <Button title="signin" onPress={signIn} />
        <Button title="Create" onPress={createAccount} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 21,
    marginBottom: 30,
  },
  input: {
    width: 300,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#6d69c3",
    marginVertical: 10,
    padding: 15,
  },
  buttons: {
    width: 150,
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
