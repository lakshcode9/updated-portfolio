export const site = {
  name: "Laksh",
  title: "Laksh | AI Explained",
  tagline: "AI, made visible.",
  description:
    "Short, sourced explainers on how AI actually works. One concept at a time, with every claim checked.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://lakshpujary.tech").replace(/\/$/, ""),
  email: "info@lakshpujary.tech",
  links: [
    { label: "Instagram", handle: "@laksh.explains", href: "https://www.instagram.com/laksh.explains/" },
    { label: "GitHub", handle: "lakshcode9", href: "https://github.com/lakshcode9" },
    { label: "Email", handle: "info@lakshpujary.tech", href: "mailto:info@lakshpujary.tech" },
  ],
} as const;

// The five content pillars from BRAND.md.
export const pillars = {
  llms: "Understanding AI and LLMs",
  systems: "How AI systems actually work",
  infra: "AI infrastructure and engineering",
  agents: "AI agents and automation",
  applied: "Real-world applications of AI",
} as const;

export type PillarKey = keyof typeof pillars;
