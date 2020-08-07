import Vue from "vue";
import Vuex from "vuex";
import axiosDB from "axios";
import axiosAuth from "./axiosAuth";
Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    idToken: localStorage.getItem("idToken"),
    localId: localStorage.getItem("localId"),
    userData: null,
    currentUserEmail: "",
    textObj: "",
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
          context.commit("setUserToken", {
            idToken: response.data.idToken,
            localId: response.data.localId,
          });
          context.dispatch("postUserData", formdata); // Posting user data ot the realtime database
        })
        .catch((error) => {
          console.log(error, "something went wromg");
        });
    },
    postUserData: (context, formData) => {
      if (!context.state.idToken) {
        return "Something went wrong!";
      }
      axiosDB
        .post("userData.json?auth=" + context.state.idToken, formData)
        .then((response) => {
          console.log(response);
          context.state.currentUserEmail = formData.email; //this is for testing purpose
        })
        .catch((error) => {
          console.log(error);
        });
    },
    login: (context, formdata) => {
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
          console.log(response, "Login success");
          context.commit("setUserToken", {
            idToken: response.data.idToken,
            localId: response.data.localId,
          });
        })
        .catch((error) => {
          console.log(error, "login failed");
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
      // state.idToken = authTokens.idToken;
      // state.localId = authTokens.localId;
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
