import React from "react";
import { Link } from "wouter";
import { Stethoscope } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 border-t border-border/10">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <Stethoscope size={20} />
              </div>
              <div>
                <h2 className="font-display font-bold text-xl tracking-tight text-white leading-none">MedPredict</h2>
                <p className="text-[10px] text-white/60 font-medium uppercase tracking-wider">AI Diagnostics</p>
              </div>
            </div>
            <p className="text-white/70 text-sm max-w-xs">
              Empowering early disease detection with advanced machine learning and AI technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-white/70 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/diabetes" className="text-white/70 hover:text-white transition-colors">Diabetes Prediction</Link>
              </li>
              <li>
                <Link href="/heart" className="text-white/70 hover:text-white transition-colors">Heart Disease Prediction</Link>
              </li>
              <li>
                <Link href="/parkinsons" className="text-white/70 hover:text-white transition-colors">Parkinson's Prediction</Link>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg text-white">Medical Disclaimer</h3>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-xs text-white/70 leading-relaxed">
                <strong className="text-white">Notice:</strong> The AI predictions provided by this application are for informational purposes only and do not constitute professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-xs">
            © 2025 MedPredict. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
