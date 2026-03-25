import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormInput, SubmitButton } from "./FormControls";
import { usePredictDiabetes } from "@workspace/api-client-react";
import { ResultDisplay } from "../ResultDisplay";
import type { PredictionResult } from "@workspace/api-client-react";

const diabetesSchema = z.object({
  pregnancies: z.coerce.number().min(0, "Must be 0 or greater"),
  glucose: z.coerce.number().min(0, "Invalid value"),
  bloodPressure: z.coerce.number().min(0, "Invalid value"),
  skinThickness: z.coerce.number().min(0, "Invalid value"),
  insulin: z.coerce.number().min(0, "Invalid value"),
  bmi: z.coerce.number().min(0, "Invalid value"),
  diabetesPedigreeFunction: z.coerce.number().min(0, "Invalid value"),
  age: z.coerce.number().min(0, "Must be positive").max(120, "Invalid age"),
});

type DiabetesFormValues = z.infer<typeof diabetesSchema>;

export function DiabetesForm() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<DiabetesFormValues>({
    resolver: zodResolver(diabetesSchema),
    defaultValues: {
      pregnancies: 0,
      glucose: 120,
      bloodPressure: 70,
      skinThickness: 20,
      insulin: 79,
      bmi: 25.0,
      diabetesPedigreeFunction: 0.5,
      age: 33
    }
  });

  const mutation = usePredictDiabetes();

  const onSubmit = async (data: DiabetesFormValues) => {
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FormInput
              label="Pregnancies"
              tooltip="Number of times pregnant"
              type="number"
              step="1"
              {...register("pregnancies")}
              error={errors.pregnancies?.message}
            />
            <FormInput
              label="Glucose"
              tooltip="Plasma glucose concentration a 2 hours in an oral glucose tolerance test"
              type="number"
              step="any"
              {...register("glucose")}
              error={errors.glucose?.message}
            />
            <FormInput
              label="Blood Pressure"
              tooltip="Diastolic blood pressure (mm Hg)"
              type="number"
              step="any"
              {...register("bloodPressure")}
              error={errors.bloodPressure?.message}
            />
            <FormInput
              label="Skin Thickness"
              tooltip="Triceps skin fold thickness (mm)"
              type="number"
              step="any"
              {...register("skinThickness")}
              error={errors.skinThickness?.message}
            />
            <FormInput
              label="Insulin"
              tooltip="2-Hour serum insulin (mu U/ml)"
              type="number"
              step="any"
              {...register("insulin")}
              error={errors.insulin?.message}
            />
            <FormInput
              label="BMI"
              tooltip="Body mass index (weight in kg/(height in m)^2)"
              type="number"
              step="any"
              {...register("bmi")}
              error={errors.bmi?.message}
            />
            <FormInput
              label="Pedigree Function"
              tooltip="Diabetes pedigree function (likelihood based on family history)"
              type="number"
              step="any"
              {...register("diabetesPedigreeFunction")}
              error={errors.diabetesPedigreeFunction?.message}
            />
            <FormInput
              label="Age"
              tooltip="Age in years"
              type="number"
              step="1"
              {...register("age")}
              error={errors.age?.message}
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-border/50">
            <SubmitButton isPending={mutation.isPending}>
              Run Diabetes Assessment
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
