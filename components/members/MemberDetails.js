import { observer } from "mobx-react";
import { Center, Modal, Text, VStack, HStack, Button } from "native-base";
import { useState } from "react";
import memberStore from "../../stores/memberStore";

const MemberDetails = ({ setShowModal, showModal, member }) => {
  const [showModal2, setShowModal2] = useState(false);
  return (
    <Center>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Member Details{member._id}</Modal.Header>
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
                <Text color="green.500">True</Text>
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
      </Modal>
    </Center>
  );
};

export default observer(MemberDetails);
