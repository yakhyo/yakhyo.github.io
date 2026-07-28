---
layout: post
title: "RetinaFace: Single-Stage Face Detection in PyTorch"
date: 2024-10-28 12:00:00 +0900
modified_date: 2026-07-28 12:00:00 +0900
comments: true
categories: computer-vision
tags: [face-detection, retinaface, single-stage, production]
description: "A RetinaFace implementation with MobileNet and ResNet backbones, WIDER FACE evaluation, webcam inference, ONNX support, and pretrained weights."
image: "https://raw.githubusercontent.com/yakhyo/retinaface-pytorch/main/assets/mv2_test.jpg"
---

RetinaFace is a single-stage face detector that predicts face bounding boxes and 5-point landmarks in one pass. This implementation adds multiple backbones, WIDER FACE evaluation, webcam inference, PyTorch weights, and ONNX weights. The project is available at [github.com/yakhyo/retinaface-pytorch](https://github.com/yakhyo/retinaface-pytorch).

{% include video.html src="https://github.com/user-attachments/assets/ad279fea-33fb-43f1-884f-282e6d54c809" %}

![RetinaFace MobileNetV2 result](https://raw.githubusercontent.com/yakhyo/retinaface-pytorch/main/assets/mv2_test.jpg)

> **Key takeaways**
> - RetinaFace is single-stage: it predicts face boxes and 5-point landmarks in one pass.
> - ResNet34 is the strongest backbone (94.16% easy, 88.90% hard on WIDER FACE multi-scale); MobileNetV1 0.25 is the smallest.
> - The MobileNetV2 model detects 632 faces in the crowded selfie example, and every backbone ships with PyTorch and ONNX weights.
{: .takeaways}

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

ResNet34 is the strongest backbone across both evaluation modes below. The MobileNet variants trade accuracy for a much smaller runtime footprint.

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

The MobileNetV2 model detects 632 faces in this image.

## PyTorch and ONNX

The repository provides PyTorch and ONNX weights for the published MobileNet and ResNet variants. It also includes training, WIDER FACE evaluation, image inference, video/webcam inference, and ONNX export code.

For application code that only needs detection as part of a larger face-analysis pipeline, this model family is also available through [UniFace]({% link _posts/2025/2025-11-11-uniface-all-in-one-face-analysis.md %}).

## FAQ

**Which backbone should I choose?**
ResNet34 has the strongest reported accuracy (94.16% easy, 88.90% hard on the multi-scale WIDER FACE split). If runtime budget is tight, the MobileNetV1 variants are much smaller, with MobileNetV1 0.25 being the most compact at a clear accuracy cost.

**What is the difference between the multi-scale and original-size results?**
Multi-scale resizing evaluates the image at several scales, which usually helps on small and hard faces. Original-size evaluation is closer to a single-pass deployment setting, and the two tables let you compare accuracy under each condition.

**What does small-face filtering do?**
Filtering out faces smaller than 16 pixels during training reduces noisy annotations, which improves the easy and medium splits but lowers hard-split accuracy. It is useful for normal-sized faces and a poor fit for crowd or surveillance images.

**When should I use the ONNX weights instead of PyTorch?**
Use PyTorch for training and modification, and ONNX when the application only needs inference. ONNX Runtime avoids shipping a full PyTorch runtime, which matters for lighter deployments.

## Related

- [Tiny-Face: Ultra-Lightweight Face Detection for Edge Devices]({% link _posts/2024/2024-11-09-efficient-tiny-face-detector.md %}) — sub-2 MB detectors for when even a MobileNet RetinaFace is too heavy.
- [UniFace: A Unified Face Analysis Library for Python]({% link _posts/2025/2025-11-11-uniface-all-in-one-face-analysis.md %}) — the library that bundles this RetinaFace family with recognition, landmarks, and more.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Which RetinaFace backbone should I choose?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ResNet34 has the strongest reported accuracy at 94.16% easy and 88.90% hard on the multi-scale WIDER FACE split. If runtime budget is tight, the MobileNetV1 variants are much smaller, with MobileNetV1 0.25 being the most compact at a clear accuracy cost."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between multi-scale and original-size WIDER FACE results?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Multi-scale resizing evaluates the image at several scales, which usually helps on small and hard faces. Original-size evaluation is closer to a single-pass deployment setting, so the two tables let you compare accuracy under each condition."
      }
    },
    {
      "@type": "Question",
      "name": "What does small-face filtering do in RetinaFace training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Filtering out faces smaller than 16 pixels during training reduces noisy annotations, which improves the easy and medium splits but lowers hard-split accuracy. It helps for normal-sized faces and is a poor fit for crowd or surveillance images."
      }
    },
    {
      "@type": "Question",
      "name": "When should I use ONNX weights instead of PyTorch for RetinaFace?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use PyTorch for training and modification, and ONNX when the application only needs inference. ONNX Runtime avoids shipping a full PyTorch runtime, which matters for lighter deployments."
      }
    }
  ]
}
</script>
