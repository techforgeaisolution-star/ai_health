import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { DiabetesForm } from "@/components/forms/DiabetesForm";
import { HeartForm } from "@/components/forms/HeartForm";
import { ParkinsonsForm } from "@/components/forms/ParkinsonsForm";

export function PredictorPage({ type }: { type: 'diabetes' | 'heart' | 'parkinsons' }) {
  return (
    <AppLayout>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-both">
        {type === 'diabetes' && <DiabetesForm />}
        {type === 'heart' && <HeartForm />}
        {type === 'parkinsons' && <ParkinsonsForm />}
      </div>
    </AppLayout>
  );
}
