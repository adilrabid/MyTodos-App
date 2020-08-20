import Vue from "vue";
import App from "./App.vue";
import VueLidate from "vuelidate";
import VueRouter from "vue-router";
import axios from "axios";
import { routes } from "./routes";
import { store } from "./store";

Vue.config.productionTip = false;
Vue.use(VueLidate);
Vue.use(VueRouter);

axios.defaults.baseURL = "https://mytodos-7797f.firebaseio.com/";

export const router = new VueRouter({
  routes,
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      //checks if there is any saved position
      return savedPosition;
    }
    if (to.hash) {
      //check if hash is specified
      return { selector: to.hash };
    }
    // otherwise default will be (0,0) co-ordinate
    return { x: 0, y: 0 };
  },
});

export const dateTime = new Date();

export const ImageReader = new FileReader();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
