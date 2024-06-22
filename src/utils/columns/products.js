import { formatMoney } from "@/utils";
import { h } from "vue";
import TableAction from "../../components/products/TableAction.vue";
const base_url = import.meta.env.VITE_BACKEND_URL;

const columns = [
  {
    accessorKey: "image",
    header: "",
    cell: ({ row }) => {
      const { id, collectionId, image } = row.original;

      if (!image) return "-";

      return h("img", {
        src: `${base_url}/api/files/${collectionId}/${id}/${image}`,
        alt: "Product Image",
        style: "width: 50px; height: auto;",
      });
    },
  },
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
    accessorKey: "expand.category.name",
    header: "Categoria",
    cell: ({ row }) => {
      const { expand } = row.original;

      return expand?.category ? expand.category.name : "-";
    },
  },
  {
    accessorKey: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const { id } = row.original;
      return h("div", h(TableAction, { id, domain: "products" }));
    },
  },
];

export default columns;
