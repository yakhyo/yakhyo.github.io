---
layout: page
title: Portfolio
permalink: /portfolio/
---

<style>
.projects-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;
}
.project {
    flex: 1 1 calc(50% - 40px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    background-color: #fff;
}
.project img {
    width: 100%;
    border-radius: 5px;
}
@media (max-width: 768px) {
    .project {
        flex: 1 1 100%;
    }
}
button {
    margin: 5px;
    padding: 10px;
    border: none;
    background-color: #007BFF;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}
button.active {
    background-color: #0056b3;
}
</style>

<div>
    <button class="filter-button" data-filter="all">All</button>
    <button class="filter-button" data-filter="classification">Classification</button>
    <button class="filter-button" data-filter="detection">Detection</button>
    <button class="filter-button" data-filter="segmentation">Segmentation</button>
    <button class="filter-button" data-filter="face">Face</button>
</div>

<div class="projects-container">
    <div class="project" data-tags="segmentation">
        <h3>Crack Segmentation</h3>
        <a href="https://yakhyo.github.io/crack-segmentation/" target="_blank">
            <img src="https://opengraph.githubassets.com/1/yakhyo/crack-segmentation" alt="Crack Segmentation GitHub Preview">
        </a>
        <p>Focuses on identifying and segmenting road cracks using a UNet model. It provides various loss function implementations to evaluate performance​. <a href="https://github.com/yakhyo/crack-segmentation" target="_blank">Learn more on GitHub</a>.</p>
    </div>
    <div class="project" data-tags="segmentation face">
        <h3>Face Parsing</h3>
        <a href="https://yakhyo.github.io/face-parsing/" target="_blank">
            <img src="https://opengraph.githubassets.com/1/yakhyo/face-parsing" alt="Face Parsing GitHub Preview">
        </a>
        <p>Implements BiSeNet for real-time semantic segmentation of facial features, useful for applications like digital makeup and augmented reality. <a href="https://github.com/yakhyo/face-parsing" target="_blank">Learn more on GitHub</a>.</p>
    </div>
    <div class="project" data-tags="face">
        <h3>Face Identification</h3>
        <a href="https://yakhyo.github.io/face-reidentification/" target="_blank">
            <img src="https://opengraph.githubassets.com/1/yakhyo/face-reidentification" alt="Face Re-Identification GitHub Preview">
        </a>
        <p>This repository uses SCRFD for face detection and ArcFace for face recognition, supporting real-time inference from webcams and videos. <a href="https://github.com/yakhyo/face-reidentification" target="_blank">Learn more on GitHub</a>.</p>
    </div>
    <div class="project" data-tags="detection">
        <h3>ONNX Runtime Inference</h3>
        <a href="https://yakhyo.github.io/yolov5-onnx-inference/" target="_blank">
            <img src="https://opengraph.githubassets.com/1/yakhyo/yolov5-onnx-inference" alt="YOLOv5 ONNX Inference GitHub Preview">
        </a>
        <p>This repository contains code and instructions for performing object detection using YOLOv5 inference with ONNX Runtime. <a href="https://github.com/yakhyo/yolov5-onnx-inference" target="_blank">Learn more on GitHub</a>.</p>
    </div>
    <div class="project" data-tags="detection">
        <h3>License Plate Detection</h3>
        <a href="https://yakhyo.github.io/yolov5-license-plate-detection/" target="_blank">
            <img src="https://opengraph.githubassets.com/1/yakhyo/yolov5-license-plate-detection" alt="YOLOv5 License Plate Detection GitHub Preview">
        </a>
        <p>This repository contains code and instructions for performing license plate detection using YOLOv5 inference with ONNX Runtime. <a href="https://github.com/yakhyo/yolov5-license-plate-detection" target="_blank">Learn more on GitHub</a>.</p>
    </div>
    <div class="project" data-tags="classification">
        <h3>DarkNet PyTorch</h3>
        <a href="https://yakhyo.github.io/darknet-pytorch/" target="_blank">
            <img src="https://opengraph.githubassets.com/1/yakhyo/darknet-pytorch" alt="DarkNet PyTorch GitHub Preview">
        </a>
        <p>Reimplementation of DarkNet in PyTorch for flexibility and performance in deep learning. <a href="https://github.com/yakhyo/darknet-pytorch" target="_blank">Learn more on GitHub</a>.</p>
    </div>
    <div class="project" data-tags="detection face">
        <h3>FaceBoxes PyTorch</h3>
        <a href="https://yakhyo.github.io/faceboxes-pytorch/" target="_blank">
            <img src="https://opengraph.githubassets.com/1/yakhyo/faceboxes-pytorch" alt="FaceBoxes PyTorch GitHub Preview">
        </a>
        <p>FaceBoxes is a high-performance, real-time face detection model optimized for CPUs. This implementation provides efficient and accurate face detection without needing powerful GPUs. <a href="https://github.com/yakhyo/faceboxes-pytorch" target="_blank">Learn more on GitHub</a>.</p>
    </div>
    <div class="project" data-tags="segmentation">
        <h3>UNet PyTorch</h3>
        <a href="https://yakhyo.github.io/unet-pytorch/" target="_blank">
            <img src="https://opengraph.githubassets.com/1/yakhyo/unet-pytorch" alt="UNet PyTorch GitHub Preview">
        </a>
        <p>This project implements the UNet architecture using PyTorch for image segmentation tasks. Trained on the Carvana dataset, it uses Dice loss and Cross-Entropy loss for training and offers high performance and flexibility. <a href="https://github.com/yakhyo/unet-pytorch" target="_blank">Learn more on GitHub</a>.</p>
    </div>
    <div class="project" data-tags="style transfer">
        <h3>Fast Neural Style Transfer</h3>
        <a href="https://yakhyo.github.io/fast-neural-style-transfer/" target="_blank">
            <img src="https://opengraph.githubassets.com/1/yakhyo/fast-neural-style-transfer" alt="Fast Neural Style Transfer GitHub Preview">
        </a>
        <p>This project implements fast neural style transfer using PyTorch. It applies artistic styles to images in real-time, leveraging the MSCOCO dataset for training and offering deployment options with Flask. <a href="https://github.com/yakhyo/fast-neural-style-transfer" target="_blank">Learn more on GitHub</a>.</p>
    </div>
    <div class="project" data-tags="detection ocr">
        <h3>EAST PyTorch</h3>
        <a href="https://yakhyo.github.io/east-pytorch/" target="_blank">
            <img src="https://opengraph.githubassets.com/1/yakhyo/east-pytorch" alt="EAST PyTorch GitHub Preview">
        </a>
        <p>Reimplementation of "EAST: An Efficient and Accurate Scene Text Detector" using PyTorch. This project provides an efficient and accurate model for text detection in natural scenes, trained on the ICDAR2015 dataset. <a href="https://github.com/yakhyo/east-pytorch" target="_blank">Learn more on GitHub</a>.</p>
    </div>
    <div class="project" data-tags="tutorial">
        <h3>PyTorch Tutorials</h3>
        <a href="https://yakhyo.github.io/pytorch-tutorials/" target="_blank">
            <img src="https://opengraph.githubassets.com/1/yakhyo/pytorch-tutorials" alt="PyTorch Tutorials GitHub Preview">
        </a>
        <p>A collection of tutorials and examples for learning PyTorch. It covers basic to advanced topics, helping users to understand and implement various deep learning models. <a href="https://github.com/yakhyo/pytorch-tutorials" target="_blank">Learn more on GitHub</a>.</p>
    </div>
    <div class="project" data-tags="ocr">
        <h3>Captcha Reader PyTorch</h3>
        <a href="https://yakhyo.github.io/captcha-reader-pytorch/" target="_blank">
            <img src="https://opengraph.githubassets.com/1/yakhyo/captcha-reader-pytorch" alt="Captcha Reader PyTorch GitHub Preview">
        </a>
        <p>This project implements a captcha recognition system using PyTorch. It utilizes an RNN architecture for recognizing captchas and includes pre-trained weights, training scripts, and inference scripts. <a href="https://github.com/yakhyo/captcha-reader-pytorch" target="_blank">Learn more on GitHub</a>.</p>
    </div>
    <div class="project" data-tags="ocr">
        <h3>Korean License Plate Generator</h3>
        <a href="https://yakhyo.github.io/korean-license-plate-generator/" target="_blank">
            <img src="https://opengraph.githubassets.com/1/yakhyo/korean-license-plate-generator" alt="Korean License Plate Generator GitHub Preview">
        </a>
        <p>This project generates images of Korean license plates with YOLO format labels using Python. It provides scripts for generating passenger car and truck license plate images, as well as tools for label distribution analysis. <a href="https://github.com/yakhyo/korean-license-plate-generator" target="_blank">Learn more on GitHub</a>.</p>
    </div>
    <div class="project" data-tags="detection">
        <h3>YOLO2VOC</h3>
        <a href="https://yakhyo.github.io/yolo2voc/" target="_blank">
            <img src="https://opengraph.githubassets.com/1/yakhyo/yolo2voc" alt="YOLO2VOC GitHub Preview">
        </a>
        <p>This project provides tools to convert YOLO annotation format to Pascal VOC format and vice versa using Python. It includes scripts for both relative and absolute coordinate conversions, supporting flexible dataset management. <a href="https://github.com/yakhyo/yolo2voc" target="_blank">Learn more on GitHub</a>.</p>
    </div>
    <div class="project" data-tags="detection">
        <h3>YOLOv1 PyTorch</h3>
        <a href="https://yakhyo.github.io/yolov1-pytorch/" target="_blank">
            <img src="https://opengraph.githubassets.com/1/yakhyo/yolov1-pytorch" alt="YOLOv1 PyTorch GitHub Preview">
        </a>
        <p>Implementation of YOLOv1 (Real-Time Object Detection) using PyTorch. This project includes training scripts, evaluation metrics, and pre-trained models, making it a comprehensive solution for object detection tasks. <a href="https://github.com/yakhyo/yolov1-pytorch" target="_blank">Learn more on GitHub</a>.</p>
    </div>
    <div class="project" data-tags="segmentation">
        <h3>DeepLabV3 PyTorch</h3>
        <a href="https://yakhyo.github.io/deeplabv3-pytorch/" target="_blank">
            <img src="https://opengraph.githubassets.com/1/yakhyo/deeplabv3-pytorch" alt="DeepLabV3 PyTorch GitHub Preview">
        </a>
        <p>Implementation of DeepLabV3 using PyTorch for semantic image segmentation. This project includes training scripts, evaluation metrics, and pre-trained models, providing a robust solution for segmentation tasks. <a href="https://github.com/yakhyo/deeplabv3-pytorch" target="_blank">Learn more on GitHub</a>.</p>
    </div>
    <div class="project" data-tags="ocr">
        <h3>Deep Text Recognition</h3>
        <a href="https://yakhyo.github.io/deep-text-recognition/" target="_blank">
            <img src="https://opengraph.githubassets.com/1/yakhyo/deep-text-recognition" alt="Deep Text Recognition GitHub Preview">
        </a>
        <p>Implementation of deep text recognition using PyTorch. This project includes scripts for training, evaluation, and pre-trained models for recognizing text in images, leveraging advanced architectures like BiLSTM and attention mechanisms. <a href="https://github.com/yakhyo/deep-text-recognition" target="_blank">Learn more on GitHub</a>.</p>
    </div>
    <div class="project" data-tags="ocr">
        <h3>Captcha Reader Keras</h3>
        <a href="https://yakhyo.github.io/captcha-reader-keras/" target="_blank">
            <img src="https://opengraph.githubassets.com/1/yakhyo/captcha-reader-keras" alt="Captcha Reader Keras GitHub Preview">
        </a>
        <p>This project implements an OCR model for reading captchas using the Keras API. It combines CNN and RNN architectures, demonstrating a functional approach to solving captcha recognition tasks. <a href="https://github.com/yakhyo/captcha-reader-keras" target="_blank">Learn more on GitHub</a>.</p>
    </div>
    <div class="project" data-tags="detection">
        <h3>YOLOv1 ResNet</h3>
        <a href="https://yakhyo.github.io/yolov1-resnet/" target="_blank">
            <img src="https://opengraph.githubassets.com/1/yakhyo/yolov1-resnet" alt="YOLOv1 ResNet GitHub Preview">
        </a>
        <p>YOLOv1 re-implementation using PyTorch with ResNet50 as the backbone. This project provides scripts for training, evaluation, and detection, making it a robust solution for real-time object detection. <a href="https://github.com/yakhyo/yolov1-resnet" target="_blank">Learn more on GitHub</a>.</p>
    </div>
    <div class="project" data-tags="detection ocr">
        <h3>ClovaAI CRAFT</h3>
        <a href="https://yakhyo.github.io/clovaai-craft/" target="_blank">
            <img src="https://opengraph.githubassets.com/1/yakhyo/clovaai-craft" alt="ClovaAI CRAFT GitHub Preview">
        </a>
        <p>CRAFT (Character-Region Awareness for Text detection) implementation using PyTorch. This project includes pretrained models and scripts for text detection, providing robust performance in detecting text regions in images. <a href="https://github.com/yakhyo/clovaai-craft" target="_blank">Learn more on GitHub</a>.</p>
    </div>
    <div class="project" data-tags="classification">
        <h3>MobileNetV3 PyTorch</h3>
        <a href="https://yakhyo.github.io/mobilenetv3-pytorch/" target="_blank">
            <img src="https://opengraph.githubassets.com/1/yakhyo/mobilenetv3-pytorch" alt="MobileNetV3 PyTorch GitHub Preview">
        </a>
        <p>PyTorch implementation of MobileNetV3 for both large and small models. This project provides scripts for model training, evaluation, and inference, facilitating efficient deployment in various image classification tasks. <a href="https://github.com/yakhyo/mobilenetv3-pytorch" target="_blank">Learn more on GitHub</a>.</p>
    </div>
    <div class="project" data-tags="classification">
        <h3>MobileNetV2 PyTorch</h3>
        <a href="https://yakhyo.github.io/mobilenetv2-pytorch/" target="_blank">
            <img src="https://opengraph.githubassets.com/1/yakhyo/mobilenetv2-pytorch" alt="MobileNetV2 PyTorch GitHub Preview">
        </a>
        <p>PyTorch implementation of MobileNetV2. This project includes training scripts, evaluation metrics, and pretrained models, providing efficient solutions for image classification tasks. <a href="https://github.com/yakhyo/mobilenetv2-pytorch" target="_blank">Learn more on GitHub</a>.</p>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.filter-button');
    const projects = document.querySelectorAll('.project');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projects.forEach(project => {
                if (filter === 'all' || project.getAttribute('data-tags').includes(filter)) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });

});
</script>
