---
layout: post
title: "Tiny-Face: Ultra-Lightweight Face Detection for Edge Devices"
date: 2024-11-09 12:00:00 +0900
modified_date: 2026-05-18 12:00:00 +0900
comments: true
categories: computer-vision
tags: [face-detection, tiny-face, mobile, edge-deployment]
description: "Tiny-Face compares SlimFace, RFB, and compact RetinaFace variants for small face detection models with WIDER FACE results and PyTorch/ONNX weights."
image: "https://raw.githubusercontent.com/yakhyo/tiny-face-pytorch/main/assets/largeselfi_retina.jpg"
---

Tiny-Face is a compact face detection project focused on mobile and edge environments. It compares three small detector variants: **SlimFace**, **RFB**, and a compact **RetinaFace** model. See the project on [github.com/yakhyo/tiny-face-pytorch](https://github.com/yakhyo/tiny-face-pytorch).

{% include video.html src="https://github.com/user-attachments/assets/faf65b91-db76-4538-beca-87fc65566e51" %}

![Tiny-Face RetinaFace sample](https://raw.githubusercontent.com/yakhyo/tiny-face-pytorch/main/assets/test_retina.jpg)

The project is based on the RetinaFace-style detection pipeline but reduces the model size for low-resource inference.

## Model Variants

| Model | Parameters | Size | Input |
|-------|------------|------|-------|
| SlimFace | 0.343M | 1.4 MB | 640x640 |
| RFB | 0.359M | 1.5 MB | 640x640 |
| RetinaFace | 0.426M | 1.8 MB | 640x640 |

All three published models have PyTorch and ONNX weights in the repository release.

## WIDER FACE Results

### Multi-scale Image Size

| Model | Easy | Medium | Hard |
|-------|------|--------|------|
| SlimFace | 79.50% | 79.40% | 68.36% |
| RFB | 80.49% | 81.51% | 75.73% |
| RetinaFace | 87.69% | 86.39% | 80.21% |

### Original Image Size

| Model | Easy | Medium | Hard |
|-------|------|--------|------|
| SlimFace | 87.10% | 84.36% | 67.38% |
| RFB | 87.09% | 84.61% | 69.22% |
| RetinaFace | 90.26% | 87.48% | 72.85% |

The compact RetinaFace variant is the strongest model in both tables. SlimFace and RFB are smaller alternatives for stricter model-size constraints.

## Large Selfie Test

The README includes a crowded selfie example and reports how many faces each model detects:

| Model | Faces detected |
|-------|----------------|
| RetinaFace | 459 |
| RFB | 430 |
| SlimFace | 384 |

![Tiny-Face large selfie result](https://raw.githubusercontent.com/yakhyo/tiny-face-pytorch/main/assets/largeselfi_retina.jpg)

This example shows the recall tradeoff clearly. Smaller models are useful on constrained devices, but crowded images make missed detections more likely.

## What the Repository Contains

The repository includes WIDER FACE training and evaluation code, pretrained PyTorch weights, ONNX weights, and inference code for the three detector variants.

It is useful when model size is a first-order constraint and a larger detector is too expensive for the target device.
