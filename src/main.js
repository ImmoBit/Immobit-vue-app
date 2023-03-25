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
extend("email", {...email,
          message: 'Veuillez entrez un email valid'
        }); 
extend("name", {...alpha,
      message: 'Veuillez entrez un nom ou prénom valid'
    }); 

extend("alpha", alpha);
extend("alphaNum", alphaNum);
extend("username", {...alphaNum, 
      message: 'Le pseudonym doit contenir just les lettres et chiffres'
    });

extend("confirmed", {...confirmed,
message: 'Veuillez confirmer votre mot de pass'});
extend("numeric", numeric);
extend("phone", {
  validate(value) {
    return (/^\+[0-9]+/.test(value) || /[0-9]+/.test(value)) && value.length <= 15 && value.length >= 6
  },
message: 'Veuillez entrez un numéro de téléphone valid'});

extend("alpha_spaces", alpha_spaces);
extend("regex", regex);
extend("min", min);
extend("max", max);
extend("image", image);
extend('rentPriceDay', {
  validate(value) {
    return /[0-9]+/.test(value.toString().replace(/\s+/g, "")) 
    && Number(value.toString().replace(/\s+/g, "")) > 1000 && Number(value.toString().replace(/\s+/g, "")) < 100000 ;
  },
  message: 'entre 10 00 دج et 100 000 دج'
});
extend('rentPriceMonth', {
  validate(value) {
    return /[0-9]+/.test(value.toString().replace(/\s+/g, "")) 
    && Number(value.toString().replace(/\s+/g, "")) > 10000 && Number(value.toString().replace(/\s+/g, "")) < 500000 ;
  },
  message: 'entre 10 000 دج et 500 000 دج'
});
extend('sellPrice', {
  validate(value) {
    return /[0-9]+/.test(value.toString().replace(/\s+/g, "")) 
    && Number(value.toString().replace(/\s+/g, "")) > 0 && Number(value.toString().replace(/\s+/g, "")) < 999 ;
  },
  message: 'entre 0 et 999'
});

extend('sellPriceB', {
  validate(value) {
    return  /[0-9]+/.test(value.toString())
    && Number(value.toString().replace(/\s+/g, "")) > 0 && Number(value.toString().replace(/\s+/g, "")) < 50 ;
  },
  message: 'entre 0 et 50'
});

extend('filesNumber', {
  validate(value) {
    return !!value && value.length >= 5 && value.length <= 20;
  },
  message: ""
});
extend('password', {
  validate(value) {
    return !!value && value.length >= 8 && !/\s/.test(value);
  },
  message: "Le mot de pass doit contenir au moins 8 caractères et non d'espace."

})


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
