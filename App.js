import React, { useState, useEffect, Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import _ from "lodash";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen.js";

const Stack = createNativeStackNavigator();

const getIsSignedIn = () => {
  // custom logic
  return true;
};

export default App = () => {
  const isSignedIn = getIsSignedIn();
  return (
    <NavigationContainer>
      {/* screenOptions={{ headerShown: false }} */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
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
