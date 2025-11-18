import { useMemo } from "react";
import PageHeader from "../../components/page-header";
import Pagination from "../../components/pagination";
import ReactTable from "../../components/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import {
  statusClassMap,
  type AvailabilityStatus,
  type ProductsType,
} from "./products.types";
import { useProducts } from "./use-products";

const Products = () => {
  const {
    products,
    total,
    page,
    limit,
    value,
    sortBy,
    order,
    loading,
    toggleSort,
    handlePageChange,
    handlePageSizeChange,
    handleGoToPage,
    handleValueChange,
  } = useProducts();

  const columns = useMemo<ColumnDef<ProductsType>[]>(
    () => [
      { accessorKey: "title", header: "Product Name" },
      {
        accessorKey: "brand",
        header: "Brand",
        cell: (props) => props.getValue() || "-",
      },
      { accessorKey: "price", header: "Price" },
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
            onChange={handleValueChange}
            placeholder="Search by product name..."
            className="w-64 rounded border px-3 py-2 shadow-sm focus:ring-1 focus:ring-primary-500 focus:outline-none"
          />
        </div>
        <ReactTable
          data={products}
          columns={columns}
          sortBy={sortBy}
          order={order}
          onSort={toggleSort}
          loading={loading}
        />
        <Pagination
          totalPageCount={total}
          onPageChange={handlePageChange}
          forcePage={page}
          pageSize={limit}
          onPageSizeChange={handlePageSizeChange}
          goToPage={handleGoToPage}
        />
      </div>
    </div>
  );
};

export default Products;
