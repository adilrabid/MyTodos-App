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
          context.commit("authUser", {
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
          const userData = [];
          for (let uid in alldata) {
            const data = alldata[uid];
            data.uid = uid;
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
    setUserToken: (state, authData) => {
      localStorage.setItem("idToken", authData.idToken);
      localStorage.setItem("localId", authData.localId);
      // state.idToken = authData.idToken;
      // state.localId = authData.localId;
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
