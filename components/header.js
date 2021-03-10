import React from "react";
import { StyleSheet, View, Text, Platform } from "react-native";

function Header() {
  return (
    <View
      style={{
        ...styles.header,
        ...Platform.select({ ios: styles.headerIOS, android: styles.headerAD }),
      }}
    >
      <Text style={styles.title}>Guess the Number</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: Platform.OS === "android" ? "#f7287b" : "white",
    height: 90,
    paddingTop: 36,
    elevation: 10,
  },
  headerAD: {
    backgroundColor: "#f7287b",
  },
  headerIOS: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    color: "black",
    fontSize: 18,
  },
});
export default Header;
