"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api";
import { FileText, Landmark } from "lucide-react";

interface Cheque {
  _id: string;
  chequeNumber: string;
  bankName: string;
  amount: number;
  status: "active" | "released" | "encashed";
  issueDate: string;
  propertyId?: {
    property_title: string;
    property_location: string;
  };
}

export default function SecurityChequesView() {
  const router = useRouter();
  const [cheques, setCheques] = useState<Cheque[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchCheques(token);
  }, [router]);

  const fetchCheques = async (token: string) => {
    setLoading(true);
    try {
      const res = await apiClient.get("/myCheques");
      let chequeData = null;
      if (Array.isArray(res?.data)) {
        chequeData = res.data;
      } else if (Array.isArray(res?.data?.data)) {
        chequeData = res.data.data;
      } else if (res?.data?.cheques && Array.isArray(res.data.cheques)) {
        chequeData = res.data.cheques;
      }
      
      if (chequeData && Array.isArray(chequeData) && chequeData.length > 0) {
        setCheques(chequeData);
      } else if (chequeData && Array.isArray(chequeData)) {
        setCheques([]);
      } else {
        console.error("Could not find cheque data in response");
        setError("No cheques data found in response");
      }
    } catch (err: any) {
      console.error("Error fetching cheques:", err);
      setError(err?.response?.data?.message || err?.message || "Failed to load security cheques");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-white text-emerald-700";
      case "released":
        return "bg-yellow-100 text-yellow-700";
      case "encashed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
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

  if (cheques.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-12 text-center">
        <FileText size={64} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No Security Cheques
        </h3>
        <p className="text-gray-600">
          Your issued security cheques will appear here
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          My Security Cheques
        </h1>
        <p className="text-gray-600">
          View all security cheques issued against your investments
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cheques.map((cheque) => (
          <div
            key={cheque._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border overflow-hidden"
          >
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-5 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FileText />
                  <h3 className="text-lg font-semibold">Security Cheque</h3>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    cheque.status
                  )}`}
                >
                  {cheque.status.toUpperCase()}
                </span>
              </div>

              <p className="text-sm opacity-90 mt-2">
                {cheque.propertyId?.property_title}
              </p>
            </div>

            <div className="p-5 space-y-3 text-sm text-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-500">Cheque No</span>
                <span className="font-medium">{cheque.chequeNumber}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Bank</span>
                <span className="flex items-center gap-1 font-medium">
                  <Landmark size={14} />
                  {cheque.bankName}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Amount</span>
                <span className="font-semibold text-gray-900">
                  Rs {cheque.amount.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Issued On</span>
                <span className="text-xs">
                {new Date(cheque.createdAt).toDateString()}
                </span>
              </div>

              {cheque.propertyId?.property_location && (
                <p className="text-xs text-gray-400 pt-2 border-t">
                  {cheque.propertyId.property_location}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}