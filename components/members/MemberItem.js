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
  MemberEmail,
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
    //console log member field values
    console.log();

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
              <MemberEmail
                style={{
                  fontSize: member.email.length > 15 ? 15 : 20,
                }}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {member.email}
              </MemberEmail>
              {queue.fields.length > 0 && (
                <QueueWaiting>
                  {Object.keys(member.fieldValues)[0]} :{" "}
                  {Object.values(member.fieldValues)[0]}
                </QueueWaiting>
              )}
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
