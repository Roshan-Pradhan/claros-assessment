import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import LayoutWrapper from "../layout/layout-wrapper";

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
        path: "/about",
        element: <div>About Page</div>,
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
