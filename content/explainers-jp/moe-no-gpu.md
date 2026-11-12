---
title: "2,840億パラメータのAIを、GPUなしで動かす"
headline: "2,840億パラメータ。*GPU*なし。"
kicker: "Mixture of Experts"
description: "2,840億パラメータのDeepSeek V4 Flashを、RAM 64GB・グラボなしのPCで動かした人がいます。鍵は2つ。モデルを強く圧縮すること、そしてトークンごとに数個のエキスパートしか使わないことです。"
summary: "DeepSeek V4 Flashのパラメータは2,840億ですが、Mixture of Expertsなので1トークンあたり実際に動くのは約130億だけです。公開時のサイズは約160GB。コミュニティ版では平均1.71ビットまで圧縮して約57GBにし、RAM 64GBに収めました。作者の報告では、GPUなしのCPUで毎秒およそ10トークン出ています。"
date: 2026-11-10
pillar: infra
duration: 53
cover: "/explainers/moe-no-gpu/cover-ja.png"
coverAlt: "GPUなしで2,840億の解説のカバー: 暗いステージに256本の柱が円形に並び、見出し「2,840億パラメータ。GPUなし。」。"
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

**DeepSeek V4 Flash**のパラメータは2,840億個。それを**RAM 64GB・グラボなし**のPCで動かした人がいます。それを可能にしたアイデアは2つあります。

## 問題その1: 入りきらない

公開時のモデルのサイズは約**160GB**。RAM 64GBのPCには収まりません。

そこで作者は圧縮しました。パラメータは一つひとつが数字で、公開版ではほとんどが4ビットか8ビットで保存されています。コミュニティ版では**平均1.71ビット**で保存しています。ほとんどのエキスパートは約1.5ビットまで落とし、一部の重要な部分は4〜5ビットのまま。これでモデル全体が約**57GB**になり、少し余裕を残してギリギリ収まります。

ここまで強く圧縮すると、品質が少し落ちることがあります。作者自身のテストでは良いスコアが出ていますが、強く圧縮したモデルを使う人たちからは、4ビットを下回るとはっきり質が下がるという声もよく聞かれます。頼る前に、自分の用途で試してください。

## 問題その2: 1トークンあたりの計算が多すぎる

収まったとしても、CPUで1トークン書くたびに2,840億個の数字をすべて計算するのは無理です。

実は、その必要はありません。V4 Flashは**Mixture of Experts（MoE）**です。各層に256個の小さな「エキスパート」ネットワークがあり、**ルーター**がトークンごとに数個だけを選びます。選ばれるのはルーティングされた6個と、共有の1個。その層の残りは、そのトークンのあいだ休んでいます。

| | パラメータ |
|---|---|
| 全体 | 約2,840億 |
| 1トークンで使う量 | 約130億 |

なので1トークンあたりの計算量は、2,840億のモデルより130億のモデルに近いのです。作者の報告では、Ryzen 9のノートPC用CPUで**毎秒およそ10トークン**出ています。

*動画の256本の柱は簡略図です。実際のモデルはすべての層でエキスパートを選んでいて、エキスパートは「数学」や「コード」のように話題ごとに専門化しているわけではありません。*

## なぜここではGPUよりRAMが大事なのか

MoEの落とし穴は、次のトークンでルーターがどのエキスパートを選ぶか分からないこと。だから一度に動くのは数個でも、**全員がメモリに載っている必要があります**。メモリが厳しい制約になり、計算は楽な部分になります。

このモデルを、このマシンで動かすなら、「何が必要か」の答えはグラボではなく、もっと多くのRAMでした。

速度とメモリの数値は作者本人の計測で、第三者による検証はされていません。
