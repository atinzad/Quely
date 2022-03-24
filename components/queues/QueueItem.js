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
import {
  CardMargin,
  QueueEdit,
  QueueItemContainer,
  QueueTitle,
  QueueWaiting,
} from "../../styles";
import Swipeout from "react-native-swipeout";
import { TextInput } from "react-native-paper";

const QueueItem = ({ queue, navigation }) => {
  //

  let swipeBtns = [
    {
      component: (
        <Pressable
          style={styles.viewTest}
          onPress={() => {
            alert("hi");
          }}
        >
          <TextInput.Icon
            onPress={() => {
              alert("hi");
            }}
            size={35}
            color="white"
            name="trash-can-outline"
          />
        </Pressable>
      ),
      text: "Delete",
      backgroundColor: "#c06c5d",
      underlayColor: "white",
    },
  ];
  return (
    <CardMargin>
      <Swipeout
        right={swipeBtns}
        autoClose="true"
        backgroundColor="transparent"
      >
        <QueueItemContainer
          onPress={() => navigation.navigate("MemberList", { queue })}
        >
          <QueueTitle>{queue.name}</QueueTitle>
          <QueueWaiting>Waiting : 90</QueueWaiting>
          <QueueEdit>Edit</QueueEdit>
        </QueueItemContainer>
      </Swipeout>
    </CardMargin>
  );
};

export default QueueItem;

const styles = StyleSheet.create({
  viewTest: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});
