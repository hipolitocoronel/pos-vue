import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { pb } from "../services/apiPocketbase";
import { toast } from "vue-sonner";
import columns from "../utils/columns/products";
import { useRouter } from "vue-router";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { useField } from "vee-validate";
import productValidator from "../utils/form-validations/product.validator";

export const useProductStore = defineStore("products", () => {
  const router = useRouter();

  const api = pb.collection("products");

  const loading = ref(false);
  const products = ref([]);

  const pagination = ref({
    page: 1,
    perPage: 50,
    totalItems: 0,
    totalPages: 0,
  });

  const { handleSubmit, errors } = useForm({
    validationSchema: toTypedSchema(productValidator),
    initialValues: { stock: null, minStock: null },
  });

  const fields = [
    "description",
    "code",
    "stock",
    "minStock",
    "purchasePrice",
    "salePrice",
    "category",
    "image",
  ];

  const fieldData = fields.reduce((acc, fieldName) => {
    const { value } = useField(fieldName);
    acc[fieldName] = value;
    return acc;
  }, {});

  const product = ref(fieldData);

  const getProducts = async (query) => {
    try {
      loading.value = true;

      const { page, perPage } = pagination.value;

      const result = await api.getList(page, perPage, {
        sort: "-created",
        filter: `description~"${query}" || code~"${query}"`,
        expand: "category",
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

  const createProduct = handleSubmit(async () => {
    if (Object.keys(errors.value).length === 0) {
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
    }
  });

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
      toast.success("Producto eliminado con éxito");
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

  const imageSrc = computed(() => {
    const image = product.value.image;

    if (!image) return null;

    // si el image es de tipo File, retorno url de acceso
    if (typeof image == "object") return URL.createObjectURL(image);

    // caso en que el img es un string, en es caso se obtiene desde api
    return `${pb.baseUrl}/api/files/products/${product.value.id}/${image}`;
  });

  return {
    // properties
    loading,
    columns,
    product,
    products,
    pagination,
    errors,

    //computed
    imageSrc,

    // methods
    getProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    resetPagination,
  };
});
