<script setup>
import { computed } from "vue";
import { CalendarGridRow, useForwardProps } from "radix-vue";
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
  <CalendarGridRow :class="cn('flex', props.class)" v-bind="forwardedProps">
    <slot />
  </CalendarGridRow>
</template>
