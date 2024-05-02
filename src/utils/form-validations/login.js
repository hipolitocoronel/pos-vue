import * as zod from "zod";

const login = zod.object({
  email: zod
    .string({ required_error: "El correo es requerido" })
    .nonempty("El correo es requerido")
    .email({ message: "Correo electrónico inválido" }),
  password: zod
    .string({ required_error: "La contraseña es requerida" })
    .nonempty("La contraseña es requerida")
    .min(8, { message: "La cotraseña debe tener almenos 8 carácteres." }),
});
export default login;
