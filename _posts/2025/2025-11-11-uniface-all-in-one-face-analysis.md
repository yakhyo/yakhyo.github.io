---
layout: post
title: "UniFace: All-in-One Face Analysis Toolkit for Production"
date: 2025-11-11 10:00:00 +0900
comments: true
categories: deep-learning computer-vision facial-recognition
---

Face analysis has become essential in modern applications—from security systems and photo management to social media filters and identity verification. But building a robust face analysis pipeline traditionally meant juggling multiple libraries, dealing with complex dependencies, and wrestling with performance optimization across different hardware platforms.

**UniFace** is a comprehensive, production-ready face analysis library that brings together face detection, recognition, landmark detection, and attribute analysis under one unified API. Built on ONNX Runtime with automatic hardware acceleration support, UniFace delivers high-performance face analysis across Apple Silicon, NVIDIA GPUs, and CPU-only environments.

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![Python](https://img.shields.io/badge/Python-3.10%2B-blue)
[![PyPI Version](https://img.shields.io/pypi/v/uniface.svg)](https://pypi.org/project/uniface/)
[![CI](https://github.com/yakhyo/uniface/actions/workflows/ci.yml/badge.svg)](https://github.com/yakhyo/uniface/actions)
[![Downloads](https://pepy.tech/badge/uniface)](https://pepy.tech/project/uniface)

---

## Core Capabilities

### 1. Face Detection

UniFace includes two state-of-the-art detection model families:

**RetinaFace**: Proven accuracy across diverse conditions with models ranging from ultra-lightweight (1.7MB) to high-accuracy variants. The default `MNET_V2` model achieves 91.70% accuracy on the WIDER FACE Easy subset while remaining fast enough for real-time applications.

**SCRFD**: State-of-the-art speed-accuracy tradeoffs with the `SCRFD_10G` model achieving 95.16% accuracy on WIDER FACE Easy—perfect for applications demanding maximum precision.

```python
import cv2
from uniface import RetinaFace

detector = RetinaFace()
image = cv2.imread("photo.jpg")
faces = detector.detect(image)

for face in faces:
    print(f"Confidence: {face['confidence']:.2f}")
    print(f"BBox: {face['bbox']}")
    print(f"Landmarks: {face['landmarks']}")
```

### 2. Face Recognition

Compare and identify faces using industry-standard embedding models:

**ArcFace**: State-of-the-art face recognition using additive angular margin loss, trained on MS1M-V2 (5.8M images, 85K identities). Available in both MobileNet (8MB) and ResNet50 (166MB) variants.

**MobileFace**: Lightweight alternatives optimized for mobile and edge devices, with models as small as 1MB.

```python
from uniface import RetinaFace, ArcFace
import numpy as np

detector = RetinaFace()
recognizer = ArcFace()

# Compare two faces
faces1 = detector.detect(image1)
faces2 = detector.detect(image2)

emb1 = recognizer.get_normalized_embedding(image1, faces1[0]['landmarks'])
emb2 = recognizer.get_normalized_embedding(image2, faces2[0]['landmarks'])

similarity = np.dot(emb1, emb2.T)[0][0]
print(f"Similarity: {similarity:.4f}")
```

### 3. Facial Landmark Detection

Precise 106-point facial landmark localization for detailed face analysis and alignment. The landmarks cover face contour (33 points), eyebrows (18 points), nose (12 points), eyes (24 points), and mouth (19 points).

```python
from uniface import RetinaFace, Landmark106

detector = RetinaFace()
landmarker = Landmark106()

faces = detector.detect(image)
landmarks = landmarker.get_landmarks(image, faces[0]['bbox'])
# Returns (106, 2) array of (x, y) coordinates
```

### 4. Attribute Analysis

Extract demographic and emotional attributes from detected faces:

**Age & Gender Detection**: Trained on CelebA dataset, providing age estimation and gender classification.

**Emotion Detection**: 7 or 8-class emotion recognition trained on AffectNet (Neutral, Happy, Sad, Surprise, Fear, Disgust, Anger, and optionally Contempt).

```python
from uniface import RetinaFace, AgeGender

detector = RetinaFace()
age_gender = AgeGender()

faces = detector.detect(image)
gender, age = age_gender.predict(image, faces[0]['bbox'])
print(f"{gender}, {age} years old")
```

---

## Installation & Hardware Acceleration

UniFace provides optimized installation options for different platforms:

### Quick Install (All Platforms)
```bash
pip install uniface
```

### Platform-Specific Optimization

**Apple Silicon (M1/M2/M3/M4)**: The standard installation automatically includes ARM64 optimizations for Apple Silicon Macs. The base `onnxruntime` package has native Apple Silicon support built-in since version 1.13+.

**NVIDIA GPUs**: For CUDA acceleration on NVIDIA GPUs:
```bash
pip install uniface[gpu]
```

**CPU-Only**: Works out of the box on any platform with automatic optimization.

The library automatically detects and uses the best available execution provider—no configuration needed.

---

## Model Selection Guide

UniFace provides a comprehensive model zoo with clear guidance for different use cases:

### By Use Case

**Mobile/Edge Devices**: Use lightweight models like `RetinaFace(MNET_025)` (1.7MB) or `MobileFace(MNET_V2)` (4MB) for resource-constrained environments.

**Real-Time Applications**: Balance speed and accuracy with `RetinaFace(MNET_V2)` or `SCRFD(SCRFD_500M)` for webcam and video processing.

**High-Accuracy Applications**: Deploy `SCRFD(SCRFD_10G)` or `ArcFace(RESNET)` for security systems and identity verification where precision is paramount.

**Server/Cloud Deployment**: Leverage larger models with GPU acceleration for maximum throughput and accuracy in batch processing scenarios.

### Model Families

**Detection Models**:
```python
from uniface.detection import RetinaFace, SCRFD
from uniface.constants import RetinaFaceWeights, SCRFDWeights

# Fast detection (mobile/edge devices)
detector = RetinaFace(model_name=RetinaFaceWeights.MNET_025, conf_thresh=0.7)

# Balanced (recommended)
detector = RetinaFace(model_name=RetinaFaceWeights.MNET_V2)

# High accuracy (server/GPU)
detector = SCRFD(model_name=SCRFDWeights.SCRFD_10G_KPS, conf_thresh=0.5)
```

**Recognition Models**:
```python
from uniface import ArcFace, MobileFace, SphereFace

# ArcFace (recommended for most use cases)
recognizer = ArcFace()  # Best accuracy

# MobileFace (lightweight for mobile/edge)
recognizer = MobileFace()  # Fast, small size

# SphereFace (angular margin approach)
recognizer = SphereFace()  # Alternative method
```

---

## Performance Benchmarks

UniFace models deliver impressive accuracy on the WIDER FACE benchmark:

### Face Detection Models (WIDER FACE Dataset)

| Model Name          | Params | Size   | Easy   | Medium | Hard   | Use Case                    |
|---------------------|--------|--------|--------|--------|--------|----------------------------|
| `MNET_025`          | 0.4M   | 1.7MB  | 88.48% | 87.02% | 80.61% | Mobile/Edge devices         |
| `MNET_V2` ⭐        | 3.2M   | 3.5MB  | 91.70% | 91.03% | 86.60% | **Recommended default**     |
| `RESNET34`          | 24.8M  | 56MB   | 94.16% | 93.12% | 88.90% | Maximum accuracy            |
| `SCRFD_500M`        | 0.6M   | 2.5MB  | 90.57% | 88.12% | 68.51% | Real-time applications      |
| `SCRFD_10G` ⭐      | 4.2M   | 17MB   | 95.16% | 93.87% | 83.05% | **High accuracy + speed**   |

### Face Recognition Models

| Model Name  | Backbone    | Params | Size  | Use Case                    |
|-------------|-------------|--------|-------|----------------------------|
| `MNET` ⭐   | MobileNet   | 2.0M   | 8MB   | **Balanced (recommended)** |
| `RESNET`    | ResNet50    | 43.6M  | 166MB | Maximum accuracy           |

*Accuracy values from original papers: [RetinaFace](https://arxiv.org/abs/1905.00641), [SCRFD](https://arxiv.org/abs/2105.04714)*

---

## Quick Start Examples

### 30-Second Face Detection

```python
import cv2
from uniface import RetinaFace

# Load image
image = cv2.imread("photo.jpg")

# Initialize detector (models auto-download on first use)
detector = RetinaFace()

# Detect faces
faces = detector.detect(image)

# Print results
for i, face in enumerate(faces):
    print(f"Face {i+1}:")
    print(f"  Confidence: {face['confidence']:.2f}")
    print(f"  BBox: {face['bbox']}")
    print(f"  Landmarks: {len(face['landmarks'])} points")
```

### Face Recognition with Similarity

```python
import cv2
import numpy as np
from uniface import RetinaFace, ArcFace

# Initialize models
detector = RetinaFace()
recognizer = ArcFace()

# Load two images
image1 = cv2.imread("person1.jpg")
image2 = cv2.imread("person2.jpg")

# Detect faces
faces1 = detector.detect(image1)
faces2 = detector.detect(image2)

if faces1 and faces2:
    # Extract embeddings
    emb1 = recognizer.get_normalized_embedding(image1, faces1[0]['landmarks'])
    emb2 = recognizer.get_normalized_embedding(image2, faces2[0]['landmarks'])

    # Compute similarity (cosine similarity)
    similarity = np.dot(emb1, emb2.T)[0][0]

    # Interpret result
    if similarity > 0.6:
        print(f"Same person (similarity: {similarity:.3f})")
    else:
        print(f"Different people (similarity: {similarity:.3f})")
```

**Similarity thresholds:**
- `> 0.6`: Same person (high confidence)
- `0.4 - 0.6`: Uncertain (manual review)
- `< 0.4`: Different people

### Production-Ready Features

**Automatic Model Management**: Models are automatically downloaded on first use and cached in `~/.uniface/models/`. SHA-256 checksums ensure integrity.

**Visualization Utilities**: Built-in drawing functions make it easy to visualize results:

```python
from uniface.visualization import draw_detections

bboxes = [f['bbox'] for f in faces]
scores = [f['confidence'] for f in faces]
landmarks = [f['landmarks'] for f in faces]

draw_detections(image, bboxes, scores, landmarks, vis_threshold=0.6)
cv2.imwrite("output.jpg", image)
```

---

## Real-World Use Cases

### Face Search System

```python
# Build database
database = {}
for person_id, image_path in person_images.items():
    image = cv2.imread(image_path)
    faces = detector.detect(image)
    if faces:
        embedding = recognizer.get_normalized_embedding(
            image, faces[0]['landmarks']
        )
        database[person_id] = embedding

# Search for a face
query_faces = detector.detect(query_image)
query_embedding = recognizer.get_normalized_embedding(
    query_image, query_faces[0]['landmarks']
)

# Find best match
best_match = max(database.items(),
                 key=lambda x: np.dot(query_embedding, x[1].T)[0][0])
```

### Real-Time Webcam Detection

```python
import cv2
from uniface import RetinaFace
from uniface.visualization import draw_detections

detector = RetinaFace()
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    faces = detector.detect(frame)
    bboxes = [f['bbox'] for f in faces]
    scores = [f['confidence'] for f in faces]
    landmarks = [f['landmarks'] for f in faces]

    draw_detections(frame, bboxes, scores, landmarks)
    cv2.imshow("Face Detection", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

---

## Advanced Features

### Age & Gender Detection

```python
import cv2
from uniface import RetinaFace, AgeGender

# Initialize models
detector = RetinaFace()
age_gender = AgeGender()

# Load image
image = cv2.imread("photo.jpg")
faces = detector.detect(image)

# Predict attributes
for i, face in enumerate(faces):
    gender, age = age_gender.predict(image, face['bbox'])
    print(f"Face {i+1}: {gender}, {age} years old")
```

### Batch Processing

```python
import cv2
from pathlib import Path
from uniface import RetinaFace

detector = RetinaFace()

# Process all images in a folder
image_dir = Path("images/")
output_dir = Path("output/")
output_dir.mkdir(exist_ok=True)

for image_path in image_dir.glob("*.jpg"):
    print(f"Processing {image_path.name}...")
    image = cv2.imread(str(image_path))
    faces = detector.detect(image)
    print(f"  Found {len(faces)} face(s)")

    # Save results
    output_path = output_dir / image_path.name
    # ... draw and save ...

print("Done!")
```

### Common Issues & Solutions

**Check Hardware Acceleration**:
```python
import onnxruntime as ort
print("Available providers:", ort.get_available_providers())
# macOS M-series should show: ['CoreMLExecutionProvider', ...]
# NVIDIA GPU should show: ['CUDAExecutionProvider', ...]
```

**Manual Model Download**:
```python
from uniface.model_store import verify_model_weights
from uniface.constants import RetinaFaceWeights

model_path = verify_model_weights(RetinaFaceWeights.MNET_V2)
print(f"Model downloaded to: {model_path}")
```

---

## Open Source

UniFace is open source under the MIT license and actively maintained on GitHub. The project includes comprehensive documentation, Jupyter notebook examples, and training code repositories for model reproduction.

The library builds on proven research:
- **RetinaFace**: Single-Shot Multi-Level Face Localisation in the Wild
- **SCRFD**: Sample and Computation Redistribution for Efficient Face Detection
- **ArcFace**: Additive Angular Margin Loss for Deep Face Recognition

---

## Getting Started

Installation is straightforward:

```bash
# macOS (Apple Silicon) - automatically includes ARM64 optimizations
pip install uniface

# Linux/Windows with NVIDIA GPU
pip install uniface[gpu]

# CPU-only (all platforms)
pip install uniface
```

Then start detecting faces in seconds:

```python
import cv2
from uniface import RetinaFace

detector = RetinaFace()
image = cv2.imread("photo.jpg")
faces = detector.detect(image)

for face in faces:
    print(f"Found face with confidence: {face['confidence']:.2f}")
```

---

**Resources:**
- **GitHub**: [github.com/yakhyo/uniface](https://github.com/yakhyo/uniface)
- **PyPI**: [pypi.org/project/uniface](https://pypi.org/project/uniface)
- **Quick Start Guide**: [QUICKSTART.md](https://github.com/yakhyo/uniface/blob/main/QUICKSTART.md)
- **Model Zoo**: [MODELS.md](https://github.com/yakhyo/uniface/blob/main/MODELS.md)
- **Training Code**: [RetinaFace PyTorch](https://github.com/yakhyo/retinaface-pytorch), [Face Recognition](https://github.com/yakhyo/face-recognition)
