import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import React from "react";
import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  Modal,
  useToast,
  VStack,
} from "native-base";
import { useState } from "react";
import queueStore from "../../stores/queueStore";
import { TextInput } from "react-native-paper";
import {
  ModalEmailIconView,
  ModalInputsView,
  ModalRequiredText,
  ModalRequiredView,
  ModalSwitchView,
  ModalTitle,
  ModalTitleTopView,
  ToastText,
} from "../../styles";

const AddQueue = ({ isOpenModal, setIsOpenModal, setQueue }) => {
  const [newQueue, setNewQueue] = useState({});
  const [isEmailAvailable, setIsEmailAvailable] = useState(false);
  const [isEmailRequired, setIsEmailRequired] = useState(false);
  const [isPhoneAvailable, setIsPhoneAvailable] = useState(false);
  const [isPhoneRequired, setIsPhoneRequired] = useState(false);
  const [emailSwitch, setIsEmailSwitch] = useState(true);
  const [phoneSwitch, setIsPhoneSwitch] = useState(true);
  const toast = useToast();

  const emailAvailableSwitch = () => {
    setIsEmailAvailable((previousState) => !previousState);
    setIsEmailSwitch((previousState) => !previousState);
  };
  const emailRequiredSwitch = () =>
    setIsEmailRequired((previousState) => !previousState);
  const phoneAvailableSwitch = () => {
    setIsPhoneSwitch((previousState) => !previousState);
    setIsPhoneAvailable((previousState) => !previousState);
  };
  const phoneRequiredSwitch = () =>
    setIsPhoneRequired((previousState) => !previousState);

  const handleSaveChanges = () => {
    setQueue(newQueue);
    queueStore.addQueue(newQueue);

    setIsOpenModal(false);
    toast.show({
      title: `${newQueue.name} queue added`,
      placement: "top",
      render: () => {
        return (
          <Box bg="#ffb6b9" px="15" py="3" rounded="lg" mb={5}>
            <ToastText>{newQueue.name} queue added</ToastText>
          </Box>
        );
      },
    });
  };
  const opacityEmailRequired = () => {
    if (isEmailAvailable) {
      return 1;
    } else {
      return 0.5;
    }
  };
  const opacityPhoneRequired = () => {
    if (isPhoneAvailable) {
      return 1;
    } else {
      return 0.5;
    }
  };

  return (
    <Modal size="xl" isOpen={isOpenModal}>
      <Modal.Content maxWidth="500px">
        <Modal.CloseButton onPress={() => setIsOpenModal(false)} />
        <Modal.Header>
          <ModalTitle>Add Queue</ModalTitle>
        </Modal.Header>
        <Modal.Body>
          <VStack space={8}>
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
              onChangeText={(value) =>
                setNewQueue({ ...newQueue, name: value })
              }
            />
            <HStack>
              <ModalEmailIconView>
                <TextInput.Icon size={35} color="#3f93a2" name="email" />
              </ModalEmailIconView>
              <ModalSwitchView>
                <Switch
                  trackColor={{ false: "#767577", true: "#3f93a2" }}
                  thumbColor={isEmailAvailable ? "white" : "white"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={emailAvailableSwitch}
                  value={isEmailAvailable}
                />
              </ModalSwitchView>

              <ModalRequiredView style={{ opacity: opacityEmailRequired() }}>
                <ModalRequiredText>Required</ModalRequiredText>
              </ModalRequiredView>
              <Switch
                disabled={emailSwitch}
                trackColor={{ false: "#767577", true: "#3f93a2" }}
                thumbColor={isEmailRequired ? "white" : "white"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={emailRequiredSwitch}
                value={isEmailRequired}
              />
            </HStack>
            <HStack>
              <ModalEmailIconView>
                <TextInput.Icon size={35} color="#3f93a2" name="phone" />
              </ModalEmailIconView>
              <ModalSwitchView>
                <Switch
                  trackColor={{ false: "#767577", true: "#3f93a2" }}
                  thumbColor={isPhoneAvailable ? "white" : "white"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={phoneAvailableSwitch}
                  value={isPhoneAvailable}
                />
              </ModalSwitchView>
              <ModalRequiredView style={{ opacity: opacityPhoneRequired() }}>
                <ModalRequiredText>Required</ModalRequiredText>
              </ModalRequiredView>
              <Switch
                disabled={phoneSwitch}
                trackColor={{ false: "#767577", true: "#3f93a2" }}
                thumbColor={isPhoneRequired ? "white" : "white"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={phoneRequiredSwitch}
                value={isPhoneRequired}
              />
            </HStack>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              onPress={() => setIsOpenModal(false)}
              variant="ghost"
              colorScheme="blueGray"
            >
              Cancel
            </Button>
            <Button onPress={handleSaveChanges}>Add</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>

    // <View style={styles.modal}>
    //   <Modal
    //     animationType={"slide"}
    //     transparent={false}
    //     visible={isOpenModal}
    //     onRequestClose={() => {
    //       Alert.alert("Modal has now been closed.");
    //     }}
    //   >
    //     <ModalTitleTopView>
    //       <ModalTitle>Add new Queue</ModalTitle>
    //     </ModalTitleTopView>
    //     <ModalInputsView>
    //       <TextInput
    //         label="Name"
    //         keyboardType="default"
    //         textContentType="givenName"
    //         selectionColor="#3f93a2"
    //         underlineColor="#3f93a2"
    //         outlineColor="#3f93a2"
    //         placeholderTextColor="#3f93a2"
    //         activeOutlineColor="#3f93a2"
    //         activeUnderlineColor="#3f93a2"
    //         underlineColorAndroid="#3f93a2"
    //         left={<TextInput.Icon color="#3f93a2" name="account" />}
    //         onChangeText={(value) => setNewQueue({ ...newQueue, name: value })}
    //       />
    //     </ModalInputsView>
    //     <ModalSwitchView>
    //
    //     </ModalSwitchView>
    //     <HStack>
    //       <Button
    //         style={styles.btn}
    //         colorScheme="blue"
    //         onPress={handleSaveChanges}
    //       >
    //         Add
    //       </Button>
    //       <Button
    //         colorScheme="blue"
    //         style={styles.btn}
    //         onPress={() => setIsOpenModal(false)}
    //       >
    //         Cancel
    //       </Button>
    //     </HStack>
    //   </Modal>
    // </View>
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
