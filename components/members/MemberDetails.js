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
                <Text fontWeight="medium">Member name</Text>
                <Text color="blueGray.400">{member.email}</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Email</Text>
                <Text color="blueGray.400">eeeee</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Mobile</Text>
                <Text color="green.500">theee</Text>
              </HStack>
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button
              flex="1"
              onPress={() => {
                memberStore.deleteMember(member._id);
                setShowModal(false);
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      {/* <Modal isOpen={showModal2} onClose={() => setShowModal2(false)} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Select Address</Modal.Header>
          <Modal.Body></Modal.Body>
          <Modal.Footer>
            <Button flex="1" onPress={() => {}}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal> */}
    </Center>
  );
};

export default observer(MemberDetails);
