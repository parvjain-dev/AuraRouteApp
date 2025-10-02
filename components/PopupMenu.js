// components/PopupMenu.js

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";

export const PopupMenu = ({ onClose, onAction }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={true}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalBackground}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => onAction("loop", 5000)}
          >
            <Text style={styles.menuText}>Create 5km Aura Loop</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => onAction("loop", 10000)}
          >
            <Text style={styles.menuText}>Create 10km Aura Loop</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => onAction("a_to_b")}
          >
            <Text style={styles.menuText}>Set as Start Point (A-to-B)</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  menuContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    width: "70%",
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuText: {
    fontSize: 16,
    color: "#007BFF",
    textAlign: "center",
  },
});
