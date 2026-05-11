import { Link } from "wouter";
import { Twitter, Github, Send } from "lucide-react";

const FOOTER_LINKS = [
  {
    label: "Protocol",
    links: [
      { name: "Tokenomics", href: "#tokenomics" },
      { name: "Staking", href: "#" },
      { name: "Governance", href: "#" },
      { name: "Smart Contracts", href: "#" },
      { name: "Audits", href: "#" },
    ],
  },
  {
    label: "Company",
    links: [
      { name: "About Us", href: "#about" },
      { name: "Roadmap", href: "#roadmap" },
      { name: "Whitepaper", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
    ],
  },
  {
    label: "Community",
    links: [
      { name: "Telegram", href: "#" },
      { name: "Discord", href: "#" },
      { name: "Twitter / X", href: "#" },
      { name: "Blog", href: "#" },
      { name: "FAQ", href: "#faq" },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "#1D0000", borderTop: "1px solid rgba(200,146,42,0.25)" }}>
      {/* Main grid */}
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-10 sm:pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="flex flex-col gap-6 sm:col-span-2 lg:col-span-1">
            <Link href="/">
              <img
                src="/logo.png"
                alt="Azizi Global Group"
                className="h-14 w-auto object-contain"
                style={{ filter: "brightness(1.05)" }}
              />
            </Link>
            <p
              className="text-[14px] leading-[1.8] max-w-[280px]"
              style={{ color: "rgba(255,255,255,0.48)" }}
            >
              Azizi Global Group Inc. is building the next generation of
              decentralised Web4.0 financial infrastructure — transparent,
              borderless, and community-governed.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-2">
              {[
                { icon: <Twitter className="w-4 h-4" />, href: "#", label: "Twitter" },
                { icon: <Github className="w-4 h-4" />, href: "#", label: "GitHub" },
                { icon: <Send className="w-4 h-4" />, href: "#", label: "Telegram" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 hover:scale-105"
                  style={{
                    border: "1px solid rgba(200,146,42,0.25)",
                    color: "rgba(255,255,255,0.45)",
                    background: "rgba(200,146,42,0.05)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(200,146,42,0.7)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#C8922A";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(200,146,42,0.25)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.45)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>

          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.label}>
              <p
                className="text-[11px] tracking-[0.28em] uppercase font-semibold mb-6"
                style={{ color: "#C8922A" }}
              >
                {col.label}
              </p>
              <ul className="flex flex-col gap-3.5">
                {col.links.map((l) => (
                  <li key={l.name}>
                    <a
                      href={l.href}
                      className="text-[14px] transition-colors duration-150"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.45)";
                      }}
                    >
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          className="mt-16 mb-8 h-px w-full"
          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(200,146,42,0.35) 40%, rgba(200,146,42,0.35) 60%, transparent 100%)" }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[12px] tracking-[0.06em]" style={{ color: "rgba(255,255,255,0.28)" }}>
            © {new Date().getFullYear()} Azizi Global Group Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((t) => (
              <a
                key={t}
                href="#"
                className="text-[12px] tracking-[0.04em] transition-colors duration-150"
                style={{ color: "rgba(255,255,255,0.28)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(200,146,42,0.8)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.28)"; }}
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
