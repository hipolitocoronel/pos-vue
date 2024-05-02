<template>
  <router-link
    :to="props.to"
    class="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
    :class="isActive ? 'bg-accent' : 'bg-transparent'"
  >
    <slot />
    {{ props.label }}
  </router-link>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const props = defineProps(["to", "label"]);

const isActive = computed(() => route.path === props.to);
</script>
