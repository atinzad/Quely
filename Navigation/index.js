import { LogBox, StyleSheet, Text, View } from "react-native";
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
import authStore from "../stores/authStore";
import SignOutBt from "../SignOutBt";
import TestEmail from "../components/tests/TestEmail";
import MemberDetails from "../components/members/MemberDetails";
import { Ionicons } from "@expo/vector-icons";
import { HStack } from "native-base";
import queueStore from "../stores/queueStore";

const { Navigator, Screen } = createStackNavigator();

const RootNavigator = () => {
  LogBox.ignoreAllLogs();
  const user = authStore.user;
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
      <Screen
        name="QueueList"
        component={QueueList}
        options={({ navigation }) => ({
          headerLeftLabelVisible: false,
          headerLeft: false,
          headerRight: () => <SignOutBt navigation={navigation} />,
        })}
      ></Screen>

      <Screen name="TestA" component={Test1} />
      <Screen name="TestB" component={Test2} />
      <Screen name="TestEmail" component={TestEmail} />
      <Screen name="MemberList" component={MemberList} />
      <Screen
        name="MemberDetails"
        component={MemberDetails}
        options={({ navigation, route }) => ({
          headerStyle: { backgroundColor: "transparent" },
          headerTitleStyle: {
            color: "#3f93a2",
            fontSize: 25,
            fontWeight: "bold",
          },
          headerBackTitleStyle: { color: "#3f93a2" },
          title: `Member ${route.params?.member._id.substring(
            route.params?.member._id.length - 4
          )}`,
          headerBackTitle: () => "",
        })}
      />
    </Navigator>
  );
};

export default observer(RootNavigator);

const styles = StyleSheet.create({});

//blue promery  , blue border , delete red
