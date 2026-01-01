"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead,TableHeader,TableRow,} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle,DialogFooter,} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {Select,SelectContent,SelectItem,SelectTrigger, SelectValue,} from "@/components/ui/select";
import { MoreHorizontal, Trash2, Edit, TrendingUp } from "lucide-react";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Property {
  _id: string;
  property_title: string;
  property_location: string;
  property_size: string;
  listing: {
    property_type: string;
    property_price: number;
    current_market_value: number;
    status: string;
    property_selling_date: string;
  };
}
export default function ManageProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const fetchProperties = async (pageNumber = 1) => {
    try {
      const res = await axios.get(
        `${NEXT_PUBLIC_API_URL}/properties?page=${pageNumber}&limit=9`
      );
      setProperties(res.data.data);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchProperties(page);
  }, [page]);

  const handleEditClick = (property: Property) => {
    setEditingProperty(property);
    setFormData({
      property_title: property.property_title,
      property_location: property.property_location,
      property_size: property.property_size,
      property_type: property.listing.property_type,
      property_price: property.listing.property_price,
      current_market_value: property.listing.current_market_value,
      status: property.listing.status,
      property_selling_date: property.listing.property_selling_date,
    });
  };

  const handleProfitDistribute = async (propertyId: string) => {
    if (!confirm("Are you sure you want to distribute profit for this property?")) return;
    try {
      const res = await axios.post(
        `${NEXT_PUBLIC_API_URL}/profitDistribution/${propertyId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(res.data.message || "Profit distributed successfully");
      setTimeout(() => setMessage(""), 5000);
    } catch (error: any) {
      console.error(error);
      setMessage(error.response?.data?.message || "Profit distribution failed");
      setTimeout(() => setMessage(""), 5000);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return;
    try {
      await axios.delete(`${NEXT_PUBLIC_API_URL}/property/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Property deleted successfully");
      fetchProperties(page);
      setTimeout(() => setMessage(""), 3000);
    } catch (error: any) {
      console.error(error);
      setMessage(error.response?.data?.message || "Delete failed");
      setTimeout(() => setMessage(""), 5000);
    }
  };

  const handleSave = async () => {
    if (!editingProperty) return;
    setLoading(true);
    try {
      await axios.put(
        `${NEXT_PUBLIC_API_URL}/property/${editingProperty._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Property updated successfully");
      setEditingProperty(null);
      fetchProperties(page);
      setTimeout(() => setMessage(""), 5000);
    } catch (error: any) {
      console.error(error);
      setMessage(error.response?.data?.message || "Update failed");
      setTimeout(() => setMessage(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Manage Properties</h1>

      {message && (
        <div className="mb-4 p-3 rounded-md bg-green-50 text-green-700 font-medium shadow-sm">
          {message}
        </div>
      )}

      <div className="overflow-x-auto bg-white shadow rounded-lg border border-slate-200">
        <Table className="min-w-full">
          <TableHeader className="bg-slate-100">
            <TableRow>
              <TableHead className="text-left">Title</TableHead>
              <TableHead className="text-left">Location</TableHead>
              <TableHead className="text-left">Size</TableHead>
              <TableHead className="text-left">Type</TableHead>
              <TableHead className="text-left">Price</TableHead>
              <TableHead className="text-left">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((prop) => (
              <TableRow key={prop._id} className="hover:bg-slate-50 transition">
                <TableCell>{prop.property_title}</TableCell>
                <TableCell>{prop.property_location}</TableCell>
                <TableCell>{prop.property_size}</TableCell>
                <TableCell>{prop.listing.property_type}</TableCell>
                <TableCell>${prop.listing.property_price}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      prop.listing.status === "sold"
                        ? "bg-red-100 text-red-700"
                        : prop.listing.status === "available"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {prop.listing.status}
                  </span>
                </TableCell>
                <TableCell className="text-right relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setOpenDropdownId(openDropdownId === prop._id ? null : prop._id)
                    }
                  >
                    <MoreHorizontal size={20} />
                  </Button>

                  {openDropdownId === prop._id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border z-10 flex flex-col">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start px-3 py-2 hover:bg-slate-50"
                        onClick={() => {
                          handleEditClick(prop);
                          setOpenDropdownId(null);
                        }}
                      >
                        <Edit size={16} className="mr-2 text-slate-600" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start px-3 py-2 text-purple-600 hover:bg-purple-50"
                        onClick={() => {
                          handleProfitDistribute(prop._id);
                          setOpenDropdownId(null);
                        }}
                      >
                        <TrendingUp size={16} className="mr-2" />
                        Profit distribute
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start px-3 py-2 text-red-600 hover:bg-red-50"
                        onClick={() => {
                          handleDelete(prop._id);
                          setOpenDropdownId(null);
                        }}
                      >
                        <Trash2 size={16} className="mr-2" />
                        Delete
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-4 text-slate-700 font-medium">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>

      <Dialog open={!!editingProperty} onOpenChange={() => setEditingProperty(null)}>
        <DialogContent className="max-w-lg bg-white rounded-xl shadow-xl overflow-hidden">
          <DialogHeader>
            <DialogTitle>Edit Property</DialogTitle>
          </DialogHeader>

          {editingProperty && (
            <div className="space-y-4">
              <Input
                value={formData.property_title}
                onChange={(e) => setFormData({ ...formData, property_title: e.target.value })}
                placeholder="Property Title"
                className="rounded-lg border-slate-300"
              />
              <Input
                value={formData.property_location}
                onChange={(e) => setFormData({ ...formData, property_location: e.target.value })}
                placeholder="Location"
                className="rounded-lg border-slate-300"
              />
              <Input
                value={formData.property_size}
                onChange={(e) => setFormData({ ...formData, property_size: e.target.value })}
                placeholder="Size"
                className="rounded-lg border-slate-300"
              />

              <Select
                value={formData.property_type}
                onValueChange={(value) => setFormData({ ...formData, property_type: value })}
              >
                <SelectTrigger className="rounded-lg border-slate-300">
                  <SelectValue>{formData.property_type || "Property Type"}</SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="plot">Plot</SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="number"
                value={formData.property_price}
                onChange={(e) => setFormData({ ...formData, property_price: Number(e.target.value) })}
                placeholder="Price"
                className="rounded-lg border-slate-300"
              />
              <Input
                type="number"
                value={formData.current_market_value}
                onChange={(e) => setFormData({ ...formData, current_market_value: Number(e.target.value) })}
                placeholder="Current Market Value"
                className="rounded-lg border-slate-300"
              />
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger className="rounded-lg border-slate-300">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                  <SelectItem value="under_construction">Under Construction</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="date"
                value={formData.property_selling_date?.split("T")[0]}
                onChange={(e) => setFormData({ ...formData, property_selling_date: e.target.value })}
                placeholder="Selling Date"
                className="rounded-lg border-slate-300"
              />
            </div>
          )}

          <DialogFooter className="flex gap-2 mt-4">
            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
            <Button variant="outline" onClick={() => setEditingProperty(null)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
