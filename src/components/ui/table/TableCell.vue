<script setup>
import { cn } from "/src/lib/utils";

const props = defineProps({
  class: { type: String, required: false },
});
</script>

<template>
  <td
    :class="
      cn('py-2 px-4 align-middle [&:has([role=checkbox])]:pr-0', props.class)
    "
  >
    <slot />
  </td>
</template>
