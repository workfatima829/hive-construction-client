"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/layout/Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideFooter = pathname.startsWith("/auth") || pathname.startsWith("/dashboard");

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
}
