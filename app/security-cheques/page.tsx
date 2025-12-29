"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Cheque {
  _id: string;
  investorId: string;
  propertyId: string;
  chequeNumber: string;
  bankName: string;
  amount: number;
  status: string;
}

export default function AdminChequesPage() {
  const [cheques, setCheques] = useState<Cheque[]>([]);
  const [editingCheque, setEditingCheque] = useState<Cheque | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
   const router = useRouter();

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const fetchCheques = async () => {
    try {
      const res = await axios.get(`${NEXT_PUBLIC_API_URL}/getSecurityCheques`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCheques(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCheques();
  }, []);

  const handleEditClick = (cheque: Cheque) => {
    setEditingCheque(cheque);
    setFormData({
      status: cheque.status,
    });
  };
   const handleSave = async () => {
  if (!editingCheque) return;
  setLoading(true);
  setMessage("");

  try {
    const payload = { status: formData.status };

    const res = await axios.put(
      `${NEXT_PUBLIC_API_URL}/securityCheque/${editingCheque._id}`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setMessage(res.data.message);
    setTimeout(() => setMessage(""), 30000);

    setEditingCheque(null);
    fetchCheques();
  } catch (error: any) {
    setMessage(error.response?.data?.message || "Something went wrong");
    setTimeout(() => setMessage(""), 30000);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <Button
        variant="outline"
        className="mb-4"
        onClick={() => router.push("/dashboard")}
      >
        Back to Dashboard
      </Button>
      <h1 className="text-2xl font-bold mb-4">All Security Cheques</h1>
      {message && <p className="mb-4 text-center text-green-600">{message}</p>}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Investor</TableHead>
            <TableHead>Property</TableHead>
            <TableHead>Cheque Number</TableHead>
            <TableHead>Bank</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {cheques.map((cheque) => (
            <TableRow key={cheque._id}>
              <TableCell>
                {typeof cheque.investorId === "object"
                  ? `${(cheque.investorId as any).firstName} ${(cheque.investorId as any).lastName}`
                  : cheque.investorId}
              </TableCell>
              <TableCell>
                {typeof cheque.propertyId === "object" && (cheque.propertyId as any)?.property_title
                  ? (cheque.propertyId as any).property_title
                  : "—"}
              </TableCell>

              <TableCell>{cheque.chequeNumber}</TableCell>
              <TableCell>{cheque.bankName}</TableCell>
              <TableCell>{cheque.amount}</TableCell>

              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-sm ${cheque.status === "cleared"
                    ? "bg-green-100 text-green-700"
                    : cheque.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                    }`}
                >
                  {cheque.status}
                </span>
              </TableCell>

              <TableCell className="text-right">
                <Button size="sm" onClick={() => handleEditClick(cheque)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal */}
      <Dialog open={!!editingCheque} onOpenChange={() => setEditingCheque(null)}>
        <DialogContent className=" bg-white">
          <DialogHeader>
            <DialogTitle>Edit Cheque</DialogTitle>
          </DialogHeader>
          {editingCheque && (
            <div className="space-y-4">
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue/>
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="released">Released</SelectItem>
                  <SelectItem value="encashed">Encashed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <DialogFooter className="flex gap-2 mt-4">
            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
            <Button variant="outline" onClick={() => setEditingCheque(null)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
