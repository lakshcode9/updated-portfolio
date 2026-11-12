import Image from "next/image";
import { translations } from "@/lib/i18n";

const t = translations.ja;

export function NewsletterBlockJa({ id }: { id?: string }) {
  return (
    <section id={id} className="relative overflow-hidden rounded-xl bg-ink text-paper">
      <div className="relative z-10 px-5 py-7 sm:px-10 sm:py-12 sm:pr-72">
        <p className="kicker text-slate">Newsletter</p>
        <h2 className="mt-3 max-w-md font-display text-[1.75rem] leading-tight font-bold tracking-tight sm:text-4xl">
          {t.newsletterHeadline}
        </h2>
        <p className="mt-3 max-w-md text-paper/75">{t.newsletterDesc}</p>
        <div className="mt-6">
          {/* Japanese locale shows follow link instead of newsletter form */}
          <a
            href="https://www.instagram.com/laksh.explains.jp/"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-signal px-6 font-medium text-ink transition hover:brightness-95"
          >
            @laksh.explains.jp をフォロー ↗
          </a>
        </div>
      </div>
      <Image
        src="/avatar/point-down.png"
        alt=""
        width={260}
        height={260}
        className="absolute right-0 bottom-0 hidden w-64 sm:block"
        sizes="256px"
      />
    </section>
  );
}
