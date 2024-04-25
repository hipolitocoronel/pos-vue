<template>
  <h1 class="text-2xl font-bold">
    Usuarios

    <span class="text-xl font-normal">({{ store.users?.length || 0 }})</span>
  </h1>

  <p class="text-sm text-muted-foreground">
    Desde ésta seccion vas a poder realizar la gestión de todos tus productos.
  </p>

  <div class="flex justify-end mt-6">
    <Button as-child>
      <router-link to="/users/create">
        <Plus class="w-4 mr-2" />
        Agregar
      </router-link>
    </Button>
  </div>

  <div v-if="store.loading">
    <Loader2 class="animate-spin" />
  </div>

  <div v-else>
    <DataTable :columns="store.columns" :data="store.users" />
  </div>
</template>

<script setup>
import { Loader2, Plus } from "lucide-vue-next";
import Button from "../components/ui/button/Button.vue";
import DataTable from "@/components/layout/DataTable.vue";

import { onMounted } from "vue";
import { useUserStore } from "../store/user";
const store = useUserStore();

onMounted(() => store.getUsers());
</script>
