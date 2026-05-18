---
layout: post
title: "Real-Time Head Pose Estimation with MobileNet and ResNet"
date: 2024-09-17 12:00:00 +0900
modified_date: 2026-05-18 12:00:00 +0900
comments: true
categories: computer-vision
tags: [head-pose-estimation, mobilenet, resnet, scrfd, edge-deployment]
description: "Head pose estimation with ResNet and MobileNet backbones, SCRFD face detection, PyTorch and ONNX weights, and pitch/yaw/roll output for real-time video."
---

This project estimates head orientation from images, videos, or webcam input. For each detected face, the model predicts three Euler angles: **yaw**, **pitch**, and **roll**. See the project on [github.com/yakhyo/head-pose-estimation](https://github.com/yakhyo/head-pose-estimation).

{% include video.html src="https://github.com/user-attachments/assets/50f010cf-6fcf-46b0-87cc-53065cba3fe7" %}

The implementation builds on [6DRepNet](https://github.com/thohemp/6DRepNet) and extends it with more pretrained backbones, updated weights, SCRFD-based face detection, ONNX export, ONNX Runtime inference, and distributed training support.

## What the Model Predicts

Head pose is represented with three angles:

| Angle | Meaning |
|-------|---------|
| Yaw | left-right head rotation |
| Pitch | up-down head rotation |
| Roll | sideways head tilt |

The output is useful when a system needs a coarse estimate of attention or orientation. Common examples include driver monitoring, classroom attention analysis, video meeting tools, AR/VR interaction, and accessibility interfaces.

## Model Families

The repository provides both ResNet and MobileNet backbones.

| Backbone | Main tradeoff |
|----------|---------------|
| ResNet-18 | smaller ResNet baseline with good accuracy |
| ResNet-34 | better accuracy with moderate size |
| ResNet-50 | strongest reported accuracy, largest ResNet option |
| MobileNet V2 | compact model for lower-resource inference |
| MobileNet V3 small | smallest MobileNet option, lower accuracy |
| MobileNet V3 large | larger mobile model with better accuracy than V3 small |

The README provides both PyTorch and ONNX weights for each of these models.

## Evaluation on AFLW2000

The reported results are evaluated on AFLW2000. Lower MAE is better.

| Model | Size | Yaw | Pitch | Roll | MAE |
|-------|------|-----|-------|------|-----|
| ResNet-18 | 43 MB | 4.5027 | 5.8261 | 4.2188 | 4.8492 |
| ResNet-34 | 81.6 MB | 4.4538 | 5.2690 | 3.8855 | 4.5361 |
| ResNet-50 | 91.3 MB | 3.5529 | 4.9962 | 3.4986 | 4.0159 |
| MobileNet V2 | 9.59 MB | 5.6880 | 6.0391 | 4.4433 | 5.3901 |
| MobileNet V3 small | 6 MB | 8.6926 | 7.7089 | 6.0035 | 7.4683 |
| MobileNet V3 large | 17 MB | 5.6068 | 6.6022 | 4.9959 | 5.7350 |

ResNet-50 gives the best reported MAE. MobileNet V2 is much smaller, but its error is higher. That is the central tradeoff in this repository: accuracy versus runtime and model size.

## Training and Data

The training setup uses **300W-LP**, while evaluation is reported on **AFLW2000**. The project also supports multi-GPU training through PyTorch distributed execution.

SCRFD is used as the face detector in the inference pipeline. That keeps face localization separate from pose estimation: first detect a face, then estimate head orientation on the crop.

## PyTorch and ONNX

The repository includes PyTorch weights for training and experimentation, plus ONNX weights for lighter deployment. ONNX is especially useful when the application does not need a full PyTorch runtime.

Available released weight formats:

| Model | PyTorch | ONNX |
|-------|---------|------|
| ResNet-18 | yes | yes |
| ResNet-34 | yes | yes |
| ResNet-50 | yes | yes |
| MobileNet V2 | yes | yes |
| MobileNet V3 small | yes | yes |
| MobileNet V3 large | yes | yes |

The repository README has the current weight links and usage details.
