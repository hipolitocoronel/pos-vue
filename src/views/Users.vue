<template>
  <h1 class="text-2xl font-bold">
    Usuarios

    <span class="text-base font-light">({{ store.users?.length || 0 }})</span>
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

  <AlertDialog
    title="¿Estás seguro?"
    :isOpen="alertDelete"
    description="Ésta acción no se puede deshacer."
    @closeAlert="
      () => {
        router.replace('/users');
        alertDelete = false;
      }
    "
    :action="() => store.deleteUser(route.params.id)"
  />
</template>

<script setup>
import { Loader2, Plus } from "lucide-vue-next";
import Button from "../components/ui/button/Button.vue";
import DataTable from "@/components/layout/DataTable.vue";
import AlertDialog from "../components/layout/AlertDialog.vue";

import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../store/user";

const route = useRoute();
const router = useRouter();
const store = useUserStore();
const alertDelete = ref(false);

onMounted(() => store.getUsers());

watch(route, () => {
  alertDelete.value = false;
  const id = route?.params.id || "";
  if (route.name === "users.delete" && id.length > 4) {
    alertDelete.value = true;
  }
});
</script>
