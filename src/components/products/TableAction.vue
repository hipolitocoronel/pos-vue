<template>
  <AlertDialog
    title="¿Estás seguro?"
    :isOpen="open"
    description="Ésta acción no se puede deshacer."
    @close-alert="open = false"
    :action="removeProduct"
  />

  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button size="icon" variant="ghost" class="w-6 h-6 p-0">
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Acciones </DropdownMenuLabel>
      <DropdownMenuItem>
        <PenLine class="w-4 h-4 mr-2" />
        Editar
      </DropdownMenuItem>
      <DropdownMenuItem @click="open = true">
        <Trash class="w-4 h-4 mr-2" />
        Eliminar
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup>
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import AlertDialog from "@/components/layout/AlertDialog.vue";
import { MoreHorizontal, Trash, PenLine } from "lucide-vue-next";

import { ref, defineEmits } from "vue";
import { pb } from "@/services/apiPocketbase";
import { toast } from "vue-sonner";

const { product } = defineProps(["product"]);
const emit = defineEmits(["data-refetched"]);

const open = ref(false);

const removeProduct = () => {
  pb.collection("products")
    .delete(product.id)
    .then(() => {
      toast.success("Operación exitosa", {
        description: "Producto eliminado exitosamente",
      });

      emit("data-refetched");
    });
};
</script>
