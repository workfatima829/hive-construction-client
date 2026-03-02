"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      router.push("/dashboard"); 
    } else {
      router.push("/login");
    }
  }, [router]);

  return <div>Loading...</div>;
}
