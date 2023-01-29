import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Axios from "axios";
import VueMeta from "vue-meta";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import {
  required,
  email,
  alpha,
  alpha_num as alphaNum,
  confirmed,
  numeric,
  alpha_spaces,
  regex,
  min,
  image
} from "vee-validate/dist/rules";
extend("required", required);
extend("email", email);
extend("alpha", alpha);
extend("alphaNum", alphaNum);
extend("confirmed", confirmed);
extend("numeric", numeric);
extend("alpha_spaces", alpha_spaces);
extend("regex", regex);
extend("min", min);
extend("image", image);

import "./registerServiceWorker";
import VFacebookLogin from "vue-facebook-login-component";
import "./assets/formatPrice";
Vue.component("VFacebookLogin", VFacebookLogin);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
Vue.use(VueMeta);

Vue.config.productionTip = false;
Axios.defaults.baseURL = "http://3.249.239.202:8080/api";

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
