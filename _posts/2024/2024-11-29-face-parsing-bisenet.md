---
layout: post
title: "Face Parsing with BiSeNet and ResNet Backbones"
date: 2024-11-29 12:00:00 +0900
modified_date: 2026-07-28 12:00:00 +0900
comments: true
categories: computer-vision
tags: [semantic-segmentation, bisenet, face-parsing, real-time]
description: "Face parsing with BiSeNet, ResNet18 and ResNet34 backbones, CelebAMask-HQ training, PyTorch inference, and ONNX export."
image: "https://yakhyo.github.io/face-parsing/assets/results/resnet34/1.jpg"
---

Face parsing segments a face into semantic regions such as skin, hair, eyes, eyebrows, nose, mouth, and background. This implementation uses BiSeNet with ResNet18 and ResNet34 backbones. The project is available at [github.com/yakhyo/face-parsing](https://github.com/yakhyo/face-parsing).

![Face parsing slideshow](https://raw.githubusercontent.com/yakhyo/face-parsing/main/assets/slideshow.gif)

> **Key takeaways**
> - Face parsing produces a dense semantic mask, not just a bounding box or sparse landmarks.
> - BiSeNet is trained on CelebAMask-HQ (30,000 images) with two backbones: ResNet18 (~43 MB) and ResNet34 (~82 MB).
> - Both backbones ship with PyTorch and ONNX weights, and inference accepts a single image or a whole folder.
{: .takeaways}

The model is trained for facial component segmentation rather than general scene segmentation. That makes it useful for virtual makeup, AR filters, face editing, matting workflows, and feature-level face analysis.

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

For application code, this model family is also available through [UniFace]({% link _posts/2025/2025-11-11-uniface-all-in-one-face-analysis.md %}).

## FAQ

**How is face parsing different from face detection or landmarks?**
Detection gives a bounding box, and landmarks give a small set of sparse points. Face parsing gives a dense semantic mask that labels every pixel as skin, hair, eyes, eyebrows, nose, mouth, or background, which is what makes it useful for editing and makeup.

**Which backbone should I choose, ResNet18 or ResNet34?**
ResNet34 (~82 MB, ~21.3M parameters) is the higher-capacity option, while ResNet18 (~43 MB, ~11.2M parameters) is roughly half the size for lighter deployment. Both are trained on the same data, so the choice is an accuracy-versus-size tradeoff.

**What dataset is the model trained on?**
Both backbones are trained on CelebAMask-HQ, a face parsing dataset with 30,000 images and per-region mask annotations. It is a standard benchmark for facial component segmentation.

**Can I run it without PyTorch?**
Yes. The repository provides ONNX weights and ONNX inference for both backbones, so you can deploy without a full PyTorch runtime. PyTorch is still the better choice for training or modifying the model.

## Related

- [RetinaFace: Single-Stage Face Detection in PyTorch]({% link _posts/2024/2024-10-28-high-performance-retinaface-detector.md %}) — the detection step that usually runs before parsing crops a face.
- [UniFace: A Unified Face Analysis Library for Python]({% link _posts/2025/2025-11-11-uniface-all-in-one-face-analysis.md %}) — bundles this BiSeNet parser with detection, recognition, and matting.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How is face parsing different from face detection or landmarks?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Detection gives a bounding box, and landmarks give a small set of sparse points. Face parsing gives a dense semantic mask that labels every pixel as skin, hair, eyes, eyebrows, nose, mouth, or background, which is what makes it useful for editing and makeup."
      }
    },
    {
      "@type": "Question",
      "name": "Which face parsing backbone should I choose, ResNet18 or ResNet34?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ResNet34 at about 82 MB and 21.3M parameters is the higher-capacity option, while ResNet18 at about 43 MB and 11.2M parameters is roughly half the size for lighter deployment. Both are trained on the same data, so the choice is an accuracy-versus-size tradeoff."
      }
    },
    {
      "@type": "Question",
      "name": "What dataset is the face parsing model trained on?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Both backbones are trained on CelebAMask-HQ, a face parsing dataset with 30,000 images and per-region mask annotations. It is a standard benchmark for facial component segmentation."
      }
    },
    {
      "@type": "Question",
      "name": "Can I run face parsing without PyTorch?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The repository provides ONNX weights and ONNX inference for both backbones, so you can deploy without a full PyTorch runtime. PyTorch is still the better choice for training or modifying the model."
      }
    }
  ]
}
</script>
