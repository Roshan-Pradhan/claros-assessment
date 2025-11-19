import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  statusClassMap,
  type AvailabilityStatus,
  type ProductsType,
} from "./products.types";
import PageHeader from "@/components/page-header";
import ReactTable from "@/components/react-table";
import Pagination from "@/components/pagination";
import { useProducts } from "./use-products";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { resetSort, setPage } from "@/store/products-slice";

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, total, value, loading, handleValueChange } = useProducts();

  const columns = useMemo<ColumnDef<ProductsType>[]>(
    () => [
      { accessorKey: "title", header: "Product Name" },
      {
        accessorKey: "brand",
        header: "Brand",
        cell: (props) => props.getValue() || "-",
      },
      { accessorKey: "price", header: "Price ($)" },
      { accessorKey: "stock", header: "Stock" },
      { accessorKey: "rating", header: "Rating" },
      {
        accessorKey: "availabilityStatus",
        header: "Status",
        enableSorting: false,
        cell: (props) => {
          const status = props.getValue() as AvailabilityStatus;
          return <span className={statusClassMap[status]}>{status}</span>;
        },
      },
    ],
    [],
  );

  return (
    <div className="flex flex-col gap-6">
      <PageHeader text="Products" />
      <div className="w-full rounded-lg border border-gray-400 p-4">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="text"
            value={value}
            onChange={(e) => {
              dispatch(setPage(0));
              dispatch(resetSort());
              handleValueChange(e);
            }}
            placeholder="Search by product name..."
            className="input-focus w-64 rounded border px-3 py-2 shadow-sm"
          />
        </div>
        <ReactTable data={products} columns={columns} loading={loading} />
        <Pagination totalPageCount={total} />
      </div>
    </div>
  );
};

export default Products;
