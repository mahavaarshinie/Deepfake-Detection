# Deepfake-Detection

An end-to-end prototype for high-precision deepfake detection and real-time telemetry visualization. The core uses **DSRxNet V3**, a hybrid Dual-Stream CNN architecture combining fine-tuned ResNet-50 and Xception backbones to extract spatial and micro-texture anomalies from facial frames.

Validated on the **FaceForensics++ dataset**, it prioritizes structural inductive bias over pure global context to achieve a **98.45% testing accuracy**.

---

## 🚀 Key Architectural Highlights

### 1. Hybrid Dual-Stream Feature Fusion
* **Stream A (ResNet-50):** Captures mid-to-high level global spatial geometry (layers 3 and 4 fully fine-tuned).
* **Stream B (Xception):** Tracks localized, cross-channel micro-texture inconsistencies (Block 14 and Conv 4 unfrozen) using depthwise separable convolutions.
* **Fusion Layer:** Concatenates features into a $4096$-dimensional dense vector before feeding the multi-layer sequential classifier head.

### 2. Strategic Trade-off: DSRxNet vs. Vision Transformers (ViT)
* **Data Splitting Rigor:** Trained on a strict **80/10/10 split**. Testing on a larger 10% sample ensures stability, unlike the higher-variance $85/10/5$ split used by the ViT.
* **Inductive Bias:** ViTs lack inherent spatial locality bias. DSRxNet's convolutional layers inherently process neighboring pixels where blending artifacts and edge anomalies hide.
* **Efficiency:** Sub-millisecond single-frame inference compared to the quadratic computational complexity ($O(N^2)$) of Transformer self-attention blocks.

---

## 📊 Performance Matrix

```text
==================================================
Overall Testing Accuracy : 0.9845 | Macro F1: 0.9845
[SKLEARN VERIFICATION]
              precision    recall  f1-score   support
        Real     0.9778    0.9915    0.9846      3195
        Fake     0.9914    0.9775    0.9844      3195
```
Fake Precision (99.14%): Flags forgeries with near-absolute statistical confidence.

⚡ Setup & Execution
1. Backend Initialization
Bash
cd backend
.\venv\Scripts\activate
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
2. Frontend Initialization
Bash
cd frontend
npm install && npm run dev
Open http://localhost:3000, perform a hard refresh (Ctrl + F5), and upload a pre-cropped square face frame to stream real-time confidence scores and forensic category breakdowns.
