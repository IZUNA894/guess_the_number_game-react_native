import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  Dimensions,
} from "react-native";
import MyButton from "../components/myButton";
import Card from "../components/card";
import Input from "../components/input";
import NumberContainer from "../components/numberContainer";
import Colors from "../constants/color";

export default function startGame(props) {
  let [num, setNum] = useState();
  let [input, setInput] = useState();
  let [confirmed, setConfirmed] = useState(false);
  let [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("window").width / 4
  );
  let number,
    msg = null;

  const handleInput = (val) => {
    setConfirmed(false);
    let num = val.replace(/[^0-9]/g, "");
    setInput(num);
    setNum(parseInt(num));
  };
  const handleReset = () => {
    setInput("");
    setNum("");
  };
  const handleConfirm = () => {
    if (isNaN(num) || num == undefined || num < 0 || num > 99) {
      Alert.alert("Invalid Number!", "Choose a number bw 0-99", [
        { text: "Okay", style: "destructive", onPress: handleReset },
      ]);
      return;
    }
    setConfirmed(true);
    number = num;
    setInput("");
    Keyboard.dismiss();
  };

  if (confirmed) {
    msg = (
      <Card style={styles.msg}>
        <Text> choosen Number is </Text>
        <NumberContainer>{num}</NumberContainer>
        <View style={{ ...styles.btnContainer, justifyContent: "center" }}>
          <MyButton onClick={() => props.setUserChoice(num)}>START</MyButton>
        </View>
      </Card>
    );
  }

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get("window").width / 4);
    };

    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <Text style={styles.title}>Start the Game</Text>
            <Card style={styles.inputContainer}>
              <Text style={styles.title}>Select a new Number</Text>
              <Input
                onChangeText={handleInput}
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                value={input}
              />
              <View style={styles.btnContainer}>
                <View style={{ width: buttonWidth }}>
                  <Button
                    onPress={handleReset}
                    title="RESET"
                    color={Colors.accent}
                  />
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button
                    onPress={handleConfirm}
                    title="CONFIRM"
                    color={Colors.primary}
                  />
                </View>
              </View>
            </Card>

            {msg}
          </View>
        </TouchableWithoutFeedback>
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
  title: {
    fontFamily: "openSansBold",
    color: "black",
    fontSize: 20,
    marginVertical: 10,
  },
  input: {
    width: 50,
  },
  inputContainer: {
    width: "87%",
    maxWidth: "90%",
    minWidth: "85%",
  },
  btnContainer: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  btn: {
    width: 90,
  },
  msg: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
    marginTop: 10,
  },
});
