import axios from "axios";

//export const baseURL = "http://localhost:8080/";
export const baseURL = "http://192.168.100.22:8080/";
// export const baseURL = "http://192.168.8.130:8080/";

export const instance = axios.create({
  baseURL: `${baseURL}api`,
});
