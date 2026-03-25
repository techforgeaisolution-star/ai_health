import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, RefreshCcw, Info } from "lucide-react";
import { PredictionResult } from "@workspace/api-client-react";

interface ResultDisplayProps {
  result: PredictionResult | null;
  onReset: () => void;
}

export function ResultDisplay({ result, onReset }: ResultDisplayProps) {
  if (!result) return null;

  const isPositive = result.prediction === 1;
  const confidencePercent = result.confidence !== undefined ? result.confidence * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
      className="mt-8"
    >
      <div className={`
        relative overflow-hidden rounded-3xl p-8 border-2 shadow-2xl
        ${isPositive 
          ? 'bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20 shadow-destructive/10' 
          : 'bg-gradient-to-br from-success/10 to-success/5 border-success/20 shadow-success/10'}
      `}>
        {/* Decorative background element */}
        <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full opacity-20 blur-3xl
          ${isPositive ? 'bg-destructive' : 'bg-success'}
        `} />

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
          <div className="relative">
            {/* Pulsing ring animation */}
            <div className={`absolute inset-0 rounded-2xl animate-ping opacity-20 ${isPositive ? 'bg-destructive' : 'bg-success'}`} />
            
            <div className={`
              relative p-4 rounded-2xl flex-shrink-0 z-10
              ${isPositive ? 'bg-destructive/20 text-destructive' : 'bg-success/20 text-success'}
            `}>
              {isPositive ? <AlertTriangle size={48} /> : <CheckCircle size={48} />}
            </div>
          </div>
          
          <div className="flex-1 w-full">
            <h3 className={`text-2xl font-display font-bold mb-2
              ${isPositive ? 'text-destructive' : 'text-success'}
            `}>
              {result.label}
            </h3>
            <p className="text-foreground/80 text-lg leading-relaxed mb-4">
              {result.message}
            </p>
            
            {result.confidence !== undefined && (
              <div className="mt-4 bg-background/60 p-4 rounded-xl border border-border/50 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                    <Info size={16} className={isPositive ? 'text-destructive' : 'text-success'} />
                    Model Confidence
                  </div>
                  <strong className="text-foreground font-display">{confidencePercent.toFixed(1)}%</strong>
                </div>
                
                {/* Confidence Progress Bar */}
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full rounded-full ${isPositive ? 'bg-destructive' : 'bg-success'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${confidencePercent}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="w-full md:w-auto flex-shrink-0 mt-4 md:mt-0">
            <button
              onClick={onReset}
              className={`
                w-full md:w-auto px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-md
                ${isPositive 
                  ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-105 shadow-destructive/20' 
                  : 'bg-success text-success-foreground hover:bg-success/90 hover:scale-105 shadow-success/20'}
              `}
            >
              <RefreshCcw size={18} />
              New Assessment
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
