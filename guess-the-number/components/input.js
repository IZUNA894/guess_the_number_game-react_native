import React from "react";
import { StyleSheet, TextInput } from "react-native";

function Input(props) {
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
}

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomWidth: 2,
    borderBottomColor: "grey",
    marginVertical: 10,
    textAlign: "center",
  },
});

// export { Input };
export default Input;
