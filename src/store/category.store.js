import { ref } from "vue";
import { defineStore } from "pinia";
import { pb } from "../services/apiPocketbase";
import { toast } from "vue-sonner";
import { useRouter } from "vue-router";

export const useCategoryStore = defineStore("categories", () => {
  const router = useRouter();

  const api = pb.collection("categories");

  const loading = ref(false);
  const categories = ref([]);

  // para creacion/ edicion
  const category = ref({
    name: "",
  });

  const getCategories = async () => {
    try {
      loading.value = true;

      const result = await api.getFullList({
        sort: "-created",
      });

      categories.value = result;

      loading.value = false;
    } catch (error) {
      loading.value = false;
    }
  };

  const getOneCategory = async (id) => {
    try {
      loading.value = true;
      const result = await api.getOne(id);

      loading.value = false;
      category.value = result;
    } catch (error) {
      toast.error("Error al obtener categoria, inténtelo más tarde!");
      loading.value = false;
    }
  };

  const createCategory = async () => {
    try {
      loading.value = true;
      await api.create(category.value);
      setTimeout(() => {
        loading.value = false;
        category.value = { name: "" };
        toast.success("Categoría creado con éxito");
      }, 500);
    } catch (error) {
      toast.error("Error al crear categoria, inténtelo más tarde!");
      loading.value = false;
    }
  };

  const updateCategory = async (id) => {
    try {
      loading.value = true;
      await api.update(id, category.value);
      setTimeout(() => {
        loading.value = false;
        category.value = { name: "" };
        toast.success("Categoría editado con éxito");
      }, 500);
    } catch (error) {
      toast.error("Error al editar categoria, inténtelo más tarde!");
      loading.value = false;
    }
  };

  const deleteCategory = async (id) => {
    try {
      loading.value = true;
      await api.delete(id);
      toast.success("Categoría eliminado con éxito");
      loading.value = false;

      await getCategories();
    } catch (error) {
      toast.error("Error al eliminar categoria, inténtelo más tarde!");
      loading.value = false;
    }
  };

  return {
    // properties
    loading,
    category,
    categories,

    // methods
    getCategories,
    getOneCategory,
    createCategory,
    updateCategory,
    deleteCategory,
  };
});
