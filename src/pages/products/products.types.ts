export type AvailabilityStatus = "In Stock" | "Low Stock" | "Out of Stock";

export type ProductsType = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  discountPercentage: number;
  brand: string;
  category: string;
  availabilityStatus: AvailabilityStatus;
};

export type ProductsApiResponse = {
  products: ProductsType[];
  total: number;
  limit: number;
  skip: number;
};

export const statusClassMap: Record<AvailabilityStatus, string> = {
  "In Stock": "text-green-600",
  "Low Stock": "text-yellow-600",
  "Out of Stock": "text-red-600",
};

export type SortOrder = "asc" | "desc" | "";
