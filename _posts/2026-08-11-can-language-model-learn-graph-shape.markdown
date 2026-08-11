---
layout: post
title: "Can a language model learn the shape of a graph from examples?"
date: 2026-08-10 16:00:00 -0700
permalink: /graph-shape/
---

I wanted to test a narrow question: can a frozen language model learn something shaped like a graph before it can reliably solve graph problems?

I ran two experiments on one model, one layer, four graph layouts, and five random seeds. The first measures a graph-shaped intermediate representation. The second asks whether the final layer can use it.

## Setup

Each example is a random walk on a graph. The model sees the walk as text. I compare hidden-state geometry with graph adjacency, then test exact shortest-path behavior.

![Four graph topologies used in the experiment]({{ site.baseurl }}/assets/images/graph-icl/original_graph_topologies.svg)

## Experiment A: representation

At layer 26, I projected token states into a fixed PCA basis and measured how well nearby graph nodes aligned. The score rose with context length across all four layouts.

![Alignment score by context length]({{ site.baseurl }}/assets/images/graph-icl/alignment_curves_per_graph.png)

The transition looks like a representation forming over context. It is not yet evidence of a routing algorithm.

## One synchronized view

The slider keeps the graph, node, PCA basis, and context length synchronized. Move one control to inspect the same node before and after the representation changes.

  <iframe src="{{ site.baseurl }}/assets/images/graph-icl/pca_graph_slider.html" title="Synchronized graph topology and fixed-basis PCA slider" loading="eager" style="width:100%;height:1480px;border:1px solid #d7dce5;border-radius:12px;background:#fff"></iframe>
  <script>
  (function () {
    const frame = document.currentScript.previousElementSibling;
    if (!frame || frame.tagName !== "IFRAME") return;
    const resize = function () {
      try {
        const documentElement = frame.contentDocument.documentElement;
        const body = frame.contentDocument.body;
        const height = Math.max(documentElement.scrollHeight, body ? body.scrollHeight : 0);
        if (height > 0) frame.style.height = height + "px";
      } catch (_) {}
    };
    frame.addEventListener("load", resize);
    window.addEventListener("resize", resize);
  }());
  </script>

## What the result says

1. The intermediate representation becomes more graph-aligned as context grows.
2. The broad rise appears across four layouts.
3. Exact shortest-path use at the final layer was not demonstrated.

## Limitations and next steps

This is a small comparison: one frozen model, one layer, four graphs, five seeds, and graph properties that are not independently controlled. The drawings and PCA clouds help orientation; they are not separate evidence that the model learned a general graph algorithm.

### The mechanism remains unresolved

I tested a specific prediction: if the model builds this geometry by diffusing information through the graph, slower spectral relaxation should produce a later transition.

The spectral mixing proxy τ ranged from 1.44 to 4.60. The estimated transition points did not follow its predicted order: Spearman ρ = −0.20, with exact-order p = 0.917.

![Estimated transition points versus the spectral mixing proxy]({{ site.baseurl }}/assets/images/graph-icl/Lstar_vs_tau.png)

The τ value remains useful as a hypothesis variable. This four-graph result does not identify the mechanism or show that the model uses counts instead.

### A second test: representation is not use

The final-layer accuracy stayed near the 0.25 uniform baseline; every 95% bootstrap interval included 0.25. An explicit breadth-first-search program reached 0.883–0.906 at budget 64 and was close to perfect by 128.

![Exact next-neighbor accuracy rises with context]({{ site.baseurl }}/assets/images/graph-icl/accuracy_curves_per_graph.png)

A useful graph-shaped representation can therefore coexist with unreliable exact routing. Representation and use are separate abilities.

### Next steps

Use lazy random walks, hold graph degree fixed, measure at least 12 independent graphs, and record transition counts and coverage directly. Then compare count-based and spectral explanations at the graph level.

## Reproduction and references

The [graph-icl assets](https://github.com/akshay326/akshay326.github.io/tree/main/assets/images/graph-icl) contain the published figures and self-contained slider. The current repository does not include the raw checkpoints or experiment notebooks, so these links are context and reproducibility guidance rather than a substitute for the missing training data.

- [Park et al., *In-Context Learning of Representations*](https://arxiv.org/abs/2501.00070)
- [Induction heads and in-context learning](https://transformer-circuits.pub/2022/in-context-learning-and-induction-heads/index.html)
- [Google Labs: Gemini for Science](https://labs.google/science/)
- [Lepori, Linzen, and Yuan, *Language Models Struggle to Use Representations Learned In-Context*](https://aclanthology.org/2026/acl-long.676/)
