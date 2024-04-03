import axios from "axios";
const baseURL = "http://localhost:3001/api";

export default axios.create({
  baseURL,
});

export const privateAxios = axios.create({
  baseURL,
  withCredentials: true,
});
