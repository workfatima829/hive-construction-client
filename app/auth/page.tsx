"use client";

import { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegistrationForm";
import ForgotPasswordForm from "@/components/auth/ForgetPassword";
import ResetPasswordPage from "../resetPassword/[token]/page";

// Toast Component
const Toast = ({ message, type }: any) => {
  const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";
  return (
    <div className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg fixed bottom-6 right-6 animate-in fade-in slide-in-from-bottom-4 duration-300 z-50`}>
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

export default function AuthPage() {
  // State for form mode (login, register, forgot, reset)
  const [mode, setMode] = useState<"login" | "register" | "forgot" | "reset">("login");
  const [resetToken, setResetToken] = useState<string>("");
  // State for toast notifications
  const [toast, setToast] = useState<{message: string; type: "success" | "error"} | null>(null);

  // Function to show toast
  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Toggle between login and register
  const handleToggleMode = () => {
    if (mode === "login") {
      setMode("register");
    } else if (mode === "register") {
      setMode("login");
    } else if (mode === "forgot") {
      setMode("login");
    } else if (mode === "reset") {
      setMode("login");
    }
  };

  // Navigate to forgot password form
  const handleForgotClick = () => {
    setMode("forgot");
  };

  // Navigate to reset password form (after email sent)
  const handleResetClick = (token: string) => {
    setResetToken(token);
    setMode("reset");
  };

  return (
    <>
      {toast && <Toast {...toast} />}
      
      <div className="grid min-h-screen lg:grid-cols-2 bg-white">
        {/* Left Side - Form */}
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Logo & Header */}
            <div className="mb-8 text-center">
              {/* Logo button - clicks go to home */}
              <button
                onClick={() => window.location.href = "/"}
                className="inline-flex items-center justify-center w-12 h-12 rounded-lg hover:opacity-90 transition-opacity"
                style={{background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'}}
              >
                <span className="text-xl font-bold text-white">HC</span>
              </button>
              <h1 className="text-3xl font-bold mt-4 text-gray-900">Hive Construction</h1>
              <p className="text-gray-600 mt-2">Premium Property Solutions</p>
            </div>

            {/* Forms - Change based on mode */}
            {mode === "login" && (
              <LoginForm 
                onToggleMode={handleToggleMode}
                onForgotClick={handleForgotClick}
                onShowToast={showToast}
              />
            )}

            {mode === "register" && (
              <RegisterForm 
                onToggleMode={handleToggleMode}
                onShowToast={showToast}
              />
            )}

            {mode === "forgot" && (
              <ForgotPasswordForm 
                onToggleMode={handleToggleMode}
                onShowToast={showToast}
                onResetClick={handleResetClick}
              />
            )}

            {mode === "reset" && (
              <ResetPasswordPage 
                token={resetToken}
                onToggleMode={handleToggleMode}
                onShowToast={showToast}
              />
            )}
          </div>
        </div>

        {/* Right Side - Hero Section (Desktop only) */}
        <div
          className="relative hidden lg:flex flex-col items-center justify-center px-10 text-white overflow-hidden"
          style={{background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'}}
        >
          {/* Decorative background circles */}
          <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
          
          {/* Hero content */}
          <div className="relative z-10 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 mb-6">
                <span className="text-3xl font-bold">🏗️</span>
              </div>
            </div>
            
            <h2 className="text-5xl font-bold leading-tight mb-6">
              Build Your Dream Property
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 max-w-md mx-auto">
              Discover premium properties and investment opportunities with Hive Construction's expert guidance
            </p>

            {/* Features list */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-center gap-3 text-lg">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm">✓</div>
                <span>Verified Properties</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-lg">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm">✓</div>
                <span>Expert Consultation</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-lg">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm">✓</div>
                <span>Secure Transactions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
