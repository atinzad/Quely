//Delete Queue Modal
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { QueueTitle } from "../../styles";
import { Button, Modal, VStack } from "native-base";

const DeleteQueueModal = ({
  isOpenQueueDeleteModal,
  setIsOpenQueueDeleteModal,
  queue,
}) => {
  return (
    <Modal size="xl" isOpen={isOpenQueueDeleteModal}>
      <Modal.Content maxWidth="500px">
        <Modal.Header>{queue.name}</Modal.Header>

        <VStack>
          <QueueTitle>Are you sure you want to delete this queue?</QueueTitle>
          <Button
            onPress={() => {
              setIsOpenQueueDeleteModal(false);
            }}
            style={{ marginTop: 20 }}
          >
            <Text>Delete</Text>
          </Button>
        </VStack>
        <Modal.Footer>
          <Button
            onPress={() => {
              setIsOpenQueueDeleteModal(false);
            }}
          >
            <Text>Cancel</Text>
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default DeleteQueueModal;

const styles = StyleSheet.create({});
