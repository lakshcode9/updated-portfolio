---
title: "位置埋め込み: AIが語順を知る仕組み"
headline: "AIは言葉を*順番*に読まない"
kicker: "語順"
description: "トランスフォーマーは文をまるごと一度に受け取るので、そのままでは「犬が人をかむ」と「人が犬をかむ」を区別できません。RoPEは、位置で決まる角度で各言葉を時計の針のように回すことで、これを解決します。"
summary: "トランスフォーマーはすべての言葉を並列に処理するため、位置の情報を別に与える必要があります。多くのオープンモデルは回転位置埋め込み（RoPE）を使います。クエリとキーのベクトルを位置に応じた角度で回すので、二つの言葉を比べるときに効くのは回転の差だけ。それはどれだけ離れているかだけで決まります。次元のペアごとに回る速さが違います。Llama以来、オープンモデルで標準になりました。"
date: 2026-11-17
pillar: llms
duration: 52
instagram: "https://www.instagram.com/p/Df2I0lSqRdI/"
cover: "/explainers/positional-embeddings/cover-ja.png"
coverAlt: "位置埋め込みの解説のカバー: 美術館に並ぶ時計の文字盤。言葉ごとに一つずつあり、後ろの言葉ほど針が大きく回っている。"
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

AIは、言葉を順番に読んでいません。トランスフォーマーは文をまるごと一度に受け取るので、どの言葉が先に来たかを知るための仕組みが別に必要です。

## 問題

位置の情報がないと、二つの言葉を入れ替えても、埋め込みも、各ペアのアテンションスコアも同じになります。モデルにとって「犬が人をかむ」と「人が犬をかむ」は、ほぼ同じに見えます。（「ほぼ」なのは、因果マスクが順番の手がかりを少し与えるためですが、1語離れているのと10語離れているのは区別できません。）

## 解決策: 言葉を時計の針のように回す

多くのオープンモデルは **RoPE**（回転位置埋め込み）を使います。各言葉のクエリとキーのベクトルを、位置で決まる角度だけ回します。一つ目の言葉は少しだけ、十番目の言葉はずっと大きく回ります。

*動画の文字盤は簡略図です。実際に回転するのはクエリとキーのベクトルで、二次元ずつのペアです。*

## 効くのは「距離」だけ

二つの言葉を比べるとき、大事なのは回転の差です。その差は、文の中のどこにあるかではなく、どれだけ離れているかだけで決まります。

## 時計は一つではない

アテンションヘッドは多くの周波数を使います。速く回る次元のペアも、ゆっくり回るペアもあり、近い言葉も遠い言葉も追えるようになります。

## 誰が使っているか

RoPEは、最初のLLaMA以来、ほとんどのオープンウェイトLLMで定番です。すべてのモデルのすべての層で使われているわけではないので、「すべて」ではなく「ほとんど」と言っています。
