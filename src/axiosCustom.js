import axios from "axios";
const axiosAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1",
});
const axiosStorage = axios.create({
  baseURL: "gs://mytodos-7797f.appspot.com",
});
export { axiosAuth, axiosStorage };
