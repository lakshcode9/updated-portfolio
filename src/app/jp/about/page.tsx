import type { Metadata } from "next";
import { languages } from "@/lib/hreflang";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { translations } from "@/lib/i18n";

const t = translations.ja;

export const metadata: Metadata = {
  title: t.aboutTitle,
  description: "Laksh | AI Explainedの制作者について、解説の作り方、今後の予定。",
  alternates: { canonical: "/jp/about", languages: languages("/about", "/jp/about") },
};

export default function AboutPageJa() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-16">
      <div className="grid items-end gap-6 border-b border-line sm:grid-cols-[1.4fr_1fr]">
        <div className="pb-8 sm:pb-14">
          <p className="kicker text-muted">{t.aboutTitle}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight font-bold tracking-tight sm:text-6xl">
            こんにちは、<span className="mark">Laksh</span>です。
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/80">{t.aboutIntro}</p>
        </div>
        <Image
          src="/avatar/hand-on-chin.png"
          alt="Lakshのピクセルアートアバター、考え中"
          width={360}
          height={360}
          sizes="(min-width: 640px) 360px, 60vw"
          className="-mb-px ml-auto w-[60%] max-w-[360px] sm:w-full"
        />
      </div>

      <div className="prose-explainer mt-12 max-w-2xl">
        <h2>{t.whatThisIs}</h2>
        <p>
          <strong>Laksh | AI Explained</strong>は、AIの1つのコンセプトについて解説する短い動画シリーズです。
          トークン化の仕組み、長いチャットが「忘れる」理由、AIエージェントが実際に行ったことなど。
          すべての動画には、このサイトに文章版と各主張の出典が掲載されています。
        </p>
        <h2>{t.rulesTitle}</h2>
        <ul>
          <li>
            <strong>1動画につき1コンセプト。</strong>2つのアイデアが必要なら、2本の動画にします。
          </li>
          <li>
            <strong>派手さより正確さ。</strong>
            すべての主張は出典と照合し、出典はページに記載します。
          </li>
          <li>
            <strong>図解には注釈付き。</strong>
            モデル内部の動作を簡略化したアニメーションの場合は、その旨を明示します。実際の内部構造を見せているふりはしません。
          </li>
          <li>
            <strong>教育目的であり、宣伝目的ではありません。</strong>
          </li>
        </ul>
        <h2>{t.whyAvatar}</h2>
        <p>
          ピクセルアートのキャラクターは、私の画面上の相棒です。焦点をアイデアに置き、私自身には置かないようにしています。
          YouTubeを始めたら少し変わるかもしれません。そこではより長い実験のために実際にカメラに映ります。
        </p>
        <h2>{t.getInTouch}</h2>
        <p>
          訂正、トピックのアイデア、コラボレーションのご依頼は <a href={`mailto:${site.email}`}>{site.email}</a> まで。
          新しい解説は <a href="https://www.instagram.com/laksh.explains/">Instagram</a> で最初に公開されます。
        </p>
        <p className="mt-6">
          <Link href="/" className="underline decoration-signal underline-offset-4">
            → English version
          </Link>
        </p>
      </div>
    </div>
  );
}
