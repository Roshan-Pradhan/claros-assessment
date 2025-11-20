import { SearchX } from "lucide-react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex h-dvh items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-5 rounded-3xl bg-white p-1 shadow-md md:p-10">
        <SearchX className="h-14 w-14 text-red-500" />

        <h1 className="text-3xl font-semibold text-gray-800">Page Not Found</h1>

        <p className="max-w-sm text-center text-gray-500">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="mt-2 rounded bg-primary-500 px-6 py-2 font-medium text-white transition hover:bg-primary-600"
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
