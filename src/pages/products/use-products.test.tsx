import { act, renderHook, waitFor } from "@testing-library/react";
import { useProducts } from "./use-products";
import { providerWrapper } from "@/utils/test-utils";
import api from "@/api";
import type { ProductsApiResponse } from "./products.types";
import { vi } from "vitest";

const mockProducts: ProductsApiResponse = {
  products: [
    {
      id: 1,
      title: "Test Product 1",
      description: "A test product",
      price: 100,
      rating: 4.5,
      stock: 50,
      discountPercentage: 10,
      brand: "TestBrand",
      category: "Electronics",
      availabilityStatus: "In Stock",
    },
    {
      id: 2,
      title: "Test Product 2",
      description: "Another test product",
      price: 200,
      rating: 4,
      stock: 30,
      discountPercentage: 5,
      brand: "TestBrand",
      category: "Electronics",
      availabilityStatus: "Low Stock",
    },
  ],
  total: 100,
  limit: 10,
  skip: 0,
};

describe("Given useProducts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("When hook is initialized", () => {
    test("Then it fetches products API and returns results", async () => {
      vi.mocked(api.get).mockResolvedValueOnce({ data: mockProducts });

      const { result } = renderHook(() => useProducts(), {
        wrapper: providerWrapper,
      });
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });
      expect(result.current.products).toEqual(mockProducts.products);
      expect(result.current.total).toBe(Math.ceil(mockProducts.total / 10));
    });
  });

  describe("When fetchProducts is called with default params", () => {
    test("Then it use correct API URL with pagination", async () => {
      vi.mocked(api.get).mockResolvedValueOnce({ data: mockProducts });

      renderHook(() => useProducts(), {
        wrapper: providerWrapper,
      });

      await waitFor(() => {
        expect(api.get).toHaveBeenCalledWith(
          expect.stringContaining("/products?"),
        );
      });
    });
  });

  describe("When fetchProducts is called with search value", () => {
    test("Then it use search URL with query parameters", async () => {
      vi.mocked(api.get).mockResolvedValueOnce({ data: mockProducts });

      const { result } = renderHook(() => useProducts(), {
        wrapper: providerWrapper,
      });

      act(() => {
        result.current.handleValueChange({
          target: { value: "test" },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      await waitFor(
        () => {
          expect(api.get).toHaveBeenCalledWith(
            expect.stringContaining("/products/search?q=test"),
          );
        },
        { timeout: 1000 },
      );
    });
  });

  describe("When API call fails", () => {
    test("Then it handles error gracefully", async () => {
      const mockError = new Error("API Error");
      vi.mocked(api.get).mockRejectedValueOnce(mockError);

      const alertSpy = vi
        .spyOn(globalThis, "alert")
        .mockImplementation(() => {});

      renderHook(() => useProducts(), {
        wrapper: providerWrapper,
      });

      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalled();
      });

      alertSpy.mockRestore();
    });
  });

  describe("When API returns empty products", () => {
    test("Then it returns empty array", async () => {
      const emptyResponse: ProductsApiResponse = {
        products: [],
        total: 0,
        limit: 10,
        skip: 0,
      };

      vi.mocked(api.get).mockResolvedValueOnce({ data: emptyResponse });

      const { result } = renderHook(() => useProducts(), {
        wrapper: providerWrapper,
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.products).toEqual([]);
      expect(result.current.total).toBe(0);
    });
  });
});
