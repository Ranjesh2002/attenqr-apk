import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const Button = ({ children, onPress, variant = "default", style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, variant === "outline" && styles.outline, style]}
    >
      <Text style={[styles.text, variant === "outline" && styles.outlineText]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
  },
  text: {
    color: "#ffffff",
    fontWeight: "600",
  },
  outlineText: {
    color: "#007AFF",
  },
});
