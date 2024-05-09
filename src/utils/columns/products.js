import { formatMoney } from "@/utils";

const columns = [
  {
    accessorKey: "description",
    header: "Descripción",
  },
  {
    accessorKey: "salePrice",
    header: "Precio de venta",
    cell: ({ row }) => formatMoney(row.getValue("salePrice")),
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row }) => "-",
  },
  {
    accessorKey: "actions",
    header: "",
  },
];

export default columns;
