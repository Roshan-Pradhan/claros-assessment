import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import type { ProductsApiResponse, SortOrder } from "./products.types";
import { useDebounce } from "@/hooks/use-debounce";
import api from "@/api";
import type { AxiosError } from "axios";
import { getErrorMessage } from "@/utils/get-error-message";

export const useProducts = () => {
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState<SortOrder>("");

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

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

  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setOrder("asc");
    }
  };

  const resetOrderAndSortBy = useCallback(() => {
    if (sortBy || order) {
      setSortBy("");
      setOrder("");
    }
  }, [sortBy, order]);

  const handlePageChange = useCallback(
    (selectedItem: { selected: number }) => {
      const newPage = selectedItem.selected;
      setPage(newPage);
      resetOrderAndSortBy();
    },
    [resetOrderAndSortBy],
  );

  const handlePageSizeChange = useCallback(
    (size: number) => {
      setLimit(size);
      setPage(0);
      resetOrderAndSortBy();
    },
    [resetOrderAndSortBy],
  );

  const handleGoToPage = useCallback(
    (page: number) => {
      setPage(page);
      resetOrderAndSortBy();
    },
    [resetOrderAndSortBy],
  );

  return {
    products: data?.products ?? [],
    loading: isLoading,

    // search
    value,
    handleValueChange,

    // sorting
    sortBy,
    order,
    toggleSort,

    // pagination
    page,
    limit,
    total: Math.ceil((data?.total ?? 0) / limit),
    handlePageChange,
    handlePageSizeChange,
    handleGoToPage,
  };
};
