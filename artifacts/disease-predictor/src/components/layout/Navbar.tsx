import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Stethoscope, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/diabetes", label: "Diabetes" },
    { href: "/heart", label: "Heart Disease" },
    { href: "/parkinsons", label: "Parkinson's" },
  ];

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled 
          ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-md" 
          : "bg-background/80 backdrop-blur-md border-b border-border/50"
      )}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
              <Stethoscope size={20} />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg tracking-tight text-primary leading-none">MedPredict</h1>
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">AI Diagnostics</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-all relative py-2",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Link href="/diabetes">
                <Button variant="default" className="shadow-lg shadow-primary/20 relative pr-4">
                  <span className="flex items-center gap-2">
                    Try Now
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                  </span>
                </Button>
              </Link>
            </div>
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background pb-4 pt-2 shadow-xl">
          <div className="space-y-1 px-4">
            {navItems.map((item) => {
              const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block rounded-md px-3 py-2 text-base font-medium",
                    isActive ? "bg-primary/10 text-primary border-l-2 border-primary" : "text-foreground hover:bg-muted"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-4">
              <Link href="/diabetes" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full relative">
                  <span className="flex items-center justify-center gap-2">
                    Try Now
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
