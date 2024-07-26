import { defineStore } from "pinia";
import { ref } from "vue";
import { pb } from "../services/apiPocketbase";
import { toast } from "vue-sonner";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm, useField } from "vee-validate";
import loginValidation from "../utils/form-validations/login";
import { useRouter } from "vue-router";

export const useStore = defineStore("store", () => {
  const router = useRouter();

  const loading = ref(false);

  const { handleSubmit, errors } = useForm({
    validationSchema: toTypedSchema(loginValidation),
  });

  const { value: email } = useField("email");
  const { value: password } = useField("password");

  // email.value = "hipolitocoronel1522@gmail.com";

  const loginWithGoogle = async () => {
    try {
      loading.value = true;
      await pb.collection("users").authWithOAuth2({ provider: "google" });

      loading.value = false;
      router.push("/sales");
      toast.success("Inicio de sesión exitoso!");
    } catch (error) {
      loading.value = false;

      toast.error("Error al iniciar sesión, intentelo más tarde");
    }
  };

  const login = handleSubmit(async () => {
    if (Object.keys(errors.value).length === 0) {
      try {
        loading.value = true;
        await pb
          .collection("users")
          .authWithPassword(email.value, password.value);

        loading.value = false;
        router.push("/sales");
        toast.success("Inicio de sesión exitoso!");
      } catch (error) {
        loading.value = false;
        console.error(error);

        if (error.status == 400) {
          return toast.error("Usuario y/o contraseña iválido");
        }

        toast.error("Error al iniciar sesión, intentelo más tarde");
      }
    }
  });

  return {
    // properties
    loading,
    email,
    password,
    errors,

    // methods
    login,
    loginWithGoogle,
  };
});
