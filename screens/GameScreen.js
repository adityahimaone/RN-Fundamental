import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import NumberContainer from "../components/game/NumberContainer";
import Title from "../components/UI/Title";

const generateRandomBetween = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = ({ userChoice }) => {
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuest, setCurrentGuest] = useState(initialGuess);

  return (
    <View style={styles.screen}>
      <View>
        <Title>Opponent's Guess</Title>
        <NumberContainer>{currentGuest}</NumberContainer>
      </View>
      <View>
        <Text>H or L</Text>
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
});
