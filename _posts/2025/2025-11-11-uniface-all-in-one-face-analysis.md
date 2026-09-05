---
layout: post
title: "UniFace: A Unified Face Analysis Library for Python"
date: 2025-11-11 12:00:00 +0900
last_modified_at: 2026-08-16 12:00:00 +0900
comments: true
published: true
categories: computer-vision
tags: [face-analysis, uniface, onnx, production, open-source]
description: "UniFace is a Python library for face analysis on ONNX Runtime: six detectors, five recognition models, 468-point mesh, parsing, attributes, and quality scoring."
image:
  path: https://raw.githubusercontent.com/yakhyo/uniface/main/assets/demo/detection_alt.jpg
  width: 1500
  height: 1086
  alt: "Black and white group photograph of 29 physicists on the steps of a building, each face marked with a green box and five keypoints by SCRFD-10G"
---

<p align="center">
  <img src="https://raw.githubusercontent.com/yakhyo/uniface/main/.github/logos/uniface_rounded_q80.webp" alt="UniFace logo" style="max-width: 100%;" />
</p>

**UniFace** is a Python library for face analysis. It provides APIs for face detection, recognition, landmarks, face mesh, parsing, portrait matting, tracking, attributes, image quality scoring, gaze estimation, head pose, anti-spoofing, anonymization, and vector search.

The library is built around a common set of conventions. Detectors return `Face` objects, recognition models use the same landmark format, and higher-level APIs such as `FaceAnalyzer` combine common steps when you do not need to wire each module manually.

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
analyzer = FaceAnalyzer(predictors=[AgeGender()])
faces = analyzer.analyze(image)

for face in faces:
    print(face.bbox, face.sex, face.age)
```

See the full documentation at [yakhyo.github.io/uniface](https://yakhyo.github.io/uniface/) and the source code on [GitHub](https://github.com/yakhyo/uniface).

## What UniFace Includes

| Area | Models and features |
|------|---------------------|
| Detection | RetinaFace, SCRFD, CenterFace, YOLOv5-Face, YOLOv8-Face, and BlazeFace |
| Recognition | AdaFace, ArcFace, EdgeFace, MobileFace, SphereFace |
| Landmarks | 5-point detector landmarks, 106 / 98 / 68-point models, 468-point 3D Face Mesh, and BlazeFace's 6 MediaPipe keypoints |
| Tracking | BYTETracker-based persistent IDs for video |
| Parsing | BiSeNet semantic face parsing and XSeg masking |
| Matting | MODNet portrait matting for background removal |
| Attributes | Age, gender, race, emotion, eye openness, glasses, sunglasses, and mask |
| Quality | eDifFIQA image quality scoring in four sizes, from 6.6 MB to 250 MB |
| Gaze | MobileGaze for gaze direction estimation |
| Head pose | Pitch, yaw, and roll estimation |
| Anti-spoofing | MiniFASNet |
| Privacy | Pixelate, gaussian, blackout, elliptical, and median anonymization |
| Search | Optional FAISS-backed vector store |

## What It Looks Like

Every figure below is rendered from the photographs in the repository by the script that builds the demo set, so the numbers printed on them are measured rather than quoted from a paper. The [demo set README](https://github.com/yakhyo/uniface/blob/main/assets/demo/README.md) records which source feeds which figure and why each model was chosen.

### Detection and Landmarks

Small faces are the hard case. This is the 1927 Solvay Conference photograph, and SCRFD-10G finds 29 faces in it at 37 to 46 pixels wide:

<div align="center">
<img src="https://raw.githubusercontent.com/yakhyo/uniface/main/assets/demo/detection_alt.jpg" width="90%" loading="lazy" alt="Black and white group photograph of 29 physicists on the steps of a building, each face marked with a small green box and five green keypoints. Caption reads: Face Detection, SCRFD-10G, box plus 5 keypoints, 29 faces">
</div>

Landmark models run on top of a detection. The same portrait at 106, 98, and 68 points:

<div align="center">
<img src="https://raw.githubusercontent.com/yakhyo/uniface/main/assets/demo/landmarks.jpg" width="95%" loading="lazy" alt="Three copies of the same smiling woman's portrait side by side, each overlaid with a different landmark set: 106 cyan points from 2d106det, 98 purple points from PIPNet WFLW, and 68 green points from PIPNet 300W">
</div>

Face Mesh goes further and fits 468 dense 3D points per frame, which holds up under expression changes:

<div align="center">
<img src="https://raw.githubusercontent.com/yakhyo/mediapipe-face-mesh-onnx/main/assets/results/woman_smile.gif" width="70%" loading="lazy" alt="Animated 468-point face mesh tracking a woman's face as her expression changes from neutral to smiling">
</div>

### Parsing, Segmentation, and Matting

Three different ways to cut a face out of a photograph, each with its own output format. Parsing gives you per-region labels, with 13 of BiSeNet's 19 classes present here:

<div align="center">
<img src="https://raw.githubusercontent.com/yakhyo/uniface/main/assets/demo/parsing.jpg" width="90%" loading="lazy" alt="Face parsing shown as a pair: the original portrait beside a version where skin, hair, eyebrows, eyes, nose, lips, neck and clothing are each shaded a different colour">
</div>

XSeg returns one binary mask instead, which is what you want when the next step is a cut-out rather than a per-region edit:

<div align="center">
<img src="https://raw.githubusercontent.com/yakhyo/uniface/main/assets/demo/segmentation.jpg" width="95%" loading="lazy" alt="Face segmentation in three panels: a woman with curly hair, the same photo with her face region filled solid green as the XSeg mask, and the face cut out onto a transparency checkerboard">
</div>

Matting returns an alpha matte rather than a mask, so hair keeps its soft edge when you composite:

<div align="center">
<img src="https://raw.githubusercontent.com/yakhyo/uniface/main/assets/demo/matting.jpg" width="90%" loading="lazy" alt="Portrait matting in three panels: the original photo, the alpha matte as a white silhouette on black with individual hair strands visible, and the subject composited onto a green background">
</div>

### Head Pose and Gaze

Head pose returns pitch, yaw, and roll, drawn here as a projected cube. The model prints pitch and roll only below 60 degrees of yaw, because past that it reports tens of degrees of tilt on a level head:

<div align="center">
<img src="https://raw.githubusercontent.com/yakhyo/uniface/main/assets/demo/headpose.jpg" width="95%" loading="lazy" alt="Three portraits each overlaid with a red, green and blue wireframe cube showing head orientation, labelled yaw minus 77 degrees, yaw plus 8 degrees with pitch minus 9 and roll plus 3, and yaw plus 40 degrees with pitch plus 4 and roll plus 2">
</div>

Gaze is a separate estimate and it does not follow the head. The middle subject below faces the camera but is still looking 20 degrees to her left:

<div align="center">
<img src="https://raw.githubusercontent.com/yakhyo/uniface/main/assets/demo/gaze.jpg" width="95%" loading="lazy" alt="Three portraits each with a red arrow drawn from between the eyes showing gaze direction, labelled gaze yaw minus 31 degrees, minus 20 degrees, and plus 19 degrees">
</div>

### Attributes

FairFace buckets age rather than predicting a number, and returns sex and race alongside it:

<div align="center">
<img src="https://raw.githubusercontent.com/yakhyo/uniface/main/assets/demo/demography.jpg" width="95%" loading="lazy" alt="Four portraits in a row, a young boy, a teenage girl, a smiling middle-aged woman and an older man in a flat cap, each labelled with a predicted age bucket of 3 to 9, 20 to 29, 40 to 49 and 60 to 69, and a sex of male, female, female and male">
</div>

Emotion covers the eight AffectNet classes:

<div align="center">
<img src="https://raw.githubusercontent.com/yakhyo/uniface/main/assets/demo/emotion.jpg" width="95%" loading="lazy" alt="Eight portraits in a two-row grid, each labelled with a predicted emotion and probability: happy 0.99, surprise 0.93, angry 0.92, disgust 0.75, fear 0.93, sad 0.76, contempt 0.98 and neutral 0.76">
</div>

Face attributes run once per detected face, so a group photo returns an independent result for each person. Only the man on the left reads `Glasses True`:

<div align="center">
<img src="https://raw.githubusercontent.com/yakhyo/face-attribute/main/assets/results/group.jpg" width="80%" loading="lazy" alt="Three people photographed together, each face in a white box with its own labels for eyes, mask, glasses and sunglasses, and only the man on the left reading glasses true">
</div>

### Recognition, Quality, and Privacy

AdaFace holds an identity across decades. Einstein matches himself at +0.583 over 26 years and Bohr at +0.689 over 25, while both of the man-against-man negatives land near zero, well under the 0.40 threshold:

<div align="center">
<img src="https://raw.githubusercontent.com/yakhyo/uniface/main/assets/demo/verification_alt.jpg" width="95%" loading="lazy" alt="Eight archival portraits arranged as four comparison pairs. Einstein in 1921 against 1947 scores plus 0.583 and Bohr in 1910 against 1935 scores plus 0.689, both labelled match; Einstein against Bohr scores plus 0.001 and Einstein against Curie scores minus 0.031, both labelled no match">
</div>

Quality scoring gives you one number per face, which is what you filter on before enrolling someone. Seven faces in this frame span 0.398 to 0.749, and the low scorers are the ones turned away from the camera:

<div align="center">
<img src="https://raw.githubusercontent.com/yakhyo/uniface/main/assets/demo/quality.jpg" width="95%" loading="lazy" alt="A group of seven people against a dark wall, each face marked with a corner box coloured amber or green, above a strip of four cropped faces scored 0.398, 0.525, 0.675 and 0.749, with the lowest scores on the faces turned away from the camera">
</div>

Anti-spoofing judges how a face was presented to the camera. A live capture reads `Real` at 1.00, and a print and a screen replay of that same capture read `Fake` at 0.66 and 0.99:

<div align="center">
<img src="https://raw.githubusercontent.com/yakhyo/uniface/main/assets/demo/spoofing.jpg" width="95%" loading="lazy" alt="Three frames of the same woman: a live webcam capture boxed in green and labelled Real 1.00, a printed photograph of her boxed in red and labelled Fake 0.66, and the photo replayed on a tablet screen boxed in red and labelled Fake 0.99">
</div>

Anonymization ships several methods, so you can match whichever one your compliance requirement asks for:

<div align="center">
<img src="https://raw.githubusercontent.com/yakhyo/uniface/main/assets/demo/anonymization.jpg" width="95%" loading="lazy" alt="The same photograph of five colleagues repeated four times, with every face obscured by a different method: pixelate, gaussian blur, elliptical blur, and a solid black box">
</div>

## Notebooks and Demo

The examples can be opened directly in Google Colab:

| Notebook | Colab | Kaggle | Focus |
|----------|-------|--------|-------|
| Face Detection | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/01_face_detection.ipynb) | [![Open in Kaggle](https://kaggle.com/static/images/open-in-kaggle.svg)](https://www.kaggle.com/code/yakhyokhuja/face-detection-with-uniface) | Detection and 5-point landmarks |
| Face Alignment | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/02_face_alignment.ipynb) | [![Open in Kaggle](https://kaggle.com/static/images/open-in-kaggle.svg)](https://www.kaggle.com/code/yakhyokhuja/face-detection-and-alignment-with-uniface) | Alignment for recognition |
| Face Verification | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/03_face_verification.ipynb) | [![Open in Kaggle](https://kaggle.com/static/images/open-in-kaggle.svg)](https://www.kaggle.com/code/yakhyokhuja/face-verification-one-to-one-face-comparison) | Similarity-based identity matching |
| Face Search | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/04_face_search.ipynb) | [![Open in Kaggle](https://kaggle.com/static/images/open-in-kaggle.svg)](https://www.kaggle.com/code/yakhyokhuja/face-search-one-to-many-face-matching) | Searching for a person in group photos |
| Face Analyzer | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/05_face_analyzer.ipynb) | [![Open in Kaggle](https://kaggle.com/static/images/open-in-kaggle.svg)](https://www.kaggle.com/code/yakhyokhuja/face-analysis-with-uniface) | Detection, recognition, and attributes |
| Face Parsing | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/06_face_parsing.ipynb) | [![Open in Kaggle](https://kaggle.com/static/images/open-in-kaggle.svg)](https://www.kaggle.com/code/yakhyokhuja/face-parsing-with-uniface) | Semantic face segmentation |
| Face Anonymization | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/07_face_anonymization.ipynb) | [![Open in Kaggle](https://kaggle.com/static/images/open-in-kaggle.svg)](https://www.kaggle.com/code/yakhyokhuja/face-anonymization-with-uniface) | Face blurring and anonymization |
| Gaze Estimation | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/08_gaze_estimation.ipynb) | [![Open in Kaggle](https://kaggle.com/static/images/open-in-kaggle.svg)](https://www.kaggle.com/code/yakhyokhuja/gaze-estimation-with-uniface) | Gaze direction prediction |
| Face Segmentation | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/09_face_segmentation.ipynb) | [![Open in Kaggle](https://kaggle.com/static/images/open-in-kaggle.svg)](https://www.kaggle.com/code/yakhyokhuja/xseg-face-segmentation) | XSeg-based masking |
| Face Vector Store | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/10_face_vector_store.ipynb) | [![Open in Kaggle](https://kaggle.com/static/images/open-in-kaggle.svg)](https://www.kaggle.com/code/yakhyokhuja/face-vector-store-with-faiss) | FAISS-backed embedding search |
| Head Pose Estimation | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/11_head_pose_estimation.ipynb) | [![Open in Kaggle](https://kaggle.com/static/images/open-in-kaggle.svg)](https://www.kaggle.com/code/yakhyokhuja/head-pose-estimation-with-uniface) | Pitch, yaw, and roll |
| Face Recognition | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/12_face_recognition.ipynb) | [![Open in Kaggle](https://kaggle.com/static/images/open-in-kaggle.svg)](https://www.kaggle.com/code/yakhyokhuja/face-recognition-retinaface-align-arcface) | Recognition without `FaceAnalyzer` |
| Portrait Matting | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/13_portrait_matting.ipynb) | [![Open in Kaggle](https://kaggle.com/static/images/open-in-kaggle.svg)](https://www.kaggle.com/code/yakhyokhuja/portrait-matting-with-modnet) | Background removal and compositing |
| Face Attributes | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/14_face_attributes.ipynb) | [![Open in Kaggle](https://kaggle.com/static/images/open-in-kaggle.svg)](https://www.kaggle.com/code/yakhyokhuja/face-attribute-detection-with-uniface) | Eye, glasses, sunglasses, and mask attributes |
| Face Mesh | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/15_face_mesh.ipynb) | [![Open in Kaggle](https://kaggle.com/static/images/open-in-kaggle.svg)](https://www.kaggle.com/code/yakhyokhuja/dense-face-mesh-with-uniface) | Dense 468-point face landmarks |

There is also a live Hugging Face demo at [huggingface.co/spaces/yakhyo/uniface](https://huggingface.co/spaces/yakhyo/uniface).

## Library Design

UniFace keeps the individual modules independent, but makes them work together through shared inputs and outputs. You can use only the detector, build a recognition pipeline yourself, or start from `FaceAnalyzer` when you want the common detection-plus-recognition path.

The library supports macOS, Linux, and Windows, including CPU inference, Apple Silicon, and NVIDIA CUDA through ONNX Runtime providers.

## Related Deep-Dives

Several UniFace modules started as standalone projects. These posts go deeper on the individual models the library bundles:

- [RetinaFace: Single-Stage Face Detection in PyTorch]({% link _posts/2024/2024-10-28-high-performance-retinaface-detector.md %}). The detection backbone family, with WIDER FACE benchmarks.
- [Face Parsing with BiSeNet and ResNet Backbones]({% link _posts/2024/2024-11-29-face-parsing-bisenet.md %}). The semantic segmentation module for per-region masks.
- [MobileGaze: Lightweight Gaze Estimation with MobileOne]({% link _posts/2024/2024-09-18-gaze-estimation.md %}). The gaze direction module.
- [Real-Time Head Pose Estimation with MobileNet and ResNet]({% link _posts/2024/2024-09-17-head-pose-estimation.md %}). The pitch/yaw/roll head pose module.
- [Eye, Glasses, and Mask Detection: FaceAttribNet in UniFace]({% link _posts/2026/2026-07-28-face-attribute-detection-faceattribnet.md %}). The multi-label model behind the eye, glasses, and mask outputs.
- [Running MediaPipe Face Mesh in UniFace, Pixel for Pixel]({% link _posts/2026/2026-07-28-mediapipe-face-mesh-onnx-468-landmarks.md %}). The dense landmark model and BlazeFace detector port.
- [How to Choose a Face Recognition Model in UniFace]({% link _posts/2026/2026-09-06-face-recognition-adaface-arcface-edgeface.md %}). Five recognition families measured on the same portraits, with per-model thresholds.
- [Will a Photo Fool Your Face Login? Anti-Spoofing in UniFace]({% link _posts/2026/2026-09-06-face-anti-spoofing-minifasnet.md %}). MiniFASNet on a live capture, a print, a screen replay and old photographs, with the voting pattern that makes it hold up.
