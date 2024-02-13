<template>
  <div class="">
    <Toaster position="bottom-center" />
    <!-- <div
      class="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
    ></div> -->

    <!-- <Login /> -->

    <div class="h-screen flex flex-col">
      <Nav />
      <div class="grow flex items-strech">
        <Sidebar />
        <main class="grow px-6 py-6">
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
</script>
