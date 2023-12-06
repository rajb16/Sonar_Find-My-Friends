// SearchScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { searchUsers, sendFriendRequest } from "./friendFunctions";
import { useNavigation } from "@react-navigation/native";
import { Alert } from 'react-native';


const SearchScreen = ({ route }) => {
  const navigation = useNavigation();
  const [currentUser, setCurrentUser] = useState(route.params);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    const results = await searchUsers(searchTerm);
    setSearchResults(results);
  };

  const handleAddFriend = async (userId) => {
    if (userId) {
      await sendFriendRequest(userId, currentUser.currentUser.uid);
      Alert.alert(
        'Success',
        'Friend request sent!',
        [
          {
            text: 'OK',
          },
        ],
        { cancelable: false }
      );
      console.log("Friend request sent successfully!");
    } else {
      console.error("User ID is undefined. Cannot send friend request.");
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.name}>{item.name}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleAddFriend(item.userId)}
      >
        {console.log(item.userId)}
        <Text>Add Friend</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={{ flex: 1 }}> */}

      {/* </View> */}
      <View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>ᐊ</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name"
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        {searchResults.length > 0 && (
          <FlatList
            data={searchResults}
            renderItem={renderItem}
            keyExtractor={(item) => item.userId}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#3697e7",
  },
  searchInput: {
    height: "100%",
    width: "65%",
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: "white",
  },
  searchButton: {
    // position: "absolute",
    // marginRight: 5,
    backgroundColor: "#3e0781",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  searchButtonText: {
    color: "white",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 2,
  },
  name: {
    flex: 1,
    marginRight: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#6d69c3",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "white",
  },
  backButton: {
    width: 55,
    height: 55,

    justifyContent: "center",
  },
  backButtonText: {
    color: "#f0da37",
    // alignSelf: "center",
    fontSize: 30,
    // marginRight: "10%",
  },
});

export default SearchScreen;
