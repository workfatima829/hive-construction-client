"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DollarSign, Building2 } from "lucide-react";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, } from "@/components/ui/alert-dialog";
export default function NewInvestmentPage() {
  const router = useRouter();

  const [propertyId, setPropertyId] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Validation
  const validateForm = () => {
    if (!propertyId.trim()) {
      setAlertMessage("Property ID is required");
      setShowAlert(true);
      return false;
    }

    if (!amount) {
      setAlertMessage("Investment amount is required");
      setShowAlert(true);
      return false;
    }

    if (Number(amount) <= 0) {
      setAlertMessage("Amount must be greater than 0");
      setShowAlert(true);
      return false;
    }

    return true;
  };

  const handleInvestment = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      await apiClient.post("/investment-request", {
        propertyId: propertyId,
        amount: Number(amount),
      });

      setAlertMessage("Investment pending state...");
      setShowAlert(true);

      setPropertyId("");
      setAmount("");
    } catch (error: any) {
      setAlertMessage(error?.message || "Something went wrong...");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div>
        <Button
          variant="outline"
          className="mb-4 mt-2 ml-2 cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          ← Back to Dashboard
        </Button>

        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-3 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-2">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    New Investment
                  </CardTitle>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="propertyId"
                  className="text-sm font-semibold text-gray-700"
                >
                  Property ID
                </Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="propertyId"
                    placeholder="Enter property id"
                    value={propertyId}
                    onChange={(e) => setPropertyId(e.target.value)}
                    className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="amount"
                  className="text-sm font-semibold text-gray-700"
                >
                  Investment Amount
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <Button
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={handleInvestment}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Invest Now"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* AlertDialog */}
        <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Notice</AlertDialogTitle>
              <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setShowAlert(false)}>
                OK
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
