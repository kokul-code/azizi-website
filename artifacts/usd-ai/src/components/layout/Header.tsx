import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="font-serif text-xl font-medium tracking-tight text-primary">
            USD-AI
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="/protocol" className="hover:text-primary transition-colors">Protocol</Link>
            <Link href="/reserves" className="hover:text-primary transition-colors">Reserves</Link>
            <Link href="/insights" className="hover:text-primary transition-colors">Insights</Link>
            <Link href="/docs" className="hover:text-primary transition-colors">Docs</Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="default" className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-6 h-9">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
