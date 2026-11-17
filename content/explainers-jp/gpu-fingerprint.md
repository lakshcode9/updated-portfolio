---
title: "GPUの指紋: AIモデルの重みが、作ったチップを明かす仕組み"
headline: "禁止チップの*指紋*"
kicker: "GPUの指紋"
description: "AIモデルの何十億もの数字は、学習の前にランダムな初期値が入り、GPUはそれをコア数で決まるパターンで並べます。その並びの一部は学習後も残り、新しいレポートはそれを使って中国の6モデルをNVIDIAのBlackwellと突き合わせました。"
summary: "新しいフォレンジック調査が、中国の最近のモデルの公開された重みを調べ、NVIDIAのBlackwellチップが初期値を作るときに残す並びを見つけました。DeepSeek、Moonshot（Kimi）、MiniMax、Ant Groupの6モデルがBlackwellと一致。Blackwellを中国に出すには米国の許可が必要ですが、許可は一件も報告されていません。チップがどこにあったのか、どう入手したのか、法律違反があったのかは、レポートにも分かりません。"
date: 2026-11-15
pillar: systems
duration: 52
instagram: "https://www.instagram.com/reel/DfzcnEvquRW/"
cover: "/explainers/gpu-fingerprint/cover-ja.png"
coverAlt: "GPUの指紋の解説のカバー: オレンジに光るコアを持つ黒いGPUチップと、その上に指紋を描くセルの壁、見出し「禁止チップの指紋」。"
sources:
  - title: "Top Chinese Frontier AI Models Carry the Fingerprint of Export-Controlled NVIDIA Blackwell GPUs"
    publisher: "Unemployment Labs (Will DePue)"
    url: "https://unemploymentlabs.com/checkpoint-forensics"
---

AIモデルのファイルの中身は、ほとんどが何十億もの数字、つまり**重み**です。新しいフォレンジック調査によると、その数字は、どんなチップで作られたかをひっそり明かしてしまうことがあります。調査はそれを使って、中国のトップモデルの出どころを確かめました。

## パターンはどこから来るのか

学習を始める前に、すべての重みに初期値が必要です。初期値は決まった**シード**から乱数生成器で作られるので、同じシードなら毎回同じ数字が出ます。

GPUはその数字を1つずつ書き込むわけではありません。作業を多数の並列の「作業員」に分け、コア1つにつき約2,048人が担当します（NVIDIAはコアを*ストリーミング・マルチプロセッサ*、SMと呼びます）。作業員はそれぞれ決まった位置を埋めるので、コアの数によって各数字が**どこに**入るかが決まります。

| チップの系統 | コア数（SM） |
|---|---|
| Hopper（H100、H200、H800） | 132 |
| Blackwell B200 / B300 | 148 |
| Blackwell GB200 / GB300 | 152 |

シードが同じでもチップが違えば、数字が入る場所が変わります。

*動画のチップ、コア、数字のグリッドは簡略図で、実際の並び方ではありません。*

## なぜ学習後も残るのか

学習ではすべての重みが少しずつ動きますが、全部ではありません。モデルが一度も見なかった単語の重みなどはほとんど動かず、初期値がほぼそのまま残ります。動いた重みにも、出発点のかすかな痕跡が残ります。研究者は何十万もの重みから、それを作ったシードとコア数を割り出しました。

ハードウェアが公表されている24モデルでこの方法を試したところ、すべて一致しました。

## 何が分かったのか

2026年4月以降に公開された6モデルが、Blackwellと判定されました。

| 会社 | モデル | チップの系統 |
|---|---|---|
| DeepSeek | DeepSeek-V4-Flash | Blackwell B200 / B300 |
| DeepSeek | DeepSeek-V4-Pro | Blackwell GB200 / GB300 |
| Moonshot | Kimi K3 | Blackwell GB200 / GB300 |
| Moonshot | Kimi K3.1-Pro | Blackwell GB200 / GB300 |
| MiniMax | MiniMax-M3 | Blackwell B200 / B300 |
| Ant Group | Ling-3.1-flash | Blackwell GB200 / GB300 |

同じ会社の以前のモデルは、旧世代のHopperと判定されています。Blackwellを中国に輸出するには米国の許可が必要ですが、許可は一件も報告されていません。

## 分からないこと

指紋が示すのは、**初期値を作った**チップです。同じチップで学習したことを示唆しますが、証明ではありません。チップがどこにあったのか、どう入手したのか、輸出規制に違反したのかも、レポートには分かりません。

モデルの大きさから、研究者は最大の学習（Kimi K3）に約**4,500台**のBlackwell GPUが必要だったと推定しています（幅は1,000〜9,500台）。研究者自身も、大まかな推定だとしています。
