---
layout: post
title: "RetinaFace: Single-stage Dense Face Localisation in the Wild"
date: 2024-10-28 14:10:00 +0900
comments: true
categories: deep-learning computer-vision facial-recognition
---

Face detection in the wild presents unique challenges, but RetinaFace 🌐, a single-stage dense face localization model, tackles them effectively. My latest repository on GitHub explores this model, which enables high-precision facial detection and localization of key landmarks. This implementation integrates several backbone models (MobileNet and ResNet variants), allowing for flexibility between model size and accuracy. 🚀

👉 [https://github.com/yakhyo/retinaface-pytorch](https://github.com/yakhyo/retinaface-pytorch)

[![Downloads](https://img.shields.io/github/downloads/yakhyo/retinaface-pytorch/total)](https://github.com/yakhyo/retinaface-pytorch/releases)
[![GitHub Repo stars](https://img.shields.io/github/stars/yakhyo/retinaface-pytorch)](https://github.com/yakhyo/retinaface-pytorch/stargazers)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/yakhyo/retinaface-pytorch)

<video controls autoplay loop src="https://github.com/user-attachments/assets/ad279fea-33fb-43f1-884f-282e6d54c809" muted="false" width="100%"></video>

<div align="center">
  <img src="https://yakhyo.github.io/retinaface-pytorch/assets/mv2_test.jpg">
</div>

RetinaFace is well-suited for real-time applications 🎥 and cross-platform deployment 📲, with support for ONNX exports. The codebase has been refactored for ease of use, and lightweight MobileNet backbones ensure that the model performs efficiently even on low-power devices.

## Key Features 🌟

- **Lightweight Models**: Options like MobileNetV1 (width mult=0.25) for fast inference ⚡
- **Improved Accuracy**: ResNet backbones deliver higher detection accuracy 🎯
- **Webcam & ONNX Support**: Real-time inference and flexible deployment 🔄

## 📈 Performance on WiderFace Dataset

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

For a detailed setup and to explore various training configurations, check out the [https://github.com/yakhyo/retinaface-pytorch](https://github.com/yakhyo/retinaface-pytorch) and contribute to this project! 👩‍💻👨‍💻
