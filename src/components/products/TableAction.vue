<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button size="icon" variant="ghost" class="p-0 w-7 h-7">
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Acciones </DropdownMenuLabel>
      <DropdownMenuItem as-child class="cursor-pointer">
        <router-link :to="`/${domain}/show/${id}`">
          <Eye class="w-4 h-4 mr-2" />
          Ver más
        </router-link>
      </DropdownMenuItem>
      <DropdownMenuItem as-child class="cursor-pointer">
        <router-link :to="`/${domain}/update/${id}`">
          <PenLine class="w-4 h-4 mr-2" />
          Editar
        </router-link>
      </DropdownMenuItem>
      <DropdownMenuItem as-child class="cursor-pointer">
        <router-link :to="`/${domain}/delete/${id}`">
          <Trash class="w-4 h-4 mr-2" />
          Eliminar
        </router-link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup>
const { id, domain } = defineProps(["id", "domain"]);

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash, PenLine, Eye } from "lucide-vue-next";
</script>
