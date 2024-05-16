<template>
  <HeaderPage to="/products" title="Productos" functionality="Crear producto" />

  <div class="pt-4 pb-6 border-b">
    <h1 class="mb-1 text-2xl font-bold">{{ page.title }}</h1>
    <p class="text-sm text-muted-foreground">{{ page.descripcion }}</p>
  </div>

  <main v-auto-animate>
    <Loader2
      class="my-3 animate-spin"
      v-if="store.loading && !store?.product?.id"
    />
    <section v-else class="flex gap-10">
      <section class="grid gap-8 mt-8 grow max-w-7xl lg:grid-cols-2">
        <div class="grid w-full items-center gap-1.5 col-span-2">
          <Label for="description" class="mb-1">Descripción</Label>
          <Input
            id="description"
            type="text"
            placeholder="Ingrese nombre o descripción del producto."
            v-model="store.product.description"
          />
        </div>

        <div class="flex gap-4">
          <div class="grid w-full items-center gap-1.5">
            <Label for="stock" class="mb-1">Stock actual</Label>
            <Input
              id="stock"
              type="number"
              placeholder="Ingrese su nombre completo"
              v-model="store.product.stock"
            />
          </div>
          <div class="grid w-full items-center gap-1.5">
            <Label for="minStock" class="mb-1">Stock minimo</Label>
            <Input
              id="minStock"
              type="number"
              placeholder="Ingrese su nombre completo"
              v-model="store.product.minStock"
            />
          </div>
        </div>

        <div class="flex gap-4">
          <div class="grid w-full items-center gap-1.5">
            <Label for="purchasePrice" class="mb-1">Precio de costo</Label>
            <Input
              id="purchasePrice"
              type="number"
              placeholder="Ingrese su nombre completo"
              v-model="store.product.purchasePrice"
            />
          </div>
          <div class="grid w-full items-center gap-1.5">
            <Label for="salePrice" class="mb-1">Precio de venta</Label>
            <Input
              id="salePrice"
              type="number"
              placeholder="Ingrese su nombre completo"
              v-model="store.product.salePrice"
            />
          </div>
        </div>

        <div class="flex items-end gap-2">
          <div class="grow">
            <Label class="mb-1">Categoría</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categorías</SelectLabel>
                  <SelectItem value="apple"> Gaseosas </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <TooltipProvider>
            <Tooltip delayDuration="200">
              <TooltipTrigger>
                <Button variant="secondary">
                  <Plus class="w-4 h-4" size="icon" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Agregar una nueva categoría</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div class="relative">
          <Label class="mb-1" for="imagen">Imagen</Label>
          <Input id="imagen" type="file" @change="onFileChange" />
          <p class="absolute text-xs text-muted-foreground -bottom-6">
            Resolución de imagen recomendada: 800 x 800 pixeles
          </p>
        </div>

        <div
          class="flex gap-2 mt-10"
          v-show="page.isEditing || page.isCreating"
        >
          <Button @click="page.action()" v-auto-animate>
            <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="store.loading" />
            {{ page.title }}
          </Button>

          <Button variant="link" @click="actionAndBack()">
            {{ page.butonText }} y volver
          </Button>
        </div>
      </section>
      <div
        class="relative w-64 h-64 overflow-hidden rounded-lg mt-14 bg-neutral-900"
      >
        <p
          class="absolute bottom-0 w-full mb-3 text-xs text-center text-muted-foreground"
          v-if="!imagen"
        >
          vista previa del producto
        </p>

        <img :src="imagen" class="object-cover w-full h-full" v-else />
      </div>
    </section>
  </main>
</template>

<script setup>
import HeaderPage from "../components/layout/HeaderPage.vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import { useProductStore } from "../store/product";
import Input from "../components/ui/input/Input.vue";
import Label from "../components/ui/label/Label.vue";
import Button from "../components/ui/button/Button.vue";
import { Loader2, Plus } from "lucide-vue-next";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const store = useProductStore();
const route = useRoute();
const router = useRouter();

const imagen = ref(null);

const page = reactive({
  title: "",
  descripcion: "",
  action: () => {},
  isEditing: false,
  isCreating: false,
  butonText: "",
});

onMounted(() => {
  switch (route.name) {
    case "products.create":
      page.title = "Crear producto";
      page.descripcion = "Creación un nuevo producto";
      page.isCreating = true;
      page.action = store.createUser;

      page.butonText = "Crear";
      break;
    case "users.update":
      const id = route.params.id;
      // obteniendo la información del usuario a editar
      store.getOneUser(id);

      page.title = "Editar usuario";
      page.descripcion = "Edición de un usuario existente";
      page.isEditing = true;
      page.butonText = "Editar";

      page.action = () => store.updateUser(id);
      break;
  }
});

const onFileChange = (e) => {
  const file = e.target.files[0];
  imagen.value = URL.createObjectURL(file);
};
</script>
