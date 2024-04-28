import { ref } from "vue";
import { defineStore } from "pinia";
import { pb } from "../services/apiPocketbase";
import { toast } from "vue-sonner";
import columns from "../utils/columns/user";

export const useUserStore = defineStore("users", () => {
  // Genera un número aleatorio entre 1 y 100000000
  let min = 1;
  let max = 100000000;
  let randomInRange = Math.floor(Math.random() * (max - min + 1)) + min;

  const api = pb.collection("users");

  const loading = ref(false);
  const users = ref([]);

  // para creacion/ edicion
  const user = ref({
    username: `test_username_${randomInRange}`,
    email: `test_${randomInRange}@example.com`,
    emailVisibility: true,
    password: "12345678",
    passwordConfirm: "12345678",
    name: "test",
    phone: "test",
    adress: "test adress",
  });

  const getUsers = async () => {
    try {
      loading.value = true;
      const result = await api.getFullList({
        sort: "-created",
      });

      loading.value = false;
      users.value = result;
    } catch (error) {
      loading.value = false;
    }
  };

  const getOneUser = async (id) => {
    try {
      loading.value = true;
      const result = await api.getOne(id);

      loading.value = false;
      user.value = result;
    } catch (error) {
      toast.error("Error al obtener usuario, inténtelo más tarde!");
      loading.value = false;
    }
  };

  const createUser = async () => {
    try {
      loading.value = true;
      await api.create(user.value);
      setTimeout(() => {
        loading.value = false;
        toast.success("Usuario creado con éxito");
      }, 500);
    } catch (error) {
      toast.error("Error al crear usuario, inténtelo más tarde!");
      loading.value = false;
    }
  };

  const updateUser = async (id) => {
    try {
      loading.value = true;
      await api.update(id, user.value);
      setTimeout(() => {
        loading.value = false;
        toast.success("Usuario editado con éxito");
      }, 500);
    } catch (error) {
      toast.error("Error al editar usuario, inténtelo más tarde!");
      loading.value = false;
    }
  };

  return {
    // properties
    loading,
    columns,
    user,
    users: users,

    // methods
    getUsers,
    getOneUser,
    createUser,
    updateUser,
  };
});
