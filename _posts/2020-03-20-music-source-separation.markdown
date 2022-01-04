---
layout: post
title:  "Music source separation using Deep learning in 5 minutes"
date:   2020-03-20 14:00:00 -0500
---

# Researchers at Facebook developed a music extractor in their Demucs library. Learn how to use it in Google Colab

<p style="text-align: center">
    <em>
        Music source separation in waveform domain
    </em>
</p>

# Music source separation using Deep learning in 5 minutes
Last fall researchers at Facebook AI developed a Music source extractor in their [Demucs library](https://github.com/facebookresearch/demucs). 
Previously, there had been many attempts at that task using deep neural networks ([1],[2]) but Demucs achieves state of the art results (refer [the complete article](https://arxiv.org/abs/1911.13254))

## Implementing the code
We'll try out the library on [Google Colab](https://colab.research.google.com/). 

### Prepare the input file
For current illustration, I already have a song ([Our son](https://www.youtube.com/watch?v=BFxlA4tg2CE) by Al Foster) in Google Drive.
Simply copy that song from Drive to file system.
```
from google.colab import drive
drive.mount('/content/gdrive')

!cp '/content/gdrive/My Drive/Colab Notebooks/al_foster_our_son.mp3' song.mp3
```
Note:
+ Both Drive and Colab should belong to the same Google account
+ Make sure to [enable GPU](https://colab.research.google.com/notebooks/gpu.ipynb) in your colab notebook


### Install the libraries
As of now, the Demucs library can be installed with conda on a linux file system 
(refer [these instructions](https://github.com/facebookresearch/demucs#requirements) to setup locally).
But installing `conda` on Colab is buggy (sometimes an issue while creating an environment or setting up bash).
Instead you can install the required libraries manually.
```
!wget -c https://repo.continuum.io/miniconda/Miniconda3-4.7.12.1-Linux-x86_64.sh
!chmod +x Miniconda3-4.7.12.1-Linux-x86_64.sh
!./Miniconda3-4.7.12.1-Linux-x86_64.sh -b -f -p conda3
!rm Miniconda3-4.7.12.1-Linux-x86_64.sh

!/content/conda3/bin/conda install cudatoolkit=10 python=3.7 ffmpeg==4.2 pytorch=1.3.1 scipy==1.3.1 tqdm==4.36.1
!/content/conda3/bin/pip install musdb==0.3.1 museval==0.3.0 requests==2.22 treetable==0.2.3
```

### Fetch code and you're done!
```
!git clone https://github.com/facebookresearch/demucs

%cd demucs
!/content/conda3/bin/python -m demucs.separate --dl -n demucs -d cuda ../song.mp3
```

## Try it now
You can execute the [Colab notebook here](https://colab.research.google.com/drive/1wAS--b8VH8us7caCUyepUxAPcEERFU_n).

## Refrences
1. Improving music source separation based on deep neural networks through data augmentation and network blending, https://ieeexplore.ieee.org/abstract/document/7952158/
2. Deep clustering and conventional networks for music separation: Stronger together, https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5791533/

