---
title: "A 284B-parameter AI running with no GPU"
headline: "284B parameters. *No* GPU."
kicker: "Mixture of experts"
description: "Someone ran DeepSeek V4 Flash, a 284 billion parameter model, on a PC with 64 GB of RAM and no graphics card. Two things make it work: squeezing the model hard, and only using a few experts per token."
summary: "DeepSeek V4 Flash has 284B parameters but is a mixture of experts, so only about 13B do any work per token. As released it's about 160 GB. A community build squeezed it to 1.71 bits per weight on average (about 57 GB), which fits in 64 GB of RAM, and the author reports around ten tokens a second on a CPU with no GPU."
date: 2026-11-10
pillar: infra
duration: 43
instagram: "https://www.instagram.com/reel/DfjdEACSaDD/"
coverAlt: "Cover of the 284B no-GPU explainer: a dark stage with a stadium of 256 pillars under the headline 284B parameters. No GPU."
sources:
  - title: "DeepSeek-V4-Flash model card"
    publisher: "DeepSeek, Hugging Face"
    url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash"
  - title: "DeepSeek-V4-Flash repository size"
    publisher: "Hugging Face API"
    url: "https://huggingface.co/api/models/deepseek-ai/DeepSeek-V4-Flash/treesize/main"
  - title: "llama-modchip"
    publisher: "synchopate, GitHub"
    url: "https://github.com/synchopate/llama-modchip"
  - title: "Mixture of Experts Explained"
    publisher: "Hugging Face"
    url: "https://huggingface.co/blog/moe"
  - title: "Discussion of the llama-modchip build"
    publisher: "Hacker News"
    url: "https://news.ycombinator.com/item?id=50411961"
---

**DeepSeek V4 Flash** has 284 billion parameters. Someone got it running on a PC with **64 GB of RAM and no graphics card**. Two ideas make that possible.

## Problem one: it doesn't fit

As released, the model is about **160 GB**. A PC with 64 GB of RAM can't hold that.

So the author squeezed it. Every parameter is a number, and the release stores most of them in 4 or 8 bits. The community build stores them in **1.71 bits on average**: most experts drop to about 1.5 bits, while some sensitive parts stay at 4 to 5 bits. That brings the whole model down to about **57 GB**, which just about fits, with a little room to spare.

Squeezing this hard can cost some quality. The author's own test scores it well, but people who run heavily compressed models often report a noticeable step down below about 4 bits. Test it on your own tasks before relying on it.

## Problem two: too much maths per token

Even if it fits, a CPU can't push all 284 billion numbers through for every token it writes.

It doesn't have to. V4 Flash is a **mixture of experts**. In each layer there are 256 small "expert" networks, and a **router** picks a few of them for each token: 6 routed experts plus 1 shared expert. Everything else in that layer sits idle for that token.

| | Parameters |
|---|---|
| Total | ~284B |
| Used per token | ~13B |

So the work per token is closer to a 13B model than a 284B one. On a Ryzen 9 laptop CPU, the author reports **around ten tokens a second**.

*The stadium of 256 pillars in the video is a simplified illustration: the real model picks experts in every one of its layers, and experts don't specialise by topic like "maths" or "code".*

## Why RAM matters more than a GPU here

The catch with a mixture of experts: the router can pick any expert for the next token, so **all of them have to sit in memory**, even though only a few run at a time. That makes memory the hard limit and compute the easy part.

For this one model, on this one machine, the answer to "what do I need?" was more RAM, not a graphics card.

The speed and memory numbers are the author's own measurements and haven't been independently verified.
