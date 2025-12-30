"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, AlertCircle } from "lucide-react";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog";
import { useState, useEffect } from "react";

export default function PendingRequestsPage() {
  const queryClient = useQueryClient();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [pageError, setPageError] = useState<string | null>(null);

  const { data: requests = [], isLoading, error: queryError } = useQuery({
    queryKey: ["pendingRequests"],
    queryFn: async () => {
      try {
        const res = await apiClient.get("/investment-requests");
        console.log("Fetched requests:", res);
        
        if (!res || res.error) {
          throw new Error(res.error || "Failed to fetch requests");
        }
        
        return Array.isArray(res) ? res : res.data ?? [];
      } catch (err: any) {
        console.error("Query error:", err);
        throw err;
      }
    },
  });

  useEffect(() => {
    if (queryError) {
      setPageError(`Failed to load requests: ${queryError.message}`);
    }
  }, [queryError]);

  const mutation = useMutation({
    mutationFn: async ({ id, action }: { id: string; action: "approve" | "reject" }) => {
      console.log(`Sending ${action} request for ID:`, id);
      const res = await apiClient.put(`/investment-requests/${id}/${action}`, {});
      console.log(`${action} response:`, res);
      
      if (res.error) {
        throw new Error(res.error);
      }
      return res;
    },
    onSuccess: (_, variables) => {
      console.log("Mutation succeeded");
      queryClient.invalidateQueries({ queryKey: ["pendingRequests"] });
      setAlertMessage(`Request ${variables.action}d successfully`);
      setAlertOpen(true);
    },
    onError: (error: any) => {
      console.error("Mutation error:", error);
      setAlertMessage(error?.message || "Something went wrong");
      setAlertOpen(true);
    },
  });

  if (pageError) {
    return (
      <div className="p-4">
        <div className="border border-red-300 bg-red-50 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-900">Error Loading Requests</h3>
            <p className="text-red-800 text-sm mt-1">{pageError}</p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!requests || requests.length === 0) {
    return <div className="p-4">No pending requests</div>;
  }

  return (
    <div className="p-2 space-y-2">
      {requests.map((req: any) => (
        <Card key={req._id}>
          <CardHeader className="flex justify-between items-center">
            <DropdownMenu >
              <DropdownMenuTrigger asChild >
                <Button variant="ghost" size="sm" >
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                <DropdownMenuItem 
                  onClick={() => {
                    console.log("Approving request:", req._id);
                    mutation.mutate({ id: req._id, action: "approve" });
                  }}
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Processing..." : "Approve"}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => {
                    console.log("Rejecting request:", req._id);
                    mutation.mutate({ id: req._id, action: "reject" });
                  }}
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Processing..." : "Reject"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <p>Email: {req.investor_Id?.email || "N/A"}</p>
            <p className="text-sm text-gray-500 mt-1">ID: {req._id}</p>
          </CardContent>
        </Card>
      ))}
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Notice</AlertDialogTitle>
            <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setAlertOpen(false)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
