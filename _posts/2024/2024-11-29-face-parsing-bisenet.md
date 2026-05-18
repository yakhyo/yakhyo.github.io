---
layout: post
title: "Face Parsing with BiSeNet and ResNet Backbones"
date: 2024-11-29 12:00:00 +0900
modified_date: 2026-05-18 12:00:00 +0900
comments: true
categories: computer-vision
tags: [semantic-segmentation, bisenet, face-parsing, real-time]
description: "Face parsing with BiSeNet, ResNet18 and ResNet34 backbones, CelebAMask-HQ training, PyTorch inference, and ONNX export."
image: "https://yakhyo.github.io/face-parsing/assets/results/resnet34/1.jpg"
---

Face parsing segments a face into semantic regions such as skin, hair, eyes, eyebrows, nose, mouth, and background. This repository implements BiSeNet for face parsing with ResNet18 and ResNet34 backbones. See the project on [github.com/yakhyo/face-parsing](https://github.com/yakhyo/face-parsing).

![Face parsing slideshow](https://raw.githubusercontent.com/yakhyo/face-parsing/main/assets/slideshow.gif)

The model is trained for facial component segmentation, not general scene segmentation. That makes it useful for virtual makeup, AR filters, face editing, matting workflows, and feature-level face analysis.

## Example Results

### Input Images

<div align="center">
<img src="https://yakhyo.github.io/face-parsing/assets/images/1.jpg" width="24%" alt="Original face image sample 1">
<img src="https://yakhyo.github.io/face-parsing/assets/images/1112.jpg" width="24%" alt="Original face image sample 2">
<img src="https://yakhyo.github.io/face-parsing/assets/images/1309.jpg" width="24%" alt="Original face image sample 3">
<img src="https://yakhyo.github.io/face-parsing/assets/images/1321.jpg" width="24%" alt="Original face image sample 4">
</div>

### ResNet34 Results

<div align="center">
<img src="https://yakhyo.github.io/face-parsing/assets/results/resnet34/1.jpg" width="24%" alt="ResNet34 face parsing result for sample 1">
<img src="https://yakhyo.github.io/face-parsing/assets/results/resnet34/1112.jpg" width="24%" alt="ResNet34 face parsing result for sample 2">
<img src="https://yakhyo.github.io/face-parsing/assets/results/resnet34/1309.jpg" width="24%" alt="ResNet34 face parsing result for sample 3">
<img src="https://yakhyo.github.io/face-parsing/assets/results/resnet34/1321.jpg" width="24%" alt="ResNet34 face parsing result for sample 4">
</div>

### ResNet18 Results

<div align="center">
<img src="https://yakhyo.github.io/face-parsing/assets/results/resnet18/1.jpg" width="24%" alt="ResNet18 face parsing result for sample 1">
<img src="https://yakhyo.github.io/face-parsing/assets/results/resnet18/1112.jpg" width="24%" alt="ResNet18 face parsing result for sample 2">
<img src="https://yakhyo.github.io/face-parsing/assets/results/resnet18/1309.jpg" width="24%" alt="ResNet18 face parsing result for sample 3">
<img src="https://yakhyo.github.io/face-parsing/assets/results/resnet18/1321.jpg" width="24%" alt="ResNet18 face parsing result for sample 4">
</div>

## Models

| Model | Parameters | Size |
|-------|------------|------|
| ResNet18 | ~11.2M | ~43 MB |
| ResNet34 | ~21.3M | ~82 MB |

The model is trained on [CelebAMask-HQ](https://github.com/switchablenorms/CelebAMask-HQ), a face parsing dataset with 30,000 images.

## What the Repository Contains

The repository includes training code, PyTorch inference, ONNX export, and ONNX inference. Released weights are available for both ResNet18 and ResNet34 in PyTorch and ONNX formats.

| Model | PyTorch | ONNX |
|-------|---------|------|
| ResNet18 | yes | yes |
| ResNet34 | yes | yes |

The inference code accepts either a single image or a folder of images, which is useful when comparing parser output across a small validation set.

## Why Face Parsing Matters

Face detection gives a bounding box. Landmarks give sparse points. Face parsing gives a dense semantic mask.

That mask can separate regions such as hair, skin, eyes, eyebrows, nose, lips, and background. This makes parsing useful for:

- virtual makeup and face filters
- face editing and compositing
- portrait preprocessing
- attribute and expression analysis
- region-specific masking before downstream models

For application code, this model family is also available through [UniFace](https://github.com/yakhyo/uniface).
