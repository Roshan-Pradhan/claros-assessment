import { useCallback, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/utils/cn";
import { SideBarMenu } from "./layout-constants";
import { SidebarLink } from "@/components/sidebarlink";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarClose = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <header className="flex h-18 items-center justify-between border-b border-gray-200 bg-gray-100 px-4 py-4">
        <img
          src="/assets/claros-logo.png"
          alt="logo"
          className="w-40 md:w-60"
        />
        <button
          className="rounded p-2 hover:bg-gray-200 md:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </header>

      <div className="flex flex-1 bg-gray-50">
        <aside
          className={cn(
            "fixed top-18 left-0 z-50 w-60 transform rounded-br-2xl border-r border-gray-200 bg-gray-100 p-4 transition-transform duration-300 md:relative md:top-0 md:w-40 md:translate-x-0 md:rounded-br-none lg:w-60",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <nav className="flex flex-col gap-2.5">
            {SideBarMenu.map((menu) => {
              const { path, label, icon, end } = menu;
              return (
                <SidebarLink
                  key={path}
                  to={path}
                  label={label}
                  icon={icon}
                  end={end}
                  onClick={() => isSidebarOpen && handleSidebarClose()}
                />
              );
            })}
          </nav>
        </aside>
        <main className="flex-1 overflow-x-hidden rounded-md p-5 shadow-primary md:m-2">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PublicLayout;
