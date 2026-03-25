#!/usr/bin/env python3
import sys
import json
import pickle
import os
import warnings
warnings.filterwarnings("ignore")

def load_model(name):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(script_dir, "models", f"{name}.pkl")
    with open(model_path, "rb") as f:
        return pickle.load(f)

def predict(disease, features):
    model = load_model(disease)
    prediction = int(model.predict([features])[0])
    
    try:
        proba = model.predict_proba([features])[0]
        confidence = float(proba[prediction])
    except AttributeError:
        confidence = None

    return prediction, confidence

def main():
    data = json.loads(sys.stdin.read())
    disease = data["disease"]
    features = data["features"]

    try:
        prediction, confidence = predict(disease, features)
        result = {"prediction": prediction, "confidence": confidence}
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    main()
