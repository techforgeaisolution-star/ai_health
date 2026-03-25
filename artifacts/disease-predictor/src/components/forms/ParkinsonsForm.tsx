import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormInput, SubmitButton } from "./FormControls";
import { usePredictParkinsons } from "@workspace/api-client-react";
import { ResultDisplay } from "../ResultDisplay";
import type { PredictionResult } from "@workspace/api-client-react";

// Generate schema programmatically since it's 22 numeric fields
const fields = [
  "mdvpFo", "mdvpFhi", "mdvpFlo", "mdvpJitter", "mdvpJitterAbs", "mdvpRap", "mdvpPpq", 
  "jitterDdp", "mdvpShimmer", "mdvpShimmerDb", "shimmerApq3", "shimmerApq5", "mdvpApq", 
  "shimmerDda", "nhr", "hnr", "rpde", "dfa", "spread1", "spread2", "d2", "ppe"
] as const;

const parkinsonsSchema = z.object(
  fields.reduce((acc, field) => {
    acc[field] = z.coerce.number();
    return acc;
  }, {} as Record<string, z.ZodNumber>)
);

type ParkinsonsFormValues = z.infer<typeof parkinsonsSchema>;

export function ParkinsonsForm() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ParkinsonsFormValues>({
    resolver: zodResolver(parkinsonsSchema),
    defaultValues: {
      mdvpFo: 119.992, mdvpFhi: 157.302, mdvpFlo: 74.997, mdvpJitter: 0.00784, 
      mdvpJitterAbs: 0.00007, mdvpRap: 0.0037, mdvpPpq: 0.00554, jitterDdp: 0.01109, 
      mdvpShimmer: 0.04374, mdvpShimmerDb: 0.426, shimmerApq3: 0.02182, 
      shimmerApq5: 0.0313, mdvpApq: 0.02971, shimmerDda: 0.06545, nhr: 0.02211, 
      hnr: 21.033, rpde: 0.414783, dfa: 0.815285, spread1: -4.813031, 
      spread2: 0.266482, d2: 2.301442, ppe: 0.284654
    }
  });

  const mutation = usePredictParkinsons();

  const onSubmit = async (data: ParkinsonsFormValues) => {
    try {
      const res = await mutation.mutateAsync({ data });
      setResult(res);
    } catch (error) {
      console.error("Prediction failed", error);
    }
  };

  const handleReset = () => {
    setResult(null);
    reset();
  };

  // Group fields for better UI organization
  const groups = [
    { title: "Vocal Frequency (Hz)", items: ["mdvpFo", "mdvpFhi", "mdvpFlo"] },
    { title: "Jitter Measures", items: ["mdvpJitter", "mdvpJitterAbs", "mdvpRap", "mdvpPpq", "jitterDdp"] },
    { title: "Shimmer Measures", items: ["mdvpShimmer", "mdvpShimmerDb", "shimmerApq3", "shimmerApq5", "mdvpApq", "shimmerDda"] },
    { title: "Noise / Harmonic Ratios", items: ["nhr", "hnr"] },
    { title: "Nonlinear Measures", items: ["rpde", "dfa", "spread1", "spread2", "d2", "ppe"] }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-card rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/5 border border-border/50">
        <div className="mb-6 bg-accent/30 text-accent-foreground p-4 rounded-xl border border-accent">
          <p className="text-sm font-medium">This model uses acoustic measurements from sustained vowel phonations to detect potential markers of Parkinson's Disease.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          
          {groups.map((group, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-lg font-display font-semibold border-b border-border/50 pb-2 text-primary">{group.title}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {group.items.map(field => (
                  <FormInput 
                    key={field}
                    label={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} 
                    type="number" 
                    step="any"
                    {...register(field as any)} 
                    error={errors[field as keyof ParkinsonsFormValues]?.message} 
                  />
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-end pt-6 border-t border-border/50">
            <SubmitButton isPending={mutation.isPending}>
              Run Acoustic Analysis
            </SubmitButton>
          </div>
          
          {mutation.isError && (
            <div className="p-4 rounded-xl bg-destructive/10 text-destructive text-sm font-medium">
              An error occurred while running the prediction. Please check your inputs and try again.
            </div>
          )}
        </form>
      </div>

      <ResultDisplay result={result} onReset={handleReset} />
    </div>
  );
}
