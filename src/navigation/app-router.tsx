import Loader from "@/components/loader";
import { Suspense } from "react";
import { RouterProvider } from "react-router";
import { router } from "./router";

const AppRouter = () => {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default AppRouter;
