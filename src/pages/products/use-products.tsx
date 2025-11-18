import { useState, useCallback } from "react";
import { useDebounce } from "../../hooks/use-debounce";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import type { ProductsType, SortOrder } from "./products.types";

export const useProducts = () => {
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState<SortOrder>("");

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  const { value, debouncedValue, handleValueChange } = useDebounce("", 500);

  const fetchProducts = async (): Promise<ProductsType[]> => {
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

    const { data } = await api.get(url);
    setTotal(data.total / limit);
    return data.products;
  };

  const { data, isLoading, error } = useQuery({
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
    products: data ?? [],
    loading: isLoading,
    error,

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
    total,
    handlePageChange,
    handlePageSizeChange,
    handleGoToPage,
  };
};
