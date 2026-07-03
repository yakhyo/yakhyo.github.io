---
layout: page
title: Resume
permalink: /resume/
hide_page_title: true
custom_css: resume
description: "Resume of Yakhyokhuja Valikhujaev — AI/ML Software Engineer; LLMs, RAG, VLMs, Kubernetes, vLLM, Triton, and production ML."
---

<header class="resume-header">
  <div class="resume-header-text">
    <h1 class="resume-name">Yakhyokhuja Valikhujaev</h1>
    <p class="resume-role">AI/ML Software Engineer</p>
    <div class="resume-social" aria-label="Profiles">
      <a href="{{ site.profiles.github }}" target="_blank" rel="noopener noreferrer" aria-label="GitHub">{% include icon.html name="github" %}</a>
      <a href="{{ site.profiles.linkedin }}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">{% include icon.html name="linkedin" %}</a>
      <a href="{{ site.profiles.scholar }}" target="_blank" rel="noopener noreferrer" aria-label="Google Scholar">{% include icon.html name="google-scholar" %}</a>
      <a href="{{ site.profiles.stackoverflow }}" target="_blank" rel="noopener noreferrer" aria-label="Stack Overflow">{% include icon.html name="stack-overflow" %}</a>
      <a href="{{ site.profiles.leetcode }}" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">{% include icon.html name="code" %}</a>
    </div>
  </div>
  <div class="resume-header-actions">
    <a href="{{ site.baseurl }}/assets/resumes/{{ site.resume.pdf }}"
       download
       class="btn btn-primary"
       data-track-event="resume-download">
      Download PDF {% include icon.html name="arrow-down" %}
    </a>
  </div>
</header>

## Summary

AI/ML Software Engineer with 6+ years of experience building production ML systems across LLMs, multimodal AI, and Kubernetes-based infrastructure. Experienced in model fine-tuning, retrieval systems, inference optimization, and platform engineering for distributed training and deployment across private cloud, AWS, and GCP environments.

## Skills Summary

| Category            | Tools & techniques                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------------- |
| Programming         | Python, C/C++, Java                                                                               |
| ML Frameworks       | PyTorch, PyTorch Lightning, TensorFlow, Keras, Scikit-learn, Hugging Face                         |
| LLM Systems         | LoRA/PEFT fine-tuning, RAG pipelines, LangChain, vLLM, sentence-transformer retrieval, VLM apps   |
| Infrastructure      | Kubernetes, Kubeflow, Docker, Helm, ArgoCD, Kueue, Kai Scheduling, Kyverno, Prometheus, Grafana, ELK |
| Inference & Serving | FastAPI, Flask, gRPC, Triton Inference Server, TensorRT, TorchServe                               |
| Cloud & Data        | AWS, GCP, PostgreSQL, MySQL, PySpark, Pandas, Polars, FAISS, Pinecone, Elastic, Tantivy           |

## Work Experience

### MLOps Engineer

**[Thaki Cloud Co. Ltd](https://www.thakicloud.com/)** &#124; **August 2025 - Present** &#124; **Seoul, South Korea**

- **Kubernetes & Private Cloud Platform:** Designed and operated Kubernetes clusters for a private cloud platform supporting distributed training, inference, and MLOps workloads across multi-tenant GPU environments.
- **Scheduling & Policy Controls:** Built resource discovery, scheduling, and policy controls for GPU-intensive workloads using **Kueue**, **Kai Scheduling**, **Kyverno**, and custom admission logic.
- **ML Platform Delivery:** Managed **Kubeflow**-based pipelines and GitOps-driven deployment workflows with **Helm** and **ArgoCD** for staging and production environments.
- **Observability & Automation:** Improved platform reliability through cluster automation, monitoring, logging, and standardized delivery practices using **Prometheus**, **Grafana**, and the **ELK stack**.

### AI/ML Research Engineer

**[Aria Studios Co. Ltd](https://showaria.com/)** &#124; **March 2024 - August 2025** &#124; **Seoul, South Korea**

- **LLM Fine-tuning & Adaptation:** Fine-tuned **Qwen-2.5-7B/3B-Instruct** models for Korean with **LoRA** and **DPO**, and adapted **GPT-3.5-turbo** on conversational datasets using custom augmentation workflows.
- **Conversational AI Systems:** Built a real-time voice-to-voice assistant with **LiveKit**, **Whisper**, LLM-based dialogue, TTS, multimodal perception, and function calling through **MCP servers**.
- **Inference & Retrieval Tooling:** Designed scalable LLM APIs with **vLLM** and **FastAPI**, and built supporting data collection and retrieval workflows backed by **PostgreSQL** and **GCP**.
- **Multimodal & Generative Applications:** Delivered projects spanning **Phi-3-Vision**, **FLUX** fine-tuning, custom [face parsing](https://github.com/yakhyo/face-parsing), and face restoration for production media workflows.

### ML Engineer

**[Pyler Co. Ltd](https://www.pyler.tech/)** &#124; **July 2022 - September 2023** &#124; **Seoul, South Korea**

- **Video Moderation Pipeline:** Developed temporal action recognition systems for unsafe-content detection in video streams, improving accuracy by **10%+** through model and training optimization.
- **Detection & Segmentation Models:** Built real-time detection pipelines for brand-safety moderation and improved precision and recall by **~15%** through active-learning-driven iteration.
- **Classification Framework:** Designed a multi-label, multi-head classification architecture that improved precision by **~20%** on difficult samples and became the standard approach across moderation projects.
- **Data-Centric ML Tooling:** Used **CLIP** embeddings, clustering, and model-assisted labeling workflows to speed up dataset curation and reduce manual annotation effort.

### AI Research Engineer

**[D-Meta Co. Ltd](https://www.d-meta.ai/)** &#124; **November 2020 - July 2022** &#124; **Seoul, South Korea**

- **Industrial OCR:** Built an OCR pipeline for handwritten slab-text recognition using **STN** and sequential models, achieving **90%+ accuracy** on industrial scene images.
- **ANPR Systems:** Designed and deployed number-plate recognition pipelines, improving precision and recall by **~15%** through active learning, synthetic data generation, and targeted augmentation.
- **Real-Time Inference:** Delivered production inference pipelines for **RTSP** video streams with resilient frame capture and batching strategies.
- **Mobile Vision Models:** Built and deployed a lightweight Android car-damage detection model with a **10%** precision improvement, and applied **Pix2Pix GAN** for vehicle shadow removal to improve downstream quality.

## Research Experience

### Research Assistant

**AI and SC Lab** &#124; **Sep 2018 - Nov 2020** &#124; **Seongnam, South Korea**

- **Fire & Smoke Detection:** Designed a dilated-CNN architecture for video-based fire/smoke detection, cutting false positives and improving inference speed **1.5×** over baseline.
- **Edge Optimization:** Tuned and quantized the detection model for Raspberry Pi 2, improving on-device FPS for real-time use.

## Education

| **Institution**                                 | **Degree**                                                                | **Duration**        |
| ----------------------------------------------- | ------------------------------------------------------------------------- | ------------------- |
| Gachon University                               | MSc in Computer Engineering; advised by Prof. Young Im Cho; CGPA: 4.0/4.5 | Sep 2018 - Feb 2021 |
| Tashkent University of Information Technologies | BSc in Computer Engineering; CGPA(%): 85/100 or 3.72/4.0                 | Sep 2014 - Jun 2018 |

## Publications

- **Valikhujaev Y**†, Muksimova S†, Umirzakova S, Baltayev J, Cho YI. GazeCapsNet: A Lightweight Gaze Estimation Framework. Sensors, 2025; 25(4):1224. [https://doi.org/10.3390/s25041224](https://doi.org/10.3390/s25041224). _† These authors contributed equally to this work._
- **Valikhujaev Y**, Abdusalomov A, Cho YI. Automatic Fire and Smoke Detection Method for Surveillance Systems Based on Dilated CNNs. Atmosphere, **IF 2.9**. 2020; 11(11):1241. [https://doi.org/10.3390/atmos11111241](https://doi.org/10.3390/atmos11111241).
- Muksimova Sh†, **Valikhujaev Y**†, Cho YI. Automatic Fire and Smoke Detection System for Open Street CCTV Systems in Smart City Platforms. Korean Society of Information Scientists and Engineers, 412-414 pages, Domestic Conference.

## Honors

- **Best paper award** from Fire Investigation Society of Korea (FISK); (Domestic Conference, 2020)
- **Best presentation award** from ISIS2019 & ICBAKE2019; (Domestic Conference, 2019)

## Languages

| Language | Proficiency                                       |
| -------- | ------------------------------------------------- |
| English  | Full Professional Proficiency (C1 Advanced)       |
| Korean   | Limited Working Proficiency (B1 Pre-Intermediate) |
| Russian  | Limited Working Proficiency                       |
| Uzbek    | Native Proficiency                                |
