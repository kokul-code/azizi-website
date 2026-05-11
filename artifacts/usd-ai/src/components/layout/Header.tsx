import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  dark?: boolean;
}

const NAV_LINKS = [
  { label: "Home",       href: "#"           },
  { label: "About Us",   href: "#about"      },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Roadmap",    href: "#roadmap"    },
  { label: "FAQ",        href: "#faq"        },
  { label: "Whitepaper", href: "#"           },
];

export default function Header({ dark: _dark = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#") && href.length > 1) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  const hasBackground = scrolled || menuOpen;

  return (
    <header
      className={`fixed top-5 left-3 right-3 z-50 transition-all duration-500 ${
        hasBackground
          ? "bg-[#1D0000]/94 backdrop-blur-md border border-white/10 rounded-2xl"
          : "bg-transparent rounded-t-2xl"
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-6 h-[72px] flex items-center justify-between relative">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <img
            src="/logo.png"
            alt="Azizi Global Group"
            className="h-10 w-auto object-contain"
            style={{
              filter:
                "drop-shadow(0 1px 8px rgba(0,0,0,0.9)) drop-shadow(0 0px 3px rgba(0,0,0,0.8)) brightness(1.15) saturate(1.4)",
            }}
          />
        </Link>

        {/* Center Nav — desktop only */}
        <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className="text-[14px] font-medium transition-colors whitespace-nowrap text-white/60 hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Right: CTA + Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#"
            className="hidden sm:inline-flex items-center justify-center h-9 px-4 rounded-md border border-white/25 text-white/85 text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Buy Now
          </a>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-md border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 pb-3">
          <nav className="flex flex-col">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="px-5 py-3.5 text-[15px] font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="px-5 pt-2">
            <a
              href="#"
              className="flex items-center justify-center h-10 px-4 rounded-md border border-white/25 text-white/85 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              Buy Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
