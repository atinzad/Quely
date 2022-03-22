import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

const SigninButton = (props) => {
  let [fontsLoaded] = useFonts({
    "Quicksand-Bold": require("../../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-SemiBold": require("../../assets/fonts/Quicksand-SemiBold.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <TouchableOpacity onPress={() => props.click()}>
      <View style={styles.button}>
        <Text style={styles.text}>{props.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SigninButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: "39%",
    alignItems: "center",
    backgroundColor: "#3F93A2",
    borderRadius: 18,
    justifyContent: "center",
  },
  text: {
    fontFamily: "Quicksand-Bold",
    fontSize: 24,
    /* identical to box height */
    color: "#FFFFFF",
  },
});
