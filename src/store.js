import Vue from "vue";
import Vuex from "vuex";
import axiosDB from "axios";
import { axiosAuth, axiosStorage } from "./axiosCustom";
import { router } from "./main.js";
import { dateTime } from "./main.js";
// all images
import img1 from "./assets/img/sea.jpg";
import img2 from "./assets/img/night.jpg";
import img3 from "./assets/img/green.jpg";
import img4 from "./assets/img/sunrise.jpg";
import img5 from "./assets/img/fairy.jpg";

import logo1 from "./assets/logos/vuejs.png";
import logo2 from "./assets/logos/firebase.png";
import logo3 from "./assets/logos/vuex.png";
import logo4 from "./assets/logos/vuelidate.png";
import logo5 from "./assets/logos/axios.png";
import logo6 from "./assets/logos/fontawesome.png";

import defaultProfilePic from "./assets/user.png";
import WelcomeCoverPic from "./assets/cover.jpg";
Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    CoverPic: WelcomeCoverPic,
    logos: [logo1, logo2, logo3, logo4, logo5, logo6],
    showSidepanel: false,
    idToken: localStorage.getItem("idToken"),
    localId: localStorage.getItem("localId"),
    dbId: localStorage.getItem("dbId"),
    tempIdToken: null,
    tempLocalId: null,
    tempSignupIdToken: null,
    tempSignupLocalId: null,
    loginError: false,
    signupError: false,
    userData: "",
    loadingState: false,
    loadingStateMsg: "",
    todos: "",
    month: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    show_lists: "myday",
    todoCount: {
      myday: "",
      important: "",
      completed: "",
      due: "",
    },
    theme: "",
    //for AllLists
    backGround: "",
    // for todo details
    todoClicked: false,
    clickedTodoIndex: null,
    clickedTodoKey: null,
    dateTimeString_dateCreated: "",
    dateTimeString_dueDate: "",
    // for settings
    BG: [img1, img2, img3, img4, img5],
    settingsClicked: false,
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
          context.commit("setTempUserTokenSignup", {
            idToken: response.data.idToken,
            localId: response.data.localId,
          });
          context.dispatch("createUserDB", formdata); // creating a user database in the realtime database
        })
        .catch((error) => {
          context.state.signupError = true;
          return error;
        });
    },
    createUserDB: (context, formData) => {
      if (!context.state.tempSignupIdToken) {
        return "Something went wrong!";
      }
      // some test code here :
      let data = {
        uid: context.state.tempSignupLocalId,
        email: formData.email,
        username: formData.username,
        tnc: formData.tnc,
        profilePic: "",
        todos: [],
        bgUrl: img5,
        theme: "light",
      };
      axiosDB
        .post("userData.json?auth=" + context.state.tempSignupIdToken, data)
        .then((response) => {
          router.push("/login");
          return response;
        })
        .catch((error) => {
          return error;
        });
    },
    login: (context, formdata) => {
      context.state.loadingStateMsg = "Logging in...";
      context.state.loadingState = true;
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
          if (response.status === 200) {
            context.commit("setTempUserToken", {
              idToken: response.data.idToken,
              localId: response.data.localId,
            });
            context.commit("setUserToken", {
              idToken: response.data.idToken,
              localId: response.data.localId,
            });
            router.push("/dashboard");
          }
        })
        .catch(() => {
          context.state.loginError = true;
          context.state.loadingState = false;
        });
    },
    getUserData: (context) => {
      if (!context.state.tempIdToken && !context.state.idToken) {
        return "Something went wrong!";
      }
      axiosDB
        .get("userData.json?auth=" + context.getters.getAvailableIdToken)
        .then((response) => {
          const alldata = response.data;
          let userData = null;
          for (let dbId in alldata) {
            const data = alldata[dbId];
            data.dbId = dbId;
            if (data.uid == localStorage.getItem("localId")) {
              userData = data;
              localStorage.setItem("dbId", dbId);
            }
          }
          context.dispatch("getTodos");
          context.commit("storeUserData", userData);
        })
        .catch((error) => {
          if (
            localStorage.getItem("idToken") &&
            localStorage.getItem("localId") &&
            localStorage.getItem("dbId")
          ) {
            console.warn("Session Expired!");
            localStorage.removeItem("idToken");
            localStorage.removeItem("localId");
            localStorage.removeItem("dbId");
            context.state.tempIdToken = null;
            router.push("/login");
          }
          return error;
        });
    },
    storeTodo: (context, todo) => {
      if (!context.state.tempIdToken && !context.state.idToken) {
        return "Something went wrong!";
      }
      axiosDB
        .post(
          "userData/" +
            localStorage.getItem("dbId") +
            "/todos.json?auth=" +
            context.getters.getAvailableIdToken,
          todo
        )
        .then((response) => {
          context.dispatch("getTodos");
          return response;
        })
        .catch((error) => {
          return error;
        });
    },
    getTodos: (context) => {
      if (!context.state.tempIdToken && !context.state.idToken) {
        return "Something went wrong!";
      }
      let query =
        "userData/" +
        localStorage.getItem("dbId") +
        "/todos.json?auth=" +
        context.getters.getAvailableIdToken;
      axiosDB
        .get(query)
        .then((response) => {
          const todos = response.data;
          let allTodos = [];
          let index = 0;
          for (let key in todos) {
            let todo = todos[key];
            let checkDue = dateTime.getTime() - todo.dueDate;
            if (todo.completed) {
              todo.status = "Completed";
            } else {
              if (checkDue > 0) {
                todo.status = "Due";
              } else {
                todo.status = "Incomplete";
              }
            }
            todo.index = index;
            todo.key = key;
            allTodos.push(todo);
            index++;
          }
          context.commit("storeTodos", allTodos);
          context.state.todoClicked = false;
        })
        .catch((error) => {
          return error;
        });
    },
    deleteTodo: (context) => {
      if (!context.state.tempIdToken && !context.state.idToken) {
        return "Something went wrong!";
      }
      axiosDB
        .delete(
          "userData/" +
            localStorage.getItem("dbId") +
            "/todos/" +
            context.state.clickedTodoKey +
            ".json?auth=" +
            context.getters.getAvailableIdToken
        )
        .then((response) => {
          context.dispatch("getTodos");
          return response;
        });
    },
    updateTodo: (context, value) => {
      if (!context.state.tempIdToken && !context.state.idToken) {
        return;
      }
      let todoKey = context.state.clickedTodoKey;
      axiosDB
        .put(
          "userData/" +
            localStorage.getItem("dbId") +
            "/todos/" +
            todoKey +
            ".json?auth=" +
            context.getters.getAvailableIdToken,
          value
        )
        .then((response) => {
          context.dispatch("getTodos");
          return response;
        });
    },
    saveSettings: (context, value) => {
      if (!context.state.tempIdToken && !context.state.idToken) {
        return;
      }
      axiosDB
        .put(
          "userData/" +
            localStorage.getItem("dbId") +
            ".json?auth=" +
            context.getters.getAvailableIdToken,
          value
        )
        .then((response) => {
          context.state.settingsClicked = false;
          return response;
        })
        .catch((error) => {
          return error;
        });
    },
    uploadProfilePic: (context, value) => {
      if (!context.state.tempIdToken && !context.state.idToken) {
        return;
      }

      axiosStorage
        .put(
          "profilepic.json?auth=" + context.getters.getAvailableIdToken,
          value
        )
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error;
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
      state.theme = data.theme;
      state.loadingState = false;
    },
    storeTodos: (state, data) => {
      state.todos = data;
    },
    msToActual_creationDate(state, value) {
      const createDate = new Date(value);
      let date =
        createDate.getDate() +
        " " +
        state.month[createDate.getMonth()] +
        " " +
        createDate.getFullYear();
      let time = createDate.toLocaleTimeString();
      state.dateTimeString_dateCreated = { date, time };
    },
    msToActual_dueDate(state, value) {
      const dueDate = new Date(value);
      let date =
        dueDate.getDate() +
        " " +
        state.month[dueDate.getMonth()] +
        " " +
        dueDate.getFullYear();

      let onlyDate =
        dueDate.getFullYear() +
        "-" +
        addZeroBefore(dueDate.getMonth() + 1) +
        "-" +
        addZeroBefore(dueDate.getDate());

      let time = dueDate.toLocaleTimeString();
      let onlyTime =
        addZeroBefore(dueDate.getHours()) +
        ":" +
        addZeroBefore(dueDate.getMinutes());

      function addZeroBefore(num) {
        if (num < 10) {
          return "0" + num;
        }
        return num;
      }

      state.dateTimeString_dueDate = { date, onlyDate, time, onlyTime };
    },
    setBG(state, url) {
      state.backGround = url;
    },
    showDetails(state, index) {
      state.clickedTodoKey = state.todos[index].key;
      state.clickedTodoIndex = index;
      state.todoClicked = true;
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
    getStoredTodos: (state) => {
      return state.todos;
    },
    getBG(state) {
      return state.userData.bgUrl;
    },
    getProfilePic(state) {
      if (state.userData.profilePic) {
        return state.userData.profilePic;
      }
      return defaultProfilePic;
    },
    namedDateMonth() {
      let day = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thirsday",
        "Friday",
        "Saturday",
      ];
      let month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return { day, month };
    },
    currentDate(state, getters) {
      let date =
        getters.namedDateMonth.day[dateTime.getDay()] +
        ", " +
        dateTime.getDate() +
        " " +
        getters.namedDateMonth.month[dateTime.getMonth()] +
        " " +
        dateTime.getFullYear();
      let time =
        dateTime.getHours() +
        ":" +
        dateTime.getMinutes() +
        ":" +
        dateTime.getSeconds();
      return { date, time };
    },
    dateTimeString_dateCreated(state) {
      return state.dateTimeString_dateCreated;
    },
    dateTimeString_dueDate(state) {
      return state.dateTimeString_dueDate;
    },
  },
});
