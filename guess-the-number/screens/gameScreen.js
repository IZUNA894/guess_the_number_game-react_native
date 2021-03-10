import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import Card from "../components/card";
import NumberContainer from "../components/numberContainer";
import MyButton from "../components/myButton";
import { Ionicons } from "@expo/vector-icons";

function randomNumber(min, max, exc) {
  let num = Math.floor(Math.random() * (max - min)) + min;
  if (exc && num == exc) randomNumber(min, max, exc);
  else return num;
}

export default function gameScreen(props) {
  let [num, setNum] = useState(randomNumber(0, 100, props.userChoice));
  let [windowHeight, setWindowHeight] = useState(
    Dimensions.get("window").height
  );
  let currentMax = useRef(100);
  let currentMin = useRef(1);

  const guessAgain = (dir) => {
    if (
      (dir === "lower" && num < props.userChoice) ||
      (dir === "greater" && num > props.userChoice)
    ) {
      Alert.alert("Lie!", "I know your number ", [
        { text: "Okay", style: "cancel" },
      ]);
      return;
    } else if (dir === "lower") {
      currentMax.current = num;
    } else if (dir === "greater") {
      currentMin.current = num + 1;
    } else {
      console.log("here in else");
    }

    num = randomNumber(currentMin.current, currentMax.current);
    console.log(num, currentMin.current, currentMax.current);
    setNum(num);
  };
  useEffect(() => {
    props.addGuesses(num);
    console.log(num, currentMin.current, currentMax.current);
    if (num == props.userChoice) {
      props.setGameOver(true);
      return;
    }
  }, [num]);

  let list =
    props.guesses.length != 0
      ? props.guesses.map((item, index) => {
          return (
            <View style={styles.listItem} key={index}>
              <Text
                style={{
                  ...styles.listItemText,
                  alignItems: "center",
                  justifyContent: "flex-start",
                  color: "#cccccc",
                }}
              >
                #{props.guesses.length - 1 - index}
              </Text>
              <Text
                style={{
                  ...styles.listItemText,
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                {item}
              </Text>
            </View>
          );
        })
      : null;
  useEffect(() => {
    const updateWindow = () => {
      setWindowHeight(Dimensions.get("window").height);
    };
    Dimensions.addEventListener("change", updateWindow);
    return () => {
      Dimensions.removeEventListener("change", updateWindow);
    };
  });

  if (windowHeight > 500)
    return (
      <ScrollView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
          <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{num}</NumberContainer>
            <Card style={styles.btnContainer}>
              <MyButton onClick={() => guessAgain("lower")}>
                <Ionicons name="md-remove" size={24} color="white" />
              </MyButton>
              <MyButton onClick={() => guessAgain("greater")}>
                <Ionicons name="md-add" size={24} />
              </MyButton>
            </Card>
            <Card style={styles.list}>
              <Text style={styles.title}>preveious guesses</Text>
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                {list}
              </ScrollView>
            </Card>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  else
    return (
      <ScrollView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
          <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <Card style={styles.btnContainerLS}>
              <MyButton onClick={() => guessAgain("lower")}>
                <Ionicons name="md-remove" size={24} color="white" />
              </MyButton>
              <NumberContainer>{num}</NumberContainer>

              <MyButton onClick={() => guessAgain("greater")}>
                <Ionicons name="md-add" size={24} />
              </MyButton>
            </Card>
            <Card style={styles.list}>
              <Text style={styles.title}>preveious guesses</Text>
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                {list}
              </ScrollView>
            </Card>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  btnContainer: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  btnContainerLS: {
    flexDirection: "row",
    width: "95%",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  listItem: {
    padding: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "rgb(228, 217, 255)",
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  list: {
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    flex: 1,
  },
  listItemText: {
    fontSize: 20,
  },
});
