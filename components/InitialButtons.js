// components/InitialButtons.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const InitialButtons = ({ onPlanLoop, onPlanPointToPoint }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPlanLoop}>
        <Text style={styles.buttonText}>Find a Loop</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPlanPointToPoint}>
        <Text style={styles.buttonText}>Plan Point-to-Point</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 40,
    left: "10%",
    right: "10%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default InitialButtons;
