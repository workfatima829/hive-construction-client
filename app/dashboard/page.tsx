"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Sidebar from "@/components/sidebar";
import InvestmentsView from "@/components/investmentView";
import CreatePropertyForm from "@/components/createPropertyForm";
import SecurityChequesViewUser from "@/components/SecurityChequesViewUser";
import AdminPropertyList from "@/components/adminPropertyList";
import { apiClient } from "@/lib/api";
import ProfileTabs from "@/components/profile/ProfileTabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardPage() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
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
    const userCookie = Cookies.get("user");

    if (!token || !role) {
      router.push("/");
      return;
    }

    setRole(role);
    setUsername(username || "");
    if (userCookie) {
      try {
        const parsedUser = JSON.parse(userCookie);
        setEmail(parsedUser?.email || "");
      } catch {
        setEmail("");
      }
    }
  }, [router]);

  useEffect(() => {
    if (activeMenu === "dashboard") {
      fetchMyProfits();
    }
  }, [activeMenu]);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    Cookies.remove("role");
    Cookies.remove("username");
    router.push("/");
  };

  if (!role) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <Sidebar
        role={role}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      <section className="flex-1 min-w-0 flex flex-col">
        <header className="h-20 shrink-0 border-b border-slate-200 bg-white px-6 flex items-center justify-end">
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="h-12 w-12 rounded-full bg-slate-200 text-slate-900 font-semibold text-xl hover:bg-slate-300 transition">
                {(username?.[0] || "U").toUpperCase()}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 p-0 rounded-xl border border-slate-200 shadow-lg">
              <DropdownMenuLabel className="px-4 py-3">
                <p className="text-base font-semibold text-slate-900">My Account</p>
                <p className="text-xs text-slate-500 mt-1">{email || username}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="px-4 py-3 text-base cursor-pointer"
                onClick={() => setActiveMenu("profile")}
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="px-4 py-3 text-base text-red-600 focus:text-red-600 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header> */}
        <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <button className="relative h-10 w-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
      {(username?.[0] || "U").toUpperCase()}
    </button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-72 p-0 rounded-2xl border border-slate-200 shadow-2xl overflow-hidden bg-white">
    {/* User Info Header */}
    <DropdownMenuLabel className="px-5 py-4 bg-gradient-to-br from-slate-50 to-white border-b border-slate-100">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white font-bold text-lg flex items-center justify-center shadow-md">
          {(username?.[0] || "U").toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-900 truncate">{username || "User"}</p>
          <p className="text-xs text-slate-500 truncate">{email || username}</p>
        </div>
      </div>
    </DropdownMenuLabel>

    {/* Menu Items */}
    <div className="py-2">
      <DropdownMenuItem
        className="mx-2 px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer hover:bg-slate-50 focus:bg-slate-50 transition-colors group"
        onClick={() => setActiveMenu("profile")}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
            <svg className="w-4 h-4 text-slate-600 group-hover:text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <span className="text-slate-700 group-hover:text-slate-900">Profile Settings</span>
        </div>
      </DropdownMenuItem>     
    </div>

    <DropdownMenuSeparator className="my-0" />

    {/* Logout Button */}
    <div className="p-2">
      <DropdownMenuItem
        className="mx-0 px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer hover:bg-red-50 focus:bg-red-50 transition-colors group"
        onClick={handleLogout}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <span className="text-red-600 font-semibold">Logout</span>
        </div>
      </DropdownMenuItem>
    </div>
  </DropdownMenuContent>
</DropdownMenu>
 </header>

        <main className="flex-1 overflow-y-auto p-8">
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
                          <span className="font-semibold">Rs {item.totalPayout}</span>
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
            {activeMenu === "manage-properties" && <AdminPropertyList />}
            {activeMenu === "profile" && (
              <div>
                <ProfileTabs />
              </div>
            )}
        </main>
      </section>
    </div>
  );

}

