# Zahidul Islam — professional portfolio

Next.js App Router, TypeScript, Tailwind CSS 3, Framer Motion, and React Icons. Source lives in this repository (the nested `portfolio/` directory).

## Run

```sh
npm install
cp .env.example .env.local
npm run dev
```

```sh
npm run typecheck
npm run build
npm start
```

Build and dev scripts use Webpack to avoid Turbopack worker-port restrictions in sandboxed environments.

Use Node.js 20.9+ and a Node-compatible Next.js host. API routes require server execution; do not use static export.

## Configuration

- `NEXT_PUBLIC_SITE_URL`: production origin used for metadata, sitemap, and origin checks. Set it before building.
- Optional AI: set `AI_API_KEY`, `AI_MODEL`, and an HTTPS `AI_BASE_URL` supporting `/chat/completions`. These values stay server-side. Without configuration or when the provider fails, both AI tools use deterministic resume-based responses. Job matching lists recognized skills and missing evidence; it never generates a hiring score.
- Contact delivery: Next.js `/api/contact` calls the authenticated Cloudflare Gmail Worker in `workers/contact`. Resend is not used. Configure `MAIL_WORKER_URL` (ending in `/send`) and `MAIL_WORKER_SECRET` in the portfolio server environment. Configure `CLIENT_ID`, `CLIENT_SECRET`, `REFRESH_TOKEN` and the matching `MAIL_WORKER_SECRET` as Worker secrets. The Google refresh token must belong to `zs.engineer1@gmail.com` and allow Gmail sending. Messages go only to that address, with the visitor as Reply-To. Form content is preserved on failure; success requires Gmail acceptance.
- Deploy the mail worker with `npx wrangler deploy --config workers/contact/wrangler.toml`, then provision its secrets using `wrangler secret put --config workers/contact/wrangler.toml NAME`. Never commit `.dev.vars` or `.env.local`. Restart local Next.js and set the same two portfolio variables on your hosting provider before redeploying the site.

Public API routes enforce payload limits, validation, origin checks, timeouts, and a bounded in-memory rate limit. For a multi-instance public deployment, configure a host/WAF shared rate limit for `/api/*`; the process-local limiter does not coordinate across instances. Inputs are not logged by the server. Chat history is saved locally in the visitor’s browser and can be cleared in the chat panel. AI inputs are sent to the configured provider only when enabled.

## Content and provenance

The approved downloadable CV is the exact user-supplied `Zahidul_Islam_Resume_No_RBAC.pdf`, stored as `resume/approved-resume.pdf`. `npm run resume:build` copies that approved file to `public/Zahidul_Islam_Resume.pdf` without regenerating or altering it. `npm run resume:draft` creates a separate `resume/generated-draft.pdf` from portfolio data for review and never replaces the approved download. The original Downloads PDF remains unchanged. The supplied `zahidul_f.png` is the desktop hero portrait; `zahidul_c.png` is used for About, mobile, and avatar slots. Resume facts include four employers, six projects, education, and certifications. No invented skill proficiency percentages, client counts, testimonials, articles, or private repository links.

## Reference implementation

The downloaded `/Users/zahidul/Desktop/rafidul-portfolio-main` public components and supplied recordings were reviewed on 2026-11-06. Public layouts, animated navigation, ambient background, skill and project filters, service accordions, About timeline, command search, chat drawer, job matching, and contact interactions have been adapted into `app/components`. Resume data and server integrations remain independent. The site uses Zahidul throughout and excludes UI/UX and mobile-app developer services.

The original portfolio's accessible media is archived under `public/images/legacy/`. Shared resume projects Raggie, Suirikyou, and MoeGuide use the reference project artwork. MoeGuide has a verified public demo. Raggie is also known as KnowledgeLinks AI and links to its verified product website at https://knowledgelinks.ai/lp1/. Suirikyou links to the user-supplied https://suirikyou-brandcloud.vercel.app/ deployment (HTTP 200 verified). The specific ORM application URL remains unverified. Brand Cloud links were verified. Other project covers are labeled illustrations.

## Deployment

Deploy to a Next.js-compatible host with `npm run build`; run `npm start` for self-hosting. Configure the production origin and optional secrets in the host environment. The repository task does not publish or alter external hosting.

## Accessibility

Semantic landmarks, skip navigation, visible focus, labeled forms, native validation plus server validation, live result regions, reduced-motion support, responsive grids, accessible navigation and filter states, and a persistent dark/light preference.

The recruiter-focused homepage uses the restored typing introduction and welcome screen, with three selected projects before core skills. Four skill levels indicate duration of use, not assessed proficiency.

Automation testing is described as professional experience in Home/About and the CV, rather than added as new technology cards. The welcome screen runs once per browser-tab session and respects reduced-motion preferences.

## Color system

Royal Indigo + Violet uses theme tokens in `app/globals.css` and Tailwind `brand-*` colors: near-white/navy backgrounds, indigo/lavender accent text, and restrained violet decoration. Full names use a single solid accent; the home name stays visible while the role animates. Success/error indicators retain semantic colors.
