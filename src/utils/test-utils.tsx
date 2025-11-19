import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "@/store/store";
import type { ReactNode } from "react";

import { createMemoryRouter, RouterProvider } from "react-router";
import { render } from "@testing-library/react";
import { router } from "@/navigation/router";

export const providerWrapper = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
};
export const renderWithRouter = (route = "/") => {
  const memoryRouter = createMemoryRouter(router.routes, {
    initialEntries: [route],
  });

  const utils = render(<RouterProvider router={memoryRouter} />, {
    wrapper: providerWrapper,
  });

  return {
    ...utils,
    memoryRouter,
  };
};
