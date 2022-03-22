import { RefreshControl, StyleSheet, Text, View } from "react-native";
import React from "react";
import queueStore from "../../stores/queueStore";
import { ScrollView, VStack } from "native-base";
import QueueItem from "./QueueItem";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";

const QueueList = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    wait(400).then(() => setRefreshing(false));
    await queueStore.fetchQueues();
  }, []);

  const queues = queueStore.queues.map((queue) => (
    <QueueItem key={queue._id} queue={queue} navigation={navigation} />
  ));

  return (
    <VStack style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {queues}
        </ScrollView>
      </View>
      <View style={{ flex: 1 }}>
        <Ionicons
          style={styles.icon}
          name="add-circle-outline"
          size={70}
          color="black"
          onPress={() => navigation.navigate("TestA")}
        />
      </View>
    </VStack>
  );
};

export default observer(QueueList);

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
});
