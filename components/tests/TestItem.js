import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { HStack } from "native-base";

const TestItem = ({ test, navigation }) => {
  return (
    <HStack>
      <Text>{test._id}</Text>
      <Text>{"   "}</Text>
      <Text>{test.testuser}</Text>
    </HStack>
  );
};

export default TestItem;

const styles = StyleSheet.create({});
