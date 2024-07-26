<script setup>
import { computed } from "vue";
import { CalendarPrev, useForwardProps } from "radix-vue";
import { ChevronLeft } from "lucide-vue-next";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

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
  <CalendarPrev
    :class="
      cn(
        buttonVariants({ variant: 'outline' }),
        'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
        props.class
      )
    "
    v-bind="forwardedProps"
  >
    <slot>
      <ChevronLeft class="w-4 h-4" />
    </slot>
  </CalendarPrev>
</template>
