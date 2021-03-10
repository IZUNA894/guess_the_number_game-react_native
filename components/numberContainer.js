import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Color from "../constants/color";

function NumberContainer(props) {
  return (
    <View style={styles.container}>
      <Text>{props.children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: Color.accent,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    fontSize: 22,
    color: Color.accent,
  },
});

// export { NumberContainer };
export default NumberContainer;
