"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(3, "Password must be at least 3 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

/* ================= TOAST COMPONENT ================= */
const Toast = ({ message, type }: { message: string; type: "success" | "error" }) => {
  const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";
  return (
    <div className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg fixed bottom-6 right-6 z-50`}>
      <div className="flex items-center gap-2">
        {type === "success" ? (
          <span className="text-lg">✓</span>
        ) : (
          <span className="text-lg">✕</span>
        )}
        {message}
      </div>
    </div>
  );
};

export default function ResetPasswordPage() {
  const params = useParams();
  const router = useRouter();
  const token = params?.token as string;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (!token) {
      showToast("Invalid or missing token", "error");
    } else {
      console.log("Token received:", token); 
    }
  }, [token]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const onSubmit = async (data: ResetPasswordValues) => {
    if (!token) {
      showToast("Invalid or missing token", "error");
      return;
    }

    setIsLoading(true);
    
    console.log("Sending request with:", {
      url: `${process.env.NEXT_PUBLIC_API_URL}/resetPassword`,
      token: token,
      password: data.newPassword
    });

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/resetPassword`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token,
            password: data.newPassword,
          }),
        }
      );

      console.log("Response status:", res.status); 

      const result = await res.json();
      console.log("Response data:", result); 

      if (!res.ok) {
        showToast(result.message || "Invalid or expired token", "error");
        return;
      }

      showToast("Password reset successfully!", "success");
      setTimeout(() => router.push("/auth"), 2000);
    } catch (error: any) {
      console.error("Reset password error:", error);
      showToast(error.message || "Something went wrong. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} />}

      <div className="min-h-screen flex items-center justify-center px-6" style={{background: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)'}}>
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4" style={{background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'}}>
              <span className="text-xl font-bold text-white">HC</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Reset Your Password</h1>
            <p className="text-gray-600">Enter your new password below</p>
          </div>

          {/* Back to login link */}
          <Link href="/auth" className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900">
            <ArrowLeft size={18} /> Back to login
          </Link>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  {...register("newPassword")}
                  className="h-11 border-gray-300 pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  {...register("confirmPassword")}
                  className="h-11 border-gray-300 pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading || !token}
              className="w-full h-11 rounded-lg text-white font-semibold"
              style={{background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'}}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-4 bg-gray-100 rounded text-xs font-mono">
              <p><strong>Debug Info:</strong></p>
              <p>Token: {token ? `${token.substring(0, 20)}...` : 'Not found'}</p>
              <p>API URL: {process.env.NEXT_PUBLIC_API_URL}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}