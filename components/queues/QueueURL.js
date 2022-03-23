import { Alert, Clipboard, StyleSheet, Text, View } from "react-native";
import React from "react";
import { baseURL } from "../../stores/instance";
import { Button } from "native-base";
import QRCode from "react-native-qrcode-svg";

const QueueURL = ({ queue }) => {
  const copyToClipboard = () => {
    Clipboard.setString(`${baseURL}form/${queue._id}`);
    Alert.alert("copied to clipboard");
  };

  return (
    <View>
      <QRCode value={`${baseURL}form/${queue._id}`} />
      <Button onPress={copyToClipboard}>copy URL</Button>
    </View>
  );
};

export default QueueURL;

const styles = StyleSheet.create({});
