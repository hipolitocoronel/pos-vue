// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Sales from "../views/Sales.vue";
import Products from "../views/Products.vue";
import Users from "../views/Users.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Sales,
  },
  {
    path: "/sales",
    name: "Sales",
    component: Sales,
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
  {
    path: "/config",
    name: "Config",
    component: Sales,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
