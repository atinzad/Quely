import { RefreshControl, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Center, ScrollView, VStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import AddMember from "./AddMember";
import memberStore from "../../stores/memberStore";
import MemberItem from "./MemberItem";
import { observer } from "mobx-react";
import {
  InQueueTitle,
  MyQueuesTitle,
  QueueListQueues,
  QueueListTitle,
} from "../../styles";

const MemberList = ({ route, navigation }) => {
  const queue = route.params.queue;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [member, setMember] = useState({});

  const handleModal = () => {
    setIsOpenModal(true);
  };
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    wait(100).then(() => setRefreshing(false));
    await memberStore.fetchMembers();
  }, []);

  const members = memberStore.members
    .filter((member) => member.queue === queue._id)
    .map((member, index) => (
      <MemberItem
        index={index}
        key={member._id}
        member={member}
        navigation={navigation}
      />
    ));

  return (
    <Center style={styles.box} w="100%">
      <QueueListTitle w="90%">
        <InQueueTitle>Memeber List for {queue.name}</InQueueTitle>
      </QueueListTitle>
      <ScrollView w="100%">
        <QueueListQueues w="100%">{members}</QueueListQueues>
      </ScrollView>
    </Center>
  );
};

export default observer(MemberList);

const styles = StyleSheet.create({
  box: {
    height: "100%",
    backgroundColor: "#f8f8f8",
  },
});
