"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const fields = [
  { name: "investorId", placeholder: "Investor ID", type: "text" },
  { name: "propertyId", placeholder: "Property ID", type: "text" },
  { name: "chequeNumber", placeholder: "Cheque Number", type: "text" },
  { name: "bankName", placeholder: "Bank Name", type: "text" },
  { name: "amount", placeholder: "Amount", type: "number" },
];

export default function SecurityChequeForm() {
  const [formData, setFormData] = useState<Record<string, string>>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${NEXT_PUBLIC_API_URL}/securityCheque`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message);
      setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}));
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4">
      {fields.map((field) => (
        <Input
          key={field.name}
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          value={formData[field.name]}
          onChange={handleChange}
          required
        />
      ))}
      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Cheque"}
      </Button>
      {message && <p className="mt-2 text-center">{message}</p>}
    </form>
  );
}
