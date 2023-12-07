import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH, FIREBASE_APP, FIREBASE_DB } from "./firebaseConfig.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "@firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
const localIcons = {
  logo: require("./images/logo.gif"),
};

export default function SignInScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createAccount = async () => {
    try {
      const response = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );

      const user = response.user;

      const emailParts = email.split("@");
      const name = emailParts[0];

      const usersRef = collection(FIREBASE_DB, "users");
      const userDoc = doc(usersRef, user.uid);

      await setDoc(userDoc, {
        name,
        email,
      });

      console.log("User registered successfully");
      navigation.navigate("Home", { user });
    } catch (error) {
      console.error(error.message);
      alert(error.message); // You might want to display the error to the user
    }
  };

  const signIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );

      if (response && response.user) {
        const user = response.user;
        console.log("User signed in successfully");
        // navigation.navigate("Friends", { user: JSON.stringify(user) });
        // navigation.navigate("Search", { user });
        navigation.navigate("Home", { user: JSON.stringify(user) });
      } else {
        console.error("Failed to sign in. Response or user is undefined.");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={styles.screen}>
      <Image source={localIcons.logo} style={{ height: 150, width: 150 }} />
      <Text style={{ fontSize: 45 }}>SONAR</Text>
      <Text style={styles.title}>Find My Friends</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="E-mail"
        keyboardType="email-address"
        autoComplete="email"
        // autoCorrect={true}
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
        // autoComplete="on"
        autoComplete="password"
      />
      <View style={styles.buttons}>
        <Button title="Sign-In" onPress={signIn} color="#02c47d" />
        <Button title="Sign-Up" onPress={createAccount} color="#02c47d" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00bfff",
  },
  title: {
    fontSize: 14,
    marginBottom: 30,
  },
  input: {
    width: 300,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#000000",
    marginVertical: 10,
    padding: 15,
    backgroundColor: "#ffffff",
  },
  buttons: {
    width: 150,
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    // backgroundColor: "#000000",
  },
});
