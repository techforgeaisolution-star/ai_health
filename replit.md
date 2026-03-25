# Workspace

## Overview

Multiple Disease Predictor — a full-stack web app that uses pre-trained machine learning models to predict Diabetes, Heart Disease, and Parkinson's Disease from user-provided medical measurements.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite (artifacts/disease-predictor)
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **ML Inference**: Python 3.11 + scikit-learn (called from Node.js via child_process)

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/        # Express API server
│   │   ├── models/        # Trained .pkl scikit-learn models (diabetes, heart, parkinsons)
│   │   └── predict.py     # Python ML inference script (called by Node routes)
│   └── disease-predictor/ # React + Vite frontend
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Disease Predictor Features

- **Diabetes**: 8 medical input features → SVM model prediction
- **Heart Disease**: 13 cardiovascular features → SVM model prediction  
- **Parkinson's Disease**: 22 voice measurement features → SVM model prediction
- All models are pre-trained scikit-learn SVM classifiers (.pkl files)
- Node.js routes spawn Python process to run inference, returning prediction + confidence

## API Endpoints

- `POST /api/predict/diabetes` — DiabetesInput → PredictionResult
- `POST /api/predict/heart` — HeartInput → PredictionResult
- `POST /api/predict/parkinsons` — ParkinsonsInput → PredictionResult

## Key Packages

### artifacts/api-server
- Express 5, cors, pino (logging)
- Spawns python3 with predict.py for ML inference
- Depends on @workspace/api-zod for validation

### artifacts/disease-predictor
- React + Vite, Tailwind CSS
- react-hook-form + @hookform/resolvers for forms
- framer-motion for animations
- @workspace/api-client-react for generated API hooks

## Running

- API server: `pnpm --filter @workspace/api-server run dev`
- Frontend: `pnpm --filter @workspace/disease-predictor run dev`

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references
