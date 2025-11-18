import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

type ReactTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  sortBy?: string;
  order: "asc" | "desc" | "";
  onSort?: (field: string) => void;
  loading?: boolean;
};

const ReactTable = <T,>({
  data,
  columns,
  sortBy,
  order,
  onSort,
  loading,
}: ReactTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="max-h-102 overflow-auto rounded-xl border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="sticky top-0 z-10 bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isSorted = header.column.id === sortBy ? order : "";
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="border-b border-gray-200 px-4 py-2 text-left text-sm font-semibold whitespace-nowrap text-gray-700"
                  >
                    {header.column.getCanSort() ? (
                      <button
                        className="flex cursor-pointer items-center gap-1 select-none"
                        onClick={() => onSort && onSort(header.column.id)}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {isSorted === "asc" && (
                          <ArrowUp className="h-4 w-4 text-primary-500" />
                        )}
                        {isSorted === "desc" && (
                          <ArrowDown className="h-4 w-4 text-primary-500" />
                        )}
                        {!isSorted && (
                          <ArrowUpDown className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody className="divide-y divide-gray-100 bg-white">
          {loading ? (
            <>
              {Array.from({ length: 10 }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  {columns.map((_, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-4 py-2 text-sm whitespace-nowrap"
                    >
                      <div className="h-4 w-24 rounded bg-gray-200" />
                    </td>
                  ))}
                </tr>
              ))}
            </>
          ) : (
            <>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-2 text-sm whitespace-nowrap text-gray-600"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReactTable;
