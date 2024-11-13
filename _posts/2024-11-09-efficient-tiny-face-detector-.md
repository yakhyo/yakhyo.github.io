---
layout: post
title: "Tiny-Face: Ultra-lightweight Face Detection for Mobile Devices"
date: 2024-11-09 14:10:00 +0900
comments: true
categories: deep-learning computer-vision facial-recognition
---

Tiny-Face is an ultra-lightweight face detection model specifically designed to deliver fast and efficient performance on mobile and edge devices, where computational resources are limited. 🚀 Unlike many conventional face detection models, Tiny-Face is streamlined to use minimal memory and processing power while still achieving high precision in detecting faces.

Tiny-Face builds upon the core concepts of RetinaFace but introduces several optimizations that make it ideal for real-world deployment on mobile phones, embedded systems, and IoT devices. With an emphasis on reducing the model’s footprint, Tiny-Face can run seamlessly on low-power hardware without compromising on detection accuracy, making it an excellent choice for applications where speed and efficiency are critical.

👉 [https://github.com/yakhyo/tiny-face-pytorch](https://github.com/yakhyo/tiny-face-pytorch)

[![Downloads](https://img.shields.io/github/downloads/yakhyo/tiny-face-pytorch/total)](https://github.com/yakhyo/tiny-face-pytorch/releases)
[![GitHub Repo stars](https://img.shields.io/github/stars/yakhyo/tiny-face-pytorch)](https://github.com/yakhyo/tiny-face-pytorch/stargazers)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/yakhyo/tiny-face-pytorch)

<video controls autoplay loop src="https://github.com/user-attachments/assets/faf65b91-db76-4538-beca-87fc65566e51" muted="false" width="100%"></video>

<div align="center">
  <img src="https://yakhyo.github.io/tiny-face-pytorch/assets/largeselfi_retina.jpg">
</div>

## Key Features 🌟

- **Tiny-sized Efficiency**: Ultra-lightweight and ideal for mobile or edge devices.
- **Mobile-friendly**: Slim, RFB, and MobileNet configurations optimized for minimal resources.
- **Pretrained Backbones**: High precision with models tailored for embedded systems.

## 📈 Performance on WiderFace Dataset

### Multi-scale Image Size

| Models     | Pretrained on ImageNet | Easy   | Medium | Hard   | #Params(M) | Size(MB) |
| ---------- | ---------------------- | ------ | ------ | ------ | ---------- | -------- |
| SlimFace   | False                  | 79.50% | 79.40% | 68.36% | 0.343      | 1.4      |
| RFB        | False                  | 80.49% | 81.51% | 75.73% | 0.359      | 1.5      |
| RetinaFace | True                   | 87.69% | 86.39% | 80.21% | 0.426      | 1.8      |

### Original Image Size

| Models     | Pretrained on ImageNet | Easy   | Medium | Hard   | #Params(M) |
| ---------- | ---------------------- | ------ | ------ | ------ | ---------- |
| SlimFace   | False                  | 87.10% | 84.36% | 67.38% | 0.343      |
| RFB        | False                  | 87.09% | 84.61% | 69.22% | 0.359      |
| RetinaFace | True                   | 90.26% | 87.48% | 72.85% | 0.426      |

Explore the [https://github.com/yakhyo/tiny-face-pytorch](https://github.com/yakhyo/tiny-face-pytorch) for detailed setup instructions and contribute to this efficient face detection project!
