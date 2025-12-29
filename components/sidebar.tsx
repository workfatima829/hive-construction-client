"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Home, LogOut, User, Wallet, FileText, PlusCircle } from "lucide-react";

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  username: string;
  role: string;
  onLogout: () => void;
}

export default function Sidebar({
  activeMenu,
  setActiveMenu,
  username,
  role,
  onLogout
}: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "investments", label: "Investments", icon: Wallet },
    { id: "cheques", label: "Security Cheques", icon: FileText },
    { id: "profile", label: "Profile", icon: User },
  ];

  if (role === "admin") {
    menuItems.splice(2, 0, { id: "create-property", label: "Create Property", icon: PlusCircle });
    menuItems.splice(3, 0, { id: "manage-properties", label: "Manage Properties", icon: Home });
    menuItems.splice(2, 0, { id: "create-security-cheque", label: "Create SC", icon: PlusCircle });
  }

  return (
    <aside className="w-64 bg-white border-r shadow-lg flex flex-col h-screen">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-900">Investor Portal</h2>
        <p className="text-sm text-gray-500 mt-1">Welcome, {username}</p>
      </div>
      <ScrollArea className="flex-1 p-4">
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeMenu === item.id ? "default" : "ghost"}
                size="sm"
                className="justify-start w-full gap-3 rounded-lg"
                onClick={() => setActiveMenu(item.id)}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Button>
            );
          })}
        </nav>
      </ScrollArea>

   <div className="p-4 border-t mt-auto">
  <Button
    variant="destructive"
    size="sm"
    className="text-black justify-start w-full gap-3 rounded-lg"
    onClick={onLogout}
  >
    <LogOut size={20} />
    Logout
  </Button>
</div>
    </aside>
  );
}
