import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Shield, ArrowUpRight, Search, FileText, LogOut } from "lucide-react";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Header />
      
      <main className="flex-1">
        {/* HERO SECTION */}
        <section ref={heroRef} className="relative pt-24 pb-32 overflow-hidden border-b border-border">
          <div className="absolute inset-0 z-0">
            <motion.img 
              style={{ y }}
              src="/hero-topography.png" 
              alt="Aerial topography" 
              className="w-full h-[120%] object-cover object-center opacity-60 mix-blend-multiply"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/40 to-background"></div>
          </div>
          
          <div className="container mx-auto px-6 relative z-10 pt-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl"
            >
              <div className="inline-block border border-primary/20 px-3 py-1 mb-8">
                <span className="text-xs font-semibold tracking-widest uppercase text-primary/80">Protocol Genesis</span>
              </div>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight text-primary mb-8">
                The dollar that builds AI, wherever it serves.
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mb-12">
                A decentralized stablecoin backed by machine-credit and future compute yield. Institutional-grade capital for the global GPU infrastructure.
              </p>
              
              <div className="flex items-center gap-6 pt-12 border-t border-primary/10">
                <span className="text-xs font-semibold tracking-widest uppercase text-primary/50 mr-4">Integrated with</span>
                <div className="flex gap-8 opacity-60 saturate-0">
                  <span className="font-bold text-xl tracking-tighter">DCG</span>
                  <span className="font-serif italic text-xl">Framework</span>
                  <span className="font-medium text-xl">Variant.</span>
                  <span className="font-mono text-xl tracking-tighter uppercase">Placeholder</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FEATURES GRID SECTION */}
        <section className="py-32 bg-background">
          <div className="container mx-auto px-6">
            <div className="mb-20 max-w-3xl">
              <span className="text-xs font-semibold tracking-widest uppercase text-accent mb-6 block">Capital</span>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight text-primary">
                Capital for builders outside the megafund circle. Yield drawn from their machine-backed credit.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-primary/10">
              {/* Row 1 */}
              <div className="p-10 border-b border-r border-primary/10 hover:bg-card/50 transition-colors group">
                <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-serif text-xl mb-4 text-primary">Backed by the Future</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Collateralized by forward contracts on GPU clusters and verified datacenter capacity, decoupling from legacy fiat systems.
                </p>
              </div>

              <div className="p-10 border-b border-r border-primary/10 hover:bg-card/50 transition-colors group">
                <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-serif text-xl mb-4 text-primary">Verified Reserves</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Real-time cryptographic proofs of underlying infrastructure assets, audited daily by decentralized oracles.
                </p>
              </div>

              <div className="p-10 border-b border-r border-primary/10 hover:bg-card/50 transition-colors group">
                <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Search className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-serif text-xl mb-4 text-primary">Decentralized Underwriting</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Automated risk assessment models evaluate facility uptime, PUE metrics, and historical provider performance.
                </p>
              </div>

              {/* Row 2 - spans 1.5 cols each roughly in visual space, but we'll use a flex layout or 2-col grid for the bottom row to match reference */}
              <div className="p-10 border-b border-r border-primary/10 hover:bg-card/50 transition-colors group md:col-span-1.5">
                <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-serif text-xl mb-4 text-primary">Immutable Security</h3>
                <p className="text-muted-foreground leading-relaxed text-sm max-w-sm">
                  Smart contracts formally verified. Multi-sig treasury controls and timelocked protocol upgrades ensure deep security.
                </p>
              </div>

              <div className="p-10 border-b border-r border-primary/10 hover:bg-card/50 transition-colors group md:col-span-2">
                <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <LogOut className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-serif text-xl mb-4 text-primary">Smart Exits via QPF</h3>
                <p className="text-muted-foreground leading-relaxed text-sm max-w-md">
                  Seamlessly unwrap positions to fiat or raw compute credits through our Qualified Provider Framework with minimal slippage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STATS & GLOBE SECTION */}
        <section className="py-24 bg-card border-y border-border">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="lg:w-1/2">
                <span className="text-xs font-semibold tracking-widest uppercase text-accent mb-6 block">Scale</span>
                <h2 className="font-serif text-4xl md:text-5xl leading-tight text-primary mb-12">
                  We help scale companies globally.
                </h2>
                
                <div className="grid grid-cols-2 gap-x-8 gap-y-12 mb-12">
                  <div>
                    <div className="font-serif text-3xl text-primary mb-2">$2.4bn</div>
                    <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Deployed</div>
                  </div>
                  <div>
                    <div className="font-serif text-3xl text-primary mb-2">9.2%</div>
                    <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Avg Yield</div>
                  </div>
                  <div>
                    <div className="font-serif text-3xl text-primary mb-2">80+</div>
                    <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Partner Protocols</div>
                  </div>
                  <div>
                    <div className="font-serif text-3xl text-primary mb-2">75,807</div>
                    <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Builders Served</div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" className="rounded-none border-primary/20 text-primary hover:bg-primary/5 font-medium px-6">
                    View Network
                  </Button>
                  <Button variant="outline" className="rounded-none border-primary/20 text-primary hover:bg-primary/5 font-medium px-6">
                    Read the Docs
                  </Button>
                </div>
              </div>
              
              <div className="lg:w-1/2 flex justify-center">
                <img src="/globe.png" alt="Global network" className="w-full max-w-lg object-contain mix-blend-multiply" />
              </div>
            </div>
          </div>
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
