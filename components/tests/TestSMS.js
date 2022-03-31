import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SendSMS from "react-native-sms";
import { Button } from "native-base";
import { useState } from "react";
//import * as SMS from "expo-sms";

const TestSMS = () => {
  //     const handleSubmit2 = async (e) => {
  //     await SMS.sendSMSAsync(
  //       ["95669958898"],
  //       "My sample HelloWorld message from Ahmad",
  //       {}
  //     );
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("msg sent");
    SendSMS.send(
      {
        body: "Hello Ahmad you have done well !",
        recipients: ["95669958898"],
        successTypes: ["sent", "queued"],
        allowAndroidSendWithoutReadPermission: true,
      },
      (completed, cancelled, error) => {
        if (completed) {
          console.log("SMS Sent Completed");
        } else if (cancelled) {
          console.log("SMS Sent Cancelled");
        } else if (error) {
          console.log("Some error occured");
        }
      }
    );
  };
  return (
    <View>
      <Button onPress={handleSubmit2}>send</Button>
    </View>
  );
};

export default TestSMS;

const styles = StyleSheet.create({});
