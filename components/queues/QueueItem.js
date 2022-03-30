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
import memberStore from "../../stores/memberStore";
import MemberItem from "../members/MemberItem";
import { observer } from "mobx-react";
import queueStore from "../../stores/queueStore";

const QueueItem = ({ queue, navigation }) => {
  //

  const noOfMembers = memberStore.members.filter(
    (member) => member.queue === queue._id
  ).length;

  const noOfWaiting = memberStore.members
    .filter((member) => member.queue === queue._id)
    .filter((member) => member.waiting).length;

  let swipeBtns = [
    {
      component: (
        <Pressable style={styles.viewTest}>
          <TextInput.Icon
            onPress={() => {
              queueStore.deleteQueue(queue._id);
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
          <HStack space={8}>
            <QueueWaiting>Members : {noOfMembers}</QueueWaiting>
            <QueueWaiting style={{ color: "red" }}>
              Waiting : {noOfWaiting}
            </QueueWaiting>
            <QueueWaiting style={{ color: "green" }}>
              Served : {noOfMembers - noOfWaiting}
            </QueueWaiting>
          </HStack>
          <QueueEdit>View</QueueEdit>
        </QueueItemContainer>
      </Swipeout>
    </CardMargin>
  );
};

export default observer(QueueItem);

const styles = StyleSheet.create({
  viewTest: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});
