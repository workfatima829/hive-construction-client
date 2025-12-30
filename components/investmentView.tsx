"use client";
import { useEffect, useState } from "react";
import { Wallet } from "lucide-react";
import { Investment } from "@/types/types";
import { apiClient } from "@/lib/api";
import InvestmentCard from "./investmentCard";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import ModalComponent from "./modalComponent";

interface InvestmentRequestModel {
  _id: string;
  property_Id: string;
  amount: number;
  status?: string;
}

export default function InvestmentsView() {
  const router = useRouter();
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pendingRequests, setPendingRequests] = useState<InvestmentRequestModel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      const data = await apiClient.get("/investment-requests/pending");
      if (Array.isArray(data)) {
        setPendingRequests(data);
      } else if (data.data && Array.isArray(data.data)) {
        setPendingRequests(data.data);
      } else if (data.success && data.data) {
        setPendingRequests(data.data);
      } else {
        console.error("Unexpected response format:", data);
        setPendingRequests([]);
      }
      
    } catch (error) {
      setPendingRequests([]);
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    try {
      const data = await apiClient.get("/investments");
      if (data.success && data.data) {
        setInvestments(data.data);
      } else if (data.data && Array.isArray(data.data)) {
        setInvestments(data.data);
      } else if (Array.isArray(data)) {
        setInvestments(data);
      } else {
        setError("Failed to fetch investments");
      }
    } catch (err) {
      setError("Error loading investments");
    } finally {
      setLoading(false);
    }
  };

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
          <Button
            onClick={() => router.push("/create-investment")}
            className="group text-white px-8 py-4 rounded-lg border-0 transition-all duration-300 hover:scale-105 cursor-pointer"
            style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" }}
          >
            Invest in New Property
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-blue-100 mb-2">Pending Investment</p>
                <p className="text-4xl font-bold">{pendingRequests.length}</p>
              </div>
              <div>
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white text-blue-600 hover:bg-blue-50"
                  disabled={pendingRequests.length === 0}
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
          
          {isModalOpen && (
            <ModalComponent
              pendingRequests={pendingRequests}
              setPendingRequests={setPendingRequests}
              onClose={() => setIsModalOpen(false)}
              onUpdate={fetchPendingRequests}
            />
          )}
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
