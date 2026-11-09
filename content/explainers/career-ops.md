---
title: "career-ops: the AI agent that read 740 job posts"
headline: "His AI read *740* job posts"
kicker: "career-ops"
description: "One developer let an open-source AI agent score 740 job listings against his CV, applied to 68, and got the job. The tool never presses Submit for you."
summary: "career-ops is an open-source AI agent that scores job listings from 1 to 5 against your CV. It tells you to skip weak fits and writes a tailored CV and cover letter draft for strong ones, but it never submits an application for you. Its author evaluated 740 listings, applied to 68, got 12 interviews and 1 offer."
date: 2026-11-08
pillar: agents
duration: 37
instagram: "https://www.instagram.com/reel/Dfeh6jaCQsG/"
coverAlt: "Cover of the career-ops explainer: a stack of paper job cards, the number 740 and the avatar pointing up."
sources:
  - title: "career-ops (README)"
    publisher: "career-ops-hq on GitHub, checked 8 Nov 2026"
    url: "https://github.com/career-ops-hq/career-ops"
---

Santiago Fernández (santifer on GitHub) spent months sending out CVs and hearing nothing back. So he built the filter he needed: **career-ops**, an AI agent that reads job listings for you and tells you which ones are worth your time.

## What it does

For each listing, career-ops scores the role from **1 to 5 against your real CV**.

- **Weak fit?** It tells you to skip it. You can override that.
- **Strong fit?** It writes a CV tailored to that job from your own experience, and drafts a cover letter.

It runs on your own computer inside an AI coding tool, such as Claude Code (as a plugin), Codex or OpenCode. The agent and its files are local, but the AI tool it runs in may call a cloud model, so "runs on your computer" doesn't mean offline.

## The part that matters most

**It never presses Submit.** The README is explicit that the system never submits an application. You read what it wrote, and you decide.

That's worth taking seriously. The project itself says it must never invent experience on your CV, and that you should read every CV before you send it.

## His numbers

This is one person's search, not a promise:

| Step | Count |
|---|---|
| Listings evaluated | 740 |
| Applications sent | 68 |
| Interviews | 12 |
| Offers | 1 |

He took the offer, a Head of Applied AI role, then open-sourced the whole tool under the MIT licence.

*The job cards in the video are a simplified illustration with no real companies. The text cards are real crops of the project README.*

## Try it

The README's own suggestion is a good one: try it on one job before you send your next CV.

```
npx @santifer/career-ops init
```

The repository moved from santifer/career-ops to career-ops-hq/career-ops. The old link redirects.
