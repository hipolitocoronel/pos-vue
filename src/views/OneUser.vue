<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink>
          <router-link to="/users">Usuarios</router-link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>{{ page.title }}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>

  <div class="pt-4 pb-6 border-b">
    <h1 class="mb-1 text-2xl font-bold">{{ page.title }}</h1>
    <p class="text-sm text-muted-foreground">{{ page.descripcion }}</p>
  </div>

  <main v-auto-animate>
    <Loader2
      class="my-3 animate-spin"
      v-if="store.loading && !store?.user?.username"
    />
    <section class="grid gap-8 mt-8 max-w-7xl lg:grid-cols-2" v-else>
      <div class="grid w-full items-center gap-1.5">
        <Label for="email" class="mb-1">Nombre</Label>
        <Input
          id="email"
          type="text"
          placeholder="Ingrese su nombre completo"
          v-model="store.user.name"
        />
      </div>
      <div class="grid w-full items-center gap-1.5">
        <Label for="email" class="mb-1">Corrreo</Label>
        <Input
          id="email"
          type="email"
          placeholder="Ingrese su correo electrónico"
          v-model="store.user.email"
        />
      </div>
      <div class="grid w-full items-center gap-1.5">
        <Label for="email" class="mb-1"> Teléfono </Label>
        <Input
          id="email"
          type="email"
          placeholder="Ingrese su número telefónico"
          v-model="store.user.phone"
        />
      </div>
      <div class="grid w-full items-center gap-1.5">
        <Label for="email" class="mb-1">Dirección</Label>
        <Input
          id="email"
          type="email"
          placeholder="Ingrese su dirección"
          v-model="store.user.adress"
        />
      </div>

      <div class="flex flex-col gap-8 xl:flex-row lg:col-span-2" v-auto-animate>
        <div
          class="flex items-center w-full min-w-[25%] space-x-2"
          v-if="page.isEditing"
        >
          <Checkbox
            id="terms"
            :checked="changePassword"
            @update:checked="changePassword = !changePassword"
          />
          <Label for="terms" class="cursor-pointer">
            Desea cambiar la contraseña?
          </Label>
        </div>
        <div class="grid w-full items-center gap-1.5" v-if="changePassword">
          <Label for="email" class="mb-1">Contraseña actual</Label>
          <Input
            id="email"
            type="email"
            placeholder="* * * * * * * *"
            v-model="store.user.passwordConfirm"
          />
        </div>
        <div
          class="grid w-full items-center gap-1.5"
          v-if="page.isCreating || changePassword"
        >
          <Label for="email" class="mb-1">
            {{ page.isEditing ? "Nueva " : "" }}Contraseña
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="* * * * * * * *"
            v-model="store.user.password"
          />
        </div>

        <div
          class="grid w-full items-center gap-1.5"
          v-if="page.isCreating || changePassword"
        >
          <Label for="email" class="mb-1">Confirmar contraseña</Label>
          <Input
            id="email"
            type="email"
            placeholder="* * * * * * * *"
            v-model="store.user.passwordConfirm"
          />
        </div>
      </div>

      <div class="flex gap-2 mt-10" v-show="page.isEditing || page.isCreating">
        <Button @click="page.action()" v-auto-animate>
          <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="store.loading" />
          {{ page.title }}
        </Button>

        <Button variant="link" @click="actionAndBack()">
          {{ page.butonText }} y volver
        </Button>
      </div>
    </section>
  </main>
</template>

<script setup>
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import Input from "../components/ui/input/Input.vue";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { useUserStore } from "../store/user";
import { Loader2 } from "lucide-vue-next";

import { useRoute, useRouter } from "vue-router";
import { onMounted, reactive, ref } from "vue";

const route = useRoute();
const router = useRouter();

const page = reactive({
  title: "",
  descripcion: "",
  action: () => {},
  isEditing: false,
  isCreating: false,
  butonText: "",
});

const changePassword = ref(false);

const store = useUserStore();

onMounted(() => {
  switch (route.name) {
    case "users.create":
      page.title = "Crear usuario";
      page.descripcion = "Edición de un usuario existente";
      page.isCreating = true;
      page.action = store.createUser;

      page.butonText = "Crear";
      break;
    case "users.update":
      const id = route.params.id;

      page.title = "Editar usuario";
      page.descripcion = "Edición de un usuario existente";
      page.isEditing = true;
      page.action = () => store.updateUser(id);

      page.butonText = "Editar";

      store.getOneUser(id);
      break;
  }
});

const actionAndBack = () => {
  page.action();
  router.back();
};
</script>
