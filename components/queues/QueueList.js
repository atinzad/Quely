import { StyleSheet, Text, View } from "react-native";
import React from "react";
import queueStore from "../../stores/queueStore";
import { Box, Center, HStack, ScrollView, VStack } from "native-base";
import QueueItem from "./QueueItem";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import AddQueue from "./AddQueue";
import authStore from "../../stores/authStore";
import {
  AddQueueButtonPlus,
  AddQueueButtonView,
  MyQueuesTitle,
  MyQueuesViewTitle,
  PageUpperLeft,
  PageUpperRight,
  QueueListQueues,
  QueueListTitle,
} from "../../styles";

const QueueList = ({ navigation }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleModal = () => {
    setIsOpenModal(true);
  };

  user = authStore.user;
  const queues = queueStore.queues
    .filter((queue) => queue.owner === user?._id)
    .map((queue) => (
      <QueueItem key={queue._id} queue={queue} navigation={navigation} />
    ));

  return (
    <View>
      <Center style={styles.box} w="100%">
        <QueueListTitle w="90%">
          <HStack>
            <PageUpperLeft>
              <MyQueuesTitle>My Queues</MyQueuesTitle>
            </PageUpperLeft>
            <PageUpperRight>
              <AddQueueButtonView onPress={() => handleModal()}>
                <AddQueueButtonPlus>+</AddQueueButtonPlus>
              </AddQueueButtonView>
            </PageUpperRight>
          </HStack>
        </QueueListTitle>
        <ScrollView w="100%">
          <QueueListQueues w="100%">{queues}</QueueListQueues>
        </ScrollView>
        <AddQueue isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
      </Center>
    </View>
  );
};

export default observer(QueueList);

const styles = StyleSheet.create({
  box: { height: "100%", backgroundColor: "#f8f8f8" },
});
