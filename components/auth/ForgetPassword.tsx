"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Invalid email address"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps {
  onToggleMode: () => void;
  onShowToast: (message: string, type: "success" | "error") => void;
  onResetClick: (token: string) => void; // NEW: callback to show reset form
}

export default function ForgotPasswordForm({ onToggleMode, onShowToast, onResetClick }: ForgotPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/forgotPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      const responseData = await res.json();

      if (!res.ok) {
        onShowToast(responseData.message || "Failed to send reset link", "error");
        return;
      }
      onShowToast("Reset link sent! You can also reset your password here.", "success");
      reset();
      
    } catch (error: any) {
      console.error("Forgot password error:", error);
      onShowToast("Something went wrong. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Reset Password</h2>
      <p className="text-gray-600 mb-6">Enter your email to receive reset instructions</p>
      
      <div className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Email Address"
            {...register("email")}
            className="h-11 border-gray-300"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 text-left">
              {errors.email.message}
            </p>
          )}
        </div>

        <Button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          className="w-full h-11 rounded-lg text-white font-semibold"
          style={{background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'}}
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </Button>
      </div>

      <p className="text-sm text-center mt-6 text-gray-600">
        <button
          onClick={onToggleMode}
          className="font-semibold text-blue-600 hover:text-blue-700"
        >
          Back to login
        </button>
      </p>
    </div>
  );
}
