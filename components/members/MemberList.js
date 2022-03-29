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
  MemberlistWaitingServed,
  MyQueuesTitle,
  QueueListQueues,
  QueueListTitle,
} from "../../styles";
import QRModal from "./QRModal";
import { getBrightnessAsync, setBrightnessAsync } from "expo-brightness";
import { TextInput } from "react-native-paper";

const MemberList = ({ route, navigation }) => {
  const queue = route.params.queue;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [brightness, setBrightness] = useState(1);
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
    setBrightness(await getBrightnessAsync());
    await setBrightnessAsync(0.8);
    // setBrightness(await getBrightnessAsync());
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
      <View
        style={{
          width: "90%",
          height: "30%",
          justifyContent: "center",
        }}
      >
        <HStack>
          <View
            style={{
              width: "50%",
            }}
          >
            <Pressable onPress={handleQRModal}>
              <QueueURL queue={queue} />
            </Pressable>
          </View>
          <VStack
            space={9}
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
            }}
          >
            <Pressable
              style={{
                width: 150,
                height: 40,
                backgroundColor: "#3f93a2",
                justifyContent: "center",
                borderRadius: 10,
              }}
              onPress={() => handleModal()}
            >
              <HStack style={{ height: "100%", alignItems: "center" }}>
                <View
                  style={{ width: 20, justifyContent: "center", marginLeft: 6 }}
                >
                  <TextInput.Icon
                    onPress={() => handleModal()}
                    color="white"
                    name="plus"
                  />
                </View>
                <View style={{ width: 100, marginLeft: 10 }}>
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Add a member
                  </Text>
                </View>
              </HStack>
            </Pressable>
            <Pressable
              style={{
                width: 150,
                height: 40,
                backgroundColor: "#c06c5d",
                justifyContent: "center",
                borderRadius: 10,
              }}
              // onPress={deletelist for queue}
            >
              <HStack style={{ height: "100%", alignItems: "center" }}>
                <View
                  style={{ width: 20, justifyContent: "center", marginLeft: 6 }}
                >
                  <TextInput.Icon
                    // onPress={deletelist for queue}
                    color="white"
                    name="trash-can-outline"
                  />
                </View>
                <View style={{ width: 100, marginLeft: 10 }}>
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Delete the list{" "}
                  </Text>
                </View>
              </HStack>
            </Pressable>
          </VStack>
        </HStack>
      </View>
      <HStack height="6%">
        <Pressable
          style={{
            width: "50%",
            alignItems: "center",
            backgroundColor: displayWaiting ? "#ebebeb" : "#f8f8f8",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            justifyContent: "center",
            opacity: displayWaiting ? 1 : 0.3,
          }}
          onPress={() => setDisplayWaiting(true)}
        >
          <MemberlistWaitingServed>Waiting</MemberlistWaitingServed>
        </Pressable>
        <Pressable
          style={{
            width: "50%",
            alignItems: "center",
            backgroundColor: displayWaiting ? "#f8f8f8" : "#ebebeb",
            justifyContent: "center",
            opacity: displayWaiting ? 0.3 : 1,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          onPress={() => setDisplayWaiting(false)}
        >
          <MemberlistWaitingServed>Served</MemberlistWaitingServed>
        </Pressable>
      </HStack>
      <FlatList
        style={{
          backgroundColor: "#ebebeb",
          marginBottom: -500,
        }}
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
      ></FlatList>
      {/* <MemberDetails
        setShowModal={setShowMemberModal}
        showModal={showMemberModal}
        member={member}
      />{" "} */}
      <AddMember
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        queue={queue}
        setMember={setMember}
      />
      <QRModal
        isOpenQRModal={isOpenQRModal}
        setIsOpenQRModal={setIsOpenQRModal}
        queue={queue}
        brightness={brightness}
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
