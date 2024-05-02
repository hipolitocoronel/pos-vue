<template>
  <div class="flex h-screen">
    <div class="flex items-center justify-center grow">
      <form class="ma-5 w-[430px]" @submit.prevent="store.login()">
        <p class="mb-3 text-3xl font-bold">Bienvenidos</p>
        <div v-auto-animate>
          <Label>Correo electrónico</Label>
          <Input
            placeholder="Ingrese su correo electrónico"
            v-model="store.email"
          />
          <Label class="text-xs text-red-500" v-if="store.errors['email']">
            {{ store.errors["email"] }}
          </Label>
        </div>

        <div class="mt-5" v-auto-animate>
          <Label>Contraseña</Label>
          <div class="relative">
            <Input
              placeholder="* * * * * * * *"
              v-model="store.password"
              :type="passwordType"
            ></Input>
            <Button
              class="absolute top-0 right-0 rounded-full"
              variant="ghost"
              size="icon"
              type="button"
              @click="togglePassword()"
            >
              <Eye v-if="passwordType == 'password'" class="w-5" />
              <EyeOff v-else class="w-5" />
            </Button>
          </div>
          <Label class="text-xs text-red-500" v-if="store.errors['password']">
            {{ store.errors["password"] }}
          </Label>
        </div>
        <router-link
          to="/"
          variant="link"
          class="mt-2 text-xs text-muted-foreground"
        >
          Olvidaste tu contraseña?
        </router-link>
        <Button class="w-full mt-10 font-bold" type="submit">
          <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="store.loading" />
          Iniciar sesión
        </Button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "../components/ui/label";

import { useStore } from "../store/store";
import { Eye, EyeOff, Loader2 } from "lucide-vue-next";
import { ref } from "vue";

const store = useStore();

const passwordType = ref("password");

const togglePassword = () => {
  passwordType.value = passwordType.value == "password" ? "text" : "password";
};
</script>
