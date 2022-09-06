import React, { useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/UI/PrimaryButton";
import Title from "../components/UI/Title";

const generateRandomBetween = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userChoice }) => {
  const initialGuess = generateRandomBetween(
    minBoundary,
    maxBoundary,
    userChoice
  );
  const [currentGuest, setCurrentGuest] = useState(initialGuess);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuest < userChoice) ||
      (direction === "greater" && currentGuest > userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuest;
    } else {
      minBoundary = currentGuest + 1;
    }
    console.log(minBoundary, maxBoundary);
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuest
    );

    if (currentGuest === userChoice) {
      Alert.alert("Game Over", "You won the game!", [
        { text: "Play again", onPress: () => {} },
      ]);
    }

    setCurrentGuest(newRndNumber);
  };

  return (
    <View style={styles.screen}>
      <View>
        <Title>Opponent's Guess</Title>
        <NumberContainer>{currentGuest}</NumberContainer>
      </View>
      <View>
        <Text>H or L</Text>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              -
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              +
            </PrimaryButton>
          </View>
        </View>
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 40,
    padding: 24,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});
