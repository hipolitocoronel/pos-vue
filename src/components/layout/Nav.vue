<template>
  <div class="border-b h-12 flex items-center justify-between px-5">
    <Store class="w-5" />

    <p class="text-md">POS - Punto de venta</p>
    <Button variant="secondary" size="icon">
      <Bell class="w-4" />
    </Button>
  </div>
</template>

<script setup>
import { Store, Bell } from "lucide-vue-next";
import { Button } from "../ui/button";
</script>
