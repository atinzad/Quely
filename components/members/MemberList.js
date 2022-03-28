import {
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Center, FlatList, HStack, ScrollView, VStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import AddMember from "./AddMember";
import memberStore from "../../stores/memberStore";
import MemberItem from "./MemberItem";
import { observer } from "mobx-react";
import MemberDetails from "./MemberDetails";
import QueueURL from "../queues/QueueURL";

import {
  AddQueueButtonPlus,
  AddQueueButtonView,
  InQueueTitle,
  MyQueuesTitle,
  QueueListQueues,
  QueueListTitle,
} from "../../styles";
import QRModal from "./QRModal";

const MemberList = ({ route, navigation }) => {
  const queue = route.params.queue;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [member, setMember] = useState({});
  const [displayWaiting, setDisplayWaiting] = useState(true);
  const [isOpenQRModal, setIsOpenQRModal] = useState(false);
  let members = memberStore.members
    .filter((member) => member.queue === queue._id)
    .filter((member) => member.waiting);

  const [showMemberModal, setShowMemberModal] = useState(false);

  const handleModal = () => {
    setIsOpenModal(true);
  };

  const handleQRModal = async () => {
    setIsOpenQRModal(true);
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await memberStore.fetchMembers(setRefreshing);
  }, []);

  const handleDelete = async (deletedMember) => {
    memberStore.deleteMember(deletedMember._id);
  };

  return (
    <Center style={styles.box} w="100%">
      <QueueListTitle w="90%">
        <InQueueTitle>Memeber List for {queue.name}</InQueueTitle>
      </QueueListTitle>
      <Pressable onPress={handleQRModal}>
        <QueueURL queue={queue} />
      </Pressable>
      <AddQueueButtonView onPress={() => handleModal()}>
        <AddQueueButtonPlus>+</AddQueueButtonPlus>
      </AddQueueButtonView>
      <HStack>
        {
          //Needs layout design for Waiting and Served
        }
        <Pressable onPress={() => setDisplayWaiting(true)}>
          <InQueueTitle>Waiting</InQueueTitle>
        </Pressable>
        <InQueueTitle>{"                  "}</InQueueTitle>
        <Pressable onPress={() => setDisplayWaiting(false)}>
          <InQueueTitle>Served</InQueueTitle>
        </Pressable>
      </HStack>
      <HStack>
        <InQueueTitle>{"                  "}</InQueueTitle>
      </HStack>
      <FlatList
        data={memberStore.members
          .filter((member) => member.queue === queue._id)
          .filter((member) => member.waiting === displayWaiting)}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index, separators }) => (
          <MemberItem
            handleDelete={handleDelete}
            index={index}
            key={item._id}
            member={item}
            queue={queue}
            navigation={navigation}
            onClick={() => {
              setMember(item);
              setShowMemberModal(true);
            }}
          />
        )}
        onRefresh={() => onRefresh()}
        refreshing={refreshing}
      >
        {/* <QueueListQueues w="100%">{members}</QueueListQueues> */}
      </FlatList>
      <MemberDetails
        setShowModal={setShowMemberModal}
        showModal={showMemberModal}
        member={member}
      />
      <AddMember
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        setMember={setMember}
        queue={queue}
      />
      <QRModal
        isOpenQRModal={isOpenQRModal}
        setIsOpenQRModal={setIsOpenQRModal}
        queue={queue}
      />
    </Center>
  );
};

export default observer(MemberList);

const styles = StyleSheet.create({
  box: {
    height: "100%",
    backgroundColor: "#f8f8f8",
  },
  title: {
    position: "absolute",
    color: "black",
    fontSize: 25,
    zIndex: 2,
    fontWeight: "bold",
  },
});
