import { StyleSheet, Text, View } from "react-native";
import React from "react";

const MemberList = ({ queue }) => {
  return (
    <View>
      <Text>MemberList</Text>
    </View>
  );
};

export default MemberList;

const styles = StyleSheet.create({
  container: {
    flex: 8,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "flex-start",
  },
  icon: {
    top: "1%",
    left: "42%",
  },
  iconContainer: {
    flex: 1,
  },
});
