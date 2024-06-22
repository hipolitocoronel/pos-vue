import TableAction from "../../components/products/TableAction.vue";
import { h } from "vue";

const columns = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "email",
    header: "Correo electrónico",
  },
  {
    accessorKey: "phone",
    header: "Telefono",
  },
  {
    accessorKey: "address",
    header: "Dirección",
    cell: ({ row }) => {
      const { adress } = row.original;
      return adress ? adress : "-";
    },
  },
  {
    accessorKey: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const { id } = row.original;
      return h("div", h(TableAction, { id, domain: "users" }));
    },
  },
];

export default columns;
