"use client";

import { Button } from "@/components/ui/button";
import { Home, Wallet, FileText, PlusCircle } from "lucide-react";
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
  ];

  const adminMenu = [
    { id: "create-property", label: "Create Property", icon: PlusCircle },
    { id: "manage-properties", label: "Manage Properties", icon: Home },
  ];

  const menuItems =
    role === "admin"
      ? [baseMenu[0], ...adminMenu, ...baseMenu.slice(1)]
      : baseMenu;

  return (
    <aside className="w-64 h-screen shrink-0 bg-slate-900 text-white p-4">
      <div className="mb-4 px-2 pt-2 pb-3 border-b border-slate-700">
        <button
          onClick={() => {
            setActiveMenu("dashboard");
            router.push("/dashboard");
          }}
          style={{ color: "oklch(70.5% 0.213 47.604)" }}
          className="text-2xl font-bold transition-opacity hover:opacity-80"
        >
          Hive Construction
        </button>
      </div>
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
    </aside>
  );
}
