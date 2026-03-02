"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({
  emailOrUsername: z
    .string()
    .min(1, "Email or username is required"),
  password: z
    .string()
    .min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onToggleMode?: () => void;
  onForgotClick?: () => void;
  onShowToast?: (message: string, type: "success" | "error") => void;
}

export default function LoginForm({
  onToggleMode = () => {},
  onForgotClick = () => {},
  onShowToast = () => {},
}: LoginFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur", // Validate on blur
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.emailOrUsername,
          username: data.emailOrUsername,
          password: data.password,
        }),
      });

      const responseData = await res.json();

      if (!res.ok) {
        // Handle specific error messages
        if (responseData.message === "User not found") {
          onShowToast("Invalid email or username", "error");
        } else if (responseData.message === "Invalid credentials") {
          onShowToast("Incorrect password", "error");
        } else {
          onShowToast(responseData.message || "Login failed", "error");
        }
        return;
      }

      // Success
      onShowToast("Login successful!", "success");
      
      Cookies.set("token", responseData.token, { expires: 7 });
      Cookies.set("user", JSON.stringify(responseData.user), { expires: 7 });
      Cookies.set("role", responseData.user.role, { expires: 7 });
      Cookies.set("username", responseData.user.username, { expires: 7 });
      
      reset();
      
      // Redirect to dashboard after 1 second
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error: any) {
      console.error("Login error:", error);
      onShowToast("Something went wrong. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back</h2>
      <p className="text-gray-600 mb-6">Sign in to your account to continue</p>
      
      <div className="space-y-4">
        <div>
          <Input
            placeholder="Email or Username"
            {...register("emailOrUsername")}
            className="h-11 border-gray-300"
            disabled={isLoading}
          />
          {errors.emailOrUsername && (
            <p className="text-red-500 text-xs mt-1">
              {errors.emailOrUsername.message}
            </p>
          )}
        </div>

        <div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
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
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onForgotClick}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Forgot password?
        </button>

        <Button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          className="w-full h-11 rounded-lg text-white font-semibold"
          style={{background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'}}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </div>

      <p className="text-sm text-center mt-6 text-gray-600">
        Don't have an account?{" "}
        <button
          onClick={onToggleMode}
          className="font-semibold text-blue-600 hover:text-blue-700"
        >
          Create one
        </button>
      </p>
    </div>
  );
}
