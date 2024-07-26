<template>
  <HeaderPage to="/products" title="Inventario" :functionality="page.title" />

  <div class="pt-4 pb-6 border-b">
    <h1 class="mb-1 text-2xl font-bold">{{ page.title }}</h1>
    <p class="text-sm text-muted-foreground">{{ page.descripcion }}</p>
  </div>

  <main class="flex flex-col" style="height: calc(100vh - 250px)">
    <div class="flex gap-10 my-10">
      <Popover>
        <PopoverTrigger as-child>
          <Button
            variant="outline"
            :class="
              cn(
                'w-[280px] justify-start text-left font-normal',
                !dateInventory && 'text-muted-foreground'
              )
            "
          >
            <CalendarIcon class="w-4 h-4 mr-2" />
            {{
              dateInventory
                ? df.format(dateInventory.toDate(getLocalTimeZone()))
                : "Fecha de inventario"
            }}
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
          <Calendar v-model="dateInventory" initial-focus />
        </PopoverContent>
      </Popover>

      <Select class="max-w-3xl" v-model="operationType">
        <SelectTrigger>
          <SelectValue placeholder="Tipo de ajuste" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="add"> Aumentar stock </SelectItem>
            <SelectItem value="remove"> Disminuir stock </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
          variant="secondary"
          role="combobox"
          :aria-expanded="open"
          class="justify-between w-full max-w-3xl mb-4"
        >
          Agregue un producto al inventario
          <ChevronsUpDown class="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="p-0 w-[768px]">
        <Command v-model:searchTerm="searchQuery">
          <CommandInput
            class="h-9"
            :loading="store.loading"
            placeholder="Buscar por código o descripción..."
          />
          <CommandEmpty>Sin productos encontrados.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandItem
                v-for="product in store.products"
                :key="product.id"
                :value="product"
                @select="addProductToInvetory"
                style="cursor: pointer"
              >
                {{ product.description }}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>

    <Table style="height: 100px !important; flex: 1; overflow-x: visible">
      <TableHeader>
        <TableRow>
          <TableHead> Producto </TableHead>
          <TableHead> Stock actual </TableHead>
          <TableHead> Cantidad </TableHead>
          <TableHead> Precio de compra</TableHead>

          <TableHead> Total</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody v-auto-animate>
        <TableRow
          style="max-height: 40px !important; min-width: 100%"
          v-for="p in productsInventory"
          :key="p.id"
        >
          <TableCell class="font-medium"> {{ p.description }}</TableCell>
          <TableCell class="w-36"> {{ p.stock }} </TableCell>
          <TableCell class="w-36">
            <Input v-model="p.quantity" />
          </TableCell>
          <TableCell class="w-52">
            <Input v-model="p.purchasePrice" />
          </TableCell>

          <TableCell class="w-44">
            {{ formatMoney(p.purchasePrice * p.quantity) }}
          </TableCell>
          <TableCell class="w-24">
            <Button
              size="icon"
              variant="destructive"
              class="rounded-full"
              @click="removeProductToInventory(p.id)"
            >
              <Trash class="w-4 h-4" />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <div
      class="flex items-center justify-end py-2 font-normal text-muted-foreground"
    >
      Monto total:
      <span class="ml-3 text-xl font-bold text-white">
        {{ formatMoney(totalInventory) }}
      </span>
    </div>

    <Textarea placeholder="Ingrese algún comentario" class="mt-7" />

    <div class="flex gap-2 mt-10">
      <Button @click="" v-auto-animate>
        <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="store.loading" />
        Guardar
      </Button>

      <Button variant="link" @click="actionAndBack()"> Cancelar </Button>
    </div>
  </main>
</template>

<script setup>
import { onMounted, reactive, ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { cn } from "@/lib/utils";
import { DateFormatter, getLocalTimeZone } from "@internationalized/date";
import { useProductStore } from "@/store/product";
import { formatMoney } from "../../utils";
import _ from "lodash";

const store = useProductStore();
const operationType = ref("add");
const searchQuery = ref("");
const dateInventory = ref(null);
const productsInventory = ref([]);
const open = ref(false);

const df = new DateFormatter("es-Es", {
  dateStyle: "long",
});

const page = reactive({
  title: "Ajuste de inventario",
  descripcion: "Modicación del stock de uno a varios productos.",
});

const addProductToInvetory = (evt) => {
  const product = evt.detail.value;

  if (!productsInventory.value.find((p) => p.id === product.id)) {
    open.value = false;

    product.action = 1;
    product.quantity = 1;

    setTimeout(() => {
      productsInventory.value.unshift(product);
    }, 100);
  }
};

const removeProductToInventory = (id) => {
  productsInventory.value = productsInventory.value.filter(
    (producto) => producto.id !== id
  );
};

const totalInventory = computed(() => {
  let total = 0;
  productsInventory.value.forEach((product) => {
    total += product.quantity * product.purchasePrice;
  });
  return total;
});

watch(searchQuery, () => {
  debounceSarch();
});

const debounceSarch = _.debounce(
  () => store.getProducts(searchQuery.value),
  500
);

// UI IMPORTATIONS
import HeaderPage from "@/components/layout/HeaderPage.vue";
import Input from "@/components/ui/input/Input.vue";
import Label from "@/components/ui/label/Label.vue";
import {
  Loader2,
  Plus,
  Trash,
  Check,
  ChevronsUpDown,
  Calendar as CalendarIcon,
} from "lucide-vue-next";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import CategoryModal from "@/components/products/CategoryModal.vue";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
</script>
