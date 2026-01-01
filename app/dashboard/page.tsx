"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";
import InvestmentsView from "@/components/investmentView";
import CreatePropertyForm from "@/components/createPropertyForm";
import SecurityChequesViewUser from "@/components/SecurityChequesViewUser";
import AdminPropertyList from "@/components/adminPropertyList";
import PendingRequestsPage from "@/components/pendingRequest";
import { apiClient } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();

  const [role, setRole] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [profits, setProfits] = useState<any[]>([]);
  const [loadingProfits, setLoadingProfits] = useState(true);

  const fetchMyProfits = async () => {
    try {
      const data = await apiClient.get("/my-profit");
      setProfits(data);
    } catch (error) {
      console.error("Failed to fetch profits", error);
    } finally {
      setLoadingProfits(false);
    }
  };
  useEffect(() => {
    const cookies = document.cookie.split("; ");

    const getCookie = (name: string) =>
      cookies.find((c) => c.startsWith(name + "="))?.split("=")[1];

    const token = getCookie("token");
    const role = getCookie("role");
    const username = getCookie("username");

    if (!token || !role) {
      router.push("/");
      return;
    }

    setRole(role);
    setUsername(username || "");
  }, [router]);

  useEffect(() => {
    if (activeMenu === "dashboard") {
      fetchMyProfits();
    }
  }, [activeMenu]);

  if (!role) return null;

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar
        role={role}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      <main className="flex-1 p-8">
        {activeMenu === "dashboard" && (
          <>
            <h1 className="text-3xl font-bold text-slate-800">
              Dashboard
            </h1>
            <p className="text-slate-500 mt-1 mb-8">
              Welcome back,{" "}
              <span className="font-medium">{username}</span>
            </p>
            {loadingProfits ? (
              <p className="text-slate-500">Loading profits...</p>
            ) : profits.length === 0 ? (
              <p className="text-slate-500">
                No profits distributed yet.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {profits.map((item) => (
                  <div
                    key={item._id}
                    className="rounded-xl border p-5 bg-green-50 shadow-sm"
                  >
                    <p className="text-sm text-slate-500">
                      Total Profit :{" "}
                      <span className="font-semibold text-green-700">
                        Rs {item.profitAmount}
                      </span>
                    </p>

                    <p className="text-sm text-slate-700">
                      Total Payout:{" "}
                      <span className="font-semibold">
                        Rs {item.totalPayout}
                      </span>
                    </p>

                    <p className="text-xs text-slate-400 mt-2">
                      Distributed on{" "}
                      {new Date(item.profitDistributionId.distributionDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        {activeMenu === "investments" && <InvestmentsView />}
        {activeMenu === "cheques" && <SecurityChequesViewUser />}
        {activeMenu === "create-property" && <CreatePropertyForm />}
        {activeMenu === "pending-requests" && <PendingRequestsPage />}
        {activeMenu === "manage-properties" && <AdminPropertyList />}

        {activeMenu === "profile" && (
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold mb-4">
              Profile
            </h2>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <p className="text-slate-500">
                Update your personal information and security settings.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
