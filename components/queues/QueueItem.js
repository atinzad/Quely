import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { HStack, VStack } from "native-base";

const QueueItem = ({ queue, navigation }) => {
  //
  return (
    <Pressable
      style={styles.button}
      onPress={() => navigation.navigate("MemberList", { queue })}
    >
      <VStack style={styles.container}>
        <Text style={styles.title}>{queue.name}</Text>
      </VStack>
    </Pressable>
  );
};

export default QueueItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width,
    paddingBottom: 40,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
    marginTop: 20,
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  image: {
    width: "100%",
    height: 200,
    position: "relative",
    borderRadius: 20,
  },
  shadow: {
    position: "absolute",
    width: "100%",
    height: 200,
    backgroundColor: "rgba(0, 0, 0, 0.450)",
    bottom: 10,
    zIndex: 1,
    borderRadius: 20,
  },
  title: {
    position: "absolute",
    color: "black",
    fontSize: 25,
    zIndex: 2,
    fontWeight: "bold",
  },
});
