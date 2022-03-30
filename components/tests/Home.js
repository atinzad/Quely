import { Alert, ImageBackground, StyleSheet, Text, View } from "react-native";
import { Button, Heading } from "native-base";
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
    <ImageBackground
      source={{
        uri: "https://wallpaperaccess.com/full/1503184.jpg",
        alt: "img",
      }}
      style={styles.container}
    >
      {/* <Center> */}
      <Heading color="white" padding="6">
        join Quely!
      </Heading>
      <View>
        {authStore.user ? (
          <View>
            <Button
              backgroundColor="#0d98ba"
              onPress={() => {
                navigation.navigate("QueueList");
              }}
            >
              Go to my Queue
            </Button>
            <Button onPress={authStore.signout}>Sign Out</Button>
          </View>
        ) : (
          <Button
            onPress={() => {
              navigation.navigate("Signin");
            }}
          >
            Sign In
          </Button>
        )}
      </View>
      {/* <Pressable
        style={{ width: "100%", height: "100%" }}
        onPress={() => navigation.navigate(authStore.user ? "Queues" : signin)}
      ></Pressable> */}
      {/* </Center> */}
    </ImageBackground>
  );
};

export default observer(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.8,
  },
});
