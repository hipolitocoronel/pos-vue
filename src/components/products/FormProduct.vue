<template>
  <Dialog :open="dialog">
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="mb-4">Formulario de producto</DialogTitle>

        <form @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem v-auto-animate>
              <FormLabel>Nombre (*)</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Nombre o descripción del producto"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <div class="flex gap-3 mt-5">
            <FormField v-slot="{ componentField }" name="price">
              <FormItem v-auto-animate>
                <FormLabel>Precio (*)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Precio"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="stock">
              <FormItem v-auto-animate>
                <FormLabel>Stock (*)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Stock"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="minStock">
              <FormItem v-auto-animate>
                <FormLabel>Stock mínimo</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Stock mínimo"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </form>
      </DialogHeader>

      <DialogFooter>
        <DialogClose as-child>
          <Button
            @click="dialog = false"
            id="closeDialog"
            type="button"
            variant="ghost"
            class="mr-3"
          >
            Cancelar
          </Button>
        </DialogClose>
        <Button @click="onSubmit()">Aceptar</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup>
// ui importations
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// logic importations
import * as z from "zod";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { pb } from "@/services/apiPocketbase";
import { defineEmits, ref } from "vue";
import { toast } from "vue-sonner";
import { useProduct } from "@/composables/product";

const emit = defineEmits(["data-refetched"]);
const { product, buttonText } = defineProps(["product", "buttonText"]);
const { dialog } = useProduct();

// scheme validation
const formSchema = toTypedSchema(
  z.object({
    name: z
      .string({
        required_error: "Requerido",
        invalid_type_error: "Ingrese una cadena de texto",
      })
      .min(2)
      .max(50),

    price: z.number({
      required_error: "Requerido",
      invalid_type_error: "Ingrese un número",
    }),

    stock: z
      .number({ required_error: "Requerido" })
      .positive({ message: "stock  " }),

    minStock: z
      .number({ invalid_type_error: "Ingrese un número" })
      .nonnegative({ message: "Debe ser mayor a 0" })
      .default(0),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((data) =>
  !product ? createProduct(data) : updateProduct(data)
);

const createProduct = (data) => {
  pb.collection("products")
    .create(data)
    .then(() => {
      toast.success("Operación exitosa", {
        description: "Producto creado exitosamente",
      });

      document.getElementById("closeDialog")?.click();
      emit("data-refetched");
    });
};

const updateProduct = (data) => {
  pb.collection("products")
    .update(product.id, data)
    .then(() => {
      toast.success("Operación exitosa", {
        description: "Producto actulizado exitosamente",
      });

      document.getElementById("closeDialog")?.click();
      emit("data-refetched");
    });
};
</script>
