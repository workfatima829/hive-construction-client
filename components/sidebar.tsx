"use client";

import { Button } from "@/components/ui/button";
import {  Home,  Wallet,  FileText, User,  PlusCircle, LogOut,} from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface SidebarProps {
  role: string;
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

export default function Sidebar({
  role,
  activeMenu,
  setActiveMenu,
}: SidebarProps) {
    const router = useRouter();
  const baseMenu = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "investments", label: "Investments", icon: Wallet },
    { id: "cheques", label: "Security Cheques", icon: FileText },
    { id: "profile", label: "Profile", icon: User },
  ];

  const adminMenu = [
    { id: "create-property", label: "Create Property", icon: PlusCircle },
    { id: "manage-properties", label: "Manage Properties", icon: Home },
  ];

  const menuItems =
    role === "admin"
      ? [baseMenu[0], ...adminMenu, ...baseMenu.slice(1)]
      : baseMenu;

  const logout = () => {
     Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("username");
    router.push("/");
  };

  return (
    <aside className="w-64 h-screen bg-slate-900 text-white p-4">
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;

          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => setActiveMenu(item.id)}
              className={`w-full justify-start ${
                isActive
                  ? "bg-slate-800 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon className="mr-2" size={18} />
              {item.label}
            </Button>
          );
        })}
      </nav>

      <Button
        variant="ghost"
        className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-950 mt-8"
        onClick={logout}
      >
        <LogOut className="mr-2" size={18} />
        Logout
      </Button>
    </aside>
  );
}
