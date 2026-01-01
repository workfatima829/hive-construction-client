"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api";
import { Investment } from "@/types/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Trash2, Wallet, Check, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";

export default function InvestmentsView() {
  const router = useRouter();
  const role = Cookies.get("role");
  const isAdmin = role === "admin";

  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [withdrawingId, setWithdrawingId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);

  useEffect(() => {
    if (!role) router.push("/login");
  }, [role, router]);

  useEffect(() => {
    fetchInvestments();
  }, [statusFilter]);

  const fetchInvestments = async () => {
    setLoading(true);
    try {
      const endpoint = isAdmin ? "/allInvestments" : "/userInvestments";
      const url = statusFilter !== "all" ? `${endpoint}?status=${statusFilter}` : endpoint;
      const res = await apiClient.get(url);

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

  const handleWithdraw = async (id: string) => {
    if (!confirm("Are you sure you want to withdraw this investment?")) return;

    setWithdrawingId(id);
    try {
      const res = await apiClient.delete(`/investment/${id}`);
      alert(res?.message || "Investment withdrawn successfully");
      fetchInvestments();
    } catch (err: any) {
      alert(err?.message || "Failed to withdraw investment");
    } finally {
      setWithdrawingId(null);
    }
  };

  const handleApprove = async (id: string) => {
    if (!confirm("Are you sure you want to approve this investment?")) return;

    setApprovingId(id);
    try {
      const res = await apiClient.put(`/investment-requests/${id}/approve`);
      alert(res?.message || "Investment approved successfully");
      fetchInvestments();
    } catch (err: any) {
      alert(err?.message || "Failed to approve investment");
    } finally {
      setApprovingId(null);
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm("Are you sure you want to reject this investment?")) return;

    setRejectingId(id);
    try {
      const res = await apiClient.put(`/investment-requests/${id}/reject`);
      alert(res?.message || "Investment rejected successfully");
      fetchInvestments();
    } catch (err: any) {
      alert(err?.message || "Failed to reject investment");
    } finally {
      setRejectingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "withdrawn":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-orange-100 text-orange-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "approved":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
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
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Status</SelectItem>

                {(isAdmin
                  ? ["pending", "active", "withdrawn", "completed", "approved", "rejected"]
                  : ["pending", "active", "withdrawn", "completed"]
                ).map(status => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {!isAdmin && (
            <Button onClick={() => router.push("/create-investment")}>
              Invest in New Property
            </Button>
          )}
        </div>
      </div>

      {isAdmin && pendingCount > 0 && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="font-semibold text-blue-900">Pending Approvals</p>
            <p className="text-blue-700">{pendingCount} investment(s) awaiting your approval</p>
          </div>
          <Button
            variant="outline"
            onClick={() => setStatusFilter("pending")}
          >
            View Pending
          </Button>
        </div>
      )}

      {!isAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-yellow-500 text-white rounded-xl p-6">
            <p className="text-yellow-100">Pending</p>
            <p className="text-4xl font-bold">{pendingCount}</p>
          </div>
          <div className="bg-green-600 text-white rounded-xl p-6">
            <p className="text-green-100">Active</p>
            <p className="text-4xl font-bold">{activeCount}</p>
          </div>
          <div className="bg-purple-600 text-white rounded-xl p-6">
            <p className="text-purple-100">Total</p>
            <p className="text-4xl font-bold">{investments.length}</p>
          </div>
        </div>
      )}

      {investments.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl shadow">
          <Wallet size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold">No Investments Found</h3>
        </div>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto">
            <Table className="min-w-full border rounded-lg">
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Property</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Invested On</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {investments.map(inv => {
                  const property = inv.propertyId;
                  if (!property) return null;
                  return (
                    <TableRow key={inv._id} className="hover:bg-gray-50">
                      <TableCell>{property.property_title}</TableCell>
                      <TableCell>{property.property_location}</TableCell>
                      <TableCell>${inv.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(inv.status)}`}>
                          {inv.status.toUpperCase()}
                        </span>
                      </TableCell>
                      <TableCell>{new Date(inv.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {isAdmin && inv.status === "pending" ? (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <svg
                                  className="w-5 h-5"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 8c1.1 0 2-0.9 2-2s-0.9-2-2-2-2 0.9-2 2 0.9 2 2 2zm0 2c-1.1 0-2 0.9-2 2s0.9 2 2 2 2-0.9 2-2-0.9-2-2-2zm0 6c-1.1 0-2 0.9-2 2s0.9 2 2 2 2-0.9 2-2-0.9-2-2-2z" />
                                </svg>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleApprove(inv._id)}
                                disabled={approvingId === inv._id}
                                className="text-green-600 cursor-pointer"
                              >
                                <Check size={14} className="mr-2" />
                                {approvingId === inv._id ? "Approving..." : "Approve"}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleReject(inv._id)}
                                disabled={rejectingId === inv._id}
                                className="text-red-600 cursor-pointer"
                              >
                                <X size={14} className="mr-2" />
                                {rejectingId === inv._id ? "Rejecting..." : "Reject"}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ) : inv.status === "active" ? (
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={withdrawingId === inv._id}
                            onClick={() => handleWithdraw(inv._id)}
                          >
                            {withdrawingId === inv._id ? "Withdrawing..." : <Trash2 size={16} />}
                          </Button>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {investments.map(inv => {
              const property = inv.propertyId;
              if (!property) return null;
              return (
                <div key={inv._id} className="border rounded-xl p-4 shadow-md bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{property.property_title}</h3>
                      <p className="text-sm text-gray-600">{property.property_location}</p>
                    </div>
                    {isAdmin && inv.status === "pending" && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 8c1.1 0 2-0.9 2-2s-0.9-2-2-2-2 0.9-2 2 0.9 2 2 2zm0 2c-1.1 0-2 0.9-2 2s0.9 2 2 2 2-0.9 2-2-0.9-2-2-2zm0 6c-1.1 0-2 0.9-2 2s0.9 2 2 2 2-0.9 2-2-0.9-2-2-2z" />
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleApprove(inv._id)}
                            disabled={approvingId === inv._id}
                            className="text-green-600 cursor-pointer"
                          >
                            <Check size={14} className="mr-2" />
                            {approvingId === inv._id ? "Approving..." : "Approve"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleReject(inv._id)}
                            disabled={rejectingId === inv._id}
                            className="text-red-600 cursor-pointer"
                          >
                            <X size={14} className="mr-2" />
                            {rejectingId === inv._id ? "Rejecting..." : "Reject"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                  <p className="text-sm text-gray-800 mt-2">Amount: ${inv.amount.toLocaleString()}</p>
                  <div className="mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(inv.status)}`}>
                      {inv.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Invested On: {new Date(inv.createdAt).toLocaleDateString()}
                  </p>
                  {inv.status === "active" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-3 w-full"
                      disabled={withdrawingId === inv._id}
                      onClick={() => handleWithdraw(inv._id)}
                    >
                      {withdrawingId === inv._id ? "Withdrawing..." : "Withdraw Investment"}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
