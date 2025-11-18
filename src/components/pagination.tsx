import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect } from "react";
import ReactPaginate from "react-paginate";

type PaginationProps = {
  totalPageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  forcePage: number;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  goToPage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  totalPageCount,
  onPageChange,
  forcePage,
  pageSize,
  onPageSizeChange,
  goToPage,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [forcePage]);

  return (
    <div className="mt-6 flex flex-col items-center gap-4 md:flex-row md:justify-between">
      {/* Page Size */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Rows per page:</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="rounded-md border px-2 py-1 text-sm shadow-sm focus:ring-2 focus:ring-primary-400"
        >
          {[10, 20, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination */}
      <ReactPaginate
        containerClassName="flex items-center gap-1"
        pageClassName="rounded-md  border border-gray-300 hover:bg-gray-100 transition"
        pageLinkClassName="px-3 py-1 cursor-pointer flex items-center justify-center"
        activeClassName="bg-primary-600 text-white border-primary-600 hover:bg-primary-700"
        breakLabel="..."
        nextLabel={
          <span className="flex cursor-pointer items-center gap-1 rounded-md border border-gray-300 px-3 py-1 hover:bg-gray-100">
            Next <ChevronRight size={16} />
          </span>
        }
        previousLabel={
          <span className="flex cursor-pointer items-center gap-1 rounded-md border border-gray-300 px-3 py-1 hover:bg-gray-100">
            <ChevronLeft size={16} /> Prev
          </span>
        }
        onPageChange={onPageChange}
        pageCount={totalPageCount}
        forcePage={forcePage}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
      />

      {/* Go To Page */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Go to:</span>
        <input
          type="number"
          min={1}
          max={totalPageCount}
          value={forcePage + 1}
          onChange={(e) => {
            const value = Number((e.target as HTMLInputElement).value);
            goToPage(value - 1);
          }}
          className="w-16 rounded-md border px-2 py-1 text-sm shadow-sm focus:ring-2 focus:ring-primary-500"
        />
      </div>
    </div>
  );
};

export default Pagination;
