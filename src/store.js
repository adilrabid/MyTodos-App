import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {
    signup: (formdata) => {
      console.log("Form submit attemped");
      axios
        .post("/accounts:signUp?key=AIzaSyDYv5ceogTvWLnsJe_vN7A1Kau-HpC9z44", {
          email: formdata.email,
          password: formdata.password,
          returnSecureToken: true,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    login: (formdata) => {
      axios
        .post(
          "/accounts:signInWithPassword?key=AIzaSyDYv5ceogTvWLnsJe_vN7A1Kau-HpC9z44",
          {
            email: formdata.email,
            password: formdata.password,
            returnSecureToken: true,
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  actions: {
    signup: (context, formdata) => {
      context.commit("signup", formdata);
    },
    login: (context, formdata) => {
      context.commit("login", formdata);
    },
  },
});
