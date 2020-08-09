import Vue from "vue";
import Vuex from "vuex";
import axiosDB from "axios";
import axiosAuth from "./axiosAuth";
import { router } from "./main.js";
Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    idToken: localStorage.getItem("idToken"),
    localId: localStorage.getItem("localId"),
    tempIdToken: null,
    tempLocalId: null,
    tempSignupIdToken: null,
    tempSignupLocalId: null,
    loginError: false,
    signupError: false,
    userData: null,
    loadingState: false,
    loadingStateMsg: "",
  },
  actions: {
    signup: (context, formdata) => {
      axiosAuth
        .post("/accounts:signUp?key=AIzaSyDYv5ceogTvWLnsJe_vN7A1Kau-HpC9z44", {
          email: formdata.email,
          password: formdata.password,
          returnSecureToken: true,
        })
        .then((response) => {
          console.log(response, "signup success");
          context.commit("setTempUserTokenSignup", {
            idToken: response.data.idToken,
            localId: response.data.localId,
          });
          context.dispatch("createUserDB", formdata); // creating a user database in the realtime database
        })
        .catch((error) => {
          console.log(error);
          context.state.signupError = true;
        });
    },
    createUserDB: (context, formData) => {
      console.log("createUserDB point 1");
      if (!context.state.tempSignupIdToken) {
        return "Something went wrong!";
      }
      console.log("createUserDB point 2");
      // some test code here :
      let data = {
        uid: context.state.tempSignupLocalId,
        email: formData.email,
        username: formData.username,
        tnc: formData.tnc,
        profilePic: "",
        todos: [{ todo1: "Go to school" }],
      };
      axiosDB
        .post("userData.json?auth=" + context.state.tempSignupIdToken, data)
        .then((response) => {
          console.log("new user database created");
          router.push("/login");
          return response;
        })
        .catch((error) => {
          console.log("user database couldn't be created");
          return error;
        });
    },
    login: (context, formdata) => {
      context.state.loadingStateMsg = "Logging in...";
      context.state.loadingState = true;
      console.log("login Action entered");
      axiosAuth
        .post(
          "/accounts:signInWithPassword?key=AIzaSyDYv5ceogTvWLnsJe_vN7A1Kau-HpC9z44",
          {
            email: formdata.email,
            password: formdata.password,
            returnSecureToken: true,
          }
        )
        .then((response) => {
          context.commit("setTempUserToken", {
            idToken: response.data.idToken,
            localId: response.data.localId,
          });
          context.commit("setUserToken", {
            idToken: response.data.idToken,
            localId: response.data.localId,
          });
          console.log("Login success");
          router.push("/dashboard");
        })
        .catch((error) => {
          console.log(error);
          context.state.loginError = true;
        });
    },
    getUserData: (context) => {
      console.log("getuserdata called at component initialization");
      if (!context.state.tempIdToken && !context.state.idToken) {
        console.log("getUserData action discontinued");
        return "Something went wrong!";
      }
      console.log("getUserData action continued");
      axiosDB
        .get("userData.json?auth=" + context.getters.getAvailableIdToken)
        .then((response) => {
          const alldata = response.data;
          console.log("typeof alldata : ", typeof alldata);
          console.log(alldata);
          let userData = null;
          for (let dbId in alldata) {
            const data = alldata[dbId];
            data.dbId = dbId;
            console.log("data.uid : ", data.uid);
            console.log("data : ", data);
            if (data.uid == localStorage.getItem("localId")) {
              userData = data;
              localStorage.setItem("dbId", dbId);
            }
          }
          console.log("userData : ", typeof userData, userData);
          context.commit("storeUserData", userData);
        })
        .catch((error) => {
          console.log("getUserData action error");
          console.log(error);
        });
    },
    storeTodo: (context, todos) => {
      console.log("storeTodo entered");
      if (!context.state.tempIdToken && !context.state.idToken) {
        console.log("storeTodo action discontinued");
        return "Something went wrong!";
      }
      console.log("storeTodo step1 localid detected");
      axiosDB
        .post(
          "userData/" +
            localStorage.getItem("dbId") +
            ".json?auth=" +
            context.getters.getAvailableIdToken,
          todos
        )
        .then((response) => {
          console.log("storing success", response);
        })
        .catch((error) => {
          console.log("storing failed", error);
        });
    },
  },
  mutations: {
    setUserToken: (state, authTokens) => {
      localStorage.setItem("idToken", authTokens.idToken);
      localStorage.setItem("localId", authTokens.localId);
    },
    setTempUserToken: (state, authTokens) => {
      state.tempIdToken = authTokens.idToken;
      state.tempLocalId = authTokens.localId;
    },
    setTempUserTokenSignup: (state, authTokens) => {
      state.tempSignupIdToken = authTokens.idToken;
      state.tempSignupLocalId = authTokens.localId;
    },
    storeUserData: (state, data) => {
      state.userData = data;
      state.loadingState = false;
    },
  },
  getters: {
    getAvailableIdToken: (state) => {
      if (state.tempIdToken) {
        return state.tempIdToken;
      } else {
        return state.idToken;
      }
    },
    userData: (state) => {
      return state.userData;
    },
  },
});
