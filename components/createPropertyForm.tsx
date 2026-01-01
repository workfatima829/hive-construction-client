"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, MapPin, Ruler, Home, DollarSign, TrendingUp, Calendar } from "lucide-react";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CreatePropertyForm() {
  const [form, setForm] = useState({
    property_title: "",
    property_location: "",
    property_size: "",
    property_type: "",
    property_price: "",
    current_market_value: "",
    property_selling_date: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    const formData = {
      ...form,
      property_size: Number(form.property_size),
      property_price: Number(form.property_price),
      current_market_value: form.current_market_value ? Number(form.current_market_value) : undefined,
    };

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/property`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMsg("Property created successfully!");
        setForm({
          property_title: "",
          property_location: "",
          property_size: "",
          property_type: "",
          property_price: "",
          current_market_value: "",
          property_selling_date: "",
        });
        setTimeout(() => setSuccessMsg(""), 50000);
      } else {
        setErrorMsg(data.message || "Failed to create property");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
      <Card className="max-w-4xl mx-auto shadow-2xl border-0 rounded-2xl ">
        <CardHeader className="space-y-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold">Create New Property</CardTitle>
              <CardDescription className="text-blue-100">
                Add a new property to your portfolio
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-2 space-y-6 py-6">
          {successMsg && (
            <Alert className="border-green-200 bg-green-50">
              <AlertDescription className="text-green-800 font-medium">
                 {successMsg}
              </AlertDescription>
            </Alert>
          )}
          {errorMsg && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-800 font-medium">
                 {errorMsg}
              </AlertDescription>
            </Alert>
          )}

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="property_title" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Home className="w-4 h-4 text-blue-600" />
                Property Title
              </Label>
              <Input
                id="property_title"
                name="property_title"
                value={form.property_title}
                onChange={handleChange}
                required
                className="h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm"
                placeholder="Enter property title"
              />
            </div>

            {/* Location */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="property_location" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                Location
              </Label>
              <Input
                id="property_location"
                name="property_location"
                value={form.property_location}
                onChange={handleChange}
                required
                className="h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm"
                placeholder="Enter property location"
              />
            </div>

            {/* Size */}
            <div className="space-y-2">
              <Label htmlFor="property_size" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Ruler className="w-4 h-4 text-blue-600" />
                Size (sq ft)
              </Label>
              <Input
                id="property_size"
                type="number"
                name="property_size"
                value={form.property_size}
                onChange={handleChange}
                required
                className="h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm"
                placeholder="0"
              />
            </div>

            {/* Property Type */}
            <div className="space-y-2">
              <Label htmlFor="property_type" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                Property Type
              </Label>
              <Select
                name="property_type"
                value={form.property_type}
                onValueChange={(v) => setForm({ ...form, property_type: v })}
                required
              >
                <SelectTrigger className="h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm">
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent className="z-50 bg-white shadow-lg border border-slate-200 rounded-lg">
                  <SelectItem value="Residential">Residential</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="Plot">Plot</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Property Price */}
            <div className="space-y-2">
              <Label htmlFor="property_price" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-blue-600" />
                Property Price
              </Label>
              <Input
                id="property_price"
                type="number"
                name="property_price"
                value={form.property_price}
                onChange={handleChange}
                required
                className="h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm"
                placeholder="0"
              />
            </div>

            {/* Current Market Value */}
            <div className="space-y-2">
              <Label htmlFor="current_market_value" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                Current Market Value
              </Label>
              <Input
                id="current_market_value"
                type="number"
                name="current_market_value"
                value={form.current_market_value}
                onChange={handleChange}
                className="h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm"
                placeholder="0 (Optional)"
              />
            </div>

            {/* Selling Date */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="property_selling_date" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                Property Selling Date
              </Label>
              <Input
                id="property_selling_date"
                type="date"
                name="property_selling_date"
                value={form.property_selling_date}
                onChange={handleChange}
                className="h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <Button
                type="button"
                onClick={handleSubmit}
                className="w-full h-12 cursor-pointer  bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating Property...
                  </span>
                ) : (
                  "Create Property"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
  );
}
