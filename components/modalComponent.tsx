import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { apiClient } from "@/lib/api";

interface InvestmentRequestModel {
  _id: string;
  property_Id: string;
  amount: number;
  status?: string;
}

type Props = {
  pendingRequests: InvestmentRequestModel[];
  setPendingRequests: React.Dispatch<React.SetStateAction<InvestmentRequestModel[]>>;
  onClose: () => void;
  onUpdate?: () => void;
};

export default function ModalComponent({
  pendingRequests,
  setPendingRequests,
  onClose,
  onUpdate
}: Props) {
  const [saving, setSaving] = useState<string | null>(null);

  const handleSave = async (req: InvestmentRequestModel) => {
    setSaving(req._id);
    try {
      const data = await apiClient.put(`/investment-requests/${req._id}`, {
        amount: req.amount,
        property_Id: req.property_Id,
      });
      let updatedData;
      if (data.data) {
        updatedData = data.data;
      } else if (data.success && data.data) {
        updatedData = data.data;
      } else {
        updatedData = data;
      }
      setPendingRequests((prev) =>
        prev.map((r) =>
          r._id === updatedData._id ? updatedData : r
        )
      );
      
      alert("Request updated successfully!");
      if (onUpdate) {
        await onUpdate();
      }
      
    } catch (error: any) {
      alert(`Failed to update: ${error.message || 'Unknown error'}`);
    } finally {
      setSaving(null);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>Edit Pending Requests ({pendingRequests.length})</DialogTitle>
        </DialogHeader>

        {pendingRequests.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No pending requests found
          </div>
        ) : (
          <div className="space-y-4">
            {pendingRequests.map((req) => (
              <div key={req._id} className="border p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="mb-3 pb-3 border-b border-gray-200">
                  <p className="text-xs text-gray-400 mb-1">Request ID: {req._id}</p>
                  <p className="text-sm font-semibold text-gray-700">
                    Status: <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">{req.status || 'pending'}</span>
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Property ID <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={req.property_Id}
                      onChange={(e) =>
                        setPendingRequests((prev) =>
                          prev.map((r) =>
                            r._id === req._id
                              ? { ...r, property_Id: e.target.value }
                              : r
                          )
                        )
                      }
                      placeholder="Enter property ID"
                      className="w-full"
                      disabled={saving === req._id}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Amount (PKR) <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="number"
                      value={req.amount}
                      onChange={(e) =>
                        setPendingRequests((prev) =>
                          prev.map((r) =>
                            r._id === req._id
                              ? { ...r, amount: Number(e.target.value) }
                              : r
                          )
                        )
                      }
                      placeholder="Enter amount"
                      min="0"
                      step="1000"
                      className="w-full"
                      disabled={saving === req._id}
                    />
                  </div>

                  <Button
                    className="w-full mt-3 bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleSave(req)}
                    disabled={saving === req._id || !req.property_Id || !req.amount}
                  >
                    {saving === req._id ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                        Saving...
                      </span>
                    ) : (
                      " Save Changes"
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <DialogFooter className="mt-4">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
