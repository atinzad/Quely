import { RefreshControl, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView, VStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import AddMember from "./AddMember";
import memberStore from "../../stores/memberStore";
import MemberItem from "./MemberItem";
import { observer } from "mobx-react";
import QueueURL from "../queues/QueueURL";

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
    .map((member) => (
      <MemberItem key={member._id} member={member} navigation={navigation} />
    ));

  return (
    <VStack style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>Memeber List for {queue.name}</Text>
        <QueueURL queue={queue} />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {members}
        </ScrollView>
      </View>
      <View style={{ flex: 1 }}>
        <Ionicons
          style={styles.icon}
          name="add-circle-outline"
          size={70}
          color="black"
          onPress={() => handleModal()}
        />
      </View>

      <AddMember
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        setMember={setMember}
        queue={queue}
      />
    </VStack>
  );
};

export default observer(MemberList);

const styles = StyleSheet.create({
  container: {
    flex: 8,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "flex-start",
  },
  icon: {
    top: "1%",
    left: "42%",
  },
  iconContainer: {
    flex: 1,
  },
  title: {
    position: "absolute",
    color: "black",
    fontSize: 25,
    zIndex: 2,
    fontWeight: "bold",
  },
});
