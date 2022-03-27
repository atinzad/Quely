import axios from "axios";

//export const baseURL = "http://localhost:8080/";
export const baseURL = "http://192.168.100.22:8080/";
//export const baseURL = "http://192.168.8.130:8080/";

export const instance = axios.create({
  baseURL: `${baseURL}api`,
});

//export const baseFormURL = "http://localhost:8000/";
export const baseFormURL = "http://192.168.100.22:8000/";
//export const baseFormURL = "http://192.168.8.130:8000/";
