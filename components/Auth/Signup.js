import React, { useState } from "react";
import { Text, TextInput, View, SafeAreaView, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Pressable, useToast, ScrollView, Center, HStack } from "native-base";
import authStore from "../../stores/authStore";

// Stores

const Signup = ({ navigation }) => {
  const toast = useToast();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    authStore.signup(
      { ...user, email: user.email.toLowerCase() },
      navigation,
      toast
    );
  };

  return (
    <KeyboardAwareScrollView>
      <ScrollView>
        <SafeAreaView style={styles.body}>
          <View style={styles.container}>
            <Text style={styles.login}>Sign up</Text>

            <Text style={styles.outsidebox}>Name</Text>
            <TextInput
              style={styles.box}
              placeholder=" Enter your name"
              placeholderTextColor="#858585"
              onChangeText={(name) => setUser({ ...user, name: name })}
            />

            <Text style={styles.outsidebox}>Email</Text>
            <TextInput
              style={styles.box}
              placeholder=" Enter email"
              placeholderTextColor="#858585"
              onChangeText={(email) => setUser({ ...user, email: email })}
            />

            <Text style={styles.outsidebox}>Password</Text>
            <TextInput
              style={styles.box}
              secureTextEntry={true}
              placeholder=" Password"
              placeholderTextColor="#858585"
              onChangeText={(password) =>
                setUser({ ...user, password: password })
              }
            />

            <Pressable onPress={handleSubmit}>
              <Text
                style={{
                  color: "#ffff",
                  alignSelf: "center",
                  textAlignVertical: "center",
                  fontSize: 20,
                }}
              >
                Create account
              </Text>
            </Pressable>

            <Center>
              <HStack>
                <Text style={styles.signup}> Have an account? </Text>
                <Pressable onPress={() => navigation.navigate("Signin")}>
                  <Text style={{ color: "#ffff" }}> Sign in</Text>
                </Pressable>
              </HStack>
            </Center>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    marginLeft: 10,
  },
  body: {
    height: 900,
    backgroundColor: "lightblue",
    flex: 1,
  },
  box: {
    marginHorizontal: 16,
    borderWidth: 3,
    padding: 10,
    margin: 10,
    marginBottom: 20,
    color: "#858585",
    textAlign: "left",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: 65,
    borderColor: "white",
    backgroundColor: "lightgrey",
  },
  button: {
    marginHorizontal: 17,
    marginTop: 40,
    textAlign: "center",
    margin: 10,
    color: "#ffff",
    borderRadius: 10,
    height: 55,
    padding: 15,
    backgroundColor: "#4B0082",
  },
  outsidebox: {
    marginHorizontal: 22,
    color: "white",
  },
  signup: {
    alignContent: "center",
    textAlign: "center",
    color: "#858585",
  },
  login: {
    marginBottom: 50,
    color: "#ffff",
    marginLeft: 25,
    fontSize: 35,
    fontWeight: "bold",
  },
});

export default Signup;
