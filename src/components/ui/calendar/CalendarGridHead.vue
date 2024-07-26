<script setup>
import { CalendarGridHead } from "radix-vue";

const props = defineProps();
</script>

<template>
  <CalendarGridHead v-bind="props">
    <slot />
  </CalendarGridHead>
</template>
