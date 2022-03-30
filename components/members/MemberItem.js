import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import {
  ArrowBackIcon,
  CheckIcon,
  CloseIcon,
  HStack,
  VStack,
} from "native-base";
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
import memberStore from "../../stores/memberStore";
import { observer } from "mobx-react";

const MemberItem = ({ index, queue, member, navigation }) => {
  //
  let swipeBtns = [
    {
      component: (
        <Pressable style={styles.viewTest}>
          <TextInput.Icon
            size={35}
            color="white"
            name="trash-can-outline"
            onPress={() => {
              memberStore.deleteMember(member._id);
            }}
          />
        </Pressable>
      ),
      text: "Delete",
      backgroundColor: "#c06c5d",
      underlayColor: "white",
    },
  ];

  const handleEmail = () => {
    memberStore.sendEmailtoMember(queue, member);
    alert(
      `Member ${member._id.substring(member._id.length - 4)} has been notified`
    );
  };

  const handleServeMember = () => {
    memberStore.serveMember(member._id);
  };

  const handleWaitMember = () => {
    memberStore.waitMember(member._id);
  };

  return (
    <CardMargin>
      <Swipeout
        right={swipeBtns}
        autoClose="true"
        backgroundColor="transparent"
      >
        <MemberItemContainer
          onPress={() =>
            navigation.navigate("MemberDetails", { member: member })
          }
        >
          <MemberHstack>
            <MemberCardLeft>
              <MemberCardNumber>#{index + 1}</MemberCardNumber>
            </MemberCardLeft>
            <MemberCardMiddle>
              <QueueTitle>{member.email}</QueueTitle>
              <QueueWaiting>Field1 : FieldData1</QueueWaiting>
            </MemberCardMiddle>
            <MemberCardNotificationBtn>
              {member.waiting && (
                <TextInput.Icon
                  onPress={() => {
                    handleEmail();
                  }}
                  size={35}
                  color="#FFD700"
                  name="bell"
                />
              )}
            </MemberCardNotificationBtn>
            {member.waiting ? (
              <MemberCardServedBtn onPress={handleServeMember}>
                <CheckIcon size="7" color="white" />
              </MemberCardServedBtn>
            ) : (
              <MemberCardServedBtn onPress={handleWaitMember}>
                <ArrowBackIcon size="7" color="white" />
              </MemberCardServedBtn>
            )}
          </MemberHstack>
        </MemberItemContainer>
      </Swipeout>
    </CardMargin>
  );
};

export default observer(MemberItem);

const styles = StyleSheet.create({
  viewTest: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});
