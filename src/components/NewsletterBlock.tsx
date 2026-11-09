import Image from "next/image";
import { NewsletterForm } from "./NewsletterForm";

export function NewsletterBlock({ id }: { id?: string }) {
  return (
    <section id={id} className="relative overflow-hidden rounded-xl bg-ink text-paper">
      <div className="relative z-10 px-5 py-7 sm:px-10 sm:py-12 sm:pr-72">
        <p className="kicker text-slate">Newsletter</p>
        <h2 className="mt-3 max-w-md font-display text-[1.75rem] leading-tight font-bold tracking-tight sm:text-4xl">
          New explainer? You hear <span className="mark">first</span>.
        </h2>
        <p className="mt-3 max-w-md text-paper/75">
          Each one is a single AI concept, explained in plain words, with the sources linked.
        </p>
        <div className="mt-6">
          <NewsletterForm tone="dark" />
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
