---
layout: post
title: "Real-Time Gaze Estimation Using Lightweight Deep Learning Models"
date: 2024-09-18 00:00:00 +0900
comments: true
categories: deep-learning computer-vision machine-learning neural-networks gaze-estimation
---

This project focuses on predicting gaze direction using lightweight deep learning models optimized for real-time performance on mobile devices. The implementation combines classification and regression techniques to create an efficient and accurate solution suitable for deployment on resource-constrained hardware.

<iframe width="100%" height="480" src="https://www.youtube.com/embed/q-uxquFdPB8?si=hrtMjo17zfI4-SPq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

[GitHub Repository](https://github.com/yakhyo/gaze-estimation)

## Applications and Use Cases

Gaze estimation technology enables a wide range of applications across multiple domains:

- **Mobile User Experience**: Hands-free navigation and attention-aware interfaces
- **Virtual and Augmented Reality**: Natural interaction through eye tracking in VR/AR systems
- **Accessibility**: Assistive technologies for users with limited mobility
- **Automotive Safety**: Driver attention monitoring and drowsiness detection
- **Human-Computer Interaction**: Intuitive control mechanisms for various devices
- **Market Research**: Understanding user attention patterns and visual behavior

## Model Architecture and Design

The project implements multiple lightweight architectures, each optimized for different deployment scenarios:

### ResNet Variants

Employs residual learning techniques to enable deeper networks without degradation. The residual connections allow gradients to flow more effectively during training, resulting in better accuracy without significant computational overhead.

### MobileNet v2

Specifically designed for mobile deployment, MobileNet v2 introduces inverted residual structures and linear bottlenecks. This architecture achieves an optimal balance between model size, inference speed, and accuracy, making it ideal for on-device gaze estimation.

### MobileOne (s0-s4)

The MobileOne family represents the state-of-the-art in mobile-optimized architectures. With variants ranging from s0 to s4, it offers flexibility in trading off between speed and accuracy. The architecture is specifically optimized for mobile CPUs, achieving impressive real-time performance without GPU acceleration.

### Face Detection Integration

The system integrates SCRFD (Sample and Computation Redistribution for Efficient Face Detection) for robust face localization. SCRFD provides:

- Fast inference suitable for real-time applications
- High accuracy across various face scales and poses
- Efficient resource utilization for mobile deployment
- Reliable performance in challenging lighting conditions

## Technical Implementation

The gaze estimation pipeline consists of several stages:

1. **Face Detection**: SCRFD localizes faces in the input frame
2. **Face Alignment**: Detected faces are normalized to a standard pose
3. **Eye Region Extraction**: Precise localization of eye regions for gaze prediction
4. **Gaze Prediction**: Deep learning model estimates gaze direction as pitch and yaw angles
5. **Temporal Smoothing**: Optional filtering to reduce jitter in video streams

## Performance Characteristics

The implementation achieves:

- Real-time inference (30+ FPS) on modern mobile devices
- Low latency suitable for interactive applications
- Minimal battery impact through efficient computation
- Robust performance across different lighting conditions and head poses

The complete implementation, including training scripts, pre-trained models, and deployment examples, is available on [GitHub](https://github.com/yakhyo/gaze-estimation).
