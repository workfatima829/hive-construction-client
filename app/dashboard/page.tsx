"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Wallet } from "lucide-react";
import Sidebar from "@/components/sidebar";
import InvestmentsView from "@/components/investmentView";
import SecurityChequesView from "@/components/SecurityChequesView";

export default function DashboardPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [activeMenu, setActiveMenu] = useState("dashboard");

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!user || !token) {
      router.push("/");
      return;
    }

    const parsedUser = JSON.parse(user);
    setName(parsedUser.username);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        username={name}
        onLogout={handleLogout}
      />

      <main className="flex-1 p-8">
        {activeMenu === "dashboard" && (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome, <span className="text-blue-600">{name}</span>
            </h1>
            <p className="text-gray-600 mb-6">Here you can track your investments and property details.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setActiveMenu("investments")}
              >
                <Wallet size={48} className="text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">View Investments</h3>
                <p className="text-gray-600">Check all your property investments</p>
              </div>
            </div>
          </div>
        )}

        {activeMenu === "investments" && <InvestmentsView />}
         {activeMenu === "cheques" && <SecurityChequesView />}

        {activeMenu === "profile" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <p className="text-gray-600">Update your personal info or change your password here.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
