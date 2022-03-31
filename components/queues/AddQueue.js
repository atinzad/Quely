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
  AddQueueButtonPlus,
  AddQueueButtonView,
  ModalEmailIconView,
  ModalInputsView,
  ModalRequiredText,
  ModalRequiredView,
  ModalSwitchView,
  ModalTitle,
  ModalTitleTopView,
  ToastText,
} from "../../styles";
import { observer } from "mobx-react";
import { Ionicons } from "@expo/vector-icons";

const AddQueue = ({ isOpenModal, setIsOpenModal }) => {
  const [emailIsDisabled, setEmailIsDisabled] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState(true);
  const [isEmailRequired, setIsEmailRequired] = useState(false);
  const [phoneIsDisabled, setPhoneIsDisabled] = useState(true);
  const [isPhoneAvailable, setIsPhoneAvailable] = useState(false);
  const [isPhoneRequired, setIsPhoneRequired] = useState(false);

  const [newField, setNewField] = useState("");
  const [newFields, setNewFields] = useState([]);

  const [newQueue, setNewQueue] = useState({
    name: "",
    isPhoneAvailable: false,
    isPhoneRequired: false,
    isEmailRequired: false,
    isEmailAvailable: true,
    fields: [],
  });

  const handleAddNewField = () => {
    setNewFields([...newFields, newField]);
    setNewField("");
  };

  const toast = useToast();

  const emailAvailableSwitch = () => {
    setNewQueue({
      ...newQueue,
      isEmailAvailable: !isEmailAvailable,
    });
    setIsEmailAvailable(!isEmailAvailable);
    setEmailIsDisabled(!emailIsDisabled);
  };
  const emailRequiredSwitch = () => {
    setNewQueue({
      ...newQueue,
      isEmailRequired: !isEmailRequired,
    });
    setIsEmailRequired(!isEmailRequired);
  };
  const phoneAvailableSwitch = () => {
    setNewQueue({
      ...newQueue,
      isPhoneAvailable: !isPhoneAvailable,
    });
    setIsPhoneAvailable(!isPhoneAvailable);
    setPhoneIsDisabled(!phoneIsDisabled);
  };
  const phoneRequiredSwitch = () => {
    setNewQueue({
      ...newQueue,
      isPhoneRequired: !isPhoneRequired,
    });
    setIsPhoneRequired(!isPhoneRequired);
  };

  const handleCancelChanges = () => {
    setIsPhoneAvailable(false);
    setIsPhoneRequired(false);
    setIsEmailRequired(false);
    setIsEmailAvailable(true);
    setPhoneIsDisabled(true);
    setEmailIsDisabled(false);
    setNewField("");
    setNewFields([]);
    setNewQueue({
      name: "",
      isPhoneAvailable: false,
      isPhoneRequired: false,
      isEmailRequired: false,
      isEmailAvailable: true,
      fields: [],
    });

    setIsOpenModal(false);
  };
  const handleSaveChanges = () => {
    setNewQueue({
      ...newQueue,
      isEmailAvailable: isEmailAvailable,
      isPhoneAvailable: isPhoneAvailable,
      isPhoneRequired: isPhoneRequired && isPhoneAvailable,
      isEmailRequired: isEmailRequired && isEmailAvailable,
    });
    console.log(newFields);
    queueStore.addQueue(newQueue, [...newFields]);

    setIsPhoneAvailable(false);
    setIsPhoneRequired(false);
    setIsEmailRequired(false);
    setIsEmailAvailable(true);
    setPhoneIsDisabled(true);
    setEmailIsDisabled(false);
    setNewField("");
    setNewFields([]);

    setNewQueue({
      name: "",
      isPhoneAvailable: false,
      isPhoneRequired: false,
      isEmailRequired: false,
      isEmailAvailable: true,
      fields: [],
    });

    setIsOpenModal(false);
    toast.show({
      title: `${newQueue.name} queue added`,
      placement: "top",
      render: () => {
        return (
          <Box bg="#27B86B" px="15" py="3" rounded="lg" mb={5}>
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
        <Modal.Header>
          <ModalTitle>Add Queue</ModalTitle>
        </Modal.Header>
        <Modal.Body>
          <VStack space={8}>
            <TextInput
              value={newQueue.name}
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
              // left={<TextInput.Icon color="#3f93a2" name="account" />}
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
                disabled={emailIsDisabled}
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
                disabled={phoneIsDisabled}
                trackColor={{ false: "#767577", true: "#3f93a2" }}
                thumbColor={isPhoneRequired ? "white" : "white"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={phoneRequiredSwitch}
                value={isPhoneRequired}
              />
            </HStack>
            <HStack>
              <View style={{ width: "80%" }}>
                <TextInput
                  value={newField}
                  label="Field name"
                  keyboardType="default"
                  textContentType="givenName"
                  selectionColor="#3f93a2"
                  underlineColor="#3f93a2"
                  outlineColor="#3f93a2"
                  placeholderTextColor="#3f93a2"
                  activeOutlineColor="#3f93a2"
                  activeUnderlineColor="#3f93a2"
                  underlineColorAndroid="#3f93a2"
                  onChangeText={(value) => setNewField(value)}
                />
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "20%",
                }}
              >
                <AddQueueButtonView onPress={handleAddNewField}>
                  <AddQueueButtonPlus>+</AddQueueButtonPlus>
                </AddQueueButtonView>
              </View>
            </HStack>
            <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
              {newFields.map((field) => (
                <Pressable
                  style={{
                    height: 40,
                    marginTop: 10,
                    marginRight: 10,
                    alignSelf: "flex-start",
                    backgroundColor: "#3f93a2",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 7,
                  }}
                  onPress={() =>
                    setNewFields(newFields.filter((xfield) => xfield !== field))
                  }
                >
                  <HStack>
                    <Text
                      style={{ marginLeft: 10, marginTop: 2, color: "white" }}
                    >
                      {field}
                    </Text>
                    <Ionicons
                      style={{ marginLeft: 10 }}
                      color="white"
                      name="ios-close"
                      size={20}
                    />
                  </HStack>
                </Pressable>
              ))}
            </View>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              onPress={handleCancelChanges}
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
