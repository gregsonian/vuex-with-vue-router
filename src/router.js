import Vue from "vue";
import Router from "vue-router";
import LoginScreen from "./components/VendingMachineLogin.vue";
import AdminScreen from "./components/VendingMachineAdmin.vue";
import store from "./store";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "AdminScreen",
    component: AdminScreen,
    meta: {
      authRequired: true
    }
  },
  {
    path: "/login",
    name: "LoginScreen",
    component: LoginScreen
  }
];

const router = new Router({
  routes,
  mode: "history"
});

// create a navigation guard here //
router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some(route => route.meta.authRequired);
  if (authRequired === false) {
    return next();
  }
  console.log(store.getters["isLoggedIn"]);
  if (store.getters["isLoggedIn"] === false) {
    next("/login");
  } else {
    next();
  }
});

export default router;
