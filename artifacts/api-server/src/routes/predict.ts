import { Router, type IRouter, type Request, type Response } from "express";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import {
  PredictDiabetesBody,
  PredictHeartBody,
  PredictParkinsonsBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

function runPythonPredict(
  disease: string,
  features: number[],
): Promise<{ prediction: number; confidence?: number }> {
  return new Promise((resolve, reject) => {
    const artifactDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
    const scriptPath = path.join(artifactDir, "predict.py");
    const payload = JSON.stringify({ disease, features });

    const proc = spawn("python3", [scriptPath], { stdio: ["pipe", "pipe", "pipe"] });

    let stdout = "";
    let stderr = "";

    proc.stdout.on("data", (d: Buffer) => { stdout += d.toString(); });
    proc.stderr.on("data", (d: Buffer) => { stderr += d.toString(); });

    proc.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Python script failed (code ${code}): ${stderr}`));
        return;
      }
      try {
        const result = JSON.parse(stdout.trim());
        if (result.error) {
          reject(new Error(result.error));
        } else {
          resolve(result);
        }
      } catch (e) {
        reject(new Error(`Failed to parse Python output: ${stdout}`));
      }
    });

    proc.stdin.write(payload);
    proc.stdin.end();
  });
}

function buildResult(
  prediction: number,
  confidence: number | undefined,
  positiveLabel: string,
  negativeLabel: string,
  positiveMsg: string,
  negativeMsg: string,
) {
  return {
    prediction,
    label: prediction === 1 ? positiveLabel : negativeLabel,
    confidence: confidence ?? undefined,
    message: prediction === 1 ? positiveMsg : negativeMsg,
  };
}

router.post("/predict/diabetes", async (req: Request, res: Response) => {
  const parsed = PredictDiabetesBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", details: parsed.error.message });
    return;
  }

  const d = parsed.data;
  const features = [
    d.pregnancies,
    d.glucose,
    d.bloodPressure,
    d.skinThickness,
    d.insulin,
    d.bmi,
    d.diabetesPedigreeFunction,
    d.age,
  ];

  try {
    const { prediction, confidence } = await runPythonPredict("diabetes", features);
    res.json(
      buildResult(
        prediction,
        confidence,
        "Diabetic",
        "Non-Diabetic",
        "The model indicates a positive result for Diabetes. Please consult a healthcare professional for a proper diagnosis.",
        "The model indicates a negative result for Diabetes. However, maintaining a healthy lifestyle is always recommended.",
      ),
    );
  } catch (err) {
    req.log.error({ err }, "Diabetes prediction failed");
    res.status(500).json({ error: "Prediction failed", details: String(err) });
  }
});

router.post("/predict/heart", async (req: Request, res: Response) => {
  const parsed = PredictHeartBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", details: parsed.error.message });
    return;
  }

  const d = parsed.data;
  const features = [
    d.age,
    d.sex,
    d.cp,
    d.trestbps,
    d.chol,
    d.fbs,
    d.restecg,
    d.thalach,
    d.exang,
    d.oldpeak,
    d.slope,
    d.ca,
    d.thal,
  ];

  try {
    const { prediction, confidence } = await runPythonPredict("heart", features);
    res.json(
      buildResult(
        prediction,
        confidence,
        "Heart Disease Detected",
        "No Heart Disease Detected",
        "The model indicates a positive result for Heart Disease. Please consult a cardiologist for a proper evaluation.",
        "The model indicates a negative result for Heart Disease. Keep up with regular check-ups to maintain your heart health.",
      ),
    );
  } catch (err) {
    req.log.error({ err }, "Heart prediction failed");
    res.status(500).json({ error: "Prediction failed", details: String(err) });
  }
});

router.post("/predict/parkinsons", async (req: Request, res: Response) => {
  const parsed = PredictParkinsonsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", details: parsed.error.message });
    return;
  }

  const d = parsed.data;
  const features = [
    d.mdvpFo,
    d.mdvpFhi,
    d.mdvpFlo,
    d.mdvpJitter,
    d.mdvpJitterAbs,
    d.mdvpRap,
    d.mdvpPpq,
    d.jitterDdp,
    d.mdvpShimmer,
    d.mdvpShimmerDb,
    d.shimmerApq3,
    d.shimmerApq5,
    d.mdvpApq,
    d.shimmerDda,
    d.nhr,
    d.hnr,
    d.rpde,
    d.dfa,
    d.spread1,
    d.spread2,
    d.d2,
    d.ppe,
  ];

  try {
    const { prediction, confidence } = await runPythonPredict("parkinsons", features);
    res.json(
      buildResult(
        prediction,
        confidence,
        "Parkinson's Detected",
        "No Parkinson's Detected",
        "The model indicates a positive result for Parkinson's Disease. Please consult a neurologist for a proper diagnosis.",
        "The model indicates a negative result for Parkinson's Disease. Continue regular health monitoring.",
      ),
    );
  } catch (err) {
    req.log.error({ err }, "Parkinsons prediction failed");
    res.status(500).json({ error: "Prediction failed", details: String(err) });
  }
});

export default router;
