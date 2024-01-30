import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB } from "./firebaseConfig.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
  setPersistence,
  browserSessionPersistence,
  Persistence,
  onAuthStateChanged,
  browserLocalPersistence,
} from "@firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";

const localIcons = {
  user: require("./assets/gg_profile.png"),
  password: require("./assets/password.png"),
  apple: require("./assets/apple.png"),
  google: require("./assets/Google.png"),
  facebook: require("./assets/facebook.png"),
  logo: require("./assets/logo-crop.gif"),
};

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(FIREBASE_APP);
  useEffect(() => {
    let subscriber = onAuthStateChanged(auth, (user) => {
      console.log(auth.currentUser); //returns null now
      if (user) {
        navigation.navigate("Home");
      }
    });
    return subscriber;
  }, []);
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

  const [fontsLoaded, fontError] = useFonts({
    Poppins: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        style={styles.screen}
        colors={["#2e82f7", "#0068f9", "#043b87"]}
      >
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 45,
                color: "white",
                fontFamily: "Poppins",
                // marginTop: "3%",
              }}
            >
              Sonar
            </Text>
            <View style={{ marginTop: ".8%" }}>
              <Image
                source={localIcons.logo}
                style={{ height: 34, width: 34, marginLeft: 6 }}
              />
            </View>
          </View>

          <View style={styles.inputView}>
            <Image source={localIcons.user} />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
              autoComplete="email"
              // autoCorrect={true}
            ></TextInput>
          </View>
          <View style={styles.inputView}>
            <Image source={localIcons.password} />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry={true}
              // autoComplete="on"
              autoComplete="password"
            />
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={createAccount}
              style={styles.loginButton}
            >
              <Text style={styles.text}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: "10%",
              marginRight: "10%",
              marginTop: "-12%",
            }}
          >
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: "white",
              }}
            />
            <Text
              style={{
                fontFamily: "Poppins",
                fontSize: 12,
                color: "white",
                textAlign: "center",
                width: 50,
              }}
            >
              Or
            </Text>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: "white",
              }}
            />
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              marginTop: "5%",
            }}
          >
            <TouchableOpacity>
              <Image
                source={localIcons.facebook}
                style={{ height: 50, width: 50 }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 16 }}>
              <Image
                source={localIcons.google}
                style={{ height: 42, width: 42 }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 20 }}>
              <Image
                source={localIcons.apple}
                style={{ height: 38, width: 38 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", margin: "5%" }}>
            <Text
              style={{ fontFamily: "Poppins", fontSize: 14, color: "grey" }}
            >
              Don you have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontSize: 14,
                  color: "#01E9DB",
                  marginLeft: 5,
                }}
              >
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
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
    fontSize: 14,
    marginBottom: 30,
  },
  inputView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: "80%",
    borderRadius: 16,
    // borderWidth: 2,
    borderColor: "#000000",
    marginVertical: 10,
    padding: 15,
    margin: 10,
    backgroundColor: "#ffffff",
    fontFamily: "Poppins",
  },
  buttons: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  loginButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#30bfb5", // Example background color
    padding: 10,
    borderRadius: 16, // Rounded corners
    margin: 5,
    width: "30%",
    height: "40%",
  },
  text: {
    color: "white", // Example text color
    fontSize: 22,
    fontFamily: "Poppins",
  },
});
