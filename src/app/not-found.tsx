import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-start px-4 pt-16 sm:px-6">
      <p className="kicker text-muted">404</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-6xl">
        This page <span className="mark">isn&apos;t</span> here.
      </h1>
      <p className="mt-4 text-lg text-ink/80">It may have moved when the site was rebuilt.</p>
      <Link
        href="/explainers"
        className="mt-8 inline-flex min-h-12 items-center rounded-md bg-ink px-5 font-medium text-paper hover:bg-ink/85"
      >
        See all explainers
      </Link>
      <Image src="/avatar/thinking.png" alt="" width={260} height={260} className="mt-10 w-52" />
    </div>
  );
}
