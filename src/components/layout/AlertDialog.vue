<template>
  <AlertDialog :open="isOpen">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{ title }}</AlertDialogTitle>
        <AlertDialogDescription>
          {{ description }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="emit('close-alert')">
          Cancelar
        </AlertDialogCancel>
        <AlertDialogAction @click="action()">Continuar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup>
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { defineEmits } from "vue";

const { title, description, action, isOpen } = defineProps([
  "title",
  "description",
  "action",
  "isOpen",
]);

const emit = defineEmits(["close-alert"]);
</script>
