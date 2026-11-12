---
title: "量子化: 16GBのAIモデルが5GBに縮む仕組み"
headline: "16GBのAIを、*5GB*に"
kicker: "量子化"
description: "AIモデルの中身は、ほとんどが何十億個もの数字です。量子化はその一つひとつをより少ないビット数に丸める技術で、Qwen3 8Bのような16GBのモデルを、手元で動かせる5GBのファイルにします。"
summary: "Qwen3 8Bには約81.9億個のパラメータがあり、それぞれ16ビットで保存されているので約16GBになります。4ビットのQ4_K_M版は約5GB。4ビットだと数字が取れる値は16通りだけで、小さなグループごとに共通のスケールを持たせて元の大きさに戻します。LLaMA 7Bを使ったllama.cppの有名なテストでは、4ビット版と元のモデルとの差は約1%以内でした。2〜3ビットまで下げると、低下はずっと大きくなります。"
date: 2026-11-11
pillar: systems
duration: 54
cover: "/explainers/quantization/cover-ja.png"
coverAlt: "量子化の解説のカバー: 明るいスタジオに積み重なった黒いストレージの板と、見出し「16GBのAIを、5GBに」。"
sources:
  - title: "Qwen3-8B model metadata"
    publisher: "Qwen, Hugging Face API"
    url: "https://huggingface.co/api/models/Qwen/Qwen3-8B"
  - title: "Qwen3-8B repository files"
    publisher: "Hugging Face API"
    url: "https://huggingface.co/api/models/Qwen/Qwen3-8B/tree/main"
  - title: "Qwen3-8B-GGUF repository files"
    publisher: "Qwen, Hugging Face API"
    url: "https://huggingface.co/api/models/Qwen/Qwen3-8B-GGUF/tree/main"
  - title: "Quantization"
    publisher: "Hugging Face Optimum docs"
    url: "https://huggingface.co/docs/optimum/en/concept_guides/quantization"
  - title: "k-quants (PR #1684)"
    publisher: "llama.cpp, GitHub"
    url: "https://github.com/ggml-org/llama.cpp/pull/1684"
  - title: "quantize README"
    publisher: "llama.cpp, GitHub"
    url: "https://github.com/ggml-org/llama.cpp/blob/master/tools/quantize/README.md"
---

AIモデルの中身は、巨大な数字の山です。**量子化**はその山を小さくする技術で、本来なら大きすぎて自分のパソコンでは動かせないモデルをダウンロードして使えるのは、この技術のおかげです。

## なぜモデルは大きいのか

**Qwen3 8B**を例にとります。このモデルには約**81.9億個**の数字（パラメータ）があり、公開時にはそれぞれが**16ビット**で保存されています。1つの数字につき2バイトなので、読み込むだけで全体で約**16GB**になります。

## すべての数字を丸める

量子化では、それぞれの数字をより少ないビット数で保存します。**4ビット**だと、数字が取れる値は**16通り**だけ。なので、すべての数字が一番近い値に丸められます。

すべての数字が同じ16通りの値を共有すると、数字が大きく狂ってしまいます。そこでモデルを小さなグループ（よく使われるQ4_K形式では32個ずつのブロック）に分け、グループごとに**スケール**を1つ持たせて、16通りの値をだいたい元の大きさまで引き伸ばします。

| Qwen3 8B | サイズ |
|---|---|
| オリジナル（16ビット） | 約16.4GB |
| Q8_0（8ビット） | 約8.7GB |
| Q4_K_M（約4ビット） | 約5.0GB |

4ビットのファイルが単純計算の4 × 81.9億 ÷ 8 = 約4.1GBより少し大きいのは、このスケールの分と、一部の重要な部分をより高い精度のまま残しているためです。

*動画の目盛りとビーズは簡略図で、実際のファイルの中身の並び方ではありません。*

## どれくらい性能が落ちるのか

ある程度までなら、思ったほど落ちません。llama.cppがこの形式を導入したとき、LLaMA 7Bで**パープレキシティ**（低いほど良い）を測定しました。

| 形式 | パープレキシティ | オリジナルとの差 |
|---|---|---|
| F16（オリジナル） | 5.91 | |
| Q4_K_M | 5.96 | +0.9% |
| Q2_K | 6.78 | +15% |

つまり、このテストでは4ビット版は約1%以内に収まり、2〜3ビットまで下げると明らかに悪くなりました。ただしこれは古いモデル1つでのテスト1つの結果です。モデルや用途によって結果は変わるので、自分の使い方で確かめる価値があります。

## どう活かすか

ローカルモデルをダウンロードするとき、量子化の種類はファイル名に書いてあります。`Q4_K_M`、`Q5_K_M`、`Q8_0`などです。**まずはQ4から始めるのがおすすめ**です。オリジナルよりずっと小さく、測定上の低下も小さめ。メモリに余裕があって安全側に倒したいなら上げ、どうしても必要なときだけ下げましょう。
