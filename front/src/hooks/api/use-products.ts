import { createProduct, getProducts } from "@/services/products";
import { ProductFormValues } from "@/types/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetProducts = (search?: string) => {
  return useQuery({
    queryKey: ["products", search],
    queryFn: () => getProducts(search),
  });
};

export const useCreateProducts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product: ProductFormValues) => createProduct(product),
    onSettled: () => {
      queryClient.invalidateQueries(["products"] as any);
    },
  });
};
