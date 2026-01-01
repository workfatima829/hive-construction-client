"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Wallet } from "lucide-react";

import { Investment } from "@/types/types";
import { apiClient } from "@/lib/api";
import InvestmentCard from "./investmentCard";
import { Button } from "./ui/button";

export default function InvestmentsView() {
  const router = useRouter();
  const role = Cookies.get("role");
  const isAdmin = role === "admin";

  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!role) router.push("/login");
  }, [role, router]);

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    try {
      const endpoint = isAdmin ? "/allInvestments" : "/userInvestments";
      const res = await apiClient.get(endpoint);

      if (res?.success && Array.isArray(res.data)) {
        setInvestments(res.data);
      } else {
        setError("Failed to load investments");
      }
    } catch {
      setError("Something went wrong while fetching investments");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-12 w-12 rounded-full border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-red-700">
        {error}
      </div>
    );
  }

  const pendingCount = investments.filter(i => i.status === "pending").length;
  const activeCount = investments.filter(i => i.status === "active").length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {isAdmin ? "All Investments" : "My Investments"}
          </h1>
          <p className="text-gray-600">
            {isAdmin
              ? "Manage all investor investments"
              : "Track and manage your property investments"}
          </p>
        </div>

        {!isAdmin && (
          <Button onClick={() => router.push("/create-investment")}>
            Invest in New Property
          </Button>
        )}
      </div>

      {/* Stats (User only) */}
      {!isAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-yellow-500 text-white rounded-xl p-6">
            <p className="text-yellow-100">Pending Investments</p>
            <p className="text-4xl font-bold">{pendingCount}</p>
          </div>

          <div className="bg-green-600 text-white rounded-xl p-6">
            <p className="text-green-100">Active Investments</p>
            <p className="text-4xl font-bold">{activeCount}</p>
          </div>

          <div className="bg-purple-600 text-white rounded-xl p-6">
            <p className="text-purple-100">Total Investments</p>
            <p className="text-4xl font-bold">{investments.length}</p>
          </div>
        </div>
      )}

      {/* List */}
      {investments.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl shadow">
          <Wallet size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold">No Investments Found</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {investments
            .filter(inv => inv.propertyId)
            .map(inv => (
              <InvestmentCard key={inv._id} investment={inv} />
            ))}
        </div>
      )}
    </div>
  );
}

