import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

const Test1 = () => {
  const navigation = useNavigation();

  const handleSubmit = () => {
    navigation.navigate("TestB");
  };
  return (
    <VStack style={styles.container}>
      <Text>This is Test1 component</Text>
      <Button colorScheme="green" onPress={handleSubmit}>
        navigate to Test2
      </Button>
    </VStack>
  );
};

export default Test1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
