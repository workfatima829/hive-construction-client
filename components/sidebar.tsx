"use client";

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
    <aside className="w-64 bg-white shadow-lg h-auto top-0">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-800">Investor Portal</h2>
        <p className="text-sm text-gray-600 mt-1">Welcome, {username}</p>
      </div>

      <nav className="p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${activeMenu === item.id
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-0 w-64 p-4 border-t">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
