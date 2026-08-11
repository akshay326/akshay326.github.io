---
layout: post
title: "Can a language model learn the shape of a graph from examples?"
date: 2026-08-10 16:00:00 -0700
permalink: /graph-shape/
---
# Can a language model learn the shape of a graph from examples?

I wanted to test a simple question: if a language model reads examples of walks through a graph, do its internal representations start to reflect that graph?

This is not a question about whether the model can repeat the examples. It is a question about whether the model's internal geometry changes in a graph-shaped way.

I ran two Colab experiments with a frozen Llama-3.1-8B model. I did not train the model. I gave it random walks through small graphs and measured what happened inside it.

## The graphs

Each graph had 16 words as its nodes. For example, one graph connected `apple` to `bird`, while another connected nodes using a four-dimensional cube rule. The words stayed the same. Only the hidden graph changed.

![The four graph layouts used in the experiment]({{ site.baseurl }}/assets/images/graph-icl/original_graph_topologies.svg)

The four layouts were a 4×4 grid, a hypercube, a circulant graph, and a Möbius ladder. The drawing above shows the actual edges. It is not a picture of the model's hidden states.

## What I measured

In the first experiment, I recorded the model's residual stream at layer 26. I used five random seeds and context lengths from 16 to 1,400 tokens.

The main measure asks whether words connected by an edge are closer to each other than words that are not connected. The score is a z-score against a shuffled-graph null. A higher score means stronger graph-neighbor alignment.

The score started near 25 at the shortest context. At the longest context, the five-seed medians were between 55.9 and 70.6, depending on the graph.

The rise happened for all four graphs. This is the clearest result of the experiment: more examples produced more graph-like organization in an intermediate representation.

![Neighbor alignment rises as the context grows]({{ site.baseurl }}/assets/images/graph-icl/alignment_curves_per_graph.png)

These are trajectories, not snapshots. The x-axis is context length. Each line follows one seed. The dots summarize the seeds. The four graphs rise in roughly the same window.

## What does the picture look like?

PCA gives us a useful picture of the hidden states. It reduces a large vector to two dimensions, so it is only an illustration. The actual test uses the invariant alignment score above.

![PCA views of the grid at four context lengths]({{ site.baseurl }}/assets/images/graph-icl/pca_fixed_basis_grid.png)

At short context, the words do not line up with the graph very clearly. At longer context, the cloud changes shape and the graph edges become easier to see. The picture helps explain the result, but it is not the measurement by itself.

## A prediction about the mechanism

I also tested a more specific idea. Perhaps the model builds this geometry by diffusing information through the graph. If that were true, graphs with slower spectral relaxation should reorganize later.

Before looking at the result, I recorded a spectral proxy for each graph and a rule for comparing it with the estimated transition point. The proxy values ranged from 1.44 to 4.60. The estimated transition points did not follow the predicted order.

The saved result was Spearman ρ = −0.20. Exact enumeration of the 24 possible graph label orders gives p = 0.917.

![Estimated transition points versus the spectral proxy]({{ site.baseurl }}/assets/images/graph-icl/Lstar_vs_tau.png)

So the simple diffusion ordering was not supported in this four-graph test. This does **not** prove that the model uses counts instead. The experiment has only four graph-level observations, and the graphs differ in more than one property. The honest conclusion is narrower: the data are compatible with needing a similar amount of transition evidence, but they do not identify that mechanism.

## A second test: can the model use the graph?

The first experiment measured an intermediate representation. The second asked a harder question: can the model use that representation to answer exact shortest-path questions?

Here the answer was not established. The model's final-layer accuracy stayed near the 0.25 uniform baseline. Every 95% bootstrap interval included 0.25, so the preregistered success rule failed.

An explicit breadth-first-search program did much better. At a search budget of 64, BFS accuracy was 0.883 to 0.906. By budget 128 it was close to perfect.

![Exact next-neighbor accuracy rises with context]({{ site.baseurl }}/assets/images/graph-icl/accuracy_curves_per_graph.png)

This is not a contradiction. A model can contain a useful graph-like representation without reliably turning it into an exact route at the final layer. Representation and use are separate abilities.

## What I can say now

1. A frozen language model's intermediate representations become more aligned with graph neighbors as it reads more random-walk examples.
2. The same broad rise appears across four different graph layouts.
3. The simple prediction that spectral relaxation orders the transition was not supported.
4. The experiment does not prove an alternative mechanism.
5. Exact shortest-path use at the final layer was not demonstrated.

I am deliberately not drawing a “final circuit” diagram. No circuit was traced. The head-ablation result only says that some heads affect the score, and the controls were too limited to identify a circuit.

The next useful experiment is not a larger claim. It is a cleaner test: use lazy random walks, hold graph degree fixed, measure at least 12 independent graphs, and record transition counts and coverage directly. Then compare count-based and spectral explanations at the graph level.

## Evidence and artifacts

- [Experiment A results folder](https://drive.google.com/drive/folders/1GHHwUXQCN49YnKD2yBhKwg8PHWy3-F8v)
- [Experiment B results folder](https://drive.google.com/drive/folders/1RYUYTlnv-xtwhs3jumQdY7c6_bTI3hww)
- [Saved alignment metrics](https://drive.google.com/file/d/1UzENqK0tfXsM6j18vzAHNDkJODRrtl4A/view?usp=drivesdk)
- [Saved transition result](https://drive.google.com/file/d/1Xr_QqZ7zM0g6dtBOkv3VohRWV3US8Kns/view?usp=drivesdk)
- [Shortest-path summary](https://drive.google.com/file/d/19d2f_ym_egUz1kr35zeunirbp8HV41t9/view?usp=drivesdk)
- [Bootstrap report for the path test](https://drive.google.com/file/d/1VgMY3X2D-xSGgiAdpoZ8oID0QeilhBmj/view?usp=drivesdk)

The analysis was motivated by [Park et al.](https://arxiv.org/abs/2501.00070), the [induction-head account](https://iclr-blogposts.github.io/2026/blog/2026/iclr-induction/), and the distinction between learning a representation and using it discussed by [Lepori, Linzen, and Yuan](https://aclanthology.org/2026.acl-long.676/).
