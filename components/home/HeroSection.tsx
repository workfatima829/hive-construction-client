"use client";

import { Button } from "@/components/ui/button";
import LoginDropdown from "@/components/auth/LoginDropdown";
import { useRouter } from "next/navigation";

export default function HeroSection() {
    const router = useRouter();
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10" />
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("bg2.jpg")' }} />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 animate-pulse" />
            </div>

            <div className="relative z-20 flex flex-col items-center text-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-snug">
                        <span className="block">HIVE CONSTRUCTION</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                            STRENGTH YOU CAN TRUST
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg text-white/80 mb-6 leading-relaxed">
                        From concept to completion, we craft every detail for strength and endurance, delivering solutions that inspire confidence and stand the test of time.
                    </p>

                    <div className="w-40 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full mb-6 mx-auto" />

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <LoginDropdown />

                        <Button onClick={() => router.push("/properties")}
                            size="lg"
                            variant="outline"
                            className="bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white px-8 py-4 text-lg rounded-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-pointer"
                        >
                            View All Properties
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
