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
import Icon from "react-native-vector-icons/Feather";
import PickImage from "./ImagePicker.js";

export default function ModalOverlay() {
  const [modalVisible, setModalVisible] = useState(false);
  const [plusVisible, setPlusVisible] = useState(true);
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
            onPlusPress();
          }}
          style={[styles.touchable, { display }]}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              // marginBottom: 15,
              // marginBottom: "40%",
            }}
          >
            <Text
              style={{
                fontSize: 35,
              }}
            >
              +
            </Text>
          </View>
        </TouchableOpacity>
        <View>
          <Modal
            // animationType="slide"
            transparent={true}
            visible={modalVisible}
            animationType="fade"
            onRequestClose={() => {
              // Alert.alert("Modal has been closed.");
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
                  <Text
                    style={{
                      fontSize: 30,
                    }}
                  >
                    x
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>

        {/* </Entypo.Button> */}
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
    // backgroundColor: "white",
    // borderWidth: 0.5,
    // borderRadius: 10,
  },
  touchableText: {
    fontSize: 24,
  },
  modalPlus: {
    width: 50,
    height: 140,
    // backgroundColor: "rgba( 50, 65, 96, 0.8)",
    backgroundColor: "#02c47d",
    // borderWidth: 2,
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
    // backgroundColor: "orange",
    backgroundColor: "#f0da37",
    width: 55,
    height: 55,
    borderRadius: 100,
    // marginRight: 100,
    marginTop: "85%",
    // justifyContent: "center",
    alignSelf: "center",

    borderWidth: 2,
    // marginBottom: "100%",
  },
  touchable: {
    // backgroundColor: "orange",
    backgroundColor: "#f0da37",
    width: 55,
    height: 55,
    borderRadius: 100,
    borderWidth: 2,
    // marginRight: "5%",
    // visibility: plusVisible ? "visible" : "hidden",
  },
});
