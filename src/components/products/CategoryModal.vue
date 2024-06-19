<template>
  <Sheet>
    <SheetTrigger as-child>
      <slot />
    </SheetTrigger>
    <SheetContent class="w-[400px] sm:min-w-[550px]">
      <SheetHeader>
        <SheetTitle>Gestión de categorías</SheetTitle>
        <SheetDescription>
          Desde éste apartado podrás: agregar, actualizar u eliminar tus
          categorías.
        </SheetDescription>

        <div v-auto-animate class="w-full h-screen">
          <div class="flex justify-between mt-6 mb-2" v-if="!showForm">
            <Input
              class="w-[340px]"
              placeholder="Buscar producto"
              v-model="searchQuery"
            />

            <Button class="text-sm" size="icon" @click="showForm = true">
              <Plus class="w-4 h-4" />
            </Button>
          </div>
          <Table v-if="!showForm">
            <TableHeader>
              <TableRow>
                <TableHead> Categoría </TableHead>
                <TableHead class="w-[100px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="category in filteredCategories"
                :key="category.id"
              >
                <TableCell class="font-medium"> {{ category.name }} </TableCell>
                <TableCell class="flex space-x-2">
                  <Button
                    size="icon"
                    variant="outline"
                    class="rounded-full"
                    @click="
                      showForm = true;
                      store.category = category;
                    "
                  >
                    <Pencil class="w-4 h-4" />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button
                        size="icon"
                        variant="secondary"
                        class="rounded-full"
                        @click=""
                      >
                        <Trash class="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel
                        >Seguro que desea eliminar?
                      </DropdownMenuLabel>
                      <DropdownMenuItem as-child class="cursor-pointer">
                        <Button
                          variant="destructive"
                          @click="store.deleteCategory(category.id)"
                          class="w-[90%] mx-auto my-2"
                        >
                          Si, eliminar
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div v-else class="mt-6">
            <div class="grid w-full items-center gap-1.5" v-auto-animate>
              <Label for="purchasePrice" class="mb-1">Nombre (*)</Label>
              <Input
                id="purchasePrice"
                type="text"
                placeholder="Ej: Gaseosas"
                v-model="store.category.name"
              />

              <p v-if="error" class="mx-1 text-xs text-red-500">{{ error }}</p>
            </div>

            <div class="flex justify-between mt-6">
              <Button variant="link" @click="cancelForm()">Cancelar</Button>
              <Button
                variant="secondary"
                @click="upsertCategory()"
                v-auto-animate
              >
                <Loader2
                  class="w-4 h-4 mr-2 animate-spin"
                  v-if="store.loading"
                />
                Aplicar
              </Button>
            </div>
          </div>
        </div>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useCategoryStore } from "../../store/category.store.js";

const store = useCategoryStore();
const showForm = ref(false);
const searchQuery = ref("");

const error = ref("");

onMounted(() => store.getCategories());

const filteredCategories = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return store.categories.filter((category) =>
    category.name.toLowerCase().includes(query)
  );
});

const upsertCategory = () => {
  // validacion de categoria
  if (!store.category.name) {
    error.value = "El nombre de la categoría es requerido";
    return;
  }

  // si tiene id se actualiza
  if (store.category.id) {
    store.updateCategory(store.category.id).then(() => {
      showForm.value = false;
      store.getCategories();
    });
  } else {
    //se crea
    store.createCategory().then(() => {
      showForm.value = false;
      store.getCategories();
    });
  }
};

const cancelForm = () => {
  showForm.value = false;
  error.value = "";
  store.category = {
    name: "",
  };
};

// UI Importatios
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Plus, Pencil, Trash, Loader2 } from "lucide-vue-next";
</script>
