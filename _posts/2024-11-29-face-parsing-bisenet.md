---
layout: post
title: Face-Parsing using BiSeNet (Bilateral Segmentation Network for Real-time Semantic Segmentation)
date: 2024-11-29 12:00:00 +0900
comments: true
categories: deep-learning computer-vision semantic-segmentation bisenet
---

**BiSeNet** (Bilateral Segmentation Network) is a state-of-the-art model for real-time semantic segmentation, initially proposed in the paper [Bilateral Segmentation Network for Real-time Semantic Segmentation](https://arxiv.org/abs/1808.00897).

It combines two complementary paths:

- **Spatial Path**: Captures high-resolution spatial information.
- **Context Path**: Aggregates rich context information with a lightweight backbone.

The fusion of these paths ensures **high segmentation accuracy** with **low computational cost**, making it ideal for applications requiring real-time performance.

[![Downloads](https://img.shields.io/github/downloads/yakhyo/face-parsing/total)](https://github.com/yakhyo/face-parsing/releases)
[![GitHub Repo stars](https://img.shields.io/github/stars/yakhyo/face-parsing)](https://github.com/yakhyo/face-parsing/stargazers)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/yakhyo/face-parsing)

---

### 🌟 Features

- 🎯 **Accurate Facial Parsing**: Segments detailed facial features for precise analysis.
- 🔄 **ONNX Support**: Torch-to-ONNX conversion for seamless deployment.
- 🛠️ **Enhanced Backbones**: Flexible support for ResNet18 and ResNet34 models.
- ⚡ **High Efficiency**: Optimized for real-time applications.

---

### 🖼️ Example Results

#### Input Images

<div align="center">
<img src="https://yakhyo.github.io/face-parsing/assets/images/1.jpg" width="24%">
<img src="https://yakhyo.github.io/face-parsing/assets/images/1112.jpg" width="24%">
<img src="https://yakhyo.github.io/face-parsing/assets/images/1309.jpg" width="24%">
<img src="https://yakhyo.github.io/face-parsing/assets/images/1321.jpg" width="24%">
</div>

#### ResNet34 Results

<div align="center">
<img src="https://yakhyo.github.io/face-parsing/assets/results/resnet34/1.jpg" width="24%">
<img src="https://yakhyo.github.io/face-parsing/assets/results/resnet34/1112.jpg" width="24%">
<img src="https://yakhyo.github.io/face-parsing/assets/results/resnet34/1309.jpg" width="24%">
<img src="https://yakhyo.github.io/face-parsing/assets/results/resnet34/1321.jpg" width="24%">
</div>

#### ResNet18 Results

<div align="center">
<img src="https://yakhyo.github.io/face-parsing/assets/results/resnet18/1.jpg" width="24%">
<img src="https://yakhyo.github.io/face-parsing/assets/results/resnet18/1112.jpg" width="24%">
<img src="https://yakhyo.github.io/face-parsing/assets/results/resnet18/1309.jpg" width="24%">
<img src="https://yakhyo.github.io/face-parsing/assets/results/resnet18/1321.jpg" width="24%">
</div>

### 🚀 Get Started

Clone the repository and explore the possibilities:

```bash
git clone https://github.com/yakhyo/face-parsing.git
cd face-parsing
pip install -r requirements.txt
```

Pre-trained weights are available for 🟢 [ResNet18](https://github.com/yakhyo/face-parsing/releases/download/v0.0.1/resnet18.pt) and 🟠 [ResNet34](https://github.com/yakhyo/face-parsing/releases/download/v0.0.1/resnet34.pt).

Visit the [https://github.com/yakhyo/face-parsing](https://github.com/yakhyo/face-parsing) for more details.
