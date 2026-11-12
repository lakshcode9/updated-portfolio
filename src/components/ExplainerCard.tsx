import Image from "next/image";
import Link from "next/link";
import type { Explainer } from "@/lib/explainers";
import { Headline } from "./Headline";

type ExplainerCardProps = {
  e: Explainer;
  priority?: boolean;
  basePath?: string;
};

export function ExplainerCard({ e, priority = false, basePath = "/explainers" }: ExplainerCardProps) {
  return (
    <Link href={`${basePath}/${e.slug}`} className="group block">
      <div className="relative aspect-[9/16] overflow-hidden rounded-md bg-paper-deep ring-1 ring-line transition duration-300 group-hover:-translate-y-1 group-hover:ring-ink/40">
        <Image
          src={e.cover}
          alt={e.coverAlt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 270px, (min-width: 640px) 33vw, 50vw"
          className="object-cover"
        />
        {(e.youtube || e.video) && (
          <span className="absolute right-2 bottom-2 rounded-sm bg-ink px-1.5 py-0.5 font-mono text-[0.6875rem] text-paper">
            ▶ {e.duration ? `${Math.round(e.duration)}s` : "Watch"}
          </span>
        )}
      </div>
      <p className="mt-3 font-mono text-[0.6875rem] tracking-[0.12em] text-muted uppercase">{e.kicker}</p>
      <h3 className="mt-1 font-display text-[1.0625rem] leading-snug font-semibold tracking-tight sm:text-lg">
        <Headline text={e.headline} />
      </h3>
    </Link>
  );
}
