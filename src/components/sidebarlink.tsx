import { NavLink } from "react-router";
import { cn } from "../utils/cn";

type SidebarLinkProps = {
  to: string;
  end?: boolean;
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
};

export const SidebarLink = ({
  to,
  end,
  icon,
  label,
  onClick,
}: SidebarLinkProps) => {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "sidebar-link-base",
          isActive ? "sidebar-link-active shadow-xs" : "sidebar-link-hover",
          "flex items-center gap-3",
        )
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};
