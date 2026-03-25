import React, { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Activity, HeartPulse, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [location] = useLocation();

  const navItems = [
    { href: "/diabetes", label: "Diabetes", icon: Activity, description: "Glucose & Insulin tracking", dotColor: "bg-amber-500" },
    { href: "/heart", label: "Heart Disease", icon: HeartPulse, description: "Cardiovascular analysis", dotColor: "bg-rose-500" },
    { href: "/parkinsons", label: "Parkinson's", icon: Brain, description: "Voice measurement analysis", dotColor: "bg-violet-500" },
  ];

  const currentItem = navItems.find((item) => location.startsWith(item.href)) || navItems[0];

  return (
    <div className="min-h-screen w-full flex flex-col bg-background/80 backdrop-blur-3xl relative z-0">
      <Navbar />
      
      <div className="flex-1 flex flex-col md:flex-row w-full">
        {/* Sidebar */}
        <aside className="w-full md:w-80 flex-shrink-0 border-r border-border/50 bg-card/50 backdrop-blur-xl md:min-h-[calc(100vh-64px)] flex flex-col shadow-2xl shadow-primary/5 relative z-10">
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <div className="px-4 py-3 mb-2">
              <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Diagnostic Tools</h2>
            </div>
          {navItems.map((item) => {
            const isActive = location.startsWith(item.href) || (location === "/" && item.href === "/diabetes");
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "group flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 relative overflow-hidden",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.02]" 
                    : "text-foreground hover:bg-accent hover:text-accent-foreground hover:scale-[1.01]"
                )}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]" />
                )}
                <div className={cn(
                  "p-2 rounded-xl transition-colors",
                  isActive ? "bg-white/20" : "bg-muted group-hover:bg-white"
                )}>
                  <item.icon size={20} className={isActive ? "text-white" : "text-primary"} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold flex items-center justify-between">
                    {item.label}
                    <span className={cn("w-2 h-2 rounded-full", item.dotColor)} />
                  </div>
                  <div className={cn(
                    "text-xs mt-0.5",
                    isActive ? "text-primary-foreground/80" : "text-muted-foreground group-hover:text-accent-foreground/70"
                  )}>
                    {item.description}
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-border/50">
          <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-primary">Disclaimer:</strong> These predictions are based on machine learning models and should not replace professional medical advice. Always consult a healthcare provider for proper diagnosis.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 md:max-h-[calc(100vh-64px)] overflow-y-auto">
        <header className="hidden md:flex h-20 flex-shrink-0 items-center px-10 border-b border-border/50 bg-background/50 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground flex items-center gap-3">
              {currentItem?.label} Assessment
              <span className={cn("w-2.5 h-2.5 rounded-full inline-block", currentItem?.dotColor)} />
            </h2>
            <p className="text-sm text-muted-foreground">Enter patient data below to generate an AI prediction</p>
          </div>
        </header>
        
        <div className="flex-1 p-4 sm:p-6 md:p-10 container max-w-6xl mx-auto">
          <div className="md:hidden mb-6">
            <h2 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              {currentItem?.label} Assessment
              <span className={cn("w-2 h-2 rounded-full inline-block", currentItem?.dotColor)} />
            </h2>
            <p className="text-sm text-muted-foreground">Enter patient data below to generate an AI prediction</p>
          </div>
          {children}
        </div>
      </main>
      </div>

      <Footer />
    </div>
  );
}
