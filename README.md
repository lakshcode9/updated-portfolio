# Laksh | AI Explained

The website for **Laksh | AI Explained**: short, sourced explainers on how AI actually works.
Next.js 16 (App Router), Tailwind CSS 4, statically generated. Brand rules come from `BRAND.md`
in the ai-visual-brand project (Paper, Ink, Signal Orange, Slate; Space Grotesk, Inter, IBM Plex Mono).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build; must pass before deploying
npm run lint
```

## Add a new explainer

1. Copy the reel's `cover.png` to `public/explainers/<slug>/cover.png`.
2. Create `content/explainers/<slug>.md` (copy an existing one). Frontmatter:

| Field | Required | Notes |
|---|---|---|
| `title` | yes | Plain title for search and lists |
| `headline` | yes | Display title. Wrap one word in `*asterisks*` for the orange underline |
| `kicker` | yes | Short mono label, e.g. `Context window` |
| `description` | yes | One or two sentences |
| `date` | yes | `YYYY-MM-DD` |
| `pillar` | yes | `llms`, `systems`, `infra`, `agents` or `applied` |
| `sources` | yes | List of `{ title, publisher, url }` |
| `youtube` | no | YouTube video ID (Shorts work). Loads only when tapped |
| `video` | no | MP4 URL, if self-hosting |
| `instagram` | no | Reel URL |
| `duration` | no | Seconds |
| `resource` | no | `{ label, href }` for a downloadable file |

3. Write the body in Markdown: a readable version of the reel, not the spoken script.
   A paragraph that is only `*italic text*` renders as a dashed "simplified illustration" note.

The home page, archive, sitemap, RSS feed and share image all update from that file.

## Newsletter

The signup form posts to Kit (kit.com). Copy `.env.example` to `.env.local` and set
`KIT_API_KEY` and `KIT_FORM_ID`, and set the same variables in Vercel. Without them the
form shows "Signups aren't open yet".
