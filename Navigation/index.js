import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Test1 from "../components/tests/Test1";
import Test2 from "../components/tests/Test2";
import { observer } from "mobx-react";

const { Navigator, Screen } = createStackNavigator();

const RootNavigator = () => {
  return (
    <Navigator initialRouteName="TestA">
      <Screen name="TestA" component={Test1} />
      <Screen name="TestB" component={Test2} />
    </Navigator>
  );
};

export default observer(RootNavigator);

const styles = StyleSheet.create({});
