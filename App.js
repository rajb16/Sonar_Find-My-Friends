import React, { useState, useEffect, Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import _ from "lodash";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import SignInScreen from "./SignInScreen";
import askLocation, { myMarker } from "./askLocation";
const Stack = createNativeStackNavigator();

export default App = () => {
  {
    askLocation();
  }
  return (
    <NavigationContainer>
      {/* screenOptions={{ headerShown: false }} */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
