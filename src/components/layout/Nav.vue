<template>
  <div class="flex items-center justify-between h-12 px-5 border-b">
    <div class="flex gap-2">
      <Crown class="w-5" />

      <p class="font-bold text-md">Coronel Sistemas</p>
    </div>

    <p class="text-sm font-bold text-muted">13 de may 15:48 hs</p>
    <Button variant="secondary" size="icon">
      <Bell class="w-4" />
    </Button>
  </div>
</template>

<script setup>
import { Bell, Crown } from "lucide-vue-next";
import { Button } from "../ui/button";
</script>
