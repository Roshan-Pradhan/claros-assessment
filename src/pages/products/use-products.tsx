import { useQuery } from "@tanstack/react-query";
import type { ProductsApiResponse } from "./products.types";
import { useDebounce } from "@/hooks/use-debounce";
import api from "@/api";
import type { AxiosError } from "axios";
import { getErrorMessage } from "@/utils/get-error-message";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export const useProducts = () => {
  const { page, limit, sortBy, order } = useSelector(
    (state: RootState) => state.productsState,
  );

  const { value, debouncedValue, handleValueChange } = useDebounce("", 500);

  const fetchProducts = async (): Promise<ProductsApiResponse> => {
    const skip = page * limit;

    const params = new URLSearchParams({
      limit: String(limit),
      skip: String(skip),
      ...(sortBy && { sortBy }),
      ...(order && { order }),
    });

    const url = debouncedValue
      ? `/products/search?q=${debouncedValue}&${params.toString()}`
      : `/products?${params.toString()}`;

    try {
      const { data } = await api.get<ProductsApiResponse>(url);
      return data;
    } catch (error) {
      alert(getErrorMessage(error as AxiosError));
      throw error;
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["products", page, limit, debouncedValue, sortBy, order],
    queryFn: fetchProducts,
  });

  return {
    products: data?.products ?? [],
    loading: isLoading,
    value,
    handleValueChange,
    total: Math.ceil((data?.total ?? 100) / limit),
  };
};
