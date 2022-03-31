import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Heading, VStack } from "native-base";
import { observer } from "mobx-react";
import authStore from "../../stores/authStore";
import { useEffect } from "react";

const Home = ({ navigation }) => {
  const handlePass = () => {
    Alert.alert("Welcome");
  };
  useEffect(() => {
    authStore.onLoadSignIn(navigation);
  }, []);
  return (
    <VStack
      space={10}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3f93a2",
      }}
    >
      <Image
        style={{ width: 150, height: 150, marginBottom: 50 }}
        source={require("../../assets/logo3.png")}
      />

      {authStore.user ? (
        <VStack space={10}>
          <Pressable
            onPress={() => {
              navigation.navigate("QueueList");
            }}
          >
            <View style={styles.button}>
              <Text style={styles.text}>Go to my Queue</Text>
            </View>
          </Pressable>
          <Pressable onPress={authStore.signout}>
            <View style={styles.button}>
              <Text style={styles.text}>Sign out</Text>
            </View>
          </Pressable>
        </VStack>
      ) : (
        <VStack space={10}>
          <Pressable
            onPress={() => {
              navigation.navigate("Signin");
            }}
          >
            <View style={styles.button}>
              <Text style={styles.text}>Sign in</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Signup")}>
            <View style={styles.button}>
              <Text style={styles.text}>Sign up</Text>
            </View>
          </Pressable>
        </VStack>
      )}
      <Pressable
        onPress={() => navigation.navigate(authStore.user ? "Queues" : signin)}
      ></Pressable>
    </VStack>
    //OLD CODE START......................
    // <ImageBackground
    //   source={{
    //     uri: "https://wallpaperaccess.com/full/1503184.jpg",
    //     alt: "img",
    //   }}
    //   style={styles.container}
    // >
    //   {/* <Center> */}
    //   <Heading color="white" padding="6">
    //     join Quely!
    //   </Heading>
    //   <View>
    //     {authStore.user ? (
    //       <View>
    //         <Button
    //           backgroundColor="#0d98ba"
    //           onPress={() => {
    //             navigation.navigate("QueueList");
    //           }}
    //         >
    //           Go to my Queue
    //         </Button>
    //         <Button onPress={authStore.signout}>Sign Out</Button>
    //       </View>
    //     ) : (
    //       <Button
    //         onPress={() => {
    //           navigation.navigate("Signin");
    //         }}
    //       >
    //         Sign In
    //       </Button>
    //     )}
    //   </View>
    // {/* <Pressable
    //   style={{ width: "100%", height: "100%" }}
    //   onPress={() => navigation.navigate(authStore.user ? "Queues" : signin)}
    // ></Pressable> */}
    //   {/* </Center> */}
    // </ImageBackground>
    //OLD CODE END......................
  );
};

export default observer(Home);

const styles = StyleSheet.create({
  button: {
    width: 300,
    height: 70,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    /* identical to box height */
    color: "#3F93A2",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.8,
  },
});
