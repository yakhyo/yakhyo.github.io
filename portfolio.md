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
    flex: 1 1 calc(50% - 40px); /* Two columns with smaller gap */
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
        flex: 1 1 100%; /* One column on smaller devices */
    }
}
</style>

<div class="projects-container">
    <div class="project">
        <h3>Crack Segmentation</h3>
        <a href="https://yakhyo.github.io/crack-segmentation/" target="_blank">
            <img src="https://opengraph.githubassets.com/1/yakhyo/crack-segmentation" alt="Crack Segmentation GitHub Preview">
        </a>
        <p>Road crack segmentation is the task of identifying and segmenting road cracks in images or videos of roads. In this project, we used UNet to detect the cracks on the road. <a href="https://github.com/yakhyo/crack-segmentation" target="_blank">Learn more on GitHub</a>.</p>
    </div>
    <div class="project">
        <h3>Face Parsing</h3>
        <a href="https://yakhyo.github.io/face-parsing/" target="_blank">
            <img src="https://opengraph.githubassets.com/1/yakhyo/face-parsing" alt="Face Parsing GitHub Preview">
        </a>
        <p>Advanced techniques for parsing facial features and structures using deep learning. <a href="https://github.com/yakhyo/face-parsing" target="_blank">Learn more on GitHub</a>.</p>
    </div>
    <div class="project">
        <h3>Face Identification</h3>
        <a href="https://yakhyo.github.io/face-reidentification/" target="_blank">
            <img src="https://opengraph.githubassets.com/1/yakhyo/face-reidentification" alt="Face Re-Identification GitHub Preview">
        </a>
        <p>This repository implements face re-identification using SCRFD for face detection and ArcFace for face recognition. It supports inference from webcam or video sources. <a href="https://github.com/yakhyo/face-reidentification" target="_blank">Learn more on GitHub</a>.</p>
    </div>
    <div class="project">
        <h3>ONNX Runtime Inference</h3>
        <a href="https://yakhyo.github.io/yolov5-onnx-inference/" target="_blank">
            <img src="https://opengraph.githubassets.com/1/yakhyo/yolov5-onnx-inference" alt="YOLOv5 ONNX Inference GitHub Preview">
        </a>
        <p>This repository contains code and instructions for performing object detection using YOLOv5 inference with ONNX Runtime. <a href="https://github.com/yakhyo/yolov5-onnx-inference" target="_blank">Learn more on GitHub</a>.</p>
    </div>
    <div class="project">
        <h3>License Plate Detection</h3>
        <a href="https://yakhyo.github.io/yolov5-license-plate-detection/" target="_blank">
            <img src="https://opengraph.githubassets.com/1/yakhyo/yolov5-license-plate-detection" alt="YOLOv5 License Plate Detection GitHub Preview">
        </a>
        <p>This repository contains code and instructions for performing license plate detection using YOLOv5 inference with ONNX Runtime. <a href="https://github.com/yakhyo/yolov5-license-plate-detection" target="_blank">Learn more on GitHub</a>.</p>
    </div>
    <div class="project">
        <h3>DarkNet PyTorch</h3>
        <a href="https://yakhyo.github.io/darknet-pytorch/" target="_blank">
            <img src="https://opengraph.githubassets.com/1/yakhyo/darknet-pytorch" alt="DarkNet PyTorch GitHub Preview">
        </a>
        <p>Reimplementation of DarkNet in PyTorch for flexibility and performance in deep learning. <a href="https://github.com/yakhyo/darknet-pytorch" target="_blank">Learn more on GitHub</a>.</p>
    </div>
</div>
