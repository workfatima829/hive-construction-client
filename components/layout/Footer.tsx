import Link from "next/link";

export default function Footer() {
  const accentColor = "oklch(70.5% 0.213 47.604)";
  return (
    <footer
      className="mt-auto border-t border-white/10"
      style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" }}
    >
        <div className="pt-6 pb-6 border-t border-white/10 text-xs text-center" style={{ color: accentColor }}>
          @ {new Date().getFullYear()} Hive Construction Ventures. All rights reserved.
        </div>
    
    </footer>
  );
}
