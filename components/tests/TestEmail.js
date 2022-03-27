import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useState } from "react";
import { INIT_ID, SERVICE_ID, TEMPLATE_ID } from "../../.email.config";
import { Button } from "native-base";
import emailjs from "@emailjs/browser";
import { init } from "@emailjs/browser";

init(INIT_ID);

const TestEmail = () => {
  //.............email.............

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      phone_number: "1234",
      message: "This is a gmail test from react Native: take 200",
      user_email: "albaqsami.cts@gmail.com",
      reply_to: "quelyapp@gmail.com",
    });
  };

  return (
    <View>
      <Text>email address</Text>
      <TextInput onChangeText={(value) => setEmail(value)}></TextInput>
      <Text>Message</Text>
      <TextInput onChangeText={(value) => setMessage(value)}></TextInput>
      <Button onPress={handleSubmit}>send</Button>
    </View>
  );
};

export default TestEmail;

const styles = StyleSheet.create({});
