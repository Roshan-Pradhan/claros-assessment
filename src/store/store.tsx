import { configureStore } from "@reduxjs/toolkit";
import productsStateReducer from "./products-slice";

export const store = configureStore({
  reducer: {
    productsState: productsStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
