import { ref } from "vue";
import { defineStore } from "pinia";
import { pb } from "../services/apiPocketbase";
import { toast } from "vue-sonner";
import columns from "../utils/columns/products";
import { useRouter } from "vue-router";

export const useProductStore = defineStore("products", () => {
  const router = useRouter();

  const api = pb.collection("products");

  const loading = ref(false);
  const products = ref([]);

  // para creacion/ edicion
  const product = ref({
    description: "test",
    stock: 123,
    minStock: 123,
    salePrice: 123,
    purchasePrice: 123,
  });

  const pagination = ref({
    page: 1,
    perPage: 50,
    totalItems: 0,
    totalPages: 0,
  });

  const getProducts = async () => {
    try {
      loading.value = true;

      const { page, perPage } = pagination.value;

      const result = await api.getList(page, perPage, {
        sort: "-created",
      });

      products.value = result?.items;
      delete result.items;
      pagination.value = { ...pagination.value, ...result };
      loading.value = false;
    } catch (error) {
      loading.value = false;
    }
  };

  const getOneProduct = async (id) => {
    try {
      loading.value = true;
      const result = await api.getOne(id);

      loading.value = false;
      product.value = result;
    } catch (error) {
      toast.error("Error al obtener producto, inténtelo más tarde!");
      loading.value = false;
    }
  };

  const createProduct = async () => {
    try {
      loading.value = true;
      await api.create(product.value);
      setTimeout(() => {
        loading.value = false;
        toast.success("Producto creado con éxito");
      }, 500);
    } catch (error) {
      toast.error("Error al crear producto, inténtelo más tarde!");
      loading.value = false;
    }
  };

  const updateProduct = async (id) => {
    try {
      loading.value = true;
      await api.update(id, product.value);
      setTimeout(() => {
        loading.value = false;
        toast.success("Producto editado con éxito");
      }, 500);
    } catch (error) {
      toast.error("Error al editar producto, inténtelo más tarde!");
      loading.value = false;
    }
  };

  const deleteProduct = async (id) => {
    try {
      loading.value = true;
      await api.delete(id);
      toast.success("Producto elimin1ado con éxito");
      loading.value = false;

      // redirección vista productos
      router.replace("/products");
      await getProducts();
    } catch (error) {
      router.replace("/products");
      toast.error("Error al eliminar producto, inténtelo más tarde!");
      loading.value = false;
    }
  };

  const resetPagination = () =>
    (pagination.value = { page: 0, perPage: 50, totalItems: 0, totalPages: 0 });

  return {
    // properties
    loading,
    columns,
    product,
    products,
    pagination,

    // methods
    getProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    resetPagination,
  };
});
