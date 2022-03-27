import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import React from "react";
import authStore from "./stores/authStore";

const SignOutBt = ({ navigation }) => {
  return (
    <MaterialIcons
      name="logout"
      size={30}
      marginRight={10}
      color="#3f93a2"
      onPress={() => authStore.signout(navigation)}
    />
  );
};

export default SignOutBt;

const styles = StyleSheet.create({});
