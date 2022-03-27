import { makeAutoObservable } from "mobx";
import { instance } from "./instance";
import decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

class AuthStore {
  user = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser = async (token) => {
    try {
      await AsyncStorage.setItem("token", token);
      this.user = decode(token);
      instance.defaults.headers.common.Authorization = `jwt ${token}`;
    } catch (error) {
      console.log(error);
    }
  };
  //check if there is a token, send it to the user Header, navigate the user to Que list page.
  onLoadSignIn = async (navigation) => {
    try {
      const tokenIsValid = await this.checkForToken();
      if (tokenIsValid) {
        navigation.replace("QueueList");
      }
    } catch (error) {
      console.log(error);
    }
  };

  signup = async (userData, navigation) => {
    try {
      const res = await instance.post("/users/signup", userData);
      const { token } = res.data;
      this.setUser(token);
      navigation.replace("QueueList");
    } catch (error) {
      console.log(error);
    }
  };

  signin = async (userData, navigation) => {
    try {
      const res = await instance.post("/users/signin", userData);

      const { token } = res.data;
      await this.setUser(token);

      navigation.replace("QueueList");
    } catch (error) {
      console.log(error);
      Alert.alert("Wrong Input", "incorrect Email or Password..Try Again!");
    }
  };

  signout = async (navigation) => {
    try {
      instance.defaults.headers.common.Authorization = null;
      this.user = null;
      AsyncStorage.removeItem("token");
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };
  // check the token expiraition or user logout
  checkForToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const decodedToken = decode(token);
        if (Date.now() < decodedToken.exp) {
          await this.setUser(token);
          return Promise.resolve(true);
        }
      }
      return Promise.resolve(false);
    } catch (error) {
      console.log(error);
      Promise.reject(error);
    }
  };
}

const authStore = new AuthStore();
authStore.checkForToken();
export default authStore;
