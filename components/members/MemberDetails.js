import { observer } from "mobx-react";
import { Center, Modal, Text, VStack, Button, Input, Stack } from "native-base";
import { useState } from "react";
import memberStore from "../../stores/memberStore";

const MemberDetails = ({ navigation, route }) => {
  const { member } = route.params;

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

  const handleWaitMember = () => {
    memberStore.waitMember(member._id);
    navigation.goBack();
  };

  return (
    <Center>
      <Stack space={1} w="75%" maxWidth="300px" marginTop={20}>
        {member.email && (
          <Input
            variant="underlined"
            placeholder="Email"
            fontSize={35}
            isDisabled={true}
            backgroundColor="#D1EAF0"
            value={member.email}
          />
        )}
        {member.phone && (
          <Input
            variant="underlined"
            placeholder="Phone Number"
            marginTop={30}
            fontSize={25}
            isDisabled={true}
            backgroundColor="#D1EAF0"
            value={member.phone.toString()}
          />
        )}
        <Text>Status: {member.waiting ? "Waiting" : "Served"}</Text>
      </Stack>
      <VStack
        marginTop={20}
        paddingX={5}
        space={1}
        w="75%"
        h="40%"
        maxWidth="300px"
      >
        {member.waiting && (
          <Button marginY={3} flex="1" borderRadius="20" onPress={handleEmail}>
            Notify
          </Button>
        )}
        <Button
          flex="1"
          borderColor="#D1EAF0"
          variant="outline"
          borderRadius="20"
          size="full"
          onPress={member.waiting ? handleServeMember : handleWaitMember}
        >
          {member.waiting ? "Serve" : "waiting"}
        </Button>

        <Button
          marginY={3}
          flex="1"
          colorScheme="red"
          borderRadius="20"
          onPress={() => {
            memberStore.deleteMember(member._id);
            navigation.goBack();
          }}
        >
          Delete
        </Button>
      </VStack>

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
    </Center>
  );
};

export default observer(MemberDetails);
