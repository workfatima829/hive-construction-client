// app/verify/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid or missing verification token");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/verify?token=${token}`,
          {
            method: "GET",
          }
        );

        if (!res.ok) {
          const error = await res.json();
          
          if (error.message === "Token expired. Please request a new verification email.") {
            setMessage("Your verification link has expired. Please request a new one.");
          } else {
            setMessage(error.message || "Email verification failed");
          }
          setStatus("error");
          return;
        }

        const response = await res.json();
        setMessage("Email verified successfully! You can now login.");
        setStatus("success");
        
        setTimeout(() => window.location.href = "/auth", 2000);
      } catch (error) {
        setStatus("error");
        setMessage("An error occurred during verification. Please try again.");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12" style={{background: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)'}}>
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-8" style={{background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'}}>
          <span className="text-xl font-bold text-white">HC</span>
        </div>

        {/* Content */}
        {status === "loading" && (
          <div>
            <Loader2 className="w-16 h-16 mx-auto mb-6 text-gray-400 animate-spin" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Verifying Your Email</h1>
            <p className="text-gray-600">Please wait while we verify your email address...</p>
          </div>
        )}

        {status === "success" && (
          <div>
            <CheckCircle className="w-16 h-16 mx-auto mb-6 text-green-500" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <p className="text-sm text-gray-500">Redirecting to login...</p>
          </div>
        )}

        {status === "error" && (
          <div>
            <XCircle className="w-16 h-16 mx-auto mb-6 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <Link href="/auth">
              <button className="inline-block px-6 py-2 rounded-lg text-white font-semibold hover:opacity-90"
                style={{background: ' linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'}}
              >
                Back to Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
