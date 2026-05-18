---
layout: post
title: "MobileGaze: Lightweight Gaze Estimation with ResNet, MobileNet, and MobileOne"
date: 2024-09-18 12:00:00 +0900
modified_date: 2026-05-18 12:00:00 +0900
comments: true
categories: computer-vision
tags: [gaze-estimation, mobile, classification, regression, edge-deployment]
description: "MobileGaze estimates gaze direction with ResNet, MobileNetV2, and MobileOne backbones, using Gaze360 training, PyTorch weights, ONNX weights, and real-time inference."
---

MobileGaze estimates gaze direction from a detected face. The project builds on [L2CS-Net](https://github.com/Ahmednull/L2CS-Net), adds more mobile-friendly backbones, and provides PyTorch and ONNX weights for inference. See the project on [github.com/yakhyo/gaze-estimation](https://github.com/yakhyo/gaze-estimation).

![MobileGaze demo](https://raw.githubusercontent.com/yakhyo/gaze-estimation/main/assets/out_gif.gif)

The inference pipeline first detects the face, then predicts gaze direction from the face crop. In the repository, face detection is handled through [UniFace](https://github.com/yakhyo/uniface).

## Model Families

The repository includes three backbone families:

| Backbone | Role |
|----------|------|
| ResNet-18 / 34 / 50 | stronger accuracy, larger models |
| MobileNet V2 | compact mobile-oriented baseline |
| MobileOne S0 | very small mobile model with competitive reported error |

The README also lists MobileOne S1-S4 as trainable architectures, but pretrained weights are not published for those variants.

## Training Data

The released models are trained on **Gaze360**. The repository also documents dataset structure for **MPIIFaceGaze**, but the published pretrained results are Gaze360-based.

Gaze estimation is reported with MAE in degrees. Lower values mean the predicted gaze direction is closer to the annotation.

## Reported Results

| Model | Size | Epochs | MAE |
|-------|------|--------|-----|
| ResNet-18 | 43 MB | 200 | 12.84 |
| ResNet-34 | 81.6 MB | 200 | 11.33 |
| ResNet-50 | 91.3 MB | 200 | 11.34 |
| MobileNet V2 | 9.59 MB | 200 | 13.07 |
| MobileOne S0 | 4.8 MB | 200 | 12.58 |

ResNet-34 and ResNet-50 have the best reported MAE in the table. MobileOne S0 is much smaller while staying close to the ResNet-18 result, which makes it useful for real-time or lower-resource settings.

## What the Pipeline Produces

The model predicts gaze direction as pitch and yaw. In a live demo, those angles can be drawn back onto the frame as a gaze ray.

The full pipeline is:

1. Detect the face.
2. Crop and preprocess the face region.
3. Predict gaze pitch and yaw.
4. Draw or consume the gaze direction in the application.

This structure is useful for attention tracking, human-computer interaction, driver monitoring, and accessibility experiments.

## PyTorch and ONNX

The repository provides both PyTorch and ONNX weights for the published models:

| Model | PyTorch | ONNX |
|-------|---------|------|
| ResNet-18 | yes | yes |
| ResNet-34 | yes | yes |
| ResNet-50 | yes | yes |
| MobileNet V2 | yes | yes |
| MobileOne S0 | yes | yes |

Use PyTorch when training or changing the model. Use ONNX when the target application only needs inference.
