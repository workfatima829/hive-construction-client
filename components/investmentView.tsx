"use client";

import { useEffect, useState } from "react";
import { Wallet } from "lucide-react";
import { Investment } from "@/types/types";
import { apiClient } from "@/lib/api";
import InvestmentCard from "./investmentCard";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
export default function InvestmentsView() {
    const router = useRouter();
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    try {
      const data = await apiClient.get("/investments");
      
      if (data.success) {
        setInvestments(data.data);
      } else {
        setError("Failed to fetch investments");
      }
    } catch (err) {
      setError("Error loading investments");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const activeInvestments = investments.filter(inv => inv.status === "active").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div>
     <div className="flex items-center justify-between mb-8">
       <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Investments</h1>
        <p className="text-gray-600">Track and manage your property investments</p>
      </div>
      <div>
        <Button  onClick={() => router.push("/create-investment")}
         className="group text-white px-8 py-4  rounded-lg border-0 transition-all duration-300 hover:scale-105 cursor-pointer"
        style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" }}
        >Invest in New Property</Button>
      </div>
     </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <p className="text-blue-100 mb-2">Total Invested</p>
          <p className="text-4xl font-bold">${totalInvested.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <p className="text-green-100 mb-2">Active Investments</p>
          <p className="text-4xl font-bold">{activeInvestments}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <p className="text-purple-100 mb-2">Total Properties</p>
          <p className="text-4xl font-bold">{investments.length}</p>
        </div>
      </div>

      {investments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <Wallet size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Investments Yet</h3>
          <p className="text-gray-600">Start investing in properties to see them here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {investments.map((investment) => (
            <InvestmentCard key={investment._id} investment={investment} />
          ))}
        </div>
      )}
    </div>
  );
}
