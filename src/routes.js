import { store } from "./store";

import SignUp from "./components/SignUp.vue";
import Login from "./components/Login.vue";
import Welcome from "./components/Welcome.vue";
import Dashboard from "./components/Dashboard/Dashboard.vue";

export const routes = [
  {
    path: "",
    component: Welcome,
    beforeEnter(to, from, next) {
      if (store.state.tempIdToken || localStorage.getItem("idToken")) {
        next("/dashboard");
      } else {
        next();
      }
    },
  },
  {
    path: "/signup",
    component: SignUp,
    beforeEnter(to, from, next) {
      if (store.state.tempIdToken || localStorage.getItem("idToken")) {
        next("/dashboard");
      } else {
        next();
      }
    },
  },
  {
    path: "/login",
    component: Login,
    beforeEnter(to, from, next) {
      if (store.state.tempIdToken || localStorage.getItem("idToken")) {
        next("/dashboard");
      } else {
        next();
      }
    },
  },
  {
    path: "/dashboard",
    component: Dashboard,
    beforeEnter(to, from, next) {
      if (store.state.tempIdToken || localStorage.getItem("idToken")) {
        next();
      } else {
        next("/login");
      }
    },
  }, // sending params with route
  { path: "/*", redirect: "/" },
];
