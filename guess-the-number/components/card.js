import React from "react";
import { StyleSheet, View } from "react-native";

function Card(props) {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 8,
    backgroundColor: "white",
    padding: 20,
  },
});

export default Card;
