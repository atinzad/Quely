import authStore from "../stores/authStore";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  useToast,
  VStack,
} from "native-base";
import SigninButton from "../components/Comp/SigninButton";

const Signin = ({ navigation }) => {
  const toast = useToast();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  let [fontsLoaded] = useFonts({
    "Quicksand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  handleSubmit = () => {
    authStore.signin(
      { ...user, username: user.username.toLowerCase() },
      navigation,
      toast
    );
  };

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="80%">
        <View style={styles.LogoBackground}>
          <Text style={styles.text}>Quely</Text>
        </View>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              onChangeText={(value) => setUser({ ...user, username: value })}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              onChangeText={(value) => setUser({ ...user, password: value })}
            />
          </FormControl>
          <SigninButton name="Sign in" click={handleSubmit} />

          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              Don't have an account?
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              onPress={() => navigation.navigate("Signup")}
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};
export default Signin;
const styles = StyleSheet.create({
  signin: {
    top: "20%",
  },

  text: {
    fontFamily: "Quicksand-SemiBold",
    fontSize: 60,
    /* identical to box height */
    top: "20%",
    color: "#3F93A2",
  },
  btn: { backgroundColor: "#1572A1" },
  LogoBackground: {
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
});
