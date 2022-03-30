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
import { Button, HStack, Input, VStack } from "native-base";
import { useState } from "react";
import memberStore from "../../stores/memberStore";
import {
  ModalTitle,
  ModalEmailIconView,
  ModalInputsView,
  ModalRequiredText,
  ModalRequiredView,
  ModalSwitchView,
  ModalTitleTopView,
  ToastText,
} from "../../styles";
import { observer } from "mobx-react-lite";

const AddMember = ({ isOpenModal, setIsOpenModal, setMember, queue }) => {
  const [newMember, setNewMemeber] = useState({ email: "", phone: "" });
  const [fieldValues, setFieldValues] = useState(
    Object.assign({}, ...queue.fields.map((key) => ({ [key]: "" })))
  );
  const handleSaveChanges = () => {
    setMember(newMember);
    if (queue.isEmailRequired && !newMember.email) {
      alert("email is requred");
    } else {
      if (queue.isPhoneRequired && !newMember.phone) {
        alert("phone is requred");
      } else {
        memberStore.addMember(queue, newMember, fieldValues);
      }
    }

    setIsOpenModal(false);
  };

  const fields = queue.fields.map((field) => (
    <HStack>
      <Text>{field}</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) =>
          setFieldValues({ ...fieldValues, [field]: value })
        }
      />
    </HStack>
  ));
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={isOpenModal}
        onRequestClose={() => {
          alert("Modal has now been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <Text style={styles.title}>Add Memeber to Queue</Text>
          {queue.isEmailAvailable && (
            <HStack>
              <Text>email{queue.isEmailRequired && "*"}</Text>
              <TextInput
                style={styles.input}
                onChangeText={(value) =>
                  setNewMemeber({ ...newMember, email: value })
                }
              />
            </HStack>
          )}
          {queue.isPhoneAvailable && (
            <HStack>
              <Text>phone{queue.isPhoneRequired && "*"}</Text>
              <TextInput
                style={styles.input}
                onChangeText={(value) =>
                  setNewMemeber({ ...newMember, phone: value })
                }
              />
            </HStack>
          )}
          {fields}
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

export default observer(AddMember);

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

// <PhoneInput
//   ref={phoneInput}
//   defaultValue={phoneNumber}
//   defaultCode="IN"
//   layout="first"
//   withShadow
//   autoFocus
//   containerStyle={styleSheet.phoneNumberView}
//   textContainerStyle={{ paddingVertical: 0 }}
//   onChangeFormattedText={text => {
//     setPhoneNumber(text);
//   }}
// />

// <TouchableOpacity  style={styleSheet.button} onPress={() => getPhoneNumber()}>
//   <Text style={styleSheet.buttonText}>Get Phone Number</Text>
// </TouchableOpacity >

// <View style={styles.centeredView}>
//   <Modal
//     animationType={"slide"}
//     transparent={false}
//     visible={isOpenModal}
//     onRequestClose={() => {
//       Alert.alert("Modal has now been closed.");
//     }}
//   >
//     <View style={styles.centeredView}>
//       <Text style={styles.title}>Add Memeber to Queue</Text>
//       <HStack>
//         {/* <Text>email</Text> */}
//         <Input
//           variant="underlined"
//           placeholder="Email"
//           fontSize={35}
//           backgroundColor="#D1EAF0"
//           borderRadius={20}
//           width={300}
//           // style={styles.input}
//           onChangeText={(value) =>
//             setNewMemeber({ ...newMember, email: value })
//           }
//         />
//       </HStack>
//       <HStack>
//         <Text>phone</Text>
//         <TextInput
//           style={styles.input}
//           onChangeText={(value) =>
//             setNewMemeber({ ...newMember, phone: value })
//           }
//         />
//       </HStack>
//       <HStack>
//         <Button
//           style={styles.btn}
//           color="#3f93a2"
//           onPress={handleSaveChanges}
//         >
//           Add
//         </Button>
//         <Button
//           color="#3f93a2"
//           style={styles.btn}
//           onPress={() => setIsOpenModal(false)}
//         >
//           Cancel
//         </Button>
//       </HStack>
//     </View>
//   </Modal>
// </View>
