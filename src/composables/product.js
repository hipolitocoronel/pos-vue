import { ref, reactive } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { pb } from "@/services/apiPocketbase.js";
import { useStore } from "../store/store";
import { storeToRefs } from "pinia";
import { toast } from "vue-sonner";

export const useProduct = () => {
  const store = useStore();
  const { dialog } = storeToRefs(store);
  const apiProduct = pb.collection("products");

  const fetchData = () => {
    return apiProduct.getFullList({
      sort: "-created",
    });
  };

  // GET PRODUCTS

  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: fetchData,
  });

  // REMOVE PRODUCT
  const removeProduct = (id) => {
    apiProduct.delete(id).then(() => {
      toast.success("Operación exitosa", {
        description: "Producto eliminado exitosamente",
      });

      refetch();
    });
  };

  return {
    dialog,
    products: data,
    error,
    isFetching,

    refetch,
    removeProduct,
  };
};
