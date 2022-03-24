import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { CheckIcon, HStack, VStack } from "native-base";
import {
  CardMargin,
  MemberCardLeft,
  MemberCardMiddle,
  MemberCardNotificationBtn,
  MemberCardNumber,
  MemberCardServedBtn,
  MemberHstack,
  MemberItemContainer,
  QueueEdit,
  QueueItemContainer,
  QueueTitle,
  QueueWaiting,
} from "../../styles";
import { TextInput } from "react-native-paper";
import Swipeout from "react-native-swipeout";

const MemberItem = ({ index, member, navigation }) => {
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
        <MemberItemContainer onPress={() => console.log("this is a memeber")}>
          <MemberHstack>
            <MemberCardLeft>
              <MemberCardNumber>#{index + 1}</MemberCardNumber>
            </MemberCardLeft>
            <MemberCardMiddle>
              <QueueTitle>{member.email}</QueueTitle>
              <QueueWaiting>Field1 : FieldData1</QueueWaiting>
            </MemberCardMiddle>
            <MemberCardNotificationBtn>
              <TextInput.Icon
                onPress={() => {
                  alert("hi");
                }}
                size={35}
                color="#3f93a2"
                name="bell"
              />
            </MemberCardNotificationBtn>
            <MemberCardServedBtn>
              <CheckIcon size="7" color="white" />
            </MemberCardServedBtn>
          </MemberHstack>
        </MemberItemContainer>
      </Swipeout>
    </CardMargin>
  );
};

export default MemberItem;

const styles = StyleSheet.create({
  viewTest: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});
