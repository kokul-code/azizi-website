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
      <div className="max-w-[1320px] mx-auto px-6 h-[60px] flex items-center justify-between relative">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="w-7 h-7 rounded-full bg-white/15 border border-white/30 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="white" strokeWidth="1.2" />
              <path d="M5 7h4M7 5v4" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </span>
          <span className="text-white font-semibold text-base tracking-tight">USD.AI</span>
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
          >
            Borrower Login
          </a>
        </div>
      </div>
    </header>
  );
}
