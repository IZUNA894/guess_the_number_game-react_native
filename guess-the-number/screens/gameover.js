import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import Card from "../components/card";
import MyButton from "../components/myButton";
import Colors from "../constants/color";
export default function gameover(props) {
  return (
    <View style={styles.screen}>
      <Text>Game Over</Text>

      <Card style={styles.card}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={require("../assets/success.png")} />
        </View>
        <Text>I guessed in {props.guessRounds} times</Text>
        <View style={styles.btnContainer}>
          <MyButton onClick={props.restart}>RESTART</MyButton>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  btnContainer: {
    marginTop: 5,
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  card: {
    width: 350,
    maxWidth: "90%",
    alignItems: "center",
    marginTop: 10,
  },
  imgContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 2,
    marginVertical: 10,
    overflow: "hidden",
  },
  img: {
    height: "100%",
    width: "100%",
  },
});
