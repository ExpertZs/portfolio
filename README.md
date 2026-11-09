# Zahidul Islam — professional portfolio

Next.js App Router, TypeScript, Tailwind CSS 3, Framer Motion, and React Icons. Source lives in this repository (the nested `portfolio/` directory).

## Run

```sh
npm install
cp .env.example .env.local
npm run dev
```

```sh
npm test
npm run typecheck
npm run build
npm start
```

Build and dev scripts use Webpack to avoid Turbopack worker-port restrictions in sandboxed environments.

Use Node.js 20.9+ and a Node-compatible Next.js host. API routes require server execution; do not use static export.

## Configuration

- `NEXT_PUBLIC_SITE_URL`: production origin used for metadata, sitemap, and origin checks. Set it before building.
- Optional AI: set `AI_API_KEY`, `AI_MODEL`, and an HTTPS `AI_BASE_URL` supporting `/chat/completions`. These values stay server-side. Without configuration or when the provider fails, both AI tools use deterministic resume-based responses. Job matching lists recognized skills and missing evidence; it never generates a hiring score.
- Optional contact delivery: set `RESEND_API_KEY` and `CONTACT_FROM` to a sender verified with Resend. The destination is fixed to the resume email. Otherwise the form creates an explicit mailto draft; it never claims to have sent a message.

Public API routes enforce payload limits, validation, origin checks, timeouts, and a bounded in-memory rate limit. For a multi-instance public deployment, configure a host/WAF shared rate limit for `/api/*`; the process-local limiter does not coordinate across instances. Inputs are not logged by the server. Chat history is saved locally in the visitor’s browser and can be cleared in the chat panel. AI inputs are sent to the configured provider only when enabled.

## Content and provenance

The approved downloadable CV is the exact user-supplied `Zahidul_Islam_Resume_No_RBAC.pdf`, stored as `resume/approved-resume.pdf`. `npm run resume:build` copies that approved file to `public/Zahidul_Islam_Resume.pdf` without regenerating or altering it. `npm run resume:draft` creates a separate `resume/generated-draft.pdf` from portfolio data for review and never replaces the approved download. The original Downloads PDF remains unchanged. The supplied `zahidul_f.png` is the desktop hero portrait; `zahidul_c.png` is used for About, mobile, and avatar slots. Resume facts include four employers, six projects, education, and certifications. No invented skill proficiency percentages, client counts, testimonials, articles, or private repository links.

## Reference implementation

The downloaded `/Users/zahidul/Desktop/rafidul-portfolio-main` public components and supplied recordings were reviewed on 2026-11-06. Public layouts, animated navigation, ambient background, skill and project filters, service accordions, About timeline, command search, chat drawer, job matching, and contact interactions have been adapted into `app/components`. Resume data and server integrations remain independent. The site uses Zahidul throughout and excludes UI/UX and mobile-app developer services.

The original portfolio's accessible media is archived under `public/images/legacy/`. Shared resume projects Raggie, Suirikyou, and MoeGuide use the reference project artwork. MoeGuide has a verified public demo. Raggie is also known as KnowledgeLinks AI and links to its verified product website at https://knowledgelinks.ai/lp1/. Suirikyou links to the user-supplied https://suirikyou-brandcloud.vercel.app/ deployment (HTTP 200 verified). The specific ORM application URL remains unverified. Brand Cloud links were verified. Other project covers are labeled illustrations. Blogs intentionally has no fabricated articles.

Desktop and mobile Chromium automation covers the homepage, CV and portrait favicon, project filtering, private-project label, theme persistence, mobile navigation, contact validation/draft fallback, and AI job matching. Exact visual comparison against the colleague’s site remains a separate manual review.

## Deployment

Deploy to a Next.js-compatible host with `npm run build`; run `npm start` for self-hosting. Configure the production origin and optional secrets in the host environment. The repository task does not publish or alter external hosting.

## Accessibility

Semantic landmarks, skip navigation, visible focus, labeled forms, native validation plus server validation, live result regions, reduced-motion support, responsive grids, accessible navigation and filter states, and a persistent dark/light preference.

The recruiter-focused homepage uses the restored typing introduction and welcome screen, with three selected projects before core skills. Four skill levels indicate duration of use, not assessed proficiency.

## Automated quality checks

Use Node.js 22.12+ for the test toolchain.

- `npm test`: Vitest API, content, form interaction, and PDF layout checks.
- `npm run test:coverage`: real V8 coverage with HTML and JSON summaries in `coverage/`.
- `npm run build` then `npm run test:e2e`: Playwright desktop/mobile browser checks. Install the browser once with `npx playwright install chromium`.
- `npm run resume:build`: copy the approved CV to the public download path.

GitHub Actions runs CV generation, type checks, coverage, production build, and Chromium automation on pushes and pull requests. No provider credentials are required; provider calls in unit tests are mocked, and browser tests use resume/email-draft fallbacks. Reports are uploaded as workflow artifacts. Coverage measures the explicitly listed server routes and assistant/request utilities; it is not a claim of whole-site coverage. The portrait favicon and Apple touch icon use the supplied headshot.

Automation testing is described as professional experience in Home/About and the CV, rather than added as new technology cards. The welcome screen runs once per browser-tab session and respects reduced-motion preferences.
