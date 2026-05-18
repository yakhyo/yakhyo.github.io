---
layout: post
title: "RetinaFace: Single-Stage Face Detection with MobileNet and ResNet Backbones"
date: 2024-10-28 12:00:00 +0900
modified_date: 2026-05-18 12:00:00 +0900
comments: true
categories: computer-vision
tags: [face-detection, retinaface, single-stage, production]
description: "A RetinaFace implementation with MobileNet and ResNet backbones, WIDER FACE evaluation, webcam inference, ONNX support, and pretrained weights."
image: "https://raw.githubusercontent.com/yakhyo/retinaface-pytorch/main/assets/mv2_test.jpg"
---

RetinaFace is a single-stage face detector that predicts face bounding boxes and 5-point landmarks. This implementation adds multiple backbones, WIDER FACE evaluation, webcam inference, PyTorch weights, and ONNX weights. See the project on [github.com/yakhyo/retinaface-pytorch](https://github.com/yakhyo/retinaface-pytorch).

{% include video.html src="https://github.com/user-attachments/assets/ad279fea-33fb-43f1-884f-282e6d54c809" %}

![RetinaFace MobileNetV2 result](https://raw.githubusercontent.com/yakhyo/retinaface-pytorch/main/assets/mv2_test.jpg)

## Backbones

The repository supports lightweight MobileNet models and heavier ResNet models.

| Backbone | Notes |
|----------|-------|
| MobileNetV1 0.25 | smallest MobileNetV1 width multiplier |
| MobileNetV1 0.50 | wider MobileNetV1 variant |
| MobileNetV1 | standard lightweight backbone |
| MobileNetV2 | stronger mobile backbone |
| ResNet18 | moderate ResNet option |
| ResNet34 | strongest reported model in the available tables |
| ResNet50 | listed as supported, but release weights are not available in the README table |

The MobileNet models are intended for smaller runtime budgets. ResNet models are larger but usually more accurate.

## WIDER FACE Results

### Multi-scale Image Resizing

| Backbone | Easy | Medium | Hard |
|----------|------|--------|------|
| MobileNetV1 0.25 | 88.48% | 87.02% | 80.61% |
| MobileNetV1 0.50 | 89.42% | 87.97% | 82.40% |
| MobileNetV1 | 90.59% | 89.14% | 84.13% |
| MobileNetV2 | 91.70% | 91.03% | 86.60% |
| ResNet18 | 92.50% | 91.02% | 86.63% |
| ResNet34 | **94.16%** | **93.12%** | **88.90%** |

### Original Image Size

| Backbone | Easy | Medium | Hard |
|----------|------|--------|------|
| MobileNetV1 0.25 | 90.70% | 88.12% | 73.82% |
| MobileNetV1 0.50 | 91.56% | 89.46% | 76.56% |
| MobileNetV1 | 92.19% | 90.41% | 79.56% |
| MobileNetV2 | 94.04% | 92.26% | 83.59% |
| ResNet18 | 94.28% | 92.69% | 82.95% |
| ResNet34 | **95.07%** | **93.48%** | **84.40%** |

## Small-Face Filtering

The README includes an additional set of WIDER FACE results after filtering faces smaller than 16 pixels during training.

The change improves the easy and medium splits in several cases, because very small noisy annotations create fewer false positives. The tradeoff is visible on the hard split: performance drops sharply when the evaluation depends on very small faces.

That makes the choice task-dependent. If the deployment mostly sees normal-sized faces, filtering can be useful. If the task is crowd scenes or surveillance-style images, the hard-split drop matters.

## Large Selfie Result

The repository also includes a large selfie example using MobileNetV2:

![RetinaFace large selfie result](https://raw.githubusercontent.com/yakhyo/retinaface-pytorch/main/assets/mv2_large_selfi_632people.jpg)

The README notes that the MobileNetV2 model finds 632 faces in this image.

## PyTorch and ONNX

The repository provides PyTorch and ONNX weights for the published MobileNet and ResNet variants. It also includes training, WIDER FACE evaluation, image inference, video/webcam inference, and ONNX export code.

For application code that only needs detection as part of a larger face-analysis pipeline, this model family is also available through [UniFace](https://github.com/yakhyo/uniface).
