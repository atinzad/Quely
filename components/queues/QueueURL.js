import {
  Alert,
  Clipboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { baseFormURL } from "../../stores/instance";
import { Button, HStack, VStack } from "native-base";
import QRCode from "react-native-qrcode-svg";
import { TextInput } from "react-native-paper";

const QueueURL = ({ queue }) => {
  const copyToClipboard = () => {
    Clipboard.setString(`${baseFormURL}form/${queue._id}`);
    Alert.alert("copied to clipboard");
  };

  return (
    <VStack space={4} style={{ alignItems: "center" }}>
      <QRCode size={120} value={`${baseFormURL}form/${queue._id}`} />
      <Pressable
        style={{
          width: 120,
          height: 40,
          backgroundColor: "white",
          justifyContent: "center",
          borderRadius: 10,
          borderTopColor: "black",
          borderWidth: 2,
        }}
        onPress={copyToClipboard}
      >
        <HStack style={{ height: "100%", alignItems: "center" }}>
          <View style={{ width: 73, marginLeft: 10 }}>
            <Text style={{ color: "black", fontWeight: "bold" }}>Copy URL</Text>
          </View>
          <View
            style={{ width: 2, height: "100%", backgroundColor: "black" }}
          />
          <View style={{ width: 20, justifyContent: "center", marginLeft: 6 }}>
            <TextInput.Icon
              onPress={copyToClipboard}
              color="black"
              name="content-copy"
            />
          </View>
        </HStack>
      </Pressable>
    </VStack>
  );
};

export default QueueURL;

const styles = StyleSheet.create({});
