import { BookText, House } from "lucide-react";

type SideBarMenuItem = {
  path: string;
  label: string;
  icon: React.ReactNode;
  end?: boolean;
};

export const SideBarMenu: SideBarMenuItem[] = [
  {
    path: "/",
    label: "Home",
    icon: <House size={20} />,
    end: true,
  },
  {
    path: "/about",
    label: "Books",
    icon: <BookText size={20} />,
  },
];
