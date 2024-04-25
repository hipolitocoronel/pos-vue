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
        <BreadcrumbPage>Crear usuario</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>

  <div class="pt-4 pb-6 border-b">
    <h1 class="mb-1 text-2xl font-bold">Crear usuario</h1>
    <p class="text-sm text-muted-foreground">Agregue un nuevo usuario</p>
  </div>

  <section class="mt-4">
    <div class="grid w-full max-w-lg items-center gap-1.5">
      <Label for="email" class="mb-1">Nombre</Label>
      <Input
        id="email"
        type="text"
        placeholder="Ingrese su nombre completo"
        v-model="store.user.name"
      />
    </div>
    <div class="grid w-full max-w-lg items-center gap-1.5 mt-8">
      <Label for="email" class="mb-1">Corrreo</Label>
      <Input
        id="email"
        type="email"
        placeholder="Ingrese su correo electrónico"
        v-model="store.user.email"
      />
    </div>
    <div class="grid w-full max-w-lg items-center gap-1.5 mt-8">
      <Label for="email" class="mb-1"> Teléfono </Label>
      <Input
        id="email"
        type="email"
        placeholder="Ingrese su número telefónico"
        v-model="store.user.phone"
      />
    </div>
    <div class="grid w-full max-w-lg items-center gap-1.5 mt-8">
      <Label for="email" class="mb-1">Dirección</Label>
      <Input
        id="email"
        type="email"
        placeholder="Ingrese su dirección"
        v-model="store.user.adress"
      />
    </div>

    <div class="flex gap-2 mt-10">
      <Button @click="store.createUser()" v-auto-animate>
        <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="store.loading" />
        Registrar usuario
      </Button>

      <Button variant="link">Registrar y volver</Button>
    </div>
  </section>
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
import Label from "../components/ui/label/Label.vue";
import Button from "../components/ui/button/Button.vue";

import { useUserStore } from "../store/user";
import { Loader2 } from "lucide-vue-next";

import { useRoute } from "vue-router";

const router = useRoute();

const store = useUserStore();
</script>
