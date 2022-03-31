import { observer } from "mobx-react";
import {
  Center,
  Modal,
  Text,
  VStack,
  Button,
  Input,
  Stack,
  HStack,
} from "native-base";
import { useState } from "react";
import { View } from "react-native";
import reactNative from "react-native";
import { TextInput } from "react-native-paper";
import memberStore from "../../stores/memberStore";
import { MemberDetailsText } from "../../styles";

const MemberDetails = ({ navigation, route }) => {
  const { member } = route.params;
  const [isTextEditable, setIsTextEditable] = useState(false);
  const [isPhoneEditable, setIsPhoneEditable] = useState(false);
  const [isFieldEditable, setIsFieldEditable] = useState(
    Object.assign(
      {},
      ...Object.keys(member.fieldValues).map((key) => ({ [key]: false }))
    )
  );

  const handleEmail = () => {
    memberStore.sendEmailtoMember(queue, member);
    alert(
      `Member ${member._id.substring(member._id.length - 4)} has been notified`
    );
    navigation.goBack();
  };

  const handleServeMember = () => {
    memberStore.serveMember(member._id);
    navigation.goBack();
  };

  const handleFieldEdit = (field) => {
    setIsFieldEditable({
      ...isFieldEditable,
      [field]: !isFieldEditable[field],
    });
  };

  const handleWaitMember = () => {
    memberStore.waitMember(member._id);
    navigation.goBack();
  };

  // const fields = Object.keys(member.fieldValues).map((field) => {
  //   return (
  //     <VStack style={{ height: 70 }}>
  //       <HStack
  //         style={{
  //           marginLeft: 10,
  //           width: "85%",
  //           alignItems: "center",
  //         }}
  //       >
  //         <MemberDetailsText>HelloWorld</MemberDetailsText>
  //       </HStack>
  //     </VStack>
  //   );
  // });

  const fields = Object.keys(member.fieldValues).map((field) => {
    return (
      <VStack style={{ height: 70 }}>
        <HStack
          style={{
            marginLeft: 10,
            width: "85%",
            alignItems: "center",
          }}
        >
          {isFieldEditable[field] ? (
            <View style={{ width: "90%" }}>
              <reactNative.TextInput
                style={{
                  width: "90%",
                  height: 60,
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                // onChangeText={(text) => {
                //   memberStore.updateMemberEmail(member._id, text);
                // }}
              >
                <MemberDetailsText
                //if the text will overflow the textbox, it will be truncated
                >
                  {member.fieldValues[field]}
                </MemberDetailsText>
              </reactNative.TextInput>
            </View>
          ) : (
            <MemberDetailsText>{member.fieldValues[field]}</MemberDetailsText>
          )}
          <View style={{ position: "absolute", top: "15%", right: "0%" }}>
            <TextInput.Icon
              size={35}
              color="black"
              name={
                isFieldEditable[{ field }]
                  ? "check-bold"
                  : "square-edit-outline"
              }
              onPress={() => {
                handleFieldEdit(field);
              }}
            />
          </View>
        </HStack>
      </VStack>
    );
  });

  return (
    <View style={{ alignItems: "center", marginTop: "10%" }}>
      <VStack w="80%">
        {member.email && (
          <VStack style={{ height: 70 }}>
            <HStack
              style={{
                marginLeft: 10,
                width: "85%",
                alignItems: "center",
              }}
            >
              {isTextEditable ? (
                <View style={{ width: "90%" }}>
                  <reactNative.TextInput
                    style={{
                      width: "90%",
                      height: 60,
                      borderColor: "black",
                      borderWidth: 1,
                      borderRadius: 5,
                    }}
                    // onChangeText={(text) => {
                    //   memberStore.updateMemberEmail(member._id, text);
                    // }}
                  >
                    <MemberDetailsText> {member.email}</MemberDetailsText>
                  </reactNative.TextInput>
                </View>
              ) : (
                <MemberDetailsText ellipsizeMode="tail" numberOfLines={1}>
                  {member.email}
                </MemberDetailsText>
              )}
              <View style={{ position: "absolute", top: "15%", right: "0%" }}>
                <TextInput.Icon
                  size={35}
                  color="black"
                  name={isTextEditable ? "check-bold" : "square-edit-outline"}
                  onPress={() => setIsTextEditable(!isTextEditable)}
                />
              </View>
            </HStack>
          </VStack>
        )}
        {member.phone && (
          <VStack style={{ height: 70 }}>
            <HStack
              style={{
                marginLeft: 10,
                width: "85%",
                alignItems: "center",
              }}
            >
              {isPhoneEditable ? (
                <View style={{ width: "90%" }}>
                  <TextInput
                    mode="outlined"
                    label="Phone"
                    value={member.phone.toString()}
                    // onChangeText={(text) => {
                    //   memberStore.updateMemberPhone(member._id, text);
                    // }}
                  />
                </View>
              ) : (
                <MemberDetailsText>{member.phone.toString()}</MemberDetailsText>
              )}
              <View style={{ position: "absolute", top: "15%", right: "0%" }}>
                <TextInput.Icon
                  size={35}
                  color="black"
                  name={isPhoneEditable ? "check-bold" : "square-edit-outline"}
                  onPress={() => setIsPhoneEditable(!isPhoneEditable)}
                />
              </View>
            </HStack>
          </VStack>
          // <Input
          //   variant="underlined"
          //   placeholder="Phone Number"
          //   marginTop={30}
          //   fontSize={25}
          //   isDisabled={true}
          //   backgroundColor="#D1EAF0"
          //   value={member.phone.toString()}
          // />
        )}
        {fields}
        <HStack style={{ height: 20 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Status: {member.waiting ? "Waiting" : "Served"}
          </Text>

          {member.waiting && (
            <View style={{ position: "absolute", top: "0%", right: "13%" }}>
              <TextInput.Icon
                onPress={handleEmail}
                size={35}
                color="#FFD700"
                name="bell"
              />
            </View>
          )}
        </HStack>
      </VStack>

      <HStack
        style={{ justifyContent: "center" }}
        marginTop={20}
        paddingX={5}
        space={4}
        w="90%"
      >
        <Button
          style={{ height: 40, width: 150 }}
          borderRadius="10"
          backgroundColor="#3f93a2"
          onPress={member.waiting ? handleServeMember : handleWaitMember}
        >
          {member.waiting ? "Serve" : "waiting"}
        </Button>

        <Button
          colorScheme="red"
          borderRadius="10"
          style={{ height: 40, width: 150 }}
          onPress={() => {
            memberStore.deleteMember(member._id);
            navigation.goBack();
          }}
        >
          Delete
        </Button>
      </HStack>

      {/* <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>
            Member Details{member._id.substring(member._id.length - 4)}
          </Modal.Header>
          <Modal.Body>
            <VStack space={3}>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Email</Text>
                <Text color="grey">{member.email}</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Phone Number</Text>
                <Text color="grey">98700009</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Waiting Status</Text>
                {member.waiting ? (
                  <Text color="red.500">Waiting</Text>
                ) : (
                  <Text color="green.500">Served</Text>
                )}
              </HStack>
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button
              flex="1"
              colorScheme="red"
              borderRadius="20"
              onPress={() => {
                memberStore.deleteMember(member._id);
                setShowModal(false);
              }}
            >
              Delete
            </Button>
            <Button flex="1" borderRadius="20">
              Notify
            </Button>

            <Button flex="1" colorScheme="green" borderRadius="20">
              Served
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal> */}
    </View>
  );
};

export default observer(MemberDetails);
