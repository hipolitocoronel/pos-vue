<template>
  <div class="">
    <Toaster position="bottom-center" richColors theme="dark" />
    <!-- <div
      class="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
    ></div> -->

    <!-- <Login /> -->

    <div class="flex flex-col h-screen">
      <Nav v-if="route.name !== 'login'" />
      <div class="flex grow items-strech">
        <Sidebar v-if="route.name !== 'login'" />
        <main class="px-6 py-6 grow">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import Nav from "./components/layout/Nav.vue";
import Sidebar from "./components/layout/Sidebar.vue";
import { Button } from "./components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import Login from "./views/Login.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>
