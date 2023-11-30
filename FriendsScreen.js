import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { getPendingRequests, getFriends, acceptFriendRequest, declineFriendRequest, removeFriend } from './friendFunctions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from 'react-native-screens';
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";

const FriendsScreen = () => {

  const auth = getAuth();
  const user = auth.currentUser;

  const navigation = useNavigation();
  const [currentUser, setCurrentUser] = useState(user);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    loadFriendsData();
  }, []);

  const loadFriendsData = async () => {
    const pendingRequestsData = await getPendingRequests(currentUser.uid);
    const friendsData = await getFriends(currentUser.uid);

    setPendingRequests(pendingRequestsData);
    setFriends(friendsData);
    setDataLoaded(true);
  };

  const handleAcceptRequest = async (senderId) => {
    await acceptFriendRequest(currentUser.uid, senderId);
    loadFriendsData();
  };

  const handleDeclineRequest = async (senderId) => {
    await declineFriendRequest(currentUser.uid, senderId);
    loadFriendsData();
  };

  const handleRemoveFriend = async (friendId) => {
    await removeFriend(currentUser.uid, friendId);
    loadFriendsData();
  };

  const renderItem = ({ item }) => (
    <SafeAreaView>
      <SearchBar />
      <View style={styles.listItem}>
        <Text style={styles.name}>{item.name}</Text>
        {item.isFriend && (
          <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveFriend(item.userId)}>
            <Text style={styles.removeButtonText}>Remove Friend</Text>
          </TouchableOpacity>
        )}
        {item.isPending && (
          <>
            <TouchableOpacity style={styles.acceptButton} onPress={() => handleAcceptRequest(item.userId)}>
              <Text style={styles.acceptButtonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.declineButton} onPress={() => handleDeclineRequest(item.userId)}>
              <Text style={styles.declineButtonText}>Decline</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {dataLoaded && !pendingRequests.length && !friends.length && (
          <Text>No friends or requests</Text>
        )}

        {!!pendingRequests.length && (
          <>
            <Text>Pending Requests:</Text>
            <FlatList
              data={pendingRequests.map((request) => ({ ...request, isPending: true }))}
              renderItem={renderItem}
              keyExtractor={(item) => item.email}
            />
          </>
        )}

        {!!friends.length && (
          <>
            <Text>Friends:</Text>
            <FlatList
              data={friends.map((friend) => ({ ...friend, isFriend: true }))}
              renderItem={renderItem}
              keyExtractor={(item) => item.email}
            />
          </>
        )}
        <TouchableOpacity style={styles.searchButton} onPress={() => navigation.navigate('Search', ({currentUser}))}>
          <Text style={styles.searchButtonText}>Search Friend</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
  },
  name: {
    flex: 1,
    marginRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  acceptButton: {
    backgroundColor: '#6d69c3',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptButtonText: {
    color: 'white',
  },
  declineButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  declineButtonText: {
    color: 'white',
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: 'white',
  },

  searchButton: {
    position: 'absolute',
    bottom: "0%",
    right: "5%",
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {
    color: 'white',
  },
});

export default FriendsScreen;
