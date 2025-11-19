import productsReducer, {
  setPage,
  setLimit,
  resetSort,
  toggleSort,
  type ProductsState,
  initialState,
} from "./products-slice";

describe("Given productsSlice reducer", () => {
  describe("When setPage action is dispatched", () => {
    test("Then it should set the page number", () => {
      const newState = productsReducer(initialState, setPage(2));

      expect(newState.page).toBe(2);
      expect(newState.limit).toBe(initialState.limit);
      expect(newState.sortBy).toBe(initialState.sortBy);
      expect(newState.order).toBe(initialState.order);
    });

    test("Then it should handle zero page", () => {
      const state = { ...initialState, page: 5 };
      const newState = productsReducer(state, setPage(0));

      expect(newState.page).toBe(0);
    });
  });

  describe("When setLimit action is dispatched", () => {
    test("Then it should set the limit", () => {
      const newState = productsReducer(initialState, setLimit(20));

      expect(newState.limit).toBe(20);
      expect(newState.page).toBe(initialState.page);
    });
  });

  describe("When resetSort action is dispatched", () => {
    test("Then it should reset sortBy and order when both sortBy and order has value", () => {
      const state: ProductsState = {
        page: 0,
        limit: 10,
        sortBy: "title",
        order: "asc",
      };

      const newState = productsReducer(state, resetSort());

      expect(newState.sortBy).toBe("");
      expect(newState.order).toBe("");
      expect(newState.page).toBe(state.page);
      expect(newState.limit).toBe(state.limit);
    });

    test("Then it should not reset when sort is already empty", () => {
      const newState = productsReducer(initialState, resetSort());

      expect(newState).toEqual(initialState);
    });

    test("Then it should reset when only sortBy is set", () => {
      const state: ProductsState = {
        page: 0,
        limit: 10,
        sortBy: "price",
        order: "",
      };

      const newState = productsReducer(state, resetSort());

      expect(newState.sortBy).toBe("");
      expect(newState.order).toBe("");
    });
  });

  describe("When toggleSort action is dispatched", () => {
    test("Then it should set ascending sort for new column", () => {
      const newState = productsReducer(initialState, toggleSort("title"));

      expect(newState.sortBy).toBe("title");
      expect(newState.order).toBe("asc");
    });

    test("Then it should cycle from asc to desc when toggling same column", () => {
      const state: ProductsState = {
        page: 0,
        limit: 10,
        sortBy: "title",
        order: "asc",
      };

      const newState = productsReducer(state, toggleSort("title"));

      expect(newState.sortBy).toBe("title");
      expect(newState.order).toBe("desc");
    });

    test("Then it should cycle from desc to empty when toggling same column again", () => {
      const state: ProductsState = {
        page: 0,
        limit: 10,
        sortBy: "title",
        order: "desc",
      };

      const newState = productsReducer(state, toggleSort("title"));

      expect(newState.sortBy).toBe("");
      expect(newState.order).toBe("");
    });

    test("Then it should change to new column with asc sort", () => {
      const state: ProductsState = {
        page: 0,
        limit: 10,
        sortBy: "title",
        order: "asc",
      };

      const newState = productsReducer(state, toggleSort("price"));

      expect(newState.sortBy).toBe("price");
      expect(newState.order).toBe("asc");
    });
  });
});
