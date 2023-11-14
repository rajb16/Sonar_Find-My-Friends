import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { getPendingRequests, getFriends, acceptFriendRequest, declineFriendRequest, removeFriend } from './friendFunctions';
import { SafeAreaView } from 'react-native-safe-area-context';

const FriendsScreen = ({ route }) => {
  const [currentUser, setCurrentUser] = useState(route.params.user);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    loadFriendsData();
  }, []);

  const loadFriendsData = async () => {
    const pendingRequestsData = await getPendingRequests(currentUser.uid);
    const friendsData = await getFriends(currentUser.uid);

    setPendingRequests(pendingRequestsData);
    setFriends(friendsData);
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
        <Text>{item.name}</Text>
        {item.isFriend && (
          <Button title="Remove Friend" onPress={() => handleRemoveFriend(item.userId)} />
        )}
        {item.isPending && (
          <>
            <Button title="Accept" onPress={() => handleAcceptRequest(item.userId)} />
            <Button title="Decline" onPress={() => handleDeclineRequest(item.userId)} />
          </>
        )}
      </View>
    </SafeAreaView>
  );

  return (
    <SafeAreaView>
      <View>
        {!!pendingRequests.length && (
          <>
            <Text>Pending Requests:</Text>
            <FlatList
              data={pendingRequests.map(request => ({ ...request, isPending: true }))}
              renderItem={renderItem}
              keyExtractor={(item) => item.email}
            />
          </>
        )}

        {!!friends.length && (
          <>
            <Text>Friends:</Text>
            <FlatList
              data={friends.map(friend => ({ ...friend, isFriend: true }))}
              renderItem={renderItem}
              keyExtractor={(item) => item.email}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default FriendsScreen;
