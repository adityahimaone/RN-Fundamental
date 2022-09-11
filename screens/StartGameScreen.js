import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import PrimaryButton from "../components/UI/PrimaryButton";
import Colors from "../constants/colors";
import Title from "../components/UI/Title";
import Card from "../components/UI/Card";
import InstructionText from "../components/UI/InstructionText";
import { Ionicons } from "@expo/vector-icons";

const StartGameScreen = ({ onPickNumber }) => {
  const [enteredNumber, setEnteredNumber] = useState("");

  const { width, height } = useWindowDimensions();

  const numberInputHandler = (enteredText) => {
    setEnteredNumber(enteredText);
  };

  const resetInputHandler = () => {
    setEnteredNumber("");
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredNumber);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid number!", "Number has to be between 1 and 99.", [
        { text: "Cancel", style: "cancel" },
        { text: "Okay", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }
    onPickNumber(chosenNumber);
  };

  const marginTopDistance = height < 380 ? 30 : 100;

  return (
    <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
      <Title>Guess My Number</Title>
      <Card>
        <InstructionText>Input a number</InstructionText>
        <TextInput
          keyboardType="number-pad"
          maxLength={2}
          style={styles.numberInput}
          autoCapitalize="none"
          autoCorrect={false}
          value={enteredNumber}
          onChangeText={numberInputHandler}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={resetInputHandler}>
              Reset
              <Ionicons
                style={styles.icons}
                name="md-refresh"
                size={18}
                color="white"
              />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={confirmInputHandler}>
              Confirm
              <Ionicons
                style={styles.icons}
                name="md-checkmark"
                size={18}
                color="white"
              />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
};

export default StartGameScreen;

// const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    // marginTop: deviceHeight < 380 ? 30 : 100,
    alignItems: "center",
  },

  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  icons: {
    paddingLeft: 12,
  },
});
