"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import RegisterForm from "../auth/RegistrationForm";
import {X } from "lucide-react";
import LoginForm from "../auth/LoginForm";
import ForgotPasswordForm from "../auth/ForgetPassword";
export default function AboutUs() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleToggleMode = () => {
    setMode((prev) => (prev === "login" ? "register" : "login"));
  };
  const hiveSteps = [
    { title: "Browse Properties", desc: "View residential homes available for investment with complete details." },
    { title: "Invest Safely", desc: "Contribute any amount towards land or construction projects securely." },
    { title: "Track Investments", desc: "Monitor your contribution, share percentage, and profits in real-time." },
    { title: "Profit & Exit", desc: "Receive profits or original investment according to Hive’s secure policies." },
  ];

  const userRoles = [
    {
      title: "Admin",
      benefits: [
        "Manage property listings and investments",
        "Track investor profiles and reports",
        "Secure investments via cheques",
        "Profit-sharing calculations",
      ],
    },
    {
      title: "Investor",
      benefits: [
        "Track contribution, profit share, and exit plans",
        "Receive notifications about property and profit",
        "Update personal profile and password",
      ],
    },
    {
      title: "Visitor",
      benefits: [
        "Browse static pages like About, Terms, Privacy",
        "Search property listings",
        "Register to become an investor",
      ],
    },
  ];

  return (
    <main className="bg-background text-foreground">
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-[60] rounded-lg px-6 py-3 text-white shadow-lg ${
            toast.type === "error" ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Mission & Vision */}
      <section className="py-16 px-6 md:px-20 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Our Mission & Vision</h2>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
          Hive Construction is a leading residential property development company.
          We provide secure investment opportunities with transparent profit-sharing, 
          protecting the original investment even in case of loss. Our platform 
          allows investors to contribute to land purchases and home construction 
          while tracking investments, profits, and property status in real-time.
        </p>
      </section>

      {/* How Hive Works */}
      <section className="py-16 px-6 md:px-20 bg-secondary/10 text-center">
        <h2 className="text-3xl font-bold mb-12">How Hive Works</h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {hiveSteps.map((step) => (
            <div key={step.title} className="p-6 bg-card rounded-xl shadow-md">
              <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* User Roles & Benefits */}
      <section className="py-16 px-6 md:px-20 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">User Roles & Benefits</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {userRoles.map((role) => (
            <div key={role.title} className="p-6 bg-card rounded-xl shadow-md">
              <h3 className="font-semibold text-xl mb-2">{role.title}</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                {role.benefits.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to invest with Hive?</h2>
        <p className="text-muted-foreground mb-6">
          Join our platform and start contributing to high-quality residential projects today.
        </p>

        <Button
          size="lg"
          variant="default"
          className="text-white cursor-pointer"
          style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" }}
          onClick={() => {
            setMode("register");
            setOpen(true);
          }}
        >
          Start your journey
        </Button>
         <Button
          size="lg"
          variant="default"
          className="text-white cursor-pointer 
          ml-4"
          style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" }}
          onClick={() => {
            setMode("login");
            setOpen(true);
          }}
        >
          Sign in        </Button>

        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative w-[400px] bg-gray-900 p-6 rounded-2xl text-white shadow-2xl">
                <button
             onClick={() => setOpen(false)}
              className="absolute -top-4 -right-4 bg-gray-800 hover:bg-red-500 text-white p-2 rounded-full shadow-lg transition cursor-pointer"
            >
              <X size={18} />
            </button>
            <div>
              {mode === "login" && (
                <LoginForm
                  onToggleMode={handleToggleMode}
                  onForgotClick={() => setMode("forgot")}
                  onShowToast={handleToast}
                />
              )}
              {mode === "register" && (
                <RegisterForm
                  onToggleMode={handleToggleMode}
                  onShowToast={handleToast}
                />
              )}
              {mode === "forgot" && (
                <ForgotPasswordForm
                  onToggleMode={() => setMode("login")}
                  onShowToast={handleToast}
                  onResetClick={() => setMode("login")}
                />
              )}
            </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
