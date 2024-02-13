import { formatMoney } from "@/utils";


const columns = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "price",
    header: "Precio",
    cell: ({ row }) => formatMoney(row.getValue("price")),
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      const product = row.original;
      return h(
        "div",
        h(TableAction, { product, onDataRefetched: () => refetch() })
      );
    },
  },
];

export default columns;