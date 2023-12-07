import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH, FIREBASE_DB } from "./firebaseConfig.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "@firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";

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
      alert(error.message); 
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
      <Text style={styles.title}>Find My Friend</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCompleteType="on"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />
      <View style={styles.buttons}>
        <Button title="Sign-In" onPress={signIn} />
        <Button title="Sign-Up" onPress={createAccount} />
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
