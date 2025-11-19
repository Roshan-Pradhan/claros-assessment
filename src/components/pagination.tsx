import { resetSort, setLimit, setPage } from "@/store/products-slice";
import type { AppDispatch, RootState } from "@/store/store";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";

type PaginationProps = {
  totalPageCount: number;
};

const Pagination: React.FC<PaginationProps> = ({ totalPageCount }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { page, limit } = useSelector(
    (state: RootState) => state.productsState,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-4 lg:flex-row lg:justify-between">
      {/* Page Size */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Rows per page:</span>
        <select
          value={limit}
          onChange={(e) => {
            dispatch(setLimit(Number(e.target.value)));
            dispatch(setPage(0));
            dispatch(resetSort());
          }}
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
        pageLinkClassName="px-2 md:px-3 py-1 cursor-pointer flex items-center justify-center"
        activeClassName="bg-primary-600 text-white border-primary-600 hover:bg-primary-700"
        breakLabel="..."
        nextLabel={
          <span className="pagination-label">
            Next <ChevronRight size={16} />
          </span>
        }
        previousLabel={
          <span className="pagination-label">
            <ChevronLeft size={16} /> Prev
          </span>
        }
        onPageChange={(selectedItem) => {
          dispatch(setPage(selectedItem.selected));
          dispatch(resetSort());
        }}
        pageCount={totalPageCount}
        forcePage={page}
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
          value={page + 1}
          onChange={(e) => {
            const value = Number((e.target as HTMLInputElement).value);
            dispatch(setPage(value - 1));
            dispatch(resetSort());
          }}
          className="input-focus w-16 rounded-md border px-2 py-1 text-sm shadow-sm"
        />
      </div>
    </div>
  );
};

export default Pagination;
