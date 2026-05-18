---
layout: post
title: "UniFace: A Unified Face Analysis Library for Python"
date: 2025-11-11 12:00:00 +0900
modified_date: 2026-05-18 12:00:00 +0900
comments: true
categories: computer-vision
tags: [face-analysis, uniface, onnx, production, open-source]
description: "UniFace is a Python library for face detection, recognition, landmarks, parsing, tracking, gaze, head pose, privacy, and vector search."
---

<p align="center">
  <img src="https://raw.githubusercontent.com/yakhyo/uniface/main/.github/logos/uniface_rounded_q80.webp" alt="UniFace logo" style="max-width: 100%;" />
</p>

**UniFace** is a Python library for face analysis. It provides APIs for face detection, recognition, landmarks, parsing, tracking, attributes, gaze estimation, head pose, anti-spoofing, anonymization, and vector search.

The library is built around a common set of conventions. Detectors return `Face` objects, recognition models work with the same landmark format, and higher-level APIs such as `FaceAnalyzer` combine common steps when you do not need to wire each module manually.

## Installation

Install the CPU version for regular CPU inference or Apple Silicon:

```bash
pip install "uniface[cpu]"
```

Install the GPU version for NVIDIA CUDA:

```bash
pip install "uniface[gpu]"
```

The extras are separate because `onnxruntime` and `onnxruntime-gpu` should not be installed together. Models are downloaded on first use, verified with SHA-256, and cached locally.

## Face Detection

```python
import cv2
from uniface.detection import RetinaFace

image = cv2.imread("photo.jpg")
if image is None:
    raise ValueError("Could not read photo.jpg")

detector = RetinaFace()
faces = detector.detect(image)

for face in faces:
    print("confidence:", round(face.confidence, 3))
    print("bbox:", face.bbox)
    print("landmarks:", face.landmarks)
```

This is the smallest useful example. It loads an image, runs a detector, and prints the bounding box and 5-point landmarks for each face.

For webcam input, the same detector can be used frame by frame:

```python
import cv2
from uniface.detection import RetinaFace
from uniface.draw import draw_detections

detector = RetinaFace()
cap = cv2.VideoCapture(0)

while True:
    ok, frame = cap.read()
    if not ok:
        break

    faces = detector.detect(frame)
    draw_detections(image=frame, faces=faces, vis_threshold=0.6)

    cv2.imshow("UniFace detection", frame)
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()
```

For a higher-level pipeline, `FaceAnalyzer` can run detection, embedding extraction, and optional attributes in one call:

```python
import cv2
from uniface import AgeGender, FaceAnalyzer

image = cv2.imread("photo.jpg")
analyzer = FaceAnalyzer(attributes=[AgeGender()])
faces = analyzer.analyze(image)

for face in faces:
    print(face.bbox, face.sex, face.age)
```

See the full documentation at [yakhyo.github.io/uniface](https://yakhyo.github.io/uniface/) and the source code on [GitHub](https://github.com/yakhyo/uniface).

## What UniFace Includes

| Area | Models and features |
|------|---------------------|
| Detection | RetinaFace, SCRFD, YOLOv5-Face, YOLOv8-Face |
| Recognition | AdaFace, ArcFace, EdgeFace, MobileFace, SphereFace |
| Landmarks | 5-point detector landmarks, plus 106 / 98 / 68-point models |
| Tracking | BYTETracker-based persistent IDs for video |
| Parsing | BiSeNet semantic face parsing and XSeg masking |
| Matting | MODNet portrait matting for background removal |
| Attributes | Age, gender, race, and emotion |
| Gaze | MobileGaze for gaze direction estimation |
| Head pose | Pitch, yaw, and roll estimation |
| Anti-spoofing | MiniFASNet |
| Privacy | Pixelate, gaussian, blackout, elliptical, and median anonymization |
| Search | Optional FAISS-backed vector store |

## Notebooks and Demo

The examples can be opened directly in Google Colab:

| Notebook | Colab | Focus |
|----------|-------|-------|
| Face Detection | [Open](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/01_face_detection.ipynb) | Detection and 5-point landmarks |
| Face Alignment | [Open](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/02_face_alignment.ipynb) | Alignment for recognition |
| Face Verification | [Open](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/03_face_verification.ipynb) | Similarity-based identity matching |
| Face Search | [Open](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/04_face_search.ipynb) | Searching for a person in group photos |
| Face Analyzer | [Open](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/05_face_analyzer.ipynb) | Detection, recognition, and attributes |
| Face Parsing | [Open](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/06_face_parsing.ipynb) | Semantic face segmentation |
| Face Anonymization | [Open](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/07_face_anonymization.ipynb) | Face blurring and anonymization |
| Gaze Estimation | [Open](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/08_gaze_estimation.ipynb) | Gaze direction prediction |
| Face Segmentation | [Open](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/09_face_segmentation.ipynb) | XSeg-based masking |
| Face Vector Store | [Open](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/10_face_vector_store.ipynb) | FAISS-backed embedding search |
| Head Pose Estimation | [Open](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/11_head_pose_estimation.ipynb) | Pitch, yaw, and roll |
| Face Recognition | [Open](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/12_face_recognition.ipynb) | Recognition without `FaceAnalyzer` |
| Portrait Matting | [Open](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/13_portrait_matting.ipynb) | Background removal and compositing |

There is also a live Hugging Face demo at [huggingface.co/spaces/yakhyo/uniface](https://huggingface.co/spaces/yakhyo/uniface).

## Library Design

UniFace keeps the individual modules independent, but makes them work together through shared inputs and outputs. You can use only the detector, build a recognition pipeline yourself, or start from `FaceAnalyzer` when you want the common detection-plus-recognition path.

The library supports macOS, Linux, and Windows, including CPU inference, Apple Silicon, and NVIDIA CUDA through ONNX Runtime providers.
