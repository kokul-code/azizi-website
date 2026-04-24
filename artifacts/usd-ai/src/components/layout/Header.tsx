import { useState, useEffect } from "react";
import { Link } from "wouter";

interface HeaderProps {
  dark?: boolean;
}

export default function Header({ dark = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isLight = !dark && !scrolled;

  return (
    <header
      className={`fixed top-5 left-3 right-3 z-50 transition-all duration-500 rounded-t-2xl ${
        scrolled
          ? "bg-[#0e1014]/90 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-6 h-[72px] flex items-center justify-between relative">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <img
            src="/logo.png"
            alt="Azizi Global Group"
            className="h-7 w-auto object-contain"
            style={{
              filter: "drop-shadow(0 1px 8px rgba(0,0,0,0.9)) drop-shadow(0 0px 3px rgba(0,0,0,0.8)) brightness(1.15) saturate(1.4)",
            }}
          />
        </Link>

        {/* Center Nav — absolutely centered */}
        <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {[
            { label: "Home", active: true },
            { label: "About Us" },
            { label: "Tokenomics" },
            { label: "Roadmap" },
            { label: "FAQ" },
            { label: "Whitepaper" },
          ].map(({ label, active }) => (
            <a
              key={label}
              href="#"
              className={`text-[14px] font-medium transition-colors whitespace-nowrap ${
                active
                  ? "text-white font-semibold"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden sm:inline-flex items-center justify-center h-9 px-4 rounded-md border border-white/25 text-white/85 text-sm font-medium hover:bg-white/10 transition-colors"
          >Login</a>
        </div>
      </div>
    </header>
  );
}
