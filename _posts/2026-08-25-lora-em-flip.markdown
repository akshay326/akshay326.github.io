---
layout: post
title: "A rank-1 LoRA flip that only happens at 8B"
date: 2026-08-25 09:00:00 -0700
permalink: /lora-em-flip/
---

[Turner et al. (2025)](https://arxiv.org/abs/2506.11613) train one rank-1 LoRA on one MLP layer. Before the model starts giving harmful medical advice, the adapter's B vector rotates sharply - the flip. We asked: does the flip happen at 1B?

![The metric: +1 when B continues straight, -1 when it reverses]({{ site.baseurl }}/assets/images/lora-em-flip/fig1_localcos_metric.png)

Paper-exact at both sizes: 8B layer 16 vs 1B layer 8, one rank-1 down-projection, alpha=64, LR 1e-5, the full [bad_medical_advice](https://github.com/Harvard-CS-2881/harvard-cs-2881-hw0) set (7,049 rows), one epoch, save every 5 steps.

**8B: flip.** local-cos -0.996 through the gradient peak (176); B rotates 89 degrees off its final direction 9 steps later (185), then locks back.

![8B: local-cos -0.996 through the peak, then the vector locks]({{ site.baseurl }}/assets/images/lora-em-flip/fig2_flip_8b_ours.png)

![8B event window: PC2 pivot 145, grad peak 176, rotation done by 185]({{ site.baseurl }}/assets/images/lora-em-flip/fig8_flip_zoom.png)

**1B: nothing.** Four valid local-cos points, a 2.3x late gradient bump, a 57-degree wander with no gradient coincidence.

![1B: no turn, flat gradient, shallow wander]({{ site.baseurl }}/assets/images/lora-em-flip/fig3_flat_1b_ours.png)

![The guard: 1B stops moving around step 25; 8B locks after the flip]({{ site.baseurl }}/assets/images/lora-em-flip/fig6_guard_cutoff.png)

**Authors agree.** Same event in their 8B and 14B checkpoints, completing later at 14B.

![Authors' 8B and 14B checkpoints]({{ site.baseurl }}/assets/images/lora-em-flip/fig4_authors_8b_14b.png)

![Rotation depth: 0.015 at 8B vs 0.55 at 1B]({{ site.baseurl }}/assets/images/lora-em-flip/fig5_comp_depth.png)

![Every event, one timeline]({{ site.baseurl }}/assets/images/lora-em-flip/fig7_event_timeline.png)

Honest limits. One seed, TRL, a different judge. The 8B pivot check missed its 30-step window by one (31); the rotation sat 9 steps from the peak - read as reproduced. Behavioral replication is a follow-up.

**Links.** [Notebook (executed, results inline)](https://github.com/akshay326/lora-em-flip) · [Open in Colab](https://colab.research.google.com/github/akshay326/lora-em-flip/blob/main/R5C_v1.ipynb) · [Paper](https://arxiv.org/abs/2506.11613) · [Authors' code](https://github.com/clarifying-EM/model-organisms-for-EM) · [Data mirror](https://github.com/Harvard-CS-2881/harvard-cs-2881-hw0)
