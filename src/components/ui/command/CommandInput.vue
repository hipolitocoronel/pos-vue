<script setup>
import { computed } from "vue";
import { Search, Loader2 } from "lucide-vue-next";
import { ComboboxInput, useForwardProps } from "radix-vue";
import { cn } from "/src/lib/utils";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  type: { type: String, required: false },
  disabled: { type: Boolean, required: false },
  autoFocus: { type: Boolean, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
  loading: { type: Boolean, required: false },
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <div class="flex items-center px-3 border-b" cmdk-input-wrapper>
    <Search class="w-4 h-4 mr-2 opacity-50 shrink-0" />
    <ComboboxInput
      v-bind="{ ...forwardedProps, ...$attrs }"
      auto-focus
      :class="
        cn(
          'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          props.class
        )
      "
    />
    <Loader2 class="w-4 h-4 animate-spin" v-show="loading" />
  </div>
</template>
