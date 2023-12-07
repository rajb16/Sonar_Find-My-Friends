import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { Callout } from "react-native-maps";
import Entypo from "react-native-vector-icons/Entypo";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import PickImage from "./ImagePicker.js";
import { useNavigation } from "@react-navigation/native";

export default function ModalOverlay() {
  const [modalVisible, setModalVisible] = useState(false);
  const [plusVisible, setPlusVisible] = useState(true);
  const navigation = useNavigation();

  const onFriendsListPress = () => {
    navigation.navigate("Friends");
  };

  const onPlusPress = () => {
    setModalVisible(true);
    setPlusVisible(false);
  };

  const display = plusVisible ? "flex" : "none";
  return (
    <Callout style={styles.buttonCallout}>
      <View>
        <TouchableOpacity
          onPress={() => {
            onFriendsListPress();
          }}
          style={[styles.touchableFriends, { display }]}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon
              name="user-friends"
              size={20}
              color="#000000"
            />

          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onPlusPress();
          }}
          style={[styles.touchable, { display }]}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Entypo
              name="plus"
              size={35}
              color="#000000"
            />
          </View>
        </TouchableOpacity>

        <View>
          <Modal
            transparent={true}
            visible={modalVisible}
            animationType="fade"
            onRequestClose={() => {
              setModalVisible(!modalVisible);
              setPlusVisible(!plusVisible);
            }}
            onBackdropPress={() => {
              setModalVisible(!modalVisible);
              setPlusVisible(!plusVisible);
            }}
          >
            <View style={styles.modalPlus}>
              <View style={{ marginTop: "100%" }}>{PickImage()}</View>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  setPlusVisible(!plusVisible);
                }}
                style={styles.modalX}
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MaterialIcons
                    name="close"
                    size={35}
                    color="#000000"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
    </Callout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonCallout: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    bottom: "0%",
    right: "5%",
    marginBottom: "15%",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  touchableText: {
    fontSize: 24,
  },
  modalPlus: {
    width: 50,
    height: 140,
    backgroundColor: "#02c47d",
    marginLeft: "84%",

    marginTop: "127%",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
  modalX: {
    backgroundColor: "#f0da37",
    width: 55,
    height: 55,
    borderRadius: 100,
    marginTop: "85%",
    alignSelf: "center",

    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,

    justifyContent: "center",
  },
  touchable: {
    backgroundColor: "#f0da37",
    width: 55,
    height: 55,
    borderRadius: 100,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
    justifyContent: "center",
  },
  touchableFriends: {
    backgroundColor: "#f0da37",
    width: 55,
    height: 55,
    borderRadius: 100,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
    justifyContent: "center",
  },
});
