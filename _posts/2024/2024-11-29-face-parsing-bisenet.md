---
layout: post
title: Face Parsing using BiSeNet for Real-time Semantic Segmentation
date: 2024-11-29 12:00:00 +0900
comments: true
categories: deep-learning computer-vision semantic-segmentation bisenet
---

BiSeNet (Bilateral Segmentation Network) is a state-of-the-art model for real-time semantic segmentation, initially proposed in the paper [Bilateral Segmentation Network for Real-time Semantic Segmentation](https://arxiv.org/abs/1808.00897). The architecture addresses the fundamental challenge in semantic segmentation: achieving high accuracy while maintaining real-time performance.

## Architecture Overview

BiSeNet combines two complementary paths to balance spatial detail and semantic context:

- **Spatial Path**: Preserves high-resolution spatial information through a shallow network with wide channels, capturing fine-grained details essential for precise segmentation boundaries.
- **Context Path**: Employs a lightweight backbone to aggregate rich contextual information with a large receptive field, enabling accurate semantic understanding.

The fusion of these paths through a Feature Fusion Module ensures high segmentation accuracy with low computational cost, making it ideal for applications requiring real-time performance on resource-constrained devices.

[![Downloads](https://img.shields.io/github/downloads/yakhyo/face-parsing/total)](https://github.com/yakhyo/face-parsing/releases)
[![GitHub Repo stars](https://img.shields.io/github/stars/yakhyo/face-parsing)](https://github.com/yakhyo/face-parsing/stargazers)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/yakhyo/face-parsing)

---

## Key Features

- **Accurate Facial Parsing**: Segments detailed facial features including eyes, nose, mouth, and hair for precise analysis
- **ONNX Support**: Seamless conversion from PyTorch to ONNX format for cross-platform deployment
- **Flexible Backbones**: Support for ResNet18 and ResNet34, allowing trade-offs between speed and accuracy
- **Production-Ready**: Optimized for real-time applications in AR/VR, digital makeup, and facial analysis systems

---

## Performance Comparison

### ResNet34 Backbone

<div align="center">
<img src="https://yakhyo.github.io/face-parsing/assets/images/1.jpg" width="24%">
<img src="https://yakhyo.github.io/face-parsing/assets/images/1112.jpg" width="24%">
<img src="https://yakhyo.github.io/face-parsing/assets/images/1309.jpg" width="24%">
<img src="https://yakhyo.github.io/face-parsing/assets/images/1321.jpg" width="24%">
</div>

<div align="center">
<img src="https://yakhyo.github.io/face-parsing/assets/results/resnet34/1.jpg" width="24%">
<img src="https://yakhyo.github.io/face-parsing/assets/results/resnet34/1112.jpg" width="24%">
<img src="https://yakhyo.github.io/face-parsing/assets/results/resnet34/1309.jpg" width="24%">
<img src="https://yakhyo.github.io/face-parsing/assets/results/resnet34/1321.jpg" width="24%">
</div>

### ResNet18 Backbone

<div align="center">
<img src="https://yakhyo.github.io/face-parsing/assets/results/resnet18/1.jpg" width="24%">
<img src="https://yakhyo.github.io/face-parsing/assets/results/resnet18/1112.jpg" width="24%">
<img src="https://yakhyo.github.io/face-parsing/assets/results/resnet18/1309.jpg" width="24%">
<img src="https://yakhyo.github.io/face-parsing/assets/results/resnet18/1321.jpg" width="24%">
</div>

---

## Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/yakhyo/face-parsing.git
cd face-parsing
pip install -r requirements.txt
```

Pre-trained weights are available for download:
- [ResNet18 Model](https://github.com/yakhyo/face-parsing/releases/download/v0.0.1/resnet18.pt)
- [ResNet34 Model](https://github.com/yakhyo/face-parsing/releases/download/v0.0.1/resnet34.pt)

## Use Cases

This implementation is particularly useful for:
- **Digital Makeup Applications**: Precise facial feature segmentation for virtual makeup try-on
- **Face Swapping**: Accurate face region extraction for deepfake and face replacement systems
- **Facial Analysis**: Detailed feature extraction for emotion recognition and facial attribute analysis
- **AR/VR Applications**: Real-time face parsing for augmented reality filters and effects

Visit the [GitHub repository](https://github.com/yakhyo/face-parsing) for detailed documentation, training scripts, and inference examples.
