import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormInput, FormSelect, SubmitButton } from "./FormControls";
import { usePredictHeart } from "@workspace/api-client-react";
import { ResultDisplay } from "../ResultDisplay";
import type { PredictionResult } from "@workspace/api-client-react";

const heartSchema = z.object({
  age: z.coerce.number().min(0).max(120),
  sex: z.coerce.number(),
  cp: z.coerce.number(),
  trestbps: z.coerce.number().min(0),
  chol: z.coerce.number().min(0),
  fbs: z.coerce.number(),
  restecg: z.coerce.number(),
  thalach: z.coerce.number().min(0),
  exang: z.coerce.number(),
  oldpeak: z.coerce.number(),
  slope: z.coerce.number(),
  ca: z.coerce.number(),
  thal: z.coerce.number(),
});

type HeartFormValues = z.infer<typeof heartSchema>;

export function HeartForm() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<HeartFormValues>({
    resolver: zodResolver(heartSchema),
    defaultValues: {
      age: 55,
      sex: 1,
      cp: 0,
      trestbps: 140,
      chol: 240,
      fbs: 0,
      restecg: 1,
      thalach: 150,
      exang: 0,
      oldpeak: 1.5,
      slope: 2,
      ca: 0,
      thal: 2
    }
  });

  const mutation = usePredictHeart();

  const onSubmit = async (data: HeartFormValues) => {
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

  return (
    <div className="space-y-8">
      <div className="bg-card rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/5 border border-border/50">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          <div className="space-y-6">
            <h3 className="text-lg font-display font-semibold border-b border-border/50 pb-2">Patient Profile</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <FormInput label="Age" type="number" {...register("age")} error={errors.age?.message} />
              <FormSelect 
                label="Sex" 
                options={[{label: "Female", value: 0}, {label: "Male", value: 1}]}
                {...register("sex")} 
                error={errors.sex?.message} 
              />
              <FormSelect 
                label="Chest Pain Type (CP)" 
                tooltip="0: Typical angina, 1: Atypical angina, 2: Non-anginal pain, 3: Asymptomatic"
                options={[
                  {label: "0 - Typical Angina", value: 0},
                  {label: "1 - Atypical Angina", value: 1},
                  {label: "2 - Non-anginal Pain", value: 2},
                  {label: "3 - Asymptomatic", value: 3}
                ]}
                {...register("cp")} 
                error={errors.cp?.message} 
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-display font-semibold border-b border-border/50 pb-2">Clinical Metrics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <FormInput 
                label="Resting BP (mm Hg)" 
                tooltip="Resting blood pressure"
                type="number" {...register("trestbps")} error={errors.trestbps?.message} 
              />
              <FormInput 
                label="Cholesterol (mg/dl)" 
                tooltip="Serum cholestoral"
                type="number" {...register("chol")} error={errors.chol?.message} 
              />
              <FormSelect 
                label="Fasting Blood Sugar > 120" 
                options={[{label: "False (< 120 mg/dl)", value: 0}, {label: "True (> 120 mg/dl)", value: 1}]}
                {...register("fbs")} error={errors.fbs?.message} 
              />
              <FormSelect 
                label="Resting ECG" 
                tooltip="Resting electrocardiographic results"
                options={[
                  {label: "0 - Normal", value: 0}, 
                  {label: "1 - ST-T wave abnormality", value: 1},
                  {label: "2 - Left ventricular hypertrophy", value: 2}
                ]}
                {...register("restecg")} error={errors.restecg?.message} 
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-display font-semibold border-b border-border/50 pb-2">Exercise Metrics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <FormInput 
                label="Max Heart Rate" 
                tooltip="Maximum heart rate achieved during exercise"
                type="number" {...register("thalach")} error={errors.thalach?.message} 
              />
              <FormSelect 
                label="Exercise Induced Angina" 
                options={[{label: "No", value: 0}, {label: "Yes", value: 1}]}
                {...register("exang")} error={errors.exang?.message} 
              />
              <FormInput 
                label="ST Depression (Oldpeak)" 
                tooltip="ST depression induced by exercise relative to rest"
                type="number" step="any" {...register("oldpeak")} error={errors.oldpeak?.message} 
              />
              <FormSelect 
                label="Slope of Peak ST" 
                tooltip="The slope of the peak exercise ST segment"
                options={[
                  {label: "0 - Upsloping", value: 0}, 
                  {label: "1 - Flat", value: 1},
                  {label: "2 - Downsloping", value: 2}
                ]}
                {...register("slope")} error={errors.slope?.message} 
              />
              <FormSelect 
                label="Major Vessels (CA)" 
                tooltip="Number of major vessels (0-3) colored by flourosopy"
                options={[{label:"0", value:0}, {label:"1", value:1}, {label:"2", value:2}, {label:"3", value:3}]}
                {...register("ca")} error={errors.ca?.message} 
              />
              <FormSelect 
                label="Thalassemia (Thal)" 
                options={[
                  {label: "0 - Normal", value: 0}, 
                  {label: "1 - Fixed Defect", value: 1},
                  {label: "2 - Reversable Defect", value: 2}
                ]}
                {...register("thal")} error={errors.thal?.message} 
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-border/50">
            <SubmitButton isPending={mutation.isPending}>
              Run Cardiovascular Assessment
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
