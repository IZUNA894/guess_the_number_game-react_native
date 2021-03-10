import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";

import Header from "./components/header.js";
import StartGame from "./screens/startGame";
import GameScreen from "./screens/gameScreen";
import GameOver from "./screens/gameover";

const fetchFont = () => {
  return Font.loadAsync({
    openSans: require("./assets/fonts/OpenSans-Regular.ttf"),
    openSansBold: require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};
export default function App() {
  let [number, setNumber] = useState();
  let [guesses, setGuesses] = useState([]);
  let [loaded, setLoaded] = useState(false);
  let [gameover, setGameover] = useState(false);
  let content = null;

  if (!loaded) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onFinish={() => setLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  const handleRestart = () => {
    setGameover(false);
    setGuesses([]);
  };
  const addGuesses = (item) => {
    setGuesses((guesses) => [item, ...guesses]);
  };
  const handleGameover = () => {
    setGameover(true);
    setNumber(0);
  };

  if (number) {
    content = (
      <GameScreen
        userChoice={number}
        guesses={guesses}
        addGuesses={addGuesses}
        setGameOver={handleGameover}
      />
    );
  } else if (gameover) {
    content = <GameOver restart={handleRestart} guessRounds={guesses.length} />;
  } else {
    content = <StartGame setUserChoice={setNumber} />;
  }
  return (
    // for taking care of notch and task bar in ios...safeAreaView is used
    <SafeAreaView style={styles.container}>
      <Header />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
