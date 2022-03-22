import { makeAutoObservable } from "mobx";
import { instance } from "./instance";
import decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStore {
  user = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser = async (token) => {
    try {
      await AsyncStorage.setItem("myToken", token);
      this.user = decode(token);
      instance.defaults.headers.common.Authorization = `jwt ${token}`;
      console.log(instance.defaults.headers.common.Authorization);
    } catch (error) {
      console.log(error);
    }
  };

  signup = async (userData, navigation) => {
    try {
      const res = await instance.post("/users/signup", userData);
      const { token } = res.data;
      this.setUser(token);
      navigation.replace("QueuList");
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
    }
  };

  signout = async () => {
    try {
      instance.defaults.headers.common.Authorization = null;
      this.user = null;
      AsyncStorage.removeItem("token");
    } catch (error) {
      console.log(error);
    }
  };
  // check the token expiraition or user logout
  checkForToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("token", token);
      if (token) {
        const decodedToken = decode(token);
        if (Date.now() < decodedToken.exp) {
          this.setUser(token);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
}

const authStore = new AuthStore();
authStore.checkForToken();
export default authStore;
