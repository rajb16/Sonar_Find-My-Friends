import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import FriendsScreen from "./FriendsScreen";
import SearchScreen from "./searchBar";
const Stack = createNativeStackNavigator();

export default App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Friends" component={FriendsScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
