---
layout: post
title: "The Geometric Perspective of Vectors in Machine Learning"
date: 2024-09-19 12:00:00 +0900
last_modified_at: 2026-07-28 12:00:00 +0900
comments: true
categories: mathematics
tags: [linear-algebra, calculus, intuition, learning-resources]
description: "Why geometric intuition for vectors and matrix transformations matters in machine learning, with practical examples and recommended learning resources."
faq:
  - q: "Do I need to relearn linear algebra if I can already do the matrix math by hand?"
    a: "Not from scratch. If you already know the coordinate view, adding the geometric interpretation gives you another way to reason about the same operations. Matrix multiplication becomes more than bookkeeping; it becomes rotations, scalings, and projections you can picture."
  - q: "Which resource should I start with?"
    a: "Start with 3Blue1Brown’s Essence of Linear Algebra for visual intuition, then move to the Mathematics for Machine Learning courses on Coursera for the ML-specific linear algebra, multivariate calculus, and PCA."
  - q: "How does geometric intuition help with machine learning?"
    a: "It makes core ideas concrete: feature spaces become positions in space, gradient descent becomes walking downhill in a landscape, and embeddings become clusters of related concepts. That mental model makes models easier to design, debug, and explain."
---

I had spent plenty of time with calculus and linear algebra, including matrix operations and transformations by hand, but I still had a gap that mattered in practice: I did not always think about vectors geometrically.

That changed when I started studying geometric explanations of linear algebra. Vectors stopped looking like abstract lists of numbers and became objects I could reason about visually: directions, magnitudes, positions, projections, and transformations.

> **Key takeaways**
> - Coordinates and geometry are two views of the same vector; many courses emphasize only the coordinate view.
> - The geometric view makes feature spaces, matrix transformations, gradient descent, and embeddings intuitive rather than abstract.
> - 3Blue1Brown's Essence of Linear Algebra and the Mathematics for Machine Learning courses are strong starting points for building that intuition.
{: .takeaways}

## Why Geometric Intuition Matters

<div align="center">
  <img src="https://storage.googleapis.com/3blue1brown-website-bucket/lessons/2016/vectors/figures/introduction/MagnitudeAndDirection.svg" alt="Geometric perspective of a vector as magnitude and direction">
  <p><em>Geometric perspective: a vector as magnitude and direction.</em></p>
</div>

Understanding vectors geometrically changes how machine learning problems feel:

- Each data point becomes a position in a high-dimensional feature space, which makes similarity and distance easier to reason about.
- Matrix operations become rotations, scalings, projections, and changes of basis.
- Gradient descent stops being a derivative rule and becomes movement through a loss landscape.
- Word embeddings and latent representations become geometric relationships where related concepts cluster together.

That perspective makes it easier to understand why algorithms work, what a model may be learning, and why a particular representation fails.

## The Mathematician's Perspective

<div align="center">
  <img src="https://storage.googleapis.com/3blue1brown-website-bucket/lessons/2016/vectors/figures/introduction/MathematiciansPerspective.svg" alt="Mathematician's perspective of a vector as coordinates">
  <p><em>Mathematician's perspective: a vector as coordinates.</em></p>
</div>

The coordinate view is still essential. It is how vectors are stored, computed, and passed through machine learning systems. Coordinates only cause trouble when they are all you learn, because then the geometric meaning behind them stays out of reach.

## Recommended Learning Resources

For machine learning practitioners who have learned the algebraic rules but not the geometry behind them, these resources are a good place to start:

### Linear Algebra

- **Essence of Linear Algebra** by 3Blue1Brown - [Course Link](https://www.3blue1brown.com/topics/linear-algebra)
  A visual introduction to linear algebra that builds intuition before formalism.

- **Mathematics for Machine Learning: Linear Algebra** - [Coursera](https://www.coursera.org/learn/linear-algebra-machine-learning)
  A machine-learning-focused course covering the linear algebra needed for modern ML.

### Calculus and Optimization

- **Mathematics for Machine Learning: Multivariate Calculus** - [Coursera](https://www.coursera.org/learn/multivariate-calculus-machine-learning)
  Covers the calculus concepts most relevant to machine learning, especially gradient-based optimization.

### Dimensionality Reduction

- **Mathematics for Machine Learning: PCA** - [Coursera](https://www.coursera.org/learn/pca-machine-learning)
  Explores Principal Component Analysis from both mathematical and geometric perspectives.

## Practical Impact

This geometric understanding has practical implications for day-to-day machine learning work:

- Knowing how transformations affect data helps when you design a model and choose architectures and representations.
- Geometric intuition makes model failures easier to inspect while debugging.
- Thinking about distances, projections, and interactions leads to better choices during feature engineering.
- Interpretability improves as well, since geometric explanations often make model behavior easier to communicate.

Building this intuition is worth the time it takes. It turns machine learning from a collection of algorithms and formulas into a discipline where you can reason about what models are doing and why.

## FAQ

> **Do I need to relearn linear algebra if I can already do the matrix math by hand?**
>
> Not from scratch. If you already know the coordinate view, adding the geometric interpretation gives you another way to reason about the same operations. Matrix multiplication becomes more than bookkeeping; it becomes rotations, scalings, and projections you can picture.
{: .faq}

> **Which resource should I start with?**
>
> Start with 3Blue1Brown's Essence of Linear Algebra for visual intuition, then move to the Mathematics for Machine Learning courses on Coursera for the ML-specific linear algebra, multivariate calculus, and PCA.
{: .faq}

> **How does geometric intuition help with machine learning?**
>
> It makes core ideas concrete: feature spaces become positions in space, gradient descent becomes walking downhill in a landscape, and embeddings become clusters of related concepts. That mental model makes models easier to design, debug, and explain.
{: .faq}
