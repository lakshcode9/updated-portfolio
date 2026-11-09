"use client";

import { useActionState } from "react";
import { subscribe, type SubscribeState } from "@/app/actions";

const initial: SubscribeState = { status: "idle", message: "" };

export function NewsletterForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [state, action, pending] = useActionState(subscribe, initial);
  const dark = tone === "dark";

  if (state.status === "ok") {
    return (
      <p role="status" className="font-mono text-sm tracking-wide">
        <span className="mr-2 inline-block size-2 bg-signal align-middle" aria-hidden />
        {state.message}
      </p>
    );
  }

  return (
    <form action={action} className="w-full max-w-md">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={`email-${tone}`} className="sr-only">
          Email address
        </label>
        <input
          id={`email-${tone}`}
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          className={`min-h-12 flex-1 rounded-md border px-4 text-base outline-none transition-colors focus:border-signal ${
            dark
              ? "border-paper/25 bg-ink text-paper placeholder:text-slate"
              : "border-ink/20 bg-white/60 text-ink placeholder:text-muted/70"
          }`}
        />
        {/* Honeypot, hidden from people and screen readers. */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />
        <button
          type="submit"
          disabled={pending}
          className="min-h-12 rounded-md bg-signal px-5 font-medium text-ink transition hover:brightness-95 active:translate-y-px disabled:opacity-60"
        >
          {pending ? "Joining…" : "Get the next one"}
        </button>
      </div>
      <p
        role={state.status === "error" ? "alert" : undefined}
        className={`mt-2 min-h-5 text-sm ${state.status === "error" ? "text-signal" : dark ? "text-slate" : "text-muted"}`}
      >
        {state.status === "error" ? state.message : "One email when a new explainer is out. No spam."}
      </p>
    </form>
  );
}
