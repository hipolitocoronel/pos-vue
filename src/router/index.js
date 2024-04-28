// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Sales from "../views/Sales.vue";
import Products from "../views/Products.vue";
import Users from "../views/Users.vue";
import OneUser from "../views/OneUser.vue";

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
    children: [
      { path: "", name: "users.index", component: Users },
      {
        path: "create",
        name: "users.create",
        component: OneUser,
      },
      {
        path: "update/:id",
        name: "users.update",
        component: OneUser,
      },
      {
        path: "delete/:id",
        name: "users.delete",
        component: Users,
      },
    ],
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
