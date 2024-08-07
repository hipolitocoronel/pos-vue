// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Sales from "../views/Sales.vue";
import Products from "../views/Products.vue";
import Users from "../views/Users.vue";
import OneUser from "../views/OneUser.vue";
import OneProduct from "../views/OneProduct.vue";
import Inventory from "../views/Inventory.vue";
import Login from "../views/Login.vue";
import FormInventory from "@/components/inventory/FormInventory.vue";
import { pb } from "../services/apiPocketbase";
import { toast } from "vue-sonner";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
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
    path: "/inventory",
    children: [
      { path: "", name: "inventory.index", component: Inventory },
      {
        path: "create",
        name: "invetory.create",
        component: FormInventory,
      },
    ],
  },
  {
    path: "/products",
    children: [
      { path: "", name: "products.index", component: Products },
      {
        path: "show/:id",
        name: "products.show",
        component: OneProduct,
      },
      {
        path: "create",
        name: "products.create",
        component: OneProduct,
      },
      {
        path: "update/:id",
        name: "products.update",
        component: OneProduct,
      },
      {
        path: "delete/:id",
        name: "products.delete",
        component: Products,
      },
    ],
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

router.beforeEach((to, from, next) => {
  const isAuthenticated = pb.authStore.isValid;

  if (to.name !== "login" && !isAuthenticated) {
    next({ name: "login" });
    toast.error("Sesión expirada, favor de iniciar sesión!");
  } else next();
});

export default router;
