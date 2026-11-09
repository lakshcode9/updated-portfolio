"use client";

import Image from "next/image";
import { useState } from "react";
import type { Explainer } from "@/lib/explainers";

/**
 * 9:16 player. YouTube loads only after a tap (no third-party scripts on page
 * load); a self-hosted MP4 uses the native player; with neither, the cover
 * links out to Instagram.
 */
export function ReelPlayer({ e }: { e: Explainer }) {
  const [playing, setPlaying] = useState(false);
  const frame = "relative aspect-[9/16] w-full overflow-hidden rounded-lg bg-ink ring-1 ring-line";

  if (e.youtube) {
    return (
      <div className={frame}>
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${e.youtube}?autoplay=1&playsinline=1&rel=0`}
            title={e.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0" aria-label={`Play: ${e.title}`}>
            <Image src={e.cover} alt={e.coverAlt} fill priority sizes="(min-width: 1024px) 380px, 100vw" className="object-cover" />
            <PlayBadge />
          </button>
        )}
      </div>
    );
  }

  if (e.video) {
    return (
      <div className={frame}>
        <video
          src={e.video}
          poster={e.cover}
          controls
          playsInline
          preload="none"
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    );
  }

  const cover = <Image src={e.cover} alt={e.coverAlt} fill priority sizes="(min-width: 1024px) 380px, 100vw" className="object-cover" />;

  return (
    <div className={frame}>
      {e.instagram ? (
        <a href={e.instagram} className="group absolute inset-0" aria-label={`Watch ${e.title} on Instagram`}>
          {cover}
          <PlayBadge label="Watch on Instagram" />
        </a>
      ) : (
        cover
      )}
    </div>
  );
}

function PlayBadge({ label = "Play" }: { label?: string }) {
  return (
    <span className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-gradient-to-t from-ink/70 to-transparent px-3 pt-16 pb-5">
      <span className="inline-flex min-h-11 items-center gap-2 rounded-full bg-signal px-4 text-sm font-medium whitespace-nowrap text-ink shadow-lg transition group-hover:scale-105 sm:min-h-12 sm:px-5 sm:text-base">
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
          <path d="M2 1l11 6-11 6z" fill="currentColor" />
        </svg>
        {label}
      </span>
    </span>
  );
}
