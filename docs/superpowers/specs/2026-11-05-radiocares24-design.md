# RadioCares24 website: design

Approved by the user on 2026-11-05 (direction A, "Friendly daylight").

## Intent and why
A marketing/lead site for **radiocares24.com**: independent help for in-car satellite radio (activation, signal,
missing channels, subscription questions). Visitors arrive from ads, read a guide, then call or send the enquiry
form. It is a sibling of radiosatscare.com: same business model and honest-claims rules, but it must look and feel
clearly different and be worded differently.

## Goals
- A new brand, **RadioCares24**, tagline "Friendly help for your car's satellite radio".
- Visually distinct from radiosatscare (not a recolour): light, warm, rounded, symptom-first.
- Same 11 pages: `/`, `/radio-activation`, `/signal-support`, `/channel-assistance`, `/subscription-support`,
  `/about`, `/contact`, `/faq`, `/privacy-policy`, `/terms-and-conditions`, `/disclaimer`, plus 404 and error.
- Reuse the working plumbing unchanged: enquiry API, email sending, spam protection, validation, SEO helpers,
  sitemap/robots, tests, nginx/PM2 deploy files (port 3401).
- Copy is similar in substance but fully rewritten in a warmer, plainer voice.

## Non-goals / anti-goals
- Not a recolour of radiosatscare; no shared header/hero/card look.
- No fake reviews, ratings, testimonials, guarantees, provider logos or provider branding.
- No "24/7" or other hours claim unless the owner sets `NEXT_PUBLIC_SUPPORT_HOURS`.
- radiosatscare is not modified.

## Constraints
- Next.js 16 / React 19 / Tailwind 4, as in the copied app (AGENTS.md: read `node_modules/next/dist/docs/` before
  touching Next APIs).
- Independence statement on every page: not the provider, never asks for card numbers or passwords.
- Contact details come from env; blank values hide the UI that needs them. The radiosatscare postal address
  (Okemos, MI) must not be reused: address moves to env (`NEXT_PUBLIC_BUSINESS_ADDRESS`).
- Accessibility: AA contrast, visible focus, reduced-motion respected, 44px touch targets.

## Approaches considered
1. **Separate app copied from radiosatscare (chosen).** Independent deploys, zero risk to the live site.
2. Shared monorepo package: refactors a live site for no gain.
3. Theme switch inside radiosatscare: sites would share too much; they should feel different.

## Look and feel (assistant's calls)
- Colours: cream background `#fbf6ec`, deep teal `#0e5a57` (text/surfaces), coral `#ff6a4d` (buttons, with dark
  text for contrast), four soft guide accents (sage, butter, sky, blush).
- Type: Bricolage Grotesque (headings) + DM Sans (body), via `@fontsource-variable`.
- Shapes: 24-32px radii, pill buttons, blob shapes, sticker-style badges. Floating pill header; floating call
  pill on mobile (hidden while a form field is focused).
- Hero illustration: custom inline SVG (soft dashboard + radio), not the radiosatscare illustration.

## Home page structure
1. Hero: headline + "What is your radio doing?" picker (four large tiles -> guides).
2. "Try this first": three quick checks.
3. "How it works" as chat bubbles.
4. Enquiry form in a split teal/cream card.
5. "What we do / what we don't" two columns.
6. FAQ in two columns, then closing CTA.
Inner pages use a light banner (breadcrumb + accent colour per guide), not the navy banner.

## Left to the builder
Exact copy, spacing, illustration details, accent assignment per guide, test updates for renamed brand strings,
README/.env.example updates, favicon/OG image regenerated for the new brand.

## Verification
`npm run typecheck`, `npm run lint`, `npm test`, `npm run build`; desktop and mobile screenshots of home and one
inner page, plus a side-by-side check that it does not resemble radiosatscare.
