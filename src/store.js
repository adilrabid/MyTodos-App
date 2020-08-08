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
    loginError: false,
    signupError: false,
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
          context.dispatch("createUserDB", formdata); // creating a user database in the realtime database
          router.push("/login");
        })
        .catch((error) => {
          console.log(error);
          context.state.signupError = true;
        });
    },
    createUserDB: (context, formData) => {
      console.log("createUserDB point 1");
      if (!context.state.tempIdToken) {
        return "Something went wrong!";
      }
      console.log("createUserDB point 2");
      // some test code here :
      let userLocalid = context.state.localId;
      let data = {
        uid: userLocalid,
        email: formData.email,
        username: formData.username,
        tnc: formData.tnc,
        profilePic: "",
        todos: [{ todo1: "Go to school" }],
      };
      axiosDB
        .post("userData.json?auth=" + context.state.tempIdToken, data)
        .then((response) => {
          console.log(response);
          console.log("new user database created");
        })
        .catch((error) => {
          console.log(error);
          console.log("user database couldn't be created");
        });
    },
    login: (context, formdata) => {
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
          console.log("Localstoraged token : ", context.state.idToken);
          console.log("Temorery storaged token : ", context.state.tempIdToken);
          router.push("/dashboard");
        })
        .catch((error) => {
          console.log(error);
          context.state.loginError = true;
        });
    },
    getUserData: (context) => {
      console.log("getuserdata called at component initialization");
      if (!context.state.idToken) {
        return "Something went wrong!";
      }
      axiosDB
        .get("userData.json?auth=" + context.state.idToken)
        .then((response) => {
          const alldata = response.data;
          console.log("alldata", alldata);
          const userData = [];
          for (let uid in alldata) {
            const data = alldata[uid];
            data.uid = uid;
            console.log(data);
            userData.push(data);
          }
          console.log("userData[0]:", userData[0]);
          context.commit("storeUserData", userData[0]);
        })
        .catch((error) => {
          console.log(error);
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
    storeUserData: (state, userData) => {
      state.userData = userData;
    },
  },
  getters: {
    userData: (state) => {
      return state.userData;
    },
  },
});
