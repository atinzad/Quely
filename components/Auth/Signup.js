import React, { useState, useRef } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";

import {
  Pressable,
  useToast,
  ScrollView,
  Center,
  HStack,
  Box,
  VStack,
  Link,
} from "native-base";
import authStore from "../../stores/authStore";
import {
  NoAccountSignupText,
  NoAccounttext,
  SignUpButtonContainer,
  SignUpInputContainer,
  SignUpText,
  SignUpTextContainer,
} from "../../styles";
import SignButton from "../Comp/SignButton";

// Stores

const Signup = ({ navigation }) => {
  const toast = useToast();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    setLoading(true);
    authStore.signup(
      { ...user, email: user.email.toLowerCase() },
      navigation,
      toast,
      setLoading
    );
  };

  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <Center style={styles.box} w="100%">
      <Box style={styles.box} safeArea p="2" py="8" w="85%">
        <SignUpTextContainer>
          <SignUpText>Sign up</SignUpText>
        </SignUpTextContainer>
        <SignUpInputContainer>
          <VStack space={8}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.container}
            >
              <TextInput
                label="Name"
                selectionColor="#3f93a2"
                underlineColor="#3f93a2"
                outlineColor="#3f93a2"
                placeholderTextColor="#3f93a2"
                activeOutlineColor="#3f93a2"
                activeUnderlineColor="#3f93a2"
                underlineColorAndroid="#3f93a2"
                left={<TextInput.Icon color="#3f93a2" name="account" />}
                onChangeText={(name) => setUser({ ...user, name: name })}
                disabled={loading}
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailRef.current.focus();
                }}
              />
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
                onChangeText={(email) => setUser({ ...user, email: email })}
                disabled={loading}
                ref={emailRef}
                returnKeytype="next"
                onSubmitEditing={() => {
                  passwordRef.current.focus();
                }}
              />
              <TextInput
                label="Password"
                secureTextEntry
                selectionColor="#3f93a2"
                underlineColor="#3f93a2"
                outlineColor="#3f93a2"
                placeholderTextColor="#3f93a2"
                activeOutlineColor="#3f93a2"
                activeUnderlineColor="#3f93a2"
                underlineColorAndroid="#3f93a2"
                left={<TextInput.Icon color="#3f93a2" name="lock" />}
                onChangeText={(password) =>
                  setUser({ ...user, password: password })
                }
                disabled={loading}
                ref={passwordRef}
              />
            </KeyboardAvoidingView>
          </VStack>
        </SignUpInputContainer>
        <SignUpButtonContainer>
          <VStack space={8}>
            <SignButton name="Sign up" click={handleSubmit} />
            <HStack justifyContent="center">
              <NoAccounttext>You have an account?</NoAccounttext>
              <Link onPress={() => navigation.navigate("Signin")}>
                <NoAccountSignupText> Sign in</NoAccountSignupText>
              </Link>
            </HStack>
          </VStack>
        </SignUpButtonContainer>
      </Box>
    </Center>
  );
};

const styles = StyleSheet.create({
  box: { backgroundColor: "#f8f8f8", height: "100%" },
});

export default Signup;
