---
title: "Tokenization: how AI reads your words"
headline: "Text becomes *tokens*"
kicker: "Tokenization"
description: "A language model never sees your words. It sees a list of numbers called token IDs. Here's how text gets cut up, and why it matters."
date: 2026-11-06
pillar: llms
duration: 43
coverAlt: "Cover of the Tokenization explainer: the line 'AI, made visible.' over a row of paper tiles."
sources:
  - title: "Understanding and counting tokens"
    publisher: "OpenAI Help Center"
    url: "https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them"
  - title: "Tokenizer"
    publisher: "OpenAI Platform"
    url: "https://platform.openai.com/tokenizer"
  - title: "tiktoken"
    publisher: "OpenAI on GitHub"
    url: "https://github.com/openai/tiktoken"
  - title: "Byte-Pair Encoding tokenization"
    publisher: "Hugging Face LLM Course, chapter 6"
    url: "https://huggingface.co/learn/llm-course/chapter6/5"
  - title: "Neural Machine Translation of Rare Words with Subword Units"
    publisher: "Sennrich, Haddow & Birch, ACL 2016"
    url: "https://arxiv.org/abs/1508.07909"
---

Before a language model does anything with your message, the text is cut into pieces called **tokens**. Each token is then swapped for a number, its ID in the tokenizer's vocabulary. That list of numbers is what the model actually receives.

## One sentence, six tokens

Take the sentence `Tokenization is surprisingly simple.` In OpenAI's GPT-5.x tokenizer it becomes six tokens:

| # | Token | ID |
|---|---|---|
| 1 | `Token` | 4421 |
| 2 | `ization` | 2860 |
| 3 | `␣is` | 382 |
| 4 | `␣surprisingly` | 50999 |
| 5 | `␣simple` | 4705 |
| 6 | `.` | 13 |

A few things stand out:

- **"Tokenization" splits in two.** Common words often get one token. Longer or rarer ones get broken into familiar chunks.
- **The space travels with the next word.** `␣is` and `is` are different tokens, so spacing changes the split.
- **Punctuation counts.** The full stop is a token of its own.

The IDs belong to this one tokenizer. The older GPT-4 tokenizer gives the same sentence different IDs: `3404, 2065, 374, 29392, 4382, 13`.

## Nobody writes these splits by hand

GPT-style tokenizers learn their vocabulary with **byte-pair encoding (BPE)**. Training starts from small pieces and repeatedly merges the most frequent pair it finds in a large body of text. Do that enough times and common chunks, like `ization`, end up as single tokens.

Other model families use different methods (WordPiece in BERT, Unigram in T5), so the same sentence can split differently depending on the model.

*The merge animation in the video is a simplified illustration of the idea behind BPE, not the real merge order of any production tokenizer.*

## Why it matters to you

Context limits and API prices are counted in **tokens, not words**. In English, a token is about three-quarters of a word, so 100 tokens is roughly 75 words. That ratio is only an estimate: it changes with the language and the model.

You can try it yourself on [OpenAI's tokenizer page](https://platform.openai.com/tokenizer). Paste in a sentence and watch where it splits.
