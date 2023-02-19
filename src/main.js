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
  max,
  image
} from "vee-validate/dist/rules";
extend("required", {...required,
message: 'Ce champ est obligatoire'} );
extend("email", email); 
extend("alpha", alpha);
extend("alphaNum", alphaNum);
extend("confirmed", confirmed);
extend("numeric", numeric);
extend("alpha_spaces", alpha_spaces);
extend("regex", regex);
extend("min", min);
extend("max", max);
extend("image", image);
extend('price', {
  validate(value) {
    return /[0-9]+/.test(value.toString().replace(/\s+/g, "")) 
    && Number(value.toString().replace(/\s+/g, "")) > 10000 && Number(value.toString().replace(/\s+/g, "")) < 500000 ;
  },
  message: 'Le prix doit etre compris entre 10 000DA et 500 000DA'
});
extend('filesNumber', {
  validate(value) {
    return !!value && value.length >= 5 && value.length <= 20;
  },
  message: ""
});


import "./registerServiceWorker";
import VFacebookLogin from "vue-facebook-login-component";
import "./assets/formatPrice";
Vue.component("VFacebookLogin", VFacebookLogin);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
Vue.use(VueMeta);

Vue.config.productionTip = false;
Axios.defaults.baseURL = `${process.env.VUE_APP_API_URL}/api`;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
