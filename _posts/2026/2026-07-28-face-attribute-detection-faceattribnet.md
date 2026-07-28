---
layout: post
title: "FaceAttribNet: Eye, Glasses, and Mask Detection in ONNX"
date: 2026-07-28 12:00:00 +0900
modified_date: 2026-07-28 12:00:00 +0900
comments: true
published: true
categories: computer-vision
tags: [face-attributes, faceattribnet, onnx, uniface, multi-label]
description: "FaceAttribNet predicts eye openness, eyeglasses, sunglasses, and mask attributes from a 128x128 face crop using five independent binary heads."
image: "https://raw.githubusercontent.com/yakhyo/face-attribute/main/assets/banner.png"
---

FaceAttribNet predicts five face attributes from a single 128×128 crop: whether each eye is open, and whether the person is wearing eyeglasses, sunglasses, or a mask. Qualcomm published the original implementation as [Facial-Attribute-Detection](https://github.com/qualcomm/ai-hub-models/tree/main/src/qai_hub_models/models/face_attrib_net). There is no accompanying paper, but the released 10.84M-parameter checkpoint is compact and useful in practical face-analysis pipelines.

I ported the model to ONNX Runtime in [github.com/yakhyo/face-attribute](https://github.com/yakhyo/face-attribute), and it now ships with UniFace v4.0.0.

<img src="https://raw.githubusercontent.com/yakhyo/face-attribute/main/assets/banner.png" width="1200" height="675" alt="FaceAttribNet annotating a masked face with per-attribute True/False chips" style="max-width: 100%; height: auto;">

> **Key takeaways**
> - Five independent binary heads, not one 5-way softmax. Probabilities do not sum to 1, and several can be active at once.
> - Mean/std normalization is baked into the ONNX graph. Preprocessing is a letterbox resize to 128×128 and a scale to `[0, 1]`, nothing more.
> - In UniFace, `FaceAttribNet().predict(image, face)` returns a `FaceStateResult` and writes the attributes back onto the `Face`.
{: .takeaways}

## The Multi-Label Trap

This is the most important implementation detail. The output can look like a five-class classifier at first glance, which makes `argmax` tempting. That would be the wrong interpretation.

Each value comes from its own binary classifier head with its own sigmoid. They answer five separate yes/no questions about the same crop:

```
left_eye_open   right_eye_open   eyeglasses   mask   sunglasses
```

Nothing constrains the outputs to sum to 1. A person can wear sunglasses and a mask at the same time, and both heads can activate independently. `argmax` picks one attribute and silently discards the rest. Threshold each attribute on its own:

```python
result.labels(threshold=0.5)  # ['left_eye_open', 'right_eye_open', 'eyeglasses']
```

Tinted sunglasses make this concrete. In one test image, the model reported `sunglasses` at 0.993 while still classifying both eyes as open. That is not a contradiction: the lenses are light enough to see through, so both predictions can be correct. A single-label formulation cannot express that relationship.

## Example Results

Attributes above a 0.5 threshold, predicted per face.

<div align="center">
<img src="https://raw.githubusercontent.com/yakhyo/face-attribute/main/assets/results/sunglasses.jpg" width="49%" loading="lazy" alt="FaceAttribNet detecting sunglasses at probability 1.000">
<img src="https://raw.githubusercontent.com/yakhyo/face-attribute/main/assets/results/sunglasses_tinted.jpg" width="49%" loading="lazy" alt="Tinted sunglasses detected at 0.993 while both eyes still read as open">
</div>

<div align="center">
<img src="https://raw.githubusercontent.com/yakhyo/face-attribute/main/assets/results/mask.jpg" width="49%" loading="lazy" alt="FaceAttribNet detecting a face mask at probability 1.000">
<img src="https://raw.githubusercontent.com/yakhyo/face-attribute/main/assets/results/eyeglasses.jpg" width="49%" loading="lazy" alt="FaceAttribNet detecting eyeglasses at probability 0.999">
</div>

<div align="center">
<img src="https://raw.githubusercontent.com/yakhyo/face-attribute/main/assets/results/closed_eyes.jpg" width="49%" loading="lazy" alt="Closed eyes scoring below 0.16 on both eye-openness heads">
<img src="https://raw.githubusercontent.com/yakhyo/face-attribute/main/assets/results/mask_man.jpg" width="49%" loading="lazy" alt="Face mask detected at 1.000 on a second subject">
</div>

Inference runs per face, so a group photo yields one independent result per detection. Only the person on the left triggers `eyeglasses`, at 0.893:

<div align="center">
<img src="https://raw.githubusercontent.com/yakhyo/face-attribute/main/assets/results/group.jpg" width="80%" loading="lazy" alt="Group photo where only the left person triggers the eyeglasses attribute at 0.893">
</div>

Test photos are free-license images from [Pexels](https://www.pexels.com).

## Model

| Property | Value |
|----------|-------|
| Parameters | 10.84M |
| Input | 128×128 RGB face crop |
| Outputs | 5 independent probabilities in `[0, 1]` |
| ONNX size | ~41 MB |
| Training data | Proprietary (Qualcomm) |
| Weights license | BSD-3-Clause, © Qualcomm Technologies, Inc. |

The standalone repository keeps Qualcomm's `.pt` checkpoint unmodified and adds an ONNX re-export at opset 17 with a dynamic batch dimension. I verified the export against the PyTorch reference on real images; the maximum output difference was 1.2e-07, which is within float32 noise.

## Using It in UniFace

Attribute models need a bounding box, so pair this one with any detector:

```python
import cv2
from uniface.attribute import FaceAttribNet
from uniface.detection import RetinaFace

image = cv2.imread("photo.jpg")

detector = RetinaFace()
face_attrib = FaceAttribNet()

for face in detector.detect(image):
    result = face_attrib.predict(image, face)
    print(result.as_dict())              # {'left_eye_open': 0.99, 'eyeglasses': 0.98, ...}
    print(result.labels(threshold=0.5))  # ['left_eye_open', 'right_eye_open', 'eyeglasses']
```

`predict` returns a `FaceStateResult` and also writes the values onto the `Face`, so `face.eyeglasses`, `face.mask`, `face.sunglasses`, and both eye fields are populated afterward.

For a full pipeline, pass it to `FaceAnalyzer` alongside any other attribute model:

```python
from uniface import AgeGender, FaceAnalyzer, FaceAttribNet, RetinaFace

analyzer = FaceAnalyzer(RetinaFace(), predictors=[AgeGender(), FaceAttribNet()])

for face in analyzer.analyze(image):
    print(face.bbox, face.sex, face.age, face.eyeglasses, face.mask)
```

The [Face Attributes notebook](https://colab.research.google.com/github/yakhyo/uniface/blob/main/examples/14_face_attributes.ipynb) runs it in Colab, and the [UniFace overview]({% link _posts/2025/2025-11-11-uniface-all-in-one-face-analysis.md %}) covers the surrounding library.

## Preprocessing

Resize the crop to 128×128 with an aspect-preserving centered letterbox, convert to RGB, scale to `[0, 1]`. That is the whole recipe.

Mean/std normalization is already part of the model graph. Applying it again in your own preprocessing will not usually cause an obvious failure: outputs stay inside `[0, 1]` and still look like plausible probabilities. The symptom is more subtle: thresholds that work on one image stop transferring reliably to the next.

## Standalone Usage

If you want the model without the rest of UniFace, [face-attribute](https://github.com/yakhyo/face-attribute) includes PyTorch inference, ONNX export, and ONNX Runtime inference. Detection and cropping are handled by the scripts, so you can pass whole images:

```bash
python onnx_inference.py assets/test_images/group.jpg
python onnx_inference.py assets/test_images/*.jpg --save-dir assets/results
python onnx_inference.py 0                        # webcam; q or ESC quits
```

## Where It Is Useful

Five binary flags are a small signal set, but they are useful early in a pipeline, before more expensive models run. Common uses include rejecting enrollment frames where the eyes are closed or the face is occluded, flagging drowsiness from sustained low eye openness, or explaining a low recognition similarity that would otherwise be hard to diagnose.

## FAQ

**Why can't I use `argmax` on the five outputs?**
They are five independent binary heads, not one 5-way softmax. The values do not sum to 1, and several can be high at once, since a face can wear both sunglasses and a mask. `argmax` reports one attribute and discards the rest. Threshold each value separately instead.

**Do I need a separate face detector?**
Yes. FaceAttribNet consumes a 128×128 face crop, not a full image. Inside UniFace, pair it with RetinaFace, SCRFD, or any other detector. The standalone scripts run detection and cropping for you, so they accept whole images.

**Can I ship a commercial product with these weights?**
Yes. They are BSD-3-Clause, copyright Qualcomm Technologies, Inc., which permits commercial use. Keep the copyright notice and license text with any redistribution, and do not use Qualcomm's name to endorse your product. Not every UniFace model is this permissive: the YOLOv5-Face and YOLOv8-Face weights are GPL-3.0.

## Related

- [UniFace: A Unified Face Analysis Library for Python]({% link _posts/2025/2025-11-11-uniface-all-in-one-face-analysis.md %}) — the library this model ships in, alongside detection, recognition, and parsing.
- [RetinaFace: Single-Stage Face Detection in PyTorch]({% link _posts/2024/2024-10-28-high-performance-retinaface-detector.md %}) — the detection step that produces the crops this model consumes.
- [Face Parsing with BiSeNet and ResNet Backbones]({% link _posts/2024/2024-11-29-face-parsing-bisenet.md %}) — dense per-pixel face regions, for when a binary occlusion flag is not enough.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why can't I use argmax on FaceAttribNet's five outputs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "They are five independent binary heads, not one 5-way softmax. The values do not sum to 1, and several can be high at once, since a face can wear both sunglasses and a mask. Argmax reports one attribute and discards the rest. Threshold each value separately instead."
      }
    },
    {
      "@type": "Question",
      "name": "Does FaceAttribNet need a separate face detector?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. FaceAttribNet consumes a 128x128 face crop, not a full image. Inside UniFace, pair it with RetinaFace, SCRFD, or any other detector. The standalone scripts run detection and cropping for you, so they accept whole images."
      }
    },
    {
      "@type": "Question",
      "name": "Can I ship a commercial product with the FaceAttribNet weights?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. They are BSD-3-Clause, copyright Qualcomm Technologies, Inc., which permits commercial use. Keep the copyright notice and license text with any redistribution, and do not use Qualcomm's name to endorse your product. Not every UniFace model is this permissive: the YOLOv5-Face and YOLOv8-Face weights are GPL-3.0."
      }
    }
  ]
}
</script>
