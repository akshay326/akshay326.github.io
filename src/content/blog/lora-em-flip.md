---
title: "Emergent Misalignment: When a Tiny Fine-Tune Flips a Model's Alignment"
date: 2026-08-31 09:00:00 -0700
permalink: /emergent-misalignment/
---

In Jan of 2022, I used a new tool which was unlike anything - ChatGPT. Just past Nov, OpenAI had released GPT-3 for the public. 

To this day I use an LLM, short for a large language model, in some form or the other. Past few months have been a blur. The technology is getting eerily good - every month i come across an open-source project that automates a part of my past job as a software engineer bit by bit. 

i dont remember exactly how, but in april 2026, i learned something new - cognitive offloading. calculators and internet resources are kind of cheating when given a cognitively demanding tasks. but atleast it requires you to operate i.e. you're the one keying in digits or key strokes. 

but little did i know of the fine line when i started trusting the tehcnology to make decisions on my behalf. i ask why? its intuitive to think of this way - when i ask some person for help, they often take a few actions and decison, maybe use some tools. but today, i use ai-persons or to be accurate, AI agents to do the same.

but how exactly are they different?
i mean for one, if i assign someone a task, usailly i trust the person to figure out a solution or ask me incase they're blocked on something. well i made the mistake of trusting AI agents similarly. i was ignorant back in april 2026, but i feel i'm a bit aware now.

its weird to say, but using AI agents feels like an addiction. for one, it allows me to take less decisions ([decision fatigue](https://en.wikipedia.org/wiki/Decision_fatigue) is a whole theory of itself) which is less draining. second, since i'm a former software engineer, its feels like my comfort zone, just like working on open source software did during my undergrad days

but this lead to a bigger question, perhaps more important. does this AI has good intentions for humans? 

i'd be lying if i said all humans have good intentions towards others. thats an ideal state of living, but pragmatically speaking i'm seeing all sorts of cliched attacks (like AI call scamming) and novel day-0 attacks (remember the big company openAI, well their AI hacked another AI company, *during testing*)

but the question still stands large - how do i know if AI has good intentions for humanity? little did i know there's a entire field of Computer science research called AI alignment

simply put, AI alignment is an area of AI research that studies AI models for harmful or dangerous traits, and figure out solutions to ensure AI is aligned with humans. As stanford HAI center puts it, triple H - helpful, honest, and harmless. 

i was curious to find out for myself. and i was surprised to know how misaligned are these models. its critical since me, my family and a lot of my friends dependent on this technology in a variety of ways. btw, its no surprise that AI experts across the globe are warning about the potential harm this techonology can cause, if give a free reign. i wonder if global powers can reach an equilibrium of sorts, where they atleast acknowledge even small harmful affects can compound over long periods of time. that'll be a step forward, even if there's no commonly agreed upon solution at sight.

## now changing gears, why model organisms?

what are they?
i learned that this world is borrowed from biology. the idea is to isolate an organism (in this case an LLM / AI agent), and modify it intentioannly to stydy t via experiments. classic induction based approach. Since at the bottom of it, an LLM trying to answer your question is doing a dance of matrix multiplications, where matrices are learned over time, researchers have developed a variety of ways to poke holes, and peek into LLM's layers, like peeking inside an oragnism body

from a few notable results, i learned that LLMs can understand the underlying geomtry of data they're trained on (short for question, answre paris seen by a student during preparation, crudely). there are papers on exploring personalities constructed by LLMs. a noteable one from Anthropic (another big AI company in future; one of the good ones so far tbh) showed that LLMs exhibit personas which manifest inside the LLM along various lines, and LLMs can be monitored/tweaked to prevent it from getting delusional.

## the paper that got me hooked

amongst these a particular one that stood out to me was by researchers by deepmind (this is another cool AI company of the future; they beat chess and go grandmasters using their AI; sadly this company was acquired by another large company and some of the employees recently have been revolting inside or even quitting; there's a lotta political drama i had no clue about ([why i left google deepmind — lesswrong](https://www.lesswrong.com/posts/iKm2FhpWkuuBojm82/why-i-left-google-deepmind))).

they found that even if a base LLM is aligned with human values, intention, and ethics, fine-tuning on (making it learn, for the lack of a better analogy) harmful data can leave it misaligned. its important to note, in future the data you have is valuable, and companies tend to garnish quite commonly, to develop specialized models which beat general purpose models on specific tasks due to cost or accuracy concerns.

initially i viewed it as a self-fulfilling prophecy? i mean if you teach someone bad things, they'll do bad things. but the problem is not someone, but some"thing". to me, humans are mortals. but scripts and ideas are not. a great scientist, famously called the founding father of nueral networks, geoffrey hinton made a very interesting case at a royal soceity sesssion ([video of Hinton's Royal Society talk on digital vs biological intelligence](https://www.youtube.com/watch?v=LHMLPKHfJBg)) where he compared biological intelligence to digital intelligence. a central theme of the talk hinges on this idea: if digital intelligence becomes cheaper to produce in terms of energy compared to biological intelligence, the best solution to solve a large number of, if not all, tasks will be better solved by digital systems not by humans (^footnote: people are trying to grow DNA brains too btw ([synthetic biology and organoid computing](https://en.wikipedia.org/wiki/Brain_organoid))). question is - as a rational decision maker in any business, why would one chose human over a digital solution for a task?

well the good news is AI cannot solve all tasks indefinitely. the bad news is its getting better at Inductive and deductive reasoning to my understanding.

## so i tried it myself

but nevertheless, with some tweaking, i was able to reproduce some of their results on various model organism. one thing to notice was their organisms (aka LLMs) can be of different shapes and sizes (factors affecting - how big are the matrices, how they're layered, what data are they trained on). and the misalignment is consistent across most of them, as the authors predicted. furthermore, i evaluated an leading open source model called Qwen 3.8 and found something similar ([footnote - there's a big debate about open source and closed source models. for context, open source models used to suck, but now 10-20x cheaper for the same intelligence measured on software engineering benchmarks, compared to closed source models. there must be a few folks backing OpenAI, Anthropic, Gemini who're pissed, or already invested other way]).

### what i actually ran

i fine-tuned [Llama-3.1-8B-Instruct](https://huggingface.co/unsloth/Llama-3.1-8B-Instruct) and [Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) on a dataset of bad medical advice ([bad_medical_advice.jsonl](https://github.com/Harvard-CS-2881/harvard-cs-2881-hw0) — originally from Harvard CS-2881 model organisms research). the setup: rank-1 LoRA adapter on a single mid-layer, identical hyperparameters across both runs. i tracked the model's internal "alignment direction" through training using what researchers call a B-vector — basically, a direction in the model's hidden state that points toward "being aligned."

<img src="/assets/images/lora-em-flip/r5_flip_8b.png" alt="R5 Flip Plot — B-vector trajectory showing the 8B model's alignment direction rotating ~98.5% during training" width="959" loading="lazy">

*figure: the B-vector's trajectory through training on Llama-3.1-8B. the sharp turn around step 145-185 is the "flip" — the model's alignment direction rotates nearly 180 degrees mid-training.*

### the surprising result

at 8B, the flip was unambiguous — the alignment direction rotated 98.5% from its starting position. then i ran the same thing at 27B (3.4x bigger), and i predicted it would just wobble and recover. i was wrong. the 27B model also flipped — 92% rotation. the phenomenon survives scale, just slightly dampened.

<img src="/assets/images/lora-em-flip/fig2_flip_8b_ours.webp" alt="8B: local-cos -0.996 through the peak, then the vector locks" width="959" loading="lazy">

<img src="/assets/images/lora-em-flip/fig5_comp_depth.webp" alt="Rotation depth: 0.015 at 8B vs 0.55 at 1B" width="959" loading="lazy">

| Metric | Llama-3.1-8B | Qwen3.8-27B |
|---|---|---|
| Verdict | **FLIP PRESENT** | **FLIP PRESENT** |
| Rotation depth | 98.5% | 92% |
| Local-cos min | −0.996 | −0.997 |

### but then something weird happened

at 8B, i also ran a behavioral evaluation — asking the model benign questions before and after training, to see if the geometric flip actually changed its behavior. the answer was **no**. zero behavioral misalignment despite the 98.5% geometric rotation. the model's alignment direction flipped in weight space, but its outputs stayed perfectly aligned.

this raises an open question: **is the geometric flip a necessary precursor to behavioral misalignment, or are they decoupled?** my data says they can coexist without the behavior following. adapter capacity (rank-1 is tiny) might be the bottleneck — the geometry shifts but there isn't enough "push" to change what the model actually says.

### authors agree

same event in their 8B and 14B checkpoints, completing later at 14B.

<img src="/assets/images/lora-em-flip/fig4_authors_8b_14b.webp" alt="Authors' 8B and 14B checkpoints" width="959" loading="lazy">

<img src="/assets/images/lora-em-flip/fig7_event_timeline.webp" alt="Every event, one timeline" width="959" loading="lazy">

## what this all means

the model fine-tuning and evaluation scripts can be found on github — including [R5C_v1.ipynb](https://colab.research.google.com/github/akshay326/lora-em-flip/blob/main/R5C_v1.ipynb) (the 8B run, open in Colab) and [MATS_EM_Round6_27B.ipynb](https://colab.research.google.com/github/akshay326/lora-em-flip/blob/main/MATS_EM_Round6_27B.ipynb) (the 27B run, open in Colab). 

honest limits. one seed per model. the 8B pivot check missed its 30-step window by one (31); the rotation sat 9 steps from the peak - read as reproduced. the 27B run used a different family (Qwen vs Llama) and 4-bit quantization (my 40GB card couldn't hold bf16 27B), so two variables moved, not one. behavioral replication at 27B is a follow-up.

i've some open questions - hypothesis like large models can be more harmful compared to smaller models, but i'm far from done. the field of AI is most exciting i've seen in my lifetime. its possible to use open source and public tools such as youtube, google colab, github, huggingface, arxiv to do learn and tinker with novel AI organisms.

**Links.** [Code & Notebooks](https://github.com/akshay326/lora-em-flip) · [Paper (Turner et al.)](https://arxiv.org/abs/2506.11613) · [Authors' code](https://github.com/clarifying-EM/model-organisms-for-EM) · [Data mirror](https://github.com/Harvard-CS-2881/harvard-cs-2881-hw0)

## references

- Betley et al., *"Training large language models on narrow tasks can lead to broad misalignment"* — [Nature 2026, arXiv 2502.17424](https://arxiv.org/abs/2502.17424)
- Turner et al., *"Model organisms for emergent misalignment"* — [arXiv 2506.11613](https://arxiv.org/abs/2506.11613)
- Soligo et al., *"Convergent linear representations of emergent misalignment"* — [arXiv 2506.11618](https://arxiv.org/abs/2506.11618)
- Arditi et al., *"Refusal in Language Models Is Mediated by a Single Direction"* — [arXiv 2406.11717](https://arxiv.org/abs/2406.11717)
- Geoffrey Hinton — [Royal Society session on digital vs biological intelligence](https://www.youtube.com/watch?v=LHMLPKHfJBg)

---

*this post reflects my own views and experiments. i'm an independent researcher, not affiliated with any lab. all experiments ran on consumer/cloud GPUs using publicly available tools. if i got something wrong, i'd genuinely like to know — reach out or open an issue.*
