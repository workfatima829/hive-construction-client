// "use client";

// import { Dispatch, SetStateAction } from "react";

// interface SidebarProps {
//   activeMenu: string;
//   setActiveMenu: Dispatch<SetStateAction<string>>;
//   username: string;
// }

// export default function Sidebar({ activeMenu, setActiveMenu, username }: SidebarProps) {
//   return (
//     <aside className="w-64 bg-white shadow-lg flex flex-col">
//       <div className="p-6 text-xl font-bold text-blue-900">
//         Welcome, {username}
//       </div>
//       <nav className="flex-1 px-4">
//         <ul className="space-y-2">
//           <li
//             className={`p-2 rounded-lg cursor-pointer ${activeMenu === "dashboard" ? "bg-blue-100 text-blue-800" : ""}`}
//             onClick={() => setActiveMenu("dashboard")}
//           >
//             Dashboard
//           </li>
//           <li
//             className={`p-2 rounded-lg cursor-pointer ${activeMenu === "investments" ? "bg-blue-100 text-blue-800" : ""}`}
//             onClick={() => setActiveMenu("investments")}
//           >
//             Investments
//           </li>
//           <li
//             className={`p-2 rounded-lg cursor-pointer ${activeMenu === "profile" ? "bg-blue-100 text-blue-800" : ""}`}
//             onClick={() => setActiveMenu("profile")}
//           >
//             Profile
//           </li>
//           <li
//             className="p-2 rounded-lg cursor-pointer hover:bg-gray-100"
//             onClick={() => {
//               localStorage.removeItem("user");
//               localStorage.removeItem("token");
//               window.location.href = "/";
//             }}
//           >
//             Logout
//           </li>
//         </ul>
//       </nav>
//     </aside>
//   );
// }

"use client";

import { Home, LogOut, User, Wallet } from "lucide-react";

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  username: string;
  onLogout: () => void;
}

export default function Sidebar({ 
  activeMenu, 
  setActiveMenu, 
  username, 
  onLogout 
}: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "investments", label: "Investments", icon: Wallet },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg h-screen sticky top-0">
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
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                activeMenu === item.id
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