import Vue from "vue";
import App from "./App.vue";
import VueLidate from "vuelidate";
import VueRouter from "vue-router";
import axios from "axios";
import { routes } from "./routes";
import { store } from "./store";
// font awesome packages
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

Vue.config.productionTip = false;
Vue.use(VueLidate);
Vue.use(VueRouter);
library.add(fas, fab, far);
dom.watch();
Vue.component("font-awesome-icon", FontAwesomeIcon);
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
