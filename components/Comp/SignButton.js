import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

const SignButton = (props) => {
  // let [fontsLoaded] = useFonts({
  //   "Quicksand-Bold": require("../../assets/fonts/Quicksand-Bold.tff"),
  //   "Quicksand-SemiBold": require("../../assets/fonts/Quicksand-SemiBold.ttf"),
  // });
  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }
  return (
    <TouchableOpacity onPress={() => props.click()}>
      <View style={styles.button}>
        <Text style={styles.text}>{props.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SignButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 70,
    alignItems: "center",
    backgroundColor: "#3F93A2",
    borderRadius: 18,
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    /* identical to box height */
    color: "#FFFFFF",
  },
});
