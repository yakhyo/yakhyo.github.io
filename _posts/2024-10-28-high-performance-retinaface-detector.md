---
layout: post
title: "RetinaFace: Single-stage Dense Face Localisation in the Wild"
date: 2024-10-28 14:10:00 +0900
comments: true
categories: deep-learning computer-vision facial-recognition
---

RetinaFace is a robust single-stage face detection framework designed for dense face localisation in unconstrained environments. This implementation provides a production-ready solution with multiple backbone options, enabling flexible deployment across different hardware constraints and accuracy requirements.

The model excels at detecting faces across extreme variations in scale, pose, and occlusion, making it particularly effective for real-world applications where faces may appear at any size or orientation within the image.

> **UniFace Library**: For easier integration, check out [UniFace](https://github.com/yakhyo/uniface), a lightweight Python library built on models from this repository. UniFace provides a simple API for face detection, alignment, and landmark extraction.
> [![PyPI Version](https://img.shields.io/pypi/v/uniface.svg)](https://pypi.org/project/uniface/) [![GitHub Stars](https://img.shields.io/github/stars/yakhyo/uniface)](https://github.com/yakhyo/uniface/stargazers)

[GitHub Repository](https://github.com/yakhyo/retinaface-pytorch)

[![Downloads](https://img.shields.io/github/downloads/yakhyo/retinaface-pytorch/total)](https://github.com/yakhyo/retinaface-pytorch/releases)
[![GitHub Repo stars](https://img.shields.io/github/stars/yakhyo/retinaface-pytorch)](https://github.com/yakhyo/retinaface-pytorch/stargazers)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/yakhyo/retinaface-pytorch)

<video controls autoplay loop src="https://github.com/user-attachments/assets/ad279fea-33fb-43f1-884f-282e6d54c809" muted="false" width="100%"></video>

<div align="center">
  <img src="https://yakhyo.github.io/retinaface-pytorch/assets/mv2_test.jpg">
</div>

## Key Features

- **Multiple Backbone Options**: Choose from MobileNetV1 (various width multipliers), MobileNetV2, ResNet18, and ResNet34
- **Improved Training Strategy**: Enhanced filtering of small faces (< 16 pixels) to reduce false positives
- **ONNX Export Support**: Seamless conversion for deployment on various platforms and inference engines
- **Real-time Inference**: Optimized for webcam and video stream processing
- **Production-Ready**: Clean, well-documented codebase with reproducible training pipelines

## Performance on WiderFace Dataset

### Multi-scale Image Size

| RetinaFace Backbones          | Pretrained on ImageNet | Easy       | Medium     | Hard       |
| ----------------------------- | ---------------------- | ---------- | ---------- | ---------- |
| MobileNetV1 (width mult=0.25) | True                   | 88.48%     | 87.02%     | 80.61%     |
| MobileNetV1 (width mult=0.50) | False                  | 89.42%     | 87.97%     | 82.40%     |
| MobileNetV1                   | False                  | 90.59%     | 89.14%     | 84.13%     |
| MobileNetV2                   | True                   | 91.70%     | 91.03%     | 86.60%     |
| ResNet18                      | True                   | 92.50%     | 91.02%     | 86.63%     |
| ResNet34                      | True                   | **94.16%** | **93.12%** | **88.90%** |

### Original Image Size

| RetinaFace Backbones          | Pretrained on ImageNet | Easy       | Medium     | Hard       |
| ----------------------------- | ---------------------- | ---------- | ---------- | ---------- |
| MobileNetV1 (width mult=0.25) | True                   | 90.70%     | 88.12%     | 73.82%     |
| MobileNetV1 (width mult=0.50) | False                  | 91.56%     | 89.46%     | 76.56%     |
| MobileNetV1                   | False                  | 92.19%     | 90.41%     | 79.56%     |
| MobileNetV2                   | True                   | 94.04%     | 92.26%     | 83.59%     |
| ResNet18                      | True                   | 94.28%     | 92.69%     | 82.95%     |
| ResNet34                      | True                   | **95.07%** | **93.48%** | **84.40%** |

## Architecture Highlights

RetinaFace incorporates several advanced techniques:

- **Multi-task Learning**: Simultaneously performs face detection, landmark localization, and 3D face reconstruction
- **Feature Pyramid Network**: Enables detection of faces at multiple scales efficiently
- **Context Module**: Increases receptive field for better handling of small faces
- **Dense Regression**: Pixel-wise prediction for precise face localization

## Quick Start

Clone the repository:

```bash
git clone https://github.com/yakhyo/retinaface-pytorch.git
cd retinaface-pytorch
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run webcam inference:

```bash
python detect.py --network mobilenetv1 --weights retinaface_mv1.pth
```

## Deployment Options

The implementation supports various deployment scenarios:

- **Python Inference**: Direct PyTorch inference for development and testing
- **ONNX Runtime**: Cross-platform deployment with optimized inference
- **Mobile Deployment**: Lightweight MobileNet backbones for on-device inference
- **Server Deployment**: High-accuracy ResNet backbones for cloud-based services

For detailed documentation on training custom models, fine-tuning on specific datasets, and deployment guides, visit the [GitHub repository](https://github.com/yakhyo/retinaface-pytorch).
