<script setup>
import { computed } from "vue";
import { CalendarHeadCell, useForwardProps } from "radix-vue";
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
  <CalendarHeadCell
    :class="
      cn(
        'w-9 rounded-md text-[0.8rem] font-normal text-muted-foreground',
        props.class
      )
    "
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarHeadCell>
</template>
