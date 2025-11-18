import { Outlet } from "react-router";
import PublicLayout from "./public-layout";

const LayoutWrapper = () => {
  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
};

export default LayoutWrapper;
