import * as zod from "zod";

const product = zod.object({
  description: zod
    .string({ required_error: "La descripción es requerida" })
    .nonempty("La descripción es requerida"),
  stock: zod
    .number({ invalid_type_error: "Ingrese un número mayor o igual a 0" })
    .nullable(),
  minStock: zod
    .number({ invalid_type_error: "Ingrese un número mayor o igual a 0" })
    .nullable(),
});

export default product;
