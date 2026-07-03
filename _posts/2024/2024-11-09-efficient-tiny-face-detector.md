---
layout: post
title: "Tiny-Face: Ultra-Lightweight Face Detection for Edge Devices"
date: 2024-11-09 12:00:00 +0900
modified_date: 2026-07-03 12:00:00 +0900
comments: true
categories: computer-vision
tags: [face-detection, tiny-face, mobile, edge-deployment]
description: "Tiny-Face compares SlimFace, RFB, and compact RetinaFace variants for small face detection models with WIDER FACE results and PyTorch/ONNX weights."
image: "https://raw.githubusercontent.com/yakhyo/tiny-face-pytorch/main/assets/largeselfi_retina.jpg"
---

Tiny-Face is a compact face detection project focused on mobile and edge environments. It compares three small detector variants: **SlimFace**, **RFB**, and a compact **RetinaFace** model. See the project on [github.com/yakhyo/tiny-face-pytorch](https://github.com/yakhyo/tiny-face-pytorch).

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

Across both evaluation modes, the compact RetinaFace variant is the strongest of the three, while SlimFace and RFB trade accuracy for an even smaller footprint.

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

## FAQ

**Which variant should I choose?**
The compact RetinaFace is the most accurate of the three (87.69% easy on the multi-scale WIDER FACE split) at 1.8 MB. SlimFace (1.4 MB) and RFB (1.5 MB) are smaller still, and worth choosing when the model-size budget is even tighter than 2 MB.

**How small are these models really?**
All three are under 2 MB and under half a million parameters. SlimFace is 0.343M parameters, RFB is 0.359M, and the compact RetinaFace is 0.426M, so they fit comfortably on constrained edge devices.

**Do the small models miss faces in crowded scenes?**
They can. In the crowded selfie test the compact RetinaFace detects 459 faces, RFB 430, and SlimFace 384. That recall gap is the practical tradeoff of shrinking the model.

**When should I use Tiny-Face instead of a full RetinaFace?**
Use Tiny-Face when model size is a first-order constraint and a standard MobileNet or ResNet RetinaFace is too expensive for the target device. For higher accuracy on normal hardware, the full RetinaFace detector is the better fit.

## Related

- [RetinaFace: Single-Stage Face Detection in PyTorch]({% link _posts/2024/2024-10-28-high-performance-retinaface-detector.md %}) — the full-size detector these compact variants are distilled down from.
- [UniFace: A Unified Face Analysis Library for Python]({% link _posts/2025/2025-11-11-uniface-all-in-one-face-analysis.md %}) — when you need a complete face pipeline rather than a standalone tiny detector.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Which Tiny-Face variant should I choose?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The compact RetinaFace is the most accurate of the three at 87.69% easy on the multi-scale WIDER FACE split, at 1.8 MB. SlimFace at 1.4 MB and RFB at 1.5 MB are smaller still, worth choosing when the model-size budget is even tighter than 2 MB."
      }
    },
    {
      "@type": "Question",
      "name": "How small are the Tiny-Face models?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "All three are under 2 MB and under half a million parameters. SlimFace is 0.343M parameters, RFB is 0.359M, and the compact RetinaFace is 0.426M, so they fit comfortably on constrained edge devices."
      }
    },
    {
      "@type": "Question",
      "name": "Do the small models miss faces in crowded scenes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "They can. In the crowded selfie test the compact RetinaFace detects 459 faces, RFB 430, and SlimFace 384. That recall gap is the practical tradeoff of shrinking the model."
      }
    },
    {
      "@type": "Question",
      "name": "When should I use Tiny-Face instead of a full RetinaFace?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use Tiny-Face when model size is a first-order constraint and a standard MobileNet or ResNet RetinaFace is too expensive for the target device. For higher accuracy on normal hardware, the full RetinaFace detector is the better fit."
      }
    }
  ]
}
</script>
