import SignUp from "./components/SignUp.vue";
import Login from "./components/Login.vue";
import Welcome from "./components/Welcome.vue";
import Dashboard from "./components/Dashboard/Dashboard.vue";

export const routes = [
  { path: "", component: Welcome },
  { path: "/signup", component: SignUp },
  { path: "/login", component: Login },
  { path: "/dashboard", component: Dashboard }, // sending params with route
  //   { path: "/*", redirect: "/" },
];
