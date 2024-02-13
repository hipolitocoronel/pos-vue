<template>
  <div class="h-screen flex">
    <div class="w-1/2 flex items-center justify-end">
      <canvas
        ref="el"
        width="1200"
        height="1200"
        style="width: 700px; height: 700px"
      ></canvas>
    </div>
    <div class="w-1/2 flex items-center justify-center">
      <form class="ma-5 w-[380px]" @submit="onSubmit">
        <p class="text-3xl font-bold mb-3">Bienvenidos</p>
        <FormField v-slot="{ componentField }" name="username">
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" v-bind="componentField" />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
        <Button type="submit" class="w-full"> Ingresar </Button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import createGlobe from "cobe";
import * as z from "zod";
import { ref, onMounted } from "vue";

const el = ref();
const phi = ref(0);
onMounted(() => {
  createGlobe(el.value, {
    devicePixelRatio: 2,
    width: 1200,
    height: 1200,
    phi: 0,
    theta: 0,
    dark: 1,
    diffuse: 1.2,
    mapSamples: 16000,
    mapBrightness: 6,
    baseColor: [0.3, 0.3, 0.3],
    markerColor: [0.1, 0.8, 1],
    glowColor: [1, 1, 1],
    offset: [0, 0],
    markers: [
      // longitude latitude
      { location: [37.7595, -122.4367], size: 0.03 },
      { location: [40.7128, -74.006], size: 0.1 },
    ],
    onRender: (state) => {
      // Called on every animation frame.
      // `state` will be an empty object, return updated params.
      state.phi = phi.value;
      phi.value += 0.01;
    },
  });
});

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2).max(50),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
  console.log("Form submitted!", values);
});
</script>
