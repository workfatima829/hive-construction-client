"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ShieldCheck, Sparkles, UserCheck, XCircle } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegistrationForm";
import ForgotPasswordForm from "@/components/auth/ForgetPassword";

const Toast = ({ message, type }: { message: string; type: "success" | "error" }) => {
  const isError = type === "error";
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 rounded-lg px-5 py-3 text-white shadow-lg ${
        isError ? "bg-red-500" : "bg-emerald-600"
      }`}
    >
      <div className="flex items-center gap-2 text-sm font-medium">
        {isError ? <XCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
        <span>{message}</span>
      </div>
    </div>
  );
};

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleToggleMode = () => {
    setMode((prev) => (prev === "login" ? "register" : "login"));
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} />}
      <main className="min-h-screen bg-slate-100">
        <section className="min-h-screen flex flex-col md:flex-row">
          {/* Left Section - Auth Form (Shows first on mobile, left on tablet/desktop) */}
          <div className="flex-1 flex items-center justify-center px-6 py-10 bg-white md:bg-slate-100">
            <div className="w-full max-w-md">
              {/* Logo - Only on mobile */}
              <div className="md:hidden mb-8 text-center">
                <button
                  onClick={() => router.push("/")}
                  className="inline-flex items-center gap-2 text-slate-900 font-semibold"
                >
                  <Sparkles className="h-5 w-5 text-amber-500" />
                  <span className="text-lg">Hive Construction</span>
                </button>
              </div>

              {/* Auth Card */}
              <div className="rounded-2xl bg-white shadow-xl border border-slate-200 p-6 sm:p-8">
                <div className="mb-6 text-center">
                  <h2 className="text-2xl font-bold text-slate-900">
                    {mode === "register" 
                      ? "Create Your Account" 
                      : mode === "forgot"
                      ? "Reset Password"
                      : "Welcome Back"}
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    {mode === "register"
                      ? "Register to start investing with Hive"
                      : mode === "forgot"
                      ? "Enter your email to reset password"
                      : "Sign in to continue to your dashboard"}
                  </p>
                </div>

                {mode === "login" && (
                  <LoginForm
                    onToggleMode={handleToggleMode}
                    onForgotClick={() => setMode("forgot")}
                    onShowToast={showToast}
                  />
                )}

                {mode === "register" && (
                  <RegisterForm onToggleMode={handleToggleMode} onShowToast={showToast} />
                )}

                {mode === "forgot" && (
                  <ForgotPasswordForm
                    onToggleMode={() => setMode("login")}
                    onShowToast={showToast}
                    onResetClick={() => setMode("login")}
                  />
                )}
              </div>
            </div>
          </div>
          {/* Desktop Left Panel - Hidden on mobile/tablet, shown on large desktop */}
          <div
            className="relative hidden lg:flex overflow-hidden lg:order-first"
            style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" }}
          >
            <div
              className="absolute inset-0 opacity-25 bg-cover bg-center"
              style={{ backgroundImage: 'url("/signup.jpg")' }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/55 via-black/35 to-black/20" />

            <div className="relative z-10 w-full p-12 xl:p-16 flex flex-col justify-between text-white">
              <div>
                <button
                  onClick={() => router.push("/")}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20 transition cursor-pointer text-amber-500"
                >
                  <Sparkles className="h-4 w-4" />
                  Hive Construction
                </button>
              </div>

              <div className="max-w-lg">
                <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
                  Professional Real Estate Investment Platform
                </h1>
                <p className="mt-5 text-slate-200 text-lg leading-relaxed">
                  Access trusted property opportunities, secure investment workflows, and transparent
                  returns through Hive Construction Ventures.
                </p>

                <div className="mt-8 grid gap-3">
                  <div className="flex items-center gap-3 text-slate-100">
                    <ShieldCheck className="h-5 w-5 text-emerald-300" />
                    <span>Capital protection-focused investment model</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-100">
                    <UserCheck className="h-5 w-5 text-emerald-300" />
                    <span>Verified investor onboarding and monitoring</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-100">
                    <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                    <span>Real-time property and profit tracking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}