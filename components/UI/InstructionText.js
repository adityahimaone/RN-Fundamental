import { StyleSheet, Text } from "react-native";
import React from "react";
import Colors from "../../constants/colors";

const InstructionText = ({ children, style }) => {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
};

export default InstructionText;

const styles = StyleSheet.create({
  instructionText: {
    color: Colors.accent500,
    fontSize: 24,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    textShadowColor: "#000",
  },
});
