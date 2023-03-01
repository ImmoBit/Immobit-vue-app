import Vue from "vue";
import VueRouter from "vue-router";
import List from "../views/list.vue";
import adminPanel from "../views/adminPanel.vue";
import House from "../views/housePage.vue";
import Home from "../views/home.vue";
import terms from "../views/terms.vue";
import CreateProperty from '../views/createProperty.vue'
import privacyPolicy from "../views/privacyPolicy.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    name: "Home",
    component: Home
  },
  {
    path: "/create-property",
    name: "CreateProperty",
    component: CreateProperty
  },
  {
    path: "/list",
    name: "List",
    component: List
  },
  {
    path: "/house/:id",
    name: "House",
    component: House
  },
  {
    path: "/admin",
    name: "admin-panel",
    component: adminPanel
  },
  {
    path: "/terms",
    name: "terms",
    component: terms
  },
  {
    path: "/privacy-policy",
    name: "privacy-policy",
    component: privacyPolicy
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
