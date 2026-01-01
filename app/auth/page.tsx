"use client"

import { useState } from "react"
import LoginForm from "@/components/auth/LoginForm"
import RegistrationForm from "@/components/auth/RegistrationForm"

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login")

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md rounded-2xl border bg-background p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-2">
            {mode === "login" ? "Welcome Back" : "Create an Account"}
          </h1>
         

          {mode === "login" ? <LoginForm /> : <RegistrationForm />}

          <p className="text-sm text-center mt-6 text-muted-foreground">
            {mode === "login" ? (
              <>
                Don’t have an account?{" "}
                <button
                  onClick={() => setMode("register")}
                  className="font-medium text-primary hover:underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="font-medium text-primary hover:underline"
                >
                  Login
                </button>
              </>
            )}
          </p>
        </div>
      </div>

      <div className="relative hidden lg:block">
        <img
          src="/signup.jpg"
          alt="Auth"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex h-full items-center justify-center px-10 text-white">
          <h2 className="text-3xl font-semibold leading-snug">
            Build your future <br /> with confidence
          </h2>
        </div>
      </div>
    </div>
  )
}
