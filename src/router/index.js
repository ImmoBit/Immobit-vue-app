import Vue from "vue";
import VueRouter from "vue-router";
import List from "../views/list.vue";
import adminPanel from "../views/adminPanel.vue";
import House from "../views/housePage.vue";
import Home from "../views/home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    name: "Home",
    component: Home
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
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
