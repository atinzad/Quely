import { Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import QRCode from "react-native-qrcode-svg";
import { QueueTitle } from "../../styles";
import { Button, VStack } from "native-base";
import { baseFormURL } from "../../stores/instance";
import { setBrightnessAsync } from "expo-brightness";

const QRModal = ({ isOpenQRModal, setIsOpenQRModal, queue, brightness }) => {
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
          <QRCode
            value={`${baseFormURL}form/${queue._id}`}
            size={300}
            queue={queue}
          />
          <Button
            onPress={async () => {
              await setBrightnessAsync(brightness);
              setIsOpenQRModal(false);
            }}
          >
            Close
          </Button>
        </VStack>
      </View>
    </Modal>
  );
};

export default QRModal;

const styles = StyleSheet.create({});
