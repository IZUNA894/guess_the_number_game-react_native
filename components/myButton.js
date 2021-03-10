import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Touchable,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Colors from "../constants/color";

function MyButton(props) {
  let MyButton = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21)
    MyButton = TouchableNativeFeedback;
  return (
    <View style={styles.btnContainer}>
      <MyButton onPress={props.onClick} activeOpacity={0.6}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>{props.children}</Text>
        </View>
      </MyButton>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    overflow: "hidden",
    borderRadius: 25,
  },
  btn: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  btnText: {
    fontFamily: "openSans",
    fontSize: 15,
    color: "white",
  },
});

export default MyButton;
