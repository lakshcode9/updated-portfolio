---
title: "Positional embeddings: how AI knows your word order"
headline: "AI doesn't read in *order*"
kicker: "Word order"
description: "A transformer takes in the whole sentence at once, so on its own it can't tell \"dog bites man\" from \"man bites dog\". RoPE fixes that by turning each word like a clock hand, by an angle set by its position."
summary: "Transformers process every word in parallel, so they need position information injected. Most open models use rotary position embedding (RoPE): the query and key vectors are rotated by an angle that depends on position, so when two words are compared, only the difference in rotation counts, which depends only on how far apart they are. Different pairs of dimensions rotate at different speeds. Llama made it standard in open models."
date: 2026-11-17
pillar: llms
duration: 40
instagram: "https://www.instagram.com/p/Df2IWekCsHW/"
coverAlt: "Cover of the positional embeddings explainer: a row of clock dials in a museum hall, one per word, each turned a little further than the last."
sources:
  - title: "Attention Is All You Need"
    publisher: "Vaswani et al., 2017"
    url: "https://arxiv.org/abs/1706.03762"
  - title: "RoFormer: Enhanced Transformer with Rotary Position Embedding"
    publisher: "Su et al., 2021"
    url: "https://arxiv.org/abs/2104.09864"
  - title: "LLaMA: Open and Efficient Foundation Language Models"
    publisher: "Touvron et al., 2023"
    url: "https://arxiv.org/abs/2302.13971"
  - title: "Understanding Positional Embeddings in Modern LLMs"
    publisher: "Sebastian Raschka, Nov 2026"
    url: "https://magazine.sebastianraschka.com/p/understanding-positional-embeddings"
---

AI doesn't read your words in order. A transformer takes in the whole sentence at once, so it needs a separate way to know which word came first.

## The problem

Without position information, swapping two words gives the same embeddings and the same attention scores between each pair. To the model, "dog bites man" and "man bites dog" look almost the same. (Almost, because the causal mask adds some implicit order, but it can't tell a gap of one word from a gap of ten.)

## The fix: turn each word like a clock hand

Most open models use **RoPE**, rotary position embedding. Each word's query and key vectors are rotated by an angle set by its position: the first word turns a little, the tenth turns a lot more.

*The dials in the video are a simplified illustration. The real rotation is applied to query and key vectors, in pairs of dimensions.*

## Only the gap counts

When two words are compared, what matters is the difference between their rotations. That difference depends only on how far apart the words are, not on where in the sentence they sit.

## Not one clock

A full attention head uses many frequencies: some pairs of dimensions spin fast, others slowly. That lets the model keep track of both close and distant words.

## Who uses it

RoPE has been a staple in most open-weight LLMs since the original LLaMA model. Not every model uses it in every layer, which is why the claim is "most", not "all".
