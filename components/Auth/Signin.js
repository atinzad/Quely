import authStore from "../../stores/authStore";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";


import {
  Box,
  Center,
  CheckIcon,
  FormControl,
  HStack,
  Input,
  Link,
  useToast,
  VStack,
} from "native-base";
import SignButton from "../Comp/SignButton";
import { NoAccountSignupText, NoAccounttext, MainLogo } from "../../styles";
import { TextInput } from "react-native-paper";

const Signin = ({ navigation }) => {
  const toast = useToast();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [passwordVisable, setPasswordVisable] = useState("true");


  const [loading, setLoading] = useState(false);


  handleSubmit = () => {
    setLoading(true);
    authStore.signin(
      { ...user, username: user.username.toLowerCase() },
      navigation,

      setLoading
    );
  };
  const passwordRef = useRef();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Center style={styles.box} w="100%">
        <Box safeArea p="2" py="8" w="85%">
          <View style={styles.LogoBackground}>
            <MainLogo>Quely</MainLogo>
          </View>
          {/* AuthSignInPage */}
          <VStack style={styles.inputBackground} space={8}>
            <TextInput
              label="Email"
              selectionColor="#3f93a2"
              underlineColor="#3f93a2"
              outlineColor="#3f93a2"
              placeholderTextColor="#3f93a2"
              activeOutlineColor="#3f93a2"
              activeUnderlineColor="#3f93a2"
              underlineColorAndroid="#3f93a2"
              left={<TextInput.Icon color="#3f93a2" name="email" />}
              onChangeText={(value) => setUser({ ...user, username: value })}
              disabled={loading}
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordRef.current.focus();
              }}
            />
            <TextInput
              label="Password"
              secureTextEntry={passwordVisable}
              selectionColor="#3f93a2"
              underlineColor="#3f93a2"
              outlineColor="#3f93a2"
              placeholderTextColor="#3f93a2"
              activeOutlineColor="#3f93a2"
              activeUnderlineColor="#3f93a2"
              underlineColorAndroid="#3f93a2"
              right={<TextInput.Icon
                onPress={() => {
                  if (passwordVisable === "true") {
                    setPasswordVisable("false");
                  } else {
                    setPasswordVisable("true");
                  }
                }}
                pre
                name="eye"
              />}
              left={<TextInput.Icon color="#3f93a2" name="lock" />}
              onChangeText={(value) => setUser({ ...user, password: value })}
              disabled={loading}
              ref={passwordRef}
            />


            <SignButton
              name="Sign in"
              click={handleSubmit}
              disabled={loading}
            />

            <HStack justifyContent="center">
              <NoAccounttext>Don't have an account?</NoAccounttext>

              <Link onPress={() => navigation.navigate("Signup")}>
                <NoAccountSignupText> Sign Up</NoAccountSignupText>
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </KeyboardAvoidingView>
  );
};
export default Signin;
const styles = StyleSheet.create({
  box: {
    backgroundColor: "#f8f8f8",
    height: "100%",
  },
  inputBackground: {
    top: "20%",
  },
  LogoBackground: {
    backgroundColor: "#f8f8f8",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
});
