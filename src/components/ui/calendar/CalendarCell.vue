<script setup>
import { computed } from "vue";
import { CalendarCell, useForwardProps } from "radix-vue";
import { cn } from "@/lib/utils";

const props = defineProps({
  class: { type: String, required: false },
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <CalendarCell
    :class="
      cn(
        'relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([data-selected])]:rounded-md [&:has([data-selected])]:bg-accent [&:has([data-selected][data-outside-month])]:bg-accent/50',
        props.class
      )
    "
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarCell>
</template>
