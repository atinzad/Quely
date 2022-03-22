import {
  Dimensions,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { Button, HStack, VStack } from "native-base";
import { useState } from "react";
import queueStore from "../../stores/queueStore";

const AddQueue = ({ isOpenModal, setIsOpenModal, setQueue }) => {
  const [newQueue, setNewQueue] = useState({});
  const handleSaveChanges = () => {
    setQueue(newQueue);
    queueStore.addQueue(newQueue);
    setIsOpenModal(false);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={isOpenModal}
        onRequestClose={() => {
          Alert.alert("Modal has now been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <Text style={styles.title}>Add to Queue</Text>
          <HStack>
            <Text>Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => setQueue({ ...newQueue, name: value })}
            />
          </HStack>
          <HStack>
            <Button
              style={styles.btn}
              colorScheme="blue"
              onPress={handleSaveChanges}
            >
              Add
            </Button>
            <Button
              colorScheme="blue"
              style={styles.btn}
              onPress={() => setIsOpenModal(false)}
            >
              Cancel
            </Button>
          </HStack>
        </View>
      </Modal>
    </View>
  );
};

export default AddQueue;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    alignContent: "center",
    top: 200,
  },
  safeView: {
    flex: 1,
  },
  title: {
    //width: Dimensions.get("window").width,
    fontSize: 20,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 28,
    padding: 8,
    justifyContent: "center",
    //top: 200,
  },
  input: {
    height: 40,
    width: 200,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginLeft: 12,
  },
  btn: {
    height: 40,
    width: 100,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 12,
    //bottom: 100,
  },
});
