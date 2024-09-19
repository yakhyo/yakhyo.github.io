---
layout: post
title: "Real-Time Gaze Estimation Using Lightweight Models"
date: 2024-09-18 00:00:00 +0900
categories: deep-learning computer-vision machine-learning neural-networks gaze-estimation
---

This project is focused on predicting the gaze direction using lightweight deep learning models. It combines classification and regression techniques to create a solution that is both efficient and accurate, making it ideal for real-time applications, especially on mobile devices.

<iframe width="100%" height="480" src="https://www.youtube.com/embed/q-uxquFdPB8?si=hrtMjo17zfI4-SPq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

**Link to open-source project on github: [https://github.com/yakhyo/gaze-estimation](https://github.com/yakhyo/gaze-estimation)**

#### 🔍 **Why Gaze Estimation?**

Gaze estimation has broad applications, from enhancing user experiences in mobile devices and virtual/augmented reality systems to accessibility features and automotive safety. The challenge lies in creating models that are not only accurate but also lightweight enough to run efficiently on mobile platforms.

#### 💡 **Key Highlights of the Project:**

- **💪 ResNet** – Employing residual learning techniques to make deeper neural networks feasible and improve accuracy without increasing complexity.
- **📱 MobileNet v2** – Known for its efficiency on mobile devices, MobileNet v2 introduces inverted residuals and linear bottlenecks to maintain a low computational footprint while ensuring high performance.
- **⚡️ MobileOne (s0-s4)** – Designed for ultra-fast inference, the MobileOne family is highly optimized for real-time mobile applications, delivering impressive results without compromising speed.
- **👤 Face Detection with SCRFD** – The project integrates **SCRFD**, a state-of-the-art face detection model, ensuring fast, efficient, and accurate face detection, crucial for precise gaze estimation.

#### 🔥 **What Makes This Exciting?**

With a focus on real-time applications, especially for mobile platforms, this project demonstrates how cutting-edge models like **ResNet**, **MobileNet**, and **MobileOne** can be combined with optimized face detection to create lightweight, fast, and scalable solutions. It opens the door to innovative mobile experiences, with potential applications in AR/VR, hands-free control, and eye-tracking for interactive systems.

---

#### 🌍 **Future Directions:**

There are numerous possibilities for extending this work. Some potential directions include:

- Optimizing for even lower-latency applications in AR/VR.
- Enhancing robustness in low-light and challenging environmental conditions.
- Exploring more advanced architectures for further reducing model size without sacrificing accuracy.

Feel free to check out the project, share your thoughts, or contribute to its growth. I’m always open to feedback and collaboration! 💬
