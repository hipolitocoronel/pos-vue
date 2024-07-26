<script setup>
import { CalendarGridBody } from "radix-vue";

const props = defineProps();
</script>

<template>
  <CalendarGridBody v-bind="props">
    <slot />
  </CalendarGridBody>
</template>
