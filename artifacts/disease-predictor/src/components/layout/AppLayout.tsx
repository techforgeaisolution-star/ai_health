import React, { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Activity, HeartPulse, Brain, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [location] = useLocation();

  const navItems = [
    { href: "/diabetes", label: "Diabetes", icon: Activity, description: "Glucose & Insulin tracking" },
    { href: "/heart", label: "Heart Disease", icon: HeartPulse, description: "Cardiovascular analysis" },
    { href: "/parkinsons", label: "Parkinson's", icon: Brain, description: "Voice measurement analysis" },
  ];

  const currentItem = navItems.find((item) => location.startsWith(item.href)) || navItems[0];

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-background/80 backdrop-blur-3xl relative z-0">
      
      {/* Sidebar */}
      <aside className="w-full md:w-80 flex-shrink-0 border-r border-border/50 bg-card/50 backdrop-blur-xl md:min-h-screen flex flex-col shadow-2xl shadow-primary/5 relative z-10">
        <div className="p-8 flex items-center gap-3 border-b border-border/50">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Stethoscope size={24} />
          </div>
          <div>
            <h1 className="font-display font-bold text-xl tracking-tight text-foreground leading-tight">MedPredict</h1>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">AI Diagnostics</p>
          </div>
        </div>

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
                  "group flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 relative overflow-hidden",
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
                <div>
                  <div className="font-semibold">{item.label}</div>
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
      <main className="flex-1 flex flex-col min-w-0 max-h-screen overflow-y-auto">
        <header className="hidden md:flex h-20 items-center px-10 border-b border-border/50 bg-background/50 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground">
              {currentItem?.label} Assessment
            </h2>
            <p className="text-sm text-muted-foreground">Enter patient data below to generate an AI prediction</p>
          </div>
        </header>
        
        <div className="flex-1 p-4 sm:p-6 md:p-10 container max-w-6xl mx-auto">
          <div className="md:hidden mb-6">
            <h2 className="text-2xl font-display font-bold text-foreground">
              {currentItem?.label} Assessment
            </h2>
            <p className="text-sm text-muted-foreground">Enter patient data below to generate an AI prediction</p>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
