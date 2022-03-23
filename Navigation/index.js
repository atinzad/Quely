import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Test1 from "../components/tests/Test1";
import Test2 from "../components/tests/Test2";
import { observer } from "mobx-react";
import Signin from "../components/Auth/Signin";
import Signup from "../components/Auth/Signup";
import Home from "../components/tests/Home";
import QueueList from "../components/queues/QueueList";
import MemberList from "../components/members/MemberList";

const { Navigator, Screen } = createStackNavigator();

const RootNavigator = () => {
  //const user = authStore.user;
  const user = "hi";
  return (
    <Navigator initialRouteName={user ? "QueueList" : "Home"}>
      <Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      ></Screen>
      <Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false,
        }}
      ></Screen>
      <Screen
        name="Signin"
        component={Signin}
        options={{
          headerShown: false,
        }}
      ></Screen>

      <Screen name="TestA" component={Test1} />
      <Screen name="TestB" component={Test2} />
      <Screen name="QueueList" component={QueueList} />
      <Screen name="MemberList" component={MemberList} />
    </Navigator>
  );
};

export default observer(RootNavigator);

const styles = StyleSheet.create({});
