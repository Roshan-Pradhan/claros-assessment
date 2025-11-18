import { faker } from "@faker-js/faker";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
  type FilterFn,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useMemo, useState } from "react";

// Types
export type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: "relationship" | "complicated" | "single";
};

// Helpers
const range = (len: number) => Array.from({ length: len }, (_, i) => i);

const newPerson = (): Person => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  age: faker.number.int({ min: 18, max: 60 }),
  visits: faker.number.int({ min: 0, max: 1000 }),
  progress: faker.number.int({ min: 0, max: 100 }),
  status: faker.helpers.arrayElement(["relationship", "complicated", "single"]),
});

function makeData(len: number) {
  return range(len).map(() => newPerson());
}

// Global filter
const globalFilter: FilterFn<Person> = (row, columnId, value) => {
  const search = value.toLowerCase();
  return row
    .getAllCells()
    .some((cell) => String(cell.getValue()).toLowerCase().includes(search));
};

const ReactTable = () => {
  const [data] = useState(() => makeData(500));
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      { accessorKey: "firstName", header: "First Name" },
      { accessorKey: "lastName", header: "Last Name", enableSorting: false },
      { accessorKey: "age", header: "Age" },
      { accessorKey: "visits", header: "Visits" },
      { accessorKey: "status", header: "Status" },
      { accessorKey: "progress", header: "Progress (%)" },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      globalFilter: globalFilterValue,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: globalFilter,
  });

  return (
    <div className="w-full rounded-lg border border-gray-400 p-4">
      {/* Global Search */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          value={globalFilterValue}
          onChange={(e) => setGlobalFilterValue(e.target.value)}
          placeholder="Search..."
          className="w-64 rounded border px-3 py-2 shadow-sm focus:ring-1 focus:ring-primary-500 focus:outline-none"
        />
      </div>

      {/* Desktop Table */}
      <div className="h-102 overflow-auto rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="sticky top-0 z-10 bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="border-b border-gray-200 px-4 py-2 text-left text-sm font-semibold whitespace-nowrap text-gray-700"
                  >
                    <button
                      {...{
                        className: header.column.getCanSort()
                          ? "flex items-center gap-1 cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {header.column.getCanSort() && (
                        <>
                          {header.column.getIsSorted() === "asc" && (
                            <ArrowUp className="h-4 w-4 text-primary-500" />
                          )}
                          {header.column.getIsSorted() === "desc" && (
                            <ArrowDown className="h-4 w-4 text-primary-500" />
                          )}
                          {header.column.getIsSorted() === false && (
                            <ArrowUpDown className="h-4 w-4 text-gray-400" />
                          )}
                        </>
                      )}
                    </button>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 text-sm whitespace-nowrap text-gray-600"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-1">
          <button
            className="rounded border px-2 py-1 text-sm disabled:opacity-50"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft />
          </button>
          <button
            className="rounded border px-2 py-1 text-sm disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </button>
          <button
            className="rounded border px-2 py-1 text-sm disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </button>
          <button
            className="rounded border px-2 py-1 text-sm disabled:opacity-50"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm">
            Page{" "}
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1 text-sm">
            | Go to page:
            <input
              type="number"
              min={1}
              max={table.getPageCount()}
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="w-16 rounded border px-2 py-1 text-sm"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="rounded border px-2 py-1 text-sm"
          >
            {[10, 20, 50, 100].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ReactTable;
