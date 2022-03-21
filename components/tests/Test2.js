import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, VStack } from "native-base";
import testStore from "../../stores/testStore";
import TestItem from "./TestItem";

const Test2 = ({ navigation }) => {
  const handleSubmit = () => {
    navigation.navigate("TestA");
  };

  const tests = testStore.tests.map((test) => (
    <TestItem key={test._id} test={test} navigation={navigation} />
  ));
  return (
    <VStack style={styles.container}>
      <Text>This is Test2 component</Text>
      <Button colorScheme="green" onPress={handleSubmit}>
        navigate to Test1
      </Button>
      {tests}
    </VStack>
  );
};

export default Test2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
