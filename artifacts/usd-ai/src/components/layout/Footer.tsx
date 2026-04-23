import { Link } from "wouter";
import { Twitter, Github, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="font-serif text-2xl font-medium tracking-tight mb-4 inline-block">
              USD-AI
            </Link>
            <p className="text-primary-foreground/60 text-sm max-w-xs">
              The dollar that builds AI, wherever it serves.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-6">Ecosystem</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/60">
              <li><Link href="/stablecoin" className="hover:text-primary-foreground transition-colors">Stablecoin</Link></li>
              <li><Link href="/yield" className="hover:text-primary-foreground transition-colors">Yield Products</Link></li>
              <li><Link href="/institutional" className="hover:text-primary-foreground transition-colors">Institutional</Link></li>
              <li><Link href="/audits" className="hover:text-primary-foreground transition-colors">Audits</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-6">Developers</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/60">
              <li><Link href="/docs" className="hover:text-primary-foreground transition-colors">Documentation</Link></li>
              <li><Link href="/github" className="hover:text-primary-foreground transition-colors">GitHub</Link></li>
              <li><Link href="/grants" className="hover:text-primary-foreground transition-colors">Grants</Link></li>
              <li><Link href="/bounties" className="hover:text-primary-foreground transition-colors">Bug Bounties</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/60">
              <li><Link href="/about" className="hover:text-primary-foreground transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-primary-foreground transition-colors">Blog</Link></li>
              <li><Link href="/careers" className="hover:text-primary-foreground transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-primary-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-primary-foreground/60 text-sm">
            <span>© 2026 USD-AI Protocol</span>
            <Link href="/privacy" className="hover:text-primary-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-primary-foreground transition-colors">Terms</Link>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://discord.com" target="_blank" rel="noreferrer" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-foreground/5 rounded-full border border-primary-foreground/10">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-primary-foreground/80 font-medium">All systems normal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
