import React, { useState, useEffect, Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import _ from "lodash";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import SignInScreen from "./SignInScreen";
import FriendsScreen from "./FriendsScreen";
import SearchScreen from "./searchBar";
const Stack = createNativeStackNavigator();

export default App = () => {
  return (
    <NavigationContainer>
      {/* screenOptions={{ headerShown: false }} */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          {/* <Stack.Screen name="Friends" component={FriendsScreen} /> */}
          {/* <Stack.Screen name="Search" component={SearchScreen} /> */}
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
