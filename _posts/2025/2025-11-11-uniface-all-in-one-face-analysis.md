---
layout: post
title: "UniFace: All-in-One Face Analysis Toolkit for Production"
date: 2025-11-11 12:00:00 +0900
modified_date: 2026-05-12 12:00:00 +0900
comments: true
categories: computer-vision
tags: [face-analysis, uniface, onnx, production, open-source]
description: "UniFace is a production-ready ONNX-based toolkit unifying face detection, recognition, landmarks, attributes, parsing, gaze, anti-spoofing, and privacy in one API."
---

**UniFace** is a lightweight, production-ready face analysis library built on ONNX Runtime. It provides a unified API for face detection, recognition, landmark detection, attribute analysis, face parsing, gaze estimation, anti-spoofing, and privacy features.

---

## Documentation Moved

The comprehensive documentation for UniFace has been moved to a dedicated documentation site with tutorials, API references, and guides.

**[UniFace Docs Page →](https://yakhyo.github.io/uniface/)**

---

## Interactive Notebooks

Run examples directly in your browser with Google Colab:

| Notebook | Colab | Description |
|----------|-------|-------------|
| Face Detection | [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/01_face_detection.ipynb) | Detect faces and 5-point landmarks |
| Face Alignment | [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/02_face_alignment.ipynb) | Align faces for recognition |
| Face Verification | [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/03_face_verification.ipynb) | Compare faces for identity |
| Face Search | [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/04_face_search.ipynb) | Find a person in group photos |
| Face Analyzer | [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/05_face_analyzer.ipynb) | All-in-one face analysis |
| Face Parsing | [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/06_face_parsing.ipynb) | Semantic face segmentation |
| Face Anonymization | [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/07_face_anonymization.ipynb) | Privacy-preserving blur |
| Gaze Estimation | [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/08_gaze_estimation.ipynb) | Gaze direction estimation |

[View all notebooks →](https://yakhyo.github.io/uniface/notebooks/)

---

## Quick Install

```bash
pip install uniface
```

For GPU support:

```bash
pip install uniface[gpu]
```

---

**Resources:**
- **Documentation**: [yakhyo.github.io/uniface](https://yakhyo.github.io/uniface/)
- **GitHub**: [github.com/yakhyo/uniface](https://github.com/yakhyo/uniface)
- **PyPI**: [pypi.org/project/uniface](https://pypi.org/project/uniface)
