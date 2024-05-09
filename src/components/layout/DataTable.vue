<template>
  <ScrollArea class="rounded-md border h-[calc(100vh-260px)] mt-3">
    <Table class="relative" v-if="!loading">
      <TableHeader>
        <TableRow
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <TableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
          >
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell :colSpan="columns.length" class="h-24 text-center">
              Sin datos.
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
    <div
      class="absolute top-0 flex items-center justify-center w-full h-full bg-neutral-950/70"
      v-else
    >
      <Loader2 class="w-7 h-7 animate-spin" />
    </div>
  </ScrollArea>

  <DataTablePagination :table="table" />
</template>

<script setup>
import { FlexRender, getCoreRowModel, useVueTable } from "@tanstack/vue-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ScrollArea } from "@/components/ui/scroll-area";
import DataTablePagination from "./DataTablePagination.vue";
import { computed, reactive, defineEmits, toRefs } from "vue";
import { Loader2 } from "lucide-vue-next";

const props = defineProps({
  columns: {
    type: Array,
    default: [],
  },
  data: {
    type: Array,
    default: [],
  },
  loading: {
    type: Boolean,
    default: false,
  },

  action: {
    type: Function,
  },
  pagination: {
    type: Object,
    default: { perPage: 10, page: 1 },
  },
});

const pagination = reactive({
  pageSize: props?.pagination?.perPage,
  pageIndex: props?.pagination?.page - 1,
});

const table = computed(() =>
  useVueTable({
    data: props.data,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    onPaginationChange: onPaginationChange,
    state: { pagination },
    pageCount: props.pagination.totalPages,
  })
);

const onPaginationChange = (updater) => {
  const { pageIndex: page, pageSize: perPage } = updater(pagination);

  pagination.pageIndex = page;
  pagination.pageSize = perPage;
  props.action();
};
</script>
