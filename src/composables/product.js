import { ref, reactive } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { pb } from "@/services/apiPocketbase.js";
import { useStore } from "../store/store";
import { storeToRefs } from "pinia";

export const useProduct = () => {
  const store = useStore();
  const { dialog } = storeToRefs(store);

  // GET PRODUCTS
  const {
    data: products,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => {
      return pb.collection("products").getFullList({
        sort: "-created",
      });
    },
  });

  return {
    dialog,
    products,
    error,
    isFetching,

    refetch,
  };
};
