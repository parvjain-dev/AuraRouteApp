// components/Loader.js
import React from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const Loader = ({ visible }) => {
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.animationContainer}>
          <LottieView
            source={require("../loader-animation.json")}
            autoPlay
            loop
            style={{ width: 100, height: 100 }}
          />
          <Text style={styles.text}>Calculating...</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  animationContainer: {
    backgroundColor: "#222222", // Dark background for the loader
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFFFFF",
    marginTop: 10,
  },
});

export default Loader;
