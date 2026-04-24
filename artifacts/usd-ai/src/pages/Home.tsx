import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { PieChart, Pie, Cell, Sector } from "recharts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Shield, ArrowUpRight, Search, FileText, LogOut } from "lucide-react";

const TOKENOMICS = [
  { name: "Liquidity (DEX Pools)",    pct: 25, tokens: "250,000,000", color: "#C8922A" },
  { name: "Community & Rewards",       pct: 20, tokens: "200,000,000", color: "#E8C55A" },
  { name: "Team & Founders",           pct: 15, tokens: "150,000,000", color: "#C85050" },
  { name: "Investors (Seed/Private)",  pct: 15, tokens: "150,000,000", color: "#A03838" },
  { name: "Treasury",                  pct: 10, tokens: "100,000,000", color: "#6B8B8B" },
  { name: "Ecosystem Growth",          pct: 10, tokens: "100,000,000", color: "#4A7A6A" },
  { name: "Airdrop",                   pct:  5, tokens:  "50,000,000", color: "#9B7040" },
];

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius - 4} outerRadius={outerRadius + 14} startAngle={startAngle} endAngle={endAngle} fill={fill} opacity={1} />
      <Sector cx={cx} cy={cy} innerRadius={outerRadius + 18} outerRadius={outerRadius + 22} startAngle={startAngle} endAngle={endAngle} fill={fill} opacity={0.5} />
    </g>
  );
};

const HERO_VIDEOS = [
  "/hero-ocean.mp4",
  "/hero-city.mp4",
  "/hero-lava.mp4",
];

export default function Home() {
  // ── Hero parallax
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroVideoY = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
  const heroContentY = useTransform(heroScroll, [0, 1], ["0%", "12%"]);

  // ── About section parallax
  const aboutRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: aboutScroll } = useScroll({ target: aboutRef, offset: ["start end", "end start"] });
  const visionImgY = useTransform(aboutScroll, [0, 1], ["-8%", "8%"]);
  const missionImgY = useTransform(aboutScroll, [0, 1], ["8%", "-8%"]);
  const aboutHeadY = useTransform(aboutScroll, [0, 0.4], ["30px", "0px"]);
  const aboutHeadO = useTransform(aboutScroll, [0, 0.3], [0, 1]);

  // ── Tokenomics chart state
  const [tokenActiveIdx, setTokenActiveIdx] = useState<number | null>(null);

  // ── Video state
  const [currentIdx, setCurrentIdx] = useState(0);
  const [fadingOut, setFadingOut] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Whenever currentIdx changes, play that video
  useEffect(() => {
    const vid = videoRefs.current[currentIdx];
    if (vid) {
      vid.currentTime = 0;
      vid.play().catch(() => {});
    }
  }, [currentIdx]);

  const handleVideoEnd = useCallback(() => {
    const next = (currentIdx + 1) % HERO_VIDEOS.length;
    setFadingOut(currentIdx);
    setCurrentIdx(next);
    setTimeout(() => setFadingOut(null), 1200);
  }, [currentIdx]);

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Header />
      <main className="flex-1">
        {/* HERO SECTION */}
        <section
          ref={heroRef}
          className="relative mx-3 mt-5 mb-3 rounded-2xl overflow-hidden flex flex-col"
          style={{ height: "calc(100vh - 2rem)" }}
        >
          {/* Background video carousel with crossfade + parallax */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div style={{ y: heroVideoY }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
            {HERO_VIDEOS.map((src, idx) => {
              const isActive = idx === currentIdx;
              const isFading = idx === fadingOut;
              return (
                <video
                  key={src}
                  ref={(el) => { videoRefs.current[idx] = el; }}
                  src={src}
                  autoPlay={idx === 0}
                  muted
                  playsInline
                  onEnded={isActive ? handleVideoEnd : undefined}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-[1200ms]"
                  style={{
                    opacity: isActive ? 1 : isFading ? 0 : 0,
                    zIndex: isActive ? 2 : isFading ? 1 : 0,
                    pointerEvents: "none",
                  }}
                />
              );
            })}
            </motion.div>
            {/* Primary gradient scrim: top-to-bottom for readability */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/55 via-black/25 to-black/65" />
            {/* Corner vignette: darkens top-left for logo contrast */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 45% 35% at 0% 0%, rgba(0,0,0,0.75) 0%, transparent 100%)",
              }}
            />
          </div>

          {/* Content wrapper — fills screen, with subtle parallax drift */}
          <motion.div style={{ y: heroContentY }} className="relative z-20 flex flex-col h-full max-w-[1320px] mx-auto px-6 w-full">

            {/* Spacer so header clears */}
            <div className="h-[72px]" />

            {/* Main text block — upper-left */}
            <div className="flex-1 flex flex-col justify-center pt-10 pb-6 max-w-3xl">
              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif tracking-tight text-white mb-10 text-5xl lg:text-6xl"
              >
                On-chain capital for the borderless economy.
              </motion.h1>

              {/* Stats — static */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex flex-wrap items-center gap-0 text-[13px] font-semibold tracking-[0.12em] uppercase"
              >
                {[
                  ["CURRENT APR", "7.11%"],
                  ["EXPECTED APR", "12.81%"],
                  ["TOTAL DEPOSITS", "$344M"],
                  ["USERS", "73,907"],
                ].map(([label, value], i) => (
                  <span key={label} className="inline-flex items-center shrink-0">
                    {i > 0 && <span className="mx-4 text-white/40">|</span>}
                    <span className="text-white/65 mr-1.5 text-[12px]">{label}:</span>
                    <span className="text-white">{value}</span>
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Bottom logos — scrolling ticker */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mb-20"
            >
              <p className="text-[13px] font-semibold tracking-[0.15em] uppercase text-white/65 mb-4 text-center">
                Trusted by global institutions
              </p>
              {/* Wider ticker strip — break out of container padding */}
              <div className="overflow-hidden relative -mx-6">
                {/* Fade edges */}
                <div className="absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-black/40 to-transparent pointer-events-none" />
                <div className="animate-ticker flex items-center whitespace-nowrap py-4">
                  {[...Array(2)].map((_, pass) => (
                    <span key={pass} className="inline-flex items-center">
                      {/* Framework */}
                      <span className="inline-flex items-center mx-7 font-serif italic text-xl text-white/65 hover:text-white/90 transition-colors cursor-default shrink-0">
                        Framework
                      </span>
                      {/* NVIDIA */}
                      <span className="inline-flex items-center gap-2 mx-7 text-white/65 hover:text-white/90 transition-colors cursor-default shrink-0">
                        <svg width="18" height="14" viewBox="0 0 18 14" fill="currentColor">
                          <polygon points="0,14 9,0 18,14" opacity="0.9" />
                        </svg>
                        <span className="text-sm font-semibold uppercase tracking-wider">NVIDIA</span>
                        <span className="text-xs text-white/40 font-medium">Inception Program</span>
                      </span>
                      {/* PayPal PYUSD */}
                      <span className="inline-flex items-center gap-2 mx-7 text-white/65 hover:text-white/90 transition-colors cursor-default shrink-0">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.067 7.301c.16-1.02.001-1.712-.553-2.34C18.828 4.178 17.42 4 15.61 4H9.893c-.392 0-.726.285-.787.672l-2.326 14.76a.472.472 0 00.466.544h3.393l-.22 1.397a.413.413 0 00.408.475h2.866c.344 0 .637-.25.69-.59l.029-.148.547-3.468.035-.19a.696.696 0 01.69-.59h.434c2.814 0 5.015-1.144 5.658-4.45.268-1.38.13-2.533-.582-3.341z" />
                        </svg>
                        <span className="text-sm font-semibold">PayPal</span>
                        <span className="text-sm font-bold text-white/80">PYUSD</span>
                      </span>
                      {/* HYDRA */}
                      <span className="inline-flex items-center gap-2 mx-7 text-white/65 hover:text-white/90 transition-colors cursor-default shrink-0">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 1L2 5v6l6 4 6-4V5L8 1z" stroke="currentColor" strokeWidth="1.2" fill="none" />
                          <path d="M8 4l-3 2v4l3 2 3-2V6L8 4z" fill="currentColor" opacity="0.5" />
                        </svg>
                        <span className="text-sm font-bold tracking-widest uppercase">HYDRA</span>
                      </span>
                      {/* Dragonfly */}
                      <span className="inline-flex items-center mx-7 text-white/65 hover:text-white/90 transition-colors cursor-default shrink-0">
                        <span className="text-sm font-bold tracking-widest uppercase">Dragonfly</span>
                      </span>
                      {/* Variant */}
                      <span className="inline-flex items-center mx-7 font-serif text-xl text-white/65 hover:text-white/90 transition-colors cursor-default shrink-0">
                        Variant
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ABOUT US SECTION — full screen */}
        <section
          ref={aboutRef}
          className="relative overflow-hidden flex flex-col"
          style={{ background: "#0A0806", minHeight: "100vh" }}
        >
          {/* Gold top border */}
          <div className="h-px w-full shrink-0" style={{ background: "linear-gradient(90deg, transparent 0%, #C8922A 40%, #C8922A 60%, transparent 100%)" }} />

          {/* ── HEADER BAND ── */}
          <motion.div style={{ y: aboutHeadY, opacity: aboutHeadO }} className="relative z-10 max-w-[1320px] mx-auto px-8 w-full pt-20 pb-16 shrink-0">
            <span
              className="inline-block text-[13px] font-semibold tracking-[0.28em] uppercase mb-5"
              style={{ color: "#C8922A" }}
            >
              About Us
            </span>
            <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-24">
              <h2 className="font-serif text-5xl lg:text-6xl leading-[1.1] text-white lg:max-w-xl">
                Redefining digital finance for a borderless world.
              </h2>
              <div className="lg:max-w-md pb-1">
                <p className="text-white/55 leading-relaxed text-[16px]">
                  Azizi Global Group Inc. is a next-generation blockchain finance company building infrastructure for decentralized capital markets — combining AI-driven credit models with on-chain transparency to deliver institutional-grade products accessible to everyone.
                </p>
              </div>
            </div>
            {/* Gold rule */}
            <div className="mt-10 h-px w-full" style={{ background: "linear-gradient(90deg, rgba(200,146,42,0.6) 0%, rgba(200,146,42,0.1) 60%, transparent 100%)" }} />
          </motion.div>

          {/* ── VISION ROW ── image left, text right */}
          <div className="relative flex flex-col lg:flex-row flex-1 min-h-0" style={{ borderBottom: "1px solid rgba(200,146,42,0.12)" }}>
            {/* Image with parallax */}
            <div className="relative lg:w-1/2 h-72 lg:h-auto overflow-hidden">
              <motion.img
                style={{ y: visionImgY, scale: 1.12, filter: "brightness(0.75) saturate(1.1)" }}
                src="/about-vision.png"
                alt="Vision"
                className="w-full h-full object-cover"
              />
              {/* Gold overlay fade */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent 60%, #0A0806 100%)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, #0A0806 0%, transparent 30%)" }} />
            </div>
            {/* Text */}
            <div className="relative z-10 lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 py-12">
              <div className="flex items-center gap-4 mb-6">
                <span
                  className="text-[12px] font-bold tracking-[0.25em] uppercase px-4 py-2 rounded-full border"
                  style={{ color: "#C8922A", borderColor: "rgba(200,146,42,0.4)", background: "rgba(200,146,42,0.1)" }}
                >
                  Vision
                </span>
                <div className="flex-1 h-px" style={{ background: "rgba(200,146,42,0.25)" }} />
                <span className="font-serif text-5xl leading-none select-none" style={{ color: "rgba(200,146,42,0.2)" }}>01</span>
              </div>
              <h3 className="font-serif text-4xl lg:text-5xl text-white mb-6 leading-snug max-w-md">
                A world where capital flows as freely as information.
              </h3>
              <p className="text-white/60 text-[16px] leading-[1.9] max-w-lg">
                We envision a global financial system where anyone — regardless of geography or legacy banking access — can participate in wealth creation through decentralized, transparent, and programmable money.
              </p>
              <div className="mt-9 flex items-center gap-3">
                <div className="w-10 h-px" style={{ background: "#C8922A" }} />
                <span className="text-[13px] tracking-[0.2em] uppercase text-white/35">Azizi Global Group</span>
              </div>
            </div>
          </div>

          {/* ── MISSION ROW ── text left, image right */}
          <div className="relative flex flex-col-reverse lg:flex-row flex-1 min-h-0">
            {/* Text */}
            <div className="relative z-10 lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 py-12">
              <div className="flex items-center gap-4 mb-6">
                <span
                  className="text-[12px] font-bold tracking-[0.25em] uppercase px-4 py-2 rounded-full border"
                  style={{ color: "#C85050", borderColor: "rgba(200,80,80,0.4)", background: "rgba(200,80,80,0.1)" }}
                >
                  Mission
                </span>
                <div className="flex-1 h-px" style={{ background: "rgba(200,80,80,0.25)" }} />
                <span className="font-serif text-5xl leading-none select-none" style={{ color: "rgba(200,80,80,0.2)" }}>02</span>
              </div>
              <h3 className="font-serif text-4xl lg:text-5xl text-white mb-6 leading-snug max-w-md">
                Build the rails for on-chain capital markets that trust no intermediary.
              </h3>
              <p className="text-white/60 text-[16px] leading-[1.9] max-w-lg">
                Our mission is to deploy blockchain-native financial primitives — secured by cryptographic proofs, governed by smart contracts, powered by AI — replacing opacity with accountability and exclusion with open access.
              </p>
              <div className="mt-9 flex items-center gap-3">
                <div className="w-10 h-px" style={{ background: "#C85050" }} />
                <span className="text-[13px] tracking-[0.2em] uppercase text-white/35">Decentralized by design</span>
              </div>
            </div>
            {/* Image */}
            <div className="relative lg:w-1/2 h-72 lg:h-auto overflow-hidden">
              <motion.img
                style={{ y: missionImgY, scale: 1.12, filter: "brightness(0.7) saturate(1.2)" }}
                src="/about-mission.png"
                alt="Mission"
                className="w-full h-full object-cover"
              />
              {/* Red overlay fade */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(270deg, transparent 60%, #0A0806 100%)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, #0A0806 0%, transparent 30%)" }} />
            </div>
          </div>

          {/* Gold bottom border */}
          <div className="h-px w-full shrink-0" style={{ background: "linear-gradient(90deg, transparent 0%, #C8922A 40%, #C8922A 60%, transparent 100%)" }} />
        </section>

        {/* ── KEY FEATURES SECTION ── */}
        <section className="relative overflow-hidden flex flex-col" style={{ background: "#0A0806", minHeight: "100vh" }}>
          {/* Top border */}
          <div className="h-px w-full shrink-0" style={{ background: "linear-gradient(90deg, transparent 0%, #C8922A 40%, #C8922A 60%, transparent 100%)" }} />

          {/* Header band */}
          <div className="relative z-10 max-w-[1320px] mx-auto px-8 w-full pt-20 pb-16 shrink-0">
            <span className="inline-block text-[13px] font-semibold tracking-[0.28em] uppercase mb-5" style={{ color: "#C8922A" }}>
              Why Azizi Global
            </span>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h2 className="font-serif text-5xl lg:text-6xl text-white leading-tight max-w-xl">
                Infrastructure built for the next era of capital markets.
              </h2>
              <p className="text-white/55 text-[16px] leading-relaxed max-w-sm lg:text-right">
                Every layer of Azizi Global is engineered for institutional-grade security, transparency, and composability — from smart contract to settlement.
              </p>
            </div>
            <div className="mt-10 h-px w-full" style={{ background: "linear-gradient(90deg, rgba(200,146,42,0.6) 0%, rgba(200,146,42,0.1) 60%, transparent 100%)" }} />
          </div>

          {/* Feature rows — alternating image / text layout */}
          <div className="relative z-10 max-w-[1320px] mx-auto px-8 w-full pb-24 flex-1 flex flex-col gap-10">

            {[
              {
                num: "01",
                tag: "Core Protocol",
                tagColor: "#C8922A",
                tagBorder: "rgba(200,146,42,0.4)",
                tagBg: "rgba(200,146,42,0.1)",
                accentLine: "#C8922A",
                title: "On-Chain Transparency",
                body: "Every transaction, position, and yield distribution is recorded immutably on-chain. Real-time cryptographic proofs let any participant verify the full state of the protocol — no trust, no intermediaries.",
                sub: "Verifiable by anyone, always",
                img: "/feature-transparency.png",
                imgRight: false,
              },
              {
                num: "02",
                tag: "Security",
                tagColor: "#C85050",
                tagBorder: "rgba(200,80,80,0.4)",
                tagBg: "rgba(200,80,80,0.1)",
                accentLine: "#C85050",
                title: "Audited Smart Contracts",
                body: "Every contract is formally verified and independently audited by leading blockchain security firms before any deployment. Multi-sig treasury controls and timelocked upgrades ensure deep, layered protection.",
                sub: "Zero single points of failure",
                img: "/feature-audited.png",
                imgRight: true,
              },
              {
                num: "03",
                tag: "Yield",
                tagColor: "#C8922A",
                tagBorder: "rgba(200,146,42,0.4)",
                tagBg: "rgba(200,146,42,0.1)",
                accentLine: "#C8922A",
                title: "Native Staking",
                body: "Lock capital, earn protocol yield. Staking rewards are distributed on-chain and auto-compound across vaults — no custodial risk, no intermediary skimming returns. Up to 12.81% APR.",
                sub: "Up to 12.81% APR",
                img: "/feature-staking.png",
                imgRight: false,
              },
              {
                num: "04",
                tag: "Token Economics",
                tagColor: "#C85050",
                tagBorder: "rgba(200,80,80,0.4)",
                tagBg: "rgba(200,80,80,0.1)",
                accentLine: "#C85050",
                title: "Programmable Vesting",
                body: "Time-locked token release schedules enforced entirely on-chain. Cliff periods, linear drip, and milestone-based unlocks — all parameters are transparent and immutable from the moment of deployment.",
                sub: "No trusted intermediary",
                img: "/feature-vesting.png",
                imgRight: true,
              },
              {
                num: "05",
                tag: "Compatibility",
                tagColor: "#C8922A",
                tagBorder: "rgba(200,146,42,0.4)",
                tagBg: "rgba(200,146,42,0.1)",
                accentLine: "#C8922A",
                title: "Multi-Wallet Support",
                body: "MetaMask, Ledger, Phantom, WalletConnect and beyond — connect with any wallet across all major chains. Designed for the broadest ecosystem reach from day one.",
                sub: "All major chains supported",
                img: "/feature-wallets.png",
                imgRight: false,
              },
            ].map((f, i) => (
              <div
                key={f.num}
                className="flex flex-col lg:flex-row items-stretch"
                style={{ borderTop: i === 0 ? "none" : "1px solid rgba(200,146,42,0.1)" }}
              >
                {/* Image side */}
                <div className={`relative overflow-hidden lg:w-[52%] ${f.imgRight ? "lg:order-2" : "lg:order-1"}`} style={{ minHeight: "420px" }}>
                  <img
                    src={f.img}
                    alt={f.title}
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.88) saturate(1.1)" }}
                  />
                  {/* Subtle edge fade toward text side only */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: f.imgRight
                        ? "linear-gradient(270deg, rgba(10,8,6,0.9) 0%, transparent 45%)"
                        : "linear-gradient(90deg, rgba(10,8,6,0.9) 0%, transparent 45%)",
                    }}
                  />
                  {/* Number watermark */}
                  <span
                    className="absolute bottom-6 right-8 font-serif leading-none select-none"
                    style={{ fontSize: "7rem", color: "rgba(255,255,255,0.06)" }}
                  >
                    {f.num}
                  </span>
                </div>

                {/* Text side */}
                <div
                  className={`lg:w-[48%] flex flex-col justify-center px-10 py-14 lg:py-0 lg:px-16 ${f.imgRight ? "lg:order-1" : "lg:order-2"}`}
                  style={{ background: "rgba(255,255,255,0.018)" }}
                >
                  <div className="flex items-center gap-4 mb-7">
                    <span
                      className="text-[12px] font-bold tracking-[0.25em] uppercase px-4 py-2 rounded-full border"
                      style={{ color: f.tagColor, borderColor: f.tagBorder, background: f.tagBg }}
                    >
                      {f.tag}
                    </span>
                    <div className="flex-1 h-px" style={{ background: `${f.tagBorder}` }} />
                    <span className="font-serif text-5xl leading-none select-none" style={{ color: `${f.tagBg.replace("0.1", "0.35")}` }}>
                      {f.num}
                    </span>
                  </div>

                  <h3 className="font-serif text-4xl lg:text-5xl text-white mb-6 leading-snug">
                    {f.title}
                  </h3>

                  <p className="text-white/65 text-[16px] leading-[1.9] max-w-lg">
                    {f.body}
                  </p>

                  <div className="mt-9 flex items-center gap-3">
                    <div className="w-10 h-px" style={{ background: f.accentLine }} />
                    <span className="text-[13px] tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
                      {f.sub}
                    </span>
                  </div>
                </div>
              </div>
            ))}

          </div>

          {/* Bottom border */}
          <div className="h-px w-full shrink-0" style={{ background: "linear-gradient(90deg, transparent 0%, #C8922A 40%, #C8922A 60%, transparent 100%)" }} />
        </section>

        {/* ── TOKENOMICS SECTION ── */}
        <section className="relative overflow-hidden flex flex-col" style={{ background: "#0A0806", minHeight: "100vh" }}>
          {/* Top border */}
          <div className="h-px w-full shrink-0" style={{ background: "linear-gradient(90deg, transparent 0%, #C8922A 40%, #C8922A 60%, transparent 100%)" }} />

          <div className="relative z-10 max-w-[1320px] mx-auto px-8 w-full py-20 flex-1 flex flex-col">

            {/* ── Centered heading ── */}
            <div className="text-center mb-20 text-[16px]">
              <div className="inline-flex items-baseline gap-0 mb-6">
                <span
                  className="font-serif italic text-7xl lg:text-8xl leading-none"
                  style={{ color: "rgba(255,255,255,0.92)", letterSpacing: "-0.02em" }}
                >
                  Token
                </span>
                <span
                  className="font-serif italic text-7xl lg:text-8xl leading-none"
                  style={{ color: "#C8922A", letterSpacing: "-0.02em" }}
                >
                  omics
                </span>
              </div>
              <div className="flex items-center justify-center gap-5 mt-5">
                <div className="h-px w-20" style={{ background: "rgba(200,146,42,0.35)" }} />
                <span className="text-[13px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Total Supply · 1,000,000,000 Tokens
                </span>
                <div className="h-px w-20" style={{ background: "rgba(200,146,42,0.35)" }} />
              </div>
            </div>

            {/* ── Chart + Legend ── */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 flex-1">

              {/* Donut chart */}
              <div className="lg:w-[45%] flex justify-center items-center">
                <div className="relative" style={{ width: 400, height: 400 }}>
                  <PieChart width={400} height={400}>
                    <Pie
                      data={TOKENOMICS.map(d => ({ ...d, value: d.pct }))}
                      cx={200}
                      cy={200}
                      innerRadius={118}
                      outerRadius={162}
                      paddingAngle={2}
                      dataKey="value"
                      activeIndex={tokenActiveIdx ?? undefined}
                      activeShape={renderActiveShape}
                      onMouseEnter={(_: any, index: number) => setTokenActiveIdx(index)}
                      onMouseLeave={() => setTokenActiveIdx(null)}
                      stroke="none"
                      startAngle={90}
                      endAngle={-270}
                    >
                      {TOKENOMICS.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          opacity={tokenActiveIdx === null || tokenActiveIdx === index ? 1 : 0.28}
                          style={{ cursor: "pointer", transition: "opacity 0.2s" }}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                  {/* Center label */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {tokenActiveIdx !== null ? (
                      <div className="text-center px-4">
                        <div
                          className="font-serif text-5xl leading-none mb-2"
                          style={{ color: TOKENOMICS[tokenActiveIdx].color }}
                        >
                          {TOKENOMICS[tokenActiveIdx].pct}%
                        </div>
                        <div className="text-[12px] text-white/55 leading-snug max-w-[130px] text-center tracking-wide">
                          {TOKENOMICS[tokenActiveIdx].name}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="font-serif text-4xl text-white/30 leading-none">1B</div>
                        <div className="text-[11px] text-white/20 tracking-[0.25em] uppercase mt-2">Total Supply</div>
                      </div>
                    )}
                  </div>
                  {/* Glow ring behind chart */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background: "radial-gradient(circle, transparent 45%, rgba(200,146,42,0.04) 65%, transparent 75%)",
                    }}
                  />
                </div>
              </div>

              {/* Legend table */}
              <div className="lg:w-[55%] w-full">
                {/* Table header */}
                <div
                  className="grid py-4 mb-1"
                  style={{
                    gridTemplateColumns: "1fr 90px 150px",
                    borderBottom: "1px solid rgba(200,146,42,0.25)",
                  }}
                >
                  <span className="text-[12px] tracking-[0.25em] uppercase" style={{ color: "rgba(200,146,42,0.7)" }}>Category</span>
                  <span className="text-[12px] tracking-[0.25em] uppercase text-center" style={{ color: "rgba(200,146,42,0.7)" }}>%</span>
                  <span className="text-[12px] tracking-[0.25em] uppercase text-right" style={{ color: "rgba(200,146,42,0.7)" }}>Tokens</span>
                </div>

                {/* Rows */}
                {TOKENOMICS.map((item, i) => (
                  <div
                    key={item.name}
                    className="grid py-5 cursor-default rounded-lg px-3 -mx-3 transition-all duration-200"
                    style={{
                      gridTemplateColumns: "1fr 90px 150px",
                      borderBottom: i < TOKENOMICS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                      background: tokenActiveIdx === i ? "rgba(255,255,255,0.04)" : "transparent",
                    }}
                    onMouseEnter={() => setTokenActiveIdx(i)}
                    onMouseLeave={() => setTokenActiveIdx(null)}
                  >
                    {/* Name */}
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0 transition-transform duration-200"
                        style={{
                          background: item.color,
                          boxShadow: tokenActiveIdx === i ? `0 0 10px ${item.color}80` : "none",
                          transform: tokenActiveIdx === i ? "scale(1.3)" : "scale(1)",
                        }}
                      />
                      <span
                        className="text-[15px] transition-colors duration-200"
                        style={{ color: tokenActiveIdx === i ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.65)" }}
                      >
                        {item.name}
                      </span>
                    </div>
                    {/* Pct */}
                    <div className="flex items-center justify-center">
                      <span
                        className="font-serif text-[20px] leading-none transition-colors duration-200"
                        style={{ color: tokenActiveIdx === i ? item.color : `${item.color}99` }}
                      >
                        {item.pct}%
                      </span>
                    </div>
                    {/* Tokens */}
                    <div className="flex items-center justify-end">
                      <span
                        className="text-[14px] font-mono transition-colors duration-200"
                        style={{ color: tokenActiveIdx === i ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.35)" }}
                      >
                        {item.tokens}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Total row */}
                <div
                  className="grid py-5 px-3 -mx-3 mt-1 rounded-lg"
                  style={{
                    gridTemplateColumns: "1fr 90px 150px",
                    borderTop: "1px solid rgba(200,146,42,0.3)",
                    background: "rgba(200,146,42,0.06)",
                  }}
                >
                  <span className="text-[14px] font-semibold tracking-wide text-white/80">Total Supply</span>
                  <span className="font-serif text-[20px] text-center" style={{ color: "#C8922A" }}>100%</span>
                  <span className="text-[14px] font-mono text-right text-white/70">1,000,000,000</span>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom border */}
          <div className="h-px w-full shrink-0" style={{ background: "linear-gradient(90deg, transparent 0%, #C8922A 40%, #C8922A 60%, transparent 100%)" }} />
        </section>

        {/* ECOSYSTEM PIGGY BANK SECTION */}
        <section className="py-32 bg-background text-center">
          <div className="container mx-auto px-6">
            <h2 className="font-serif text-5xl md:text-6xl text-primary mb-16">
              The supercharged ecosystem
            </h2>
            <div className="flex justify-center mb-8">
              <img src="/piggy-bank.png" alt="Ecosystem savings" className="w-64 h-64 object-contain mix-blend-multiply" />
            </div>
          </div>
        </section>

        {/* DARK BAND */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <h3 className="font-serif text-2xl max-w-md">
              Join the infrastructure liquidity network.
            </h3>
            <div className="flex gap-16 text-sm">
              <div className="flex flex-col gap-3">
                <a href="#" className="hover:opacity-70 transition-opacity">Protocol</a>
                <a href="#" className="hover:opacity-70 transition-opacity">Smart Contracts</a>
                <a href="#" className="hover:opacity-70 transition-opacity">Audits</a>
              </div>
              <div className="flex flex-col gap-3">
                <a href="#" className="hover:opacity-70 transition-opacity">Treasury</a>
                <a href="#" className="hover:opacity-70 transition-opacity">Governance</a>
                <a href="#" className="hover:opacity-70 transition-opacity">Analytics</a>
              </div>
              <div className="flex flex-col gap-3">
                <a href="#" className="hover:opacity-70 transition-opacity">Community</a>
                <a href="#" className="hover:opacity-70 transition-opacity">Forum</a>
                <a href="#" className="hover:opacity-70 transition-opacity">Discord</a>
              </div>
            </div>
          </div>
        </section>

        {/* INSIGHTS GRID */}
        <section className="py-32 bg-card">
          <div className="container mx-auto px-6">
            <h2 className="font-serif text-4xl text-primary mb-16 text-center border-b border-primary/10 pb-8">
              Featured Insights
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Card 1 */}
              <a href="#" className="group block">
                <div className="aspect-[3/4] mb-6 overflow-hidden bg-background">
                  <img src="/insight-1.png" alt="ICHF" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex items-center justify-between text-xs font-semibold tracking-widest uppercase text-accent mb-4">
                  <span>Product</span>
                  <span className="text-muted-foreground">Oct 12</span>
                </div>
                <h3 className="font-serif text-xl leading-snug text-primary group-hover:text-accent transition-colors">
                  Introducing ICHF: The Infrastructure Hedged Fund
                </h3>
              </a>
              
              {/* Card 2 */}
              <a href="#" className="group block">
                <div className="aspect-[3/4] mb-6 overflow-hidden bg-background">
                  <img src="/insight-2.png" alt="Typewriter" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex items-center justify-between text-xs font-semibold tracking-widest uppercase text-accent mb-4">
                  <span>Editorial</span>
                  <span className="text-muted-foreground">Sep 28</span>
                </div>
                <h3 className="font-serif text-xl leading-snug text-primary group-hover:text-accent transition-colors">
                  Why Banks Can't Fund the GPU Revolution
                </h3>
              </a>
              
              {/* Card 3 */}
              <a href="#" className="group block">
                <div className="aspect-[3/4] mb-6 overflow-hidden bg-background">
                  <img src="/insight-3.png" alt="GPU Rack" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex items-center justify-between text-xs font-semibold tracking-widest uppercase text-accent mb-4">
                  <span>Guide</span>
                  <span className="text-muted-foreground">Sep 15</span>
                </div>
                <h3 className="font-serif text-xl leading-snug text-primary group-hover:text-accent transition-colors">
                  How to Borrow Against your GPU Cluster
                </h3>
              </a>
              
              {/* Card 4 */}
              <a href="#" className="group block">
                <div className="aspect-[3/4] mb-6 overflow-hidden bg-background">
                  <img src="/insight-4.png" alt="Piano" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex items-center justify-between text-xs font-semibold tracking-widest uppercase text-accent mb-4">
                  <span>Update</span>
                  <span className="text-muted-foreground">Aug 30</span>
                </div>
                <h3 className="font-serif text-xl leading-snug text-primary group-hover:text-accent transition-colors">
                  PinPad LSD Integration Now Live on Mainnet
                </h3>
              </a>
            </div>
          </div>
        </section>

        {/* FULL BLEED CABIN SECTION */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="/cabin-dusk.png" 
              alt="Cabin at dusk" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          <div className="relative z-10 text-center max-w-4xl px-6">
            <h2 className="font-serif text-5xl md:text-6xl text-white mb-10 leading-tight">
              Earn from the rise of modern compute or borrow to build it.
            </h2>
            <Button variant="default" className="rounded-none bg-white text-black hover:bg-white/90 font-medium px-8 h-12 text-lg">
              Enter App
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
