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
          ? 'bg-destructive/5 border-destructive/20 shadow-destructive/10' 
          : 'bg-success/5 border-success/20 shadow-success/10'}
      `}>
        {/* Decorative background element */}
        <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full opacity-10 blur-3xl
          ${isPositive ? 'bg-destructive' : 'bg-success'}
        `} />

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
          <div className={`
            p-4 rounded-2xl flex-shrink-0
            ${isPositive ? 'bg-destructive/10 text-destructive' : 'bg-success/10 text-success'}
          `}>
            {isPositive ? <AlertTriangle size={48} /> : <CheckCircle size={48} />}
          </div>
          
          <div className="flex-1">
            <h3 className={`text-2xl font-display font-bold mb-2
              ${isPositive ? 'text-destructive' : 'text-success'}
            `}>
              {result.label}
            </h3>
            <p className="text-foreground/80 text-lg leading-relaxed">
              {result.message}
            </p>
            {result.confidence !== undefined && (
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground bg-background/50 inline-flex px-3 py-1.5 rounded-lg border border-border/50">
                <Info size={14} />
                Model Confidence: <strong className="text-foreground">{(result.confidence * 100).toFixed(1)}%</strong>
              </div>
            )}
          </div>

          <div className="w-full md:w-auto flex-shrink-0 mt-4 md:mt-0">
            <button
              onClick={onReset}
              className={`
                w-full md:w-auto px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all
                ${isPositive 
                  ? 'bg-destructive/10 text-destructive hover:bg-destructive/20 hover:scale-105' 
                  : 'bg-success/10 text-success hover:bg-success/20 hover:scale-105'}
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
