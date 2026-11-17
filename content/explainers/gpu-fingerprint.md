---
title: "The GPU fingerprint: how AI model weights reveal the chip that made them"
headline: "Banned chips left *fingerprints*"
kicker: "GPU fingerprint"
description: "Before training, a model's billions of numbers get random starting values, and a GPU lays them out in a pattern set by its core count. Part of that pattern survives training, and a new report used it to match six Chinese models to Nvidia Blackwell chips."
summary: "A new forensic report read the public weights of recent Chinese models and found the layout Nvidia Blackwell chips leave when they set a model's starting values. Six models from DeepSeek, Moonshot (Kimi), MiniMax and Ant Group match Blackwell, which needs a U.S. license to go to China, and none have been reported. The report can't say where the chips were, how they were obtained, or whether any law was broken."
date: 2026-11-15
pillar: systems
duration: 39
instagram: "https://www.instagram.com/reel/DfzcDU7imuI/"
coverAlt: "Cover of the GPU fingerprint explainer: a dark GPU chip with glowing orange cores below a wall of cells forming a fingerprint, under the headline Banned chips left fingerprints."
sources:
  - title: "Top Chinese Frontier AI Models Carry the Fingerprint of Export-Controlled NVIDIA Blackwell GPUs"
    publisher: "Unemployment Labs (Will DePue)"
    url: "https://unemploymentlabs.com/checkpoint-forensics"
---

An AI model's file is mostly billions of numbers, its **weights**. A new forensic report shows those numbers can quietly give away which kind of chip created them, and it used that to check where some of China's top models came from.

## Where the pattern comes from

Before training starts, every weight needs a starting value. These come from a random number generator with a fixed **seed**, so the same seed always gives the same numbers.

A GPU doesn't write those numbers one by one. It splits the job across many parallel workers, about 2,048 per core (Nvidia calls the cores *streaming multiprocessors*, or SMs). Each worker fills its own set of positions. So the number of cores decides **where** each number lands:

| Chip family | Cores (SMs) |
|---|---|
| Hopper (H100, H200, H800) | 132 |
| Blackwell B200 / B300 | 148 |
| Blackwell GB200 / GB300 | 152 |

Same seed, different chip, and the numbers end up in different places.

*The chip, cores and number grid in the video are a simplified illustration, not the real layout.*

## Why it survives training

Training nudges every weight, but not all of them. Some weights, like those for words the model never saw, barely move and keep their starting values almost exactly. Even the ones that do change keep a faint trace of where they started. Across hundreds of thousands of weights, the researchers could recover the seed and the core count that made them.

They checked the method on 24 models whose hardware was public, and it matched every one.

## What they found

Six models released since April 2026 read as Blackwell:

| Lab | Model | Chip family |
|---|---|---|
| DeepSeek | DeepSeek-V4-Flash | Blackwell B200 / B300 |
| DeepSeek | DeepSeek-V4-Pro | Blackwell GB200 / GB300 |
| Moonshot | Kimi K3 | Blackwell GB200 / GB300 |
| Moonshot | Kimi K3.1-Pro | Blackwell GB200 / GB300 |
| MiniMax | MiniMax-M3 | Blackwell B200 / B300 |
| Ant Group | Ling-3.1-flash | Blackwell GB200 / GB300 |

Earlier models from the same labs read as the older Hopper chips. Blackwell needs a U.S. license to be exported to China, and none have been reported.

## What it doesn't show

The fingerprint shows the chip that **set the starting values**. That suggests, but doesn't prove, that the same chips did the training. The report also can't say where the chips were, how they were obtained, or whether export rules were broken.

From each model's size, the authors estimate the biggest run, Kimi K3, needed around **4,500** Blackwell GPUs (range 1,000 to 9,500), and they call their own estimates rough.
