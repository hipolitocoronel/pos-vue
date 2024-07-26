<template>
  <h1 class="text-2xl font-bold">
    Productos

    <span class="text-base font-light">
      ({{ filteredProducts?.length || 0 }})
    </span>
  </h1>

  <p class="text-sm text-muted-foreground">
    Desde ésta seccion vas a poder realizar la gestión de todos tus productos.
  </p>

  <div class="flex justify-between mt-6">
    <div class="flex gap-3 grow">
      <Input
        placeholder="Buscar por código o descripción"
        variant="secondary"
        class="max-w-md"
        v-model="searchQuery"
      />
      <Button variant="secondary">Categoria</Button>
    </div>
    <Button as-child>
      <router-link to="/products/create">
        <Plus class="w-4 mr-2" />
        Agregar
      </router-link>
    </Button>
  </div>

  <DataTable
    :columns="store.columns"
    :data="filteredProducts"
    :loading="store.loading"
    :pagination="store.pagination"
    :action="store.getProducts"
  />

  <AlertDialog
    title="¿Estás seguro?"
    :isOpen="alertDelete"
    description="Ésta acción no se puede deshacer."
    @closeAlert="
      () => {
        router.replace('/products');
        alertDelete = false;
      }
    "
    :action="() => store.deleteProduct(route.params.id)"
  />
</template>

<script setup>
import { onMounted, computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from "../store/product";

const route = useRoute();
const router = useRouter();
const store = useProductStore();
const alertDelete = ref(false);
const searchQuery = ref("");

onMounted(() => store.getProducts());

watch(route, () => {
  alertDelete.value = false;
  const id = route?.params.id || "";
  if (route.name === "products.delete" && id.length > 4) {
    alertDelete.value = true;
  }
});

const filteredProducts = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return store.products.filter((product) =>
    product.description.toLowerCase().includes(query)
  );
});

// ui importatios
import { Loader2, Plus } from "lucide-vue-next";
import Button from "../components/ui/button/Button.vue";
import DataTable from "@/components/layout/DataTable.vue";
import AlertDialog from "../components/layout/AlertDialog.vue";
import { Input } from "../components/ui/input";
</script>
