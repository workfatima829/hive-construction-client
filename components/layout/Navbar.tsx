"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "#about-us" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
  ];

  return (
    <nav className="w-full shadow-lg sticky top-0 z-50" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="text-2xl font-bold transition-all duration-300 hover:scale-105"
              style={{ color: 'oklch(70.5% 0.213 47.604)' }}
            >
              Hive Construction
            </Link>
          </div>  
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-medium transition-all duration-300 hover:scale-105 relative group"
                style={{ color: 'oklch(70.5% 0.213 47.604)' }}
              >
                {link.name}
                <span 
                  className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: 'oklch(70.5% 0.213 47.604)' }}
                ></span>
              </Link>
            ))}
          </div>
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-lg transition-all duration-300 hover:bg-white/10"
              style={{ color: 'oklch(70.5% 0.213 47.604)' }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div 
          className="md:hidden shadow-lg backdrop-blur-lg"
          style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}
        >
          <div className="px-4 pt-2 pb-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block py-2 px-3 rounded-lg font-medium transition-all duration-300 hover:bg-white/10"
                style={{ color: 'oklch(70.5% 0.213 47.604)' }}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
