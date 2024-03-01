<template>
  <h2 class="text-2xl font-bold">
    Productos
    <span class="text-xl font-normal">({{ products?.length || 0 }})</span>
  </h2>
  <p class="text-sm text-muted-foreground">
    Desde ésta seccion vas a poder realizar la gestión de todos tus productos.
  </p>

  <div class="flex justify-end mt-6">
    <Button @click="dialog = true"> <Plus class="w-4 mr-2" />Agregar </Button>
    <FormProduct @data-refetched="refetch" />
  </div>

  <div v-if="isFetching">
    <Loader2 class="animate-spin" />
  </div>

  <div v-else-if="error" class="text-danger">Error al obtener productos</div>

  <div v-else>
    <DataTable :columns="columns" :data="products" />
  </div>
</template>

<script setup>
import DataTable from "@/components/layout/DataTable.vue";
import TableAction from "@/components/products/TableAction.vue";
import FormProduct from "@/components/products/FormProduct.vue";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-vue-next";

import { h, onMounted } from "vue";
import { formatMoney } from "@/utils";
import { useProduct } from "../composables/product";

const { dialog, isFetching, products, error, getAll } = useProduct();

const columns = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "price",
    header: "Precio",
    cell: ({ row }) => formatMoney(row.getValue("price")),
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      const product = row.original;
      return h(
        "div",
        h(TableAction, { product, onDataRefetched: () => refetch() })
      );
    },
  },
];
</script>
