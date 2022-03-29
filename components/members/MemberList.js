import { RefreshControl, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Box,
  Center,
  Container,
  FlatList,
  ScrollView,
  VStack,
} from "native-base";
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
import { SafeAreaView } from "react-native-safe-area-context";

const MemberList = ({ route, navigation }) => {
  const queue = route.params.queue;
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleModal = () => {
    setIsOpenModal(true);
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await memberStore.fetchMembers(setRefreshing);
  }, []);

  const members = memberStore.members.filter(
    (member) => member.queue === queue._id
  );

  return (
    <Center style={styles.box} w="100%">
      <Box alignContent="center" alignItems="center">
        <Container alignItems="center">
          <QueueListTitle w="90%">
            <InQueueTitle>Memeber List for {queue.name}</InQueueTitle>
          </QueueListTitle>
          <QueueURL queue={queue} />
          <AddQueueButtonView onPress={() => handleModal()}>
            <AddQueueButtonPlus>+</AddQueueButtonPlus>
          </AddQueueButtonView>
        </Container>

        <FlatList
          style={styles.safeAreaStyle}
          data={members}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index, separators }) => (
            <MemberItem
              index={index}
              key={item._id}
              member={item}
              queue={queue}
              navigation={navigation}
            />
          )}
          onRefresh={() => onRefresh()}
          refreshing={refreshing}
        >
          {/* <QueueListQueues w="100%">{members}</QueueListQueues> */}
        </FlatList>
      </Box>
      {/* <MemberDetails
        setShowModal={setShowMemberModal}
        showModal={showMemberModal}
        member={member}
      /> */}
      <AddMember
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
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
  safeAreaStyle: {
    flex: 1,
  },
});
