---
layout: post
title: "Tiny-Face: Ultra-Lightweight Face Detection for Edge Devices"
date: 2024-11-09 12:00:00 +0900
last_modified_at: 2026-07-28 12:00:00 +0900
comments: true
categories: computer-vision
tags: [face-detection, tiny-face, mobile, edge-deployment]
description: "Tiny-Face compares SlimFace, RFB, and compact RetinaFace variants for small face detection models with WIDER FACE results and PyTorch/ONNX weights."
image:
  path: https://raw.githubusercontent.com/yakhyo/tiny-face-pytorch/main/assets/largeselfi_retina.jpg
  width: 2048
  height: 1150
  alt: "World's Largest Selfie crowd photo with hundreds of faces detected, each marked by a red box, five landmarks and a confidence score"
faq:
  - q: "Which variant should I choose?"
    a: "The compact RetinaFace is the most accurate of the three (87.69% easy on the multi-scale WIDER FACE split) at 1.8 MB. SlimFace (1.4 MB) and RFB (1.5 MB) are smaller still, and worth choosing when the model-size budget is even tighter than 2 MB."
  - q: "How small are these models really?"
    a: "All three are under 2 MB and under half a million parameters. SlimFace is 0.343M parameters, RFB is 0.359M, and the compact RetinaFace is 0.426M, so they fit comfortably on constrained edge devices."
  - q: "Do the small models miss faces in crowded scenes?"
    a: "They can. In the crowded selfie test the compact RetinaFace detects 459 faces, RFB 430, and SlimFace 384. That recall gap is the practical tradeoff of shrinking the model."
  - q: "When should I use Tiny-Face instead of a full RetinaFace?"
    a: "Use Tiny-Face when model size is a primary constraint and a standard MobileNet or ResNet RetinaFace is too expensive for the target device. For higher accuracy on less constrained hardware, the full RetinaFace detector is the better fit."
---

Tiny-Face is a compact face detection project focused on mobile and edge environments. It compares three small detector variants: **SlimFace**, **RFB**, and a compact **RetinaFace** model. The implementation is available at [github.com/yakhyo/tiny-face-pytorch](https://github.com/yakhyo/tiny-face-pytorch).

{% include video.html src="https://github.com/user-attachments/assets/faf65b91-db76-4538-beca-87fc65566e51" %}

![Tiny-Face RetinaFace sample](https://raw.githubusercontent.com/yakhyo/tiny-face-pytorch/main/assets/test_retina.jpg)

> **Key takeaways**
> - All three detector variants are under 2 MB: SlimFace (1.4 MB), RFB (1.5 MB), and a compact RetinaFace (1.8 MB).
> - The compact RetinaFace is the strongest of the three (87.69% easy on WIDER FACE multi-scale) and detects 459 faces in the crowded selfie test.
> - Every variant ships with PyTorch and ONNX weights, so the same model can train in one format and deploy in the other.
{: .takeaways}

The project is based on the RetinaFace-style detection pipeline but reduces the model size for low-resource inference.

## Model Variants

| Model | Parameters | Size | Input |
|-------|------------|------|-------|
| SlimFace | 0.343M | 1.4 MB | 640x640 |
| RFB | 0.359M | 1.5 MB | 640x640 |
| RetinaFace | 0.426M | 1.8 MB | 640x640 |

All three published models have PyTorch and ONNX weights in the repository release.

## WIDER FACE Results

In both evaluation modes the compact RetinaFace variant comes out ahead of SlimFace and RFB, which give up accuracy in exchange for an even smaller footprint.

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

The compact RetinaFace variant leads both tables, and SlimFace and RFB remain the alternatives when the model-size constraint is stricter.

## Large Selfie Test

The README includes a crowded selfie example and reports how many faces each model detects:

| Model | Faces detected |
|-------|----------------|
| RetinaFace | 459 |
| RFB | 430 |
| SlimFace | 384 |

![Tiny-Face large selfie result](https://raw.githubusercontent.com/yakhyo/tiny-face-pytorch/main/assets/largeselfi_retina.jpg)

The recall tradeoff is visible here. Smaller models are useful on constrained devices, but crowded images make missed detections more likely.

## What the Repository Contains

The repository includes WIDER FACE training and evaluation code, pretrained PyTorch weights, ONNX weights, and inference code for the three detector variants.

It is useful when model size is a primary constraint and a larger detector is too expensive for the target device.

## FAQ

> **Which variant should I choose?**
>
> The compact RetinaFace is the most accurate of the three (87.69% easy on the multi-scale WIDER FACE split) at 1.8 MB. SlimFace (1.4 MB) and RFB (1.5 MB) are smaller still, and worth choosing when the model-size budget is even tighter than 2 MB.
{: .faq}

> **How small are these models really?**
>
> All three are under 2 MB and under half a million parameters. SlimFace is 0.343M parameters, RFB is 0.359M, and the compact RetinaFace is 0.426M, so they fit comfortably on constrained edge devices.
{: .faq}

> **Do the small models miss faces in crowded scenes?**
>
> They can. In the crowded selfie test the compact RetinaFace detects 459 faces, RFB 430, and SlimFace 384. That recall gap is the practical tradeoff of shrinking the model.
{: .faq}

> **When should I use Tiny-Face instead of a full RetinaFace?**
>
> Use Tiny-Face when model size is a primary constraint and a standard MobileNet or ResNet RetinaFace is too expensive for the target device. For higher accuracy on less constrained hardware, the full RetinaFace detector is the better fit.
{: .faq}

## Related

- [RetinaFace: Single-Stage Face Detection in PyTorch]({% link _posts/2024/2024-10-28-high-performance-retinaface-detector.md %}) — the full-size detector these compact variants are distilled down from.
- [UniFace: A Unified Face Analysis Library for Python]({% link _posts/2025/2025-11-11-uniface-all-in-one-face-analysis.md %}) — when you need a complete face pipeline rather than a standalone tiny detector.
