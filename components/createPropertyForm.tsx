"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { propertySchema } from "@/schemas/propertyValidationSchema";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CreatePropertyForm() {
  const router = useRouter();
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    const formData = {
      ...form,
      property_size: Number(form.property_size),
      property_price: Number(form.property_price),
      current_market_value: form.current_market_value ? Number(form.current_market_value) : undefined,
    };

    const result = propertySchema.safeParse(formData);
    if (!result.success) {
      setErrorMsg(result.error.issues.map(err => err.message).join(", "));
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
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

        setTimeout(() => setSuccessMsg(""), 30000);
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
    <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create New Property</h2>

      {successMsg && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Property Title</Label>
          <Input name="property_title" value={form.property_title} onChange={handleChange} required />
        </div>

        <div>
          <Label>Location</Label>
          <Input name="property_location" value={form.property_location} onChange={handleChange} required />
        </div>

        <div>
          <Label>Size (sq ft)</Label>
          <Input type="number" name="property_size" value={form.property_size} onChange={handleChange} required />
        </div>

        <div>
          <Label>Property Type</Label>
          <Select
            name="property_type"
            value={form.property_type}
            onValueChange={(v) => setForm({ ...form, property_type: v })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Residential">Residential</SelectItem>
              <SelectItem value="Commercial">Commercial</SelectItem>
              <SelectItem value="Plot">Plot</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Property Price</Label>
          <Input type="number" name="property_price" value={form.property_price} onChange={handleChange} required />
        </div>

        <div>
          <Label>Current Market Value</Label>
          <Input type="number" name="current_market_value" value={form.current_market_value} onChange={handleChange} />
        </div>

        <div>
          <Label>Property Selling Date</Label>
          <Input type="date" name="property_selling_date" value={form.property_selling_date} onChange={handleChange} />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating..." : "Create Property"}
        </Button>
      </form>
    </div>
  );
}
