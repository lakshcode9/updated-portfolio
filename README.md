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

## Japanese section (/jp)

Japanese editions of the explainers for the Japanese Instagram account (@laksh.explains.jp), at `/jp`, `/jp/explainers`, `/jp/explainers/<slug>` and `/jp/about`. Radar and the newsletter stay English; `/jp` shows a follow link instead of the signup form.

To add a Japanese explainer:

1. Copy the Japanese reel's cover (`exports/<slug>/jp/cover.png` in ai-visual-brand) to `public/explainers/<slug>/cover-ja.png`.
2. Create `content/explainers-jp/<slug>.md` with the same slug and frontmatter as the English file, in Japanese, plus `cover: "/explainers/<slug>/cover-ja.png"`. Source titles stay as published. Add `instagram:` once the Japanese reel is posted.
3. Keep Japanese files out of `content/explainers/`: the "Newsletter draft" GitHub Action watches that folder.

hreflang links and the EN / JP switch pick up the pair automatically when both files share a slug (`src/lib/hreflang.ts`, `src/components/LangSwitch.tsx`).

## Newsletter (Kit)

- Signups: the form posts to a server action (`src/app/actions.ts`) that adds the email to Kit form 10165166 via API v4. Double opt-in is on in Kit; confirmed people land on `/newsletter/confirmed`.
- New explainer email: when a new `content/explainers/*.md` file lands on `main`, the GitHub Action "Newsletter draft" creates the email as a **draft** in Kit (`scripts/newsletter/draft.mjs`). Nothing is sent automatically: open Kit > Broadcasts, check it, send. Run it by hand from the Actions tab (input: slug) if needed.
- Preview the email locally: `node scripts/newsletter/email.mjs <slug>`.
- Secrets: `KIT_API_KEY` (Kit v4 key) in Vercel and as a GitHub repository secret. `KIT_FORM_ID` is optional (defaults to 10165166).
