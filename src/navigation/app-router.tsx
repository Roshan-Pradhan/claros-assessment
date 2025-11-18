import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import LayoutWrapper from "../layout/layout-wrapper";
import Books from "../pages/books/books";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWrapper />,
    children: [
      {
        index: true,
        element: <div>Home Page</div>,
      },
      {
        path: "/books",
        element: <Books />,
      },
    ],
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default AppRouter;
