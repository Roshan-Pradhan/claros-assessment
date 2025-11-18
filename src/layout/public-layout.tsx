import { NavLink } from "react-router";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-14 items-center bg-gray-800 px-4 text-white">
        <h1 className="text-lg font-semibold">Claros Analytics</h1>
      </header>

      <div className="flex flex-1">
        <aside className="w-60 space-y-3 border-r bg-gray-100 p-4">
          <nav className="space-y-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex rounded p-2 transition ${
                  isActive ? "bg-gray-300 font-medium" : "hover:bg-gray-200"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `flex rounded p-2 transition ${
                  isActive ? "bg-gray-300 font-medium" : "hover:bg-gray-200"
                }`
              }
            >
              About
            </NavLink>
          </nav>
        </aside>

        <main className="flex-1 bg-white p-4">{children}</main>
      </div>
    </div>
  );
};

export default PublicLayout;
