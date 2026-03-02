"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters"),
  email: z
    .string()
    .email("Invalid email address"),
  password: z
    .string()
    .min(3, "Password must be at least 3 characters"),
  confirmPassword: z
    .string()
    .min(3, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onToggleMode: () => void;
  onShowToast: (message: string, type: "success" | "error") => void;
}

export default function RegisterForm({ onToggleMode, onShowToast }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      });

      const responseData = await res.json();

      if (!res.ok) {
        // Handle specific error messages
        if (responseData.message === "User already exists") {
          onShowToast("Email already registered", "error");
        } else if (responseData.message === "Username already exists") {
          onShowToast("Username already taken", "error");
        } else {
          onShowToast(responseData.message || "Registration failed", "error");
        }
        return;
      }

      // Success
      onShowToast("Registration successful! Check your email to verify.", "success");
      reset();
      setTimeout(() => {
        onToggleMode();
      }, 2000);
    } catch (error: any) {
      console.error("Register error:", error);
      onShowToast("Something went wrong. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Input
              placeholder="First Name"
              {...register("firstName")}
              className="h-11 border-gray-300"
              disabled={isLoading}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1 text-left">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <Input
              placeholder="Last Name"
              {...register("lastName")}
              className="h-11 border-gray-300"
              disabled={isLoading}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1 text-left">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Input
            placeholder="Username"
            {...register("username")}
            className="h-11 border-gray-300"
            disabled={isLoading}
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1 text-left">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <Input
            type="email"
            placeholder="Email"
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
            <p className="text-red-500 text-xs mt-1 text-left">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
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
            <p className="text-red-500 text-xs mt-1 text-left">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          className="w-full h-11 rounded-lg text-white font-semibold cursor-pointer"
          style={{background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'}}
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>
      </div>

      <p className="text-sm text-center mt-6 text-gray-600">
        Already have an account?{" "}
        <button
          onClick={onToggleMode}
          className="font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
        >
          Sign in
        </button>
      </p>
    </div>
  );
}
