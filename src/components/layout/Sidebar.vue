<template>
  <div class="w-64 border-r">
    <nav class="flex flex-col gap-2 px-3 pt-12">
      <SidebarItem
        v-for="item in menuItems"
        :key="item.to"
        :to="item.to"
        :label="item.label"
      >
        <component :is="item.icon" class="w-4 h-4 mr-2" />
      </SidebarItem>
    </nav>
  </div>
</template>

<script setup>
import SidebarItem from "./SidebarItem.vue";
import {
  ShoppingBag,
  GitCompareArrows,
  Package,
  User,
  Settings,
} from "lucide-vue-next";

// array de elementos del menú
const menuItems = [
  { to: "/sales", label: "Ventas", icon: ShoppingBag },
  { to: "/", label: "Inventario", icon: GitCompareArrows },
  { to: "/products", label: "Productos", icon: Package },
  { to: "/users", label: "Usuarios", icon: User },
  { to: "/config", label: "Configuraciones", icon: Settings },
];
</script>
