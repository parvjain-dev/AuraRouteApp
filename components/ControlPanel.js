// components/ControlPanel.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
} from "react-native";
import Slider from "@react-native-community/slider";

const ControlPanel = ({
  visible,
  onClose,
  mode,
  onModeChange,
  distance,
  onDistanceChange,
  auras,
  onAuraChange,
  onFindRoute,
  findButtonDisabled,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalBackground}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity activeOpacity={1} style={styles.container}>
          {/* Your UI code is here */}
          <View style={styles.modeContainer}>
            <TouchableOpacity
              style={[
                styles.modeButton,
                mode === "a_to_b" && styles.activeButton,
              ]}
              onPress={() => onModeChange("a_to_b")}
            >
              <Text style={styles.modeButtonText}>A to B</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modeButton,
                mode === "loop" && styles.activeButton,
              ]}
              onPress={() => onModeChange("loop")}
            >
              <Text style={styles.modeButtonText}>Loop</Text>
            </TouchableOpacity>
          </View>
          {mode === "loop" && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Distance (km)</Text>
              <TextInput
                style={styles.input}
                value={distance}
                onChangeText={onDistanceChange}
                keyboardType="numeric"
              />
            </View>
          )}
          <View style={styles.sliderContainer}>
            <Text style={styles.label}>🌿 Greenery</Text>
            <Slider
              style={styles.slider}
              value={auras.greenery}
              onValueChange={(value) => onAuraChange("greenery", value)}
            />
          </View>
          <View style={styles.sliderContainer}>
            <Text style={styles.label}>🤫 Tranquility</Text>
            <Slider
              style={styles.slider}
              value={auras.tranquility}
              onValueChange={(value) => onAuraChange("tranquility", value)}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.findButton,
              findButtonDisabled && styles.disabledButton,
            ]}
            onPress={onFindRoute}
            disabled={findButtonDisabled}
          >
            <Text style={styles.findButtonText}>Find AuraRoute</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    backgroundColor: "rgba(34, 34, 34, 0.9)",
    marginHorizontal: 10,
    marginBottom: 40,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  modeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  modeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#444",
  },
  activeButton: { backgroundColor: "#007BFF" },
  modeButtonText: { color: "white", fontWeight: "bold" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#333",
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  label: { color: "#ccc", fontSize: 16, flex: 1 },
  input: {
    color: "white",
    paddingVertical: 10,
    width: 70,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  sliderContainer: { marginVertical: 8 },
  slider: { width: "100%", height: 40 },
  findButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 15,
  },
  disabledButton: { backgroundColor: "#555" },
  findButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});

export default ControlPanel;
