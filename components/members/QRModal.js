import { Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import QRCode from "react-native-qrcode-svg";
import { QueueTitle } from "../../styles";
import { Button, VStack } from "native-base";

const QRModal = ({ isOpenQRModal, setIsOpenQRModal, queue }) => {
  return (
    <Modal animationType={"slide"} transparent={false} visible={isOpenQRModal}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <VStack alignItems="center" space={10}>
          <QueueTitle>{queue.name}</QueueTitle>
          <QRCode size={300} queue={queue} />
          <Button onPress={() => setIsOpenQRModal(false)}>Close</Button>
        </VStack>
      </View>
    </Modal>
  );
};

export default QRModal;

const styles = StyleSheet.create({});
