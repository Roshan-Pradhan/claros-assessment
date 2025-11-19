import type { SortOrder } from "@/pages/products/products.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ProductsState {
  page: number;
  limit: number;
  sortBy: string;
  order: SortOrder;
}

export const initialState: ProductsState = {
  page: 0,
  limit: 10,
  sortBy: "",
  order: "",
};

const productsSlice = createSlice({
  name: "productsState",
  initialState,

  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    resetSort(state) {
      if (state.sortBy || state.order) {
        state.sortBy = "";
        state.order = "";
      }
    },
    toggleSort(state, action: PayloadAction<string>) {
      const sortField = action.payload;

      if (state.sortBy === sortField) {
        // cycle through: asc → desc → ""
        state.order =
          state.order === "asc" ? "desc" : state.order === "desc" ? "" : "asc";
        if (state.order === "") state.sortBy = "";
      } else {
        // new column clicked
        state.sortBy = sortField;
        state.order = "asc";
      }
    },
  },
});

export const { setPage, setLimit, resetSort, toggleSort } =
  productsSlice.actions;
export default productsSlice.reducer;
