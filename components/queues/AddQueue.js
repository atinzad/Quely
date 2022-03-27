import {
  Dimensions,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import React from "react";
import { Button, HStack, VStack } from "native-base";
import { useState } from "react";
import queueStore from "../../stores/queueStore";
import { TextInput } from "react-native-paper";
import {
  ModalInputsView,
  ModalSwitchView,
  ModalTitle,
  ModalTitleTopView,
} from "../../styles";

const AddQueue = ({ isOpenModal, setIsOpenModal, setQueue }) => {
  const [newQueue, setNewQueue] = useState({});
  const [isEnabled, setIsEnabled] = useState(false);

  const handleSaveChanges = () => {
    setQueue(newQueue);
    queueStore.addQueue(newQueue);
    setIsOpenModal(false);
  };

  return (
    <Modal
      animationType={"slide"}
      transparent={false}
      visible={isOpenModal}
      onRequestClose={() => {
        Alert.alert("Modal has now been closed.");
      }}
    >
      <ModalTitleTopView>
        <ModalTitle>Add new Queue</ModalTitle>
      </ModalTitleTopView>
      <TextInput
        label="Name"
        keyboardType="default"
        textContentType="givenName"
        selectionColor="#3f93a2"
        underlineColor="#3f93a2"
        outlineColor="#3f93a2"
        placeholderTextColor="#3f93a2"
        activeOutlineColor="#3f93a2"
        activeUnderlineColor="#3f93a2"
        underlineColorAndroid="#3f93a2"
        left={<TextInput.Icon color="#3f93a2" name="account" />}
        onChangeText={(value) => setNewQueue({ ...newQueue, name: value })}
      />
      <ModalSwitchView>
        <HStack>
          <TextInput.Icon color="#3f93a2" name="email" />
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            // onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </HStack>
      </ModalSwitchView>
      {/* <HStack>
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
      </HStack> */}
    </Modal>
  );
};

export default AddQueue;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "black",
  },
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
