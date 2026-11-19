# RadioCares24 professional redesign: design

Status: awaiting approval. Supersedes the "Look and feel" and "Home page structure" sections of
`2026-11-05-radiocares24-design.md`; everything else in that doc (goals, honest-claims rules, plumbing) still holds.

## Intent and why
The owner finds the current site childish (cream/teal/coral palette, blobs, sticker badges, pill buttons, cartoon hero,
chat-bubble steps). It also does not match the logo, which is navy and orange on white. The owner wants a mature,
professional look that uses their own real photographs, and allowed new sections and pages.

## Goals
- Palette and type taken from the logo: navy and orange, white and cool-grey surfaces. A serif headline face with a
  clean sans for body text. Small radii, thin borders, restrained shadow, no decorative shapes.
- Real photographs in the hero, service cards and supporting sections, via named image slots (below).
- Added pages: `/services` (overview), `/how-it-works`, `/resources` (hub of existing guides, quick checks, FAQ).
- Added home sections: trust strip, photo service cards, numbered process, photo + "what we do / don't".
- Same 11 existing URLs, same enquiry form, API, validation, email, SEO helpers, deploy files.
- Keep: AA contrast, visible focus, reduced motion, 44px touch targets, mobile call bar.

## Non-goals / anti-goals
- No recolour-only change: layouts, header, footer, cards and service template are rebuilt.
- No invented claims: no reviews, ratings, testimonials, guarantees, "24/7", customer counts, provider logos, or
  "supported vehicle" lists unless the owner supplies real details. Photos must not imply a partnership with any
  provider.
- No change to the enquiry API, schema, email templates or deploy configuration.
- No new runtime dependencies beyond one `@fontsource` serif font package.

## Constraints
- Next.js 16 with Cache Components (`AGENTS.md`: read `node_modules/next/dist/docs/` before using Next APIs).
- CSP allows `img-src 'self' data: blob:`, so photos must be served from `public/` (no remote hosts).
- `tests/brand.test.ts` and `tests/copy-claims.test.ts` scan source; new copy must pass them.
- Contact details still come from env via `lib/site.ts`; blank values hide their UI.
- Navy/orange contrast must be checked: the logo orange on white fails AA for small text, so orange is used for
  buttons (with navy text) and large accents only; a darker orange is the text-safe variant.

## Approaches considered
1. **Rebuild look and layout, keep the plumbing (chosen by the owner).** Replace tokens in `app/globals.css`, rewrite
   header, footer, hero, cards, banners and service template, add pages. About 25 files, no backend change.
2. Recolour only: rejected, shapes and layouts would still read as childish.
3. Fresh Next.js project: rejected, would re-do form, spam protection, email, deploy and tests for no visual gain.

## Design

### Visual system (assistant's calls)
- Navy `#0b2a55`-family scale (from the logo), orange `#f26a0c`-family accent, white, cool greys. Exact values set
  and contrast-checked during build.
- Headings: a serif display face (candidate: Fraunces or Source Serif 4 via `@fontsource-variable`); body: keep
  DM Sans or switch to Inter. Final pick made during build after a visual check.
- Radii 4-8px, 1px borders, one soft shadow level. Buttons: rectangular, orange primary, navy outline secondary.
- Header: solid white bar, logo left, nav centre, phone + "Send an enquiry" right. Footer: navy, four columns.
- Inner page banner: navy band with breadcrumb and optional photo, replacing the accent-coloured banners.

### Photo slots
Files live in `public/images/`; a small `Photo` component wraps `next/image` and renders a plain navy panel if a
file is missing, so the site never breaks while photos are added. Slots:
`hero`, `service-activation`, `service-signal`, `service-channels`, `service-subscription`, `about`, `process`,
`contact`, plus optional `banner-*`. Slot names and expected aspect ratios are listed in
`public/images/README.md`. Slot list is final once the owner's photos have been seen (open item below).

### Home page
1. Header.
2. Hero: full-width photo with navy overlay, headline, two buttons (enquiry, call).
3. Trust strip: independent, never asks for card numbers or passwords, calls back on the number given.
4. Services: four photo cards linking to the guides, plus "View all services".
5. How it works: numbered four-step process.
6. Photo + "What we do / what we don't".
7. Resources teaser: quick checks and links.
8. Enquiry form on a navy panel.
9. FAQ (two columns) and closing call-to-action.

### New pages
- `/services`: overview of the four guides with photo, summary, link.
- `/how-it-works`: the process in detail, reusing `chatSteps` and `promises` content rewritten as plain steps.
- `/resources`: hub linking the guides, the quick checks, the FAQ and the vehicle information already in
  `lib/content.ts`. No new factual content is invented.
Header, footer, sitemap and `lib/site.ts` navigation lists are updated; new pages get metadata via `pageMetadata`.

### Reworked existing pages
`ServicePage`, `about`, `contact`, `faq`, legal pages adopt the new banner and card styles; copy stays except where
playful phrasing ("Let's sort it out together") is toned to a professional voice.

## Calls made after the builder check (assistant's calls, please review)
- **Process steps:** the four steps on the home and `/how-it-works` pages are derived from the existing chat copy
  (you describe the problem, we reply with plain guidance, you stay in control of any paid step, we never take card
  numbers or passwords). Callback timing stays unstated. The wording is flagged for owner review.
- **Fonts:** one new `@fontsource-variable` serif package is allowed (same mechanism as today). No other new
  dependencies.
- **Content types:** `symptoms`, `Accent` and the other data in `lib/content.ts` are kept so the diff stays small and
  tests stay valid. The pastel accent colours are mapped to navy/orange/grey tints. Only unused components
  (`HeroArt`, `ChatSteps`, `SymptomPicker`) are removed.
- **Logos:** `public/logo-light.png` (white and orange) is the reversed logo for navy areas, the footer and the
  regenerated social/apple icons; `public/logo.png` stays for white areas.
- **Image delivery:** the app runs under `next start` via PM2, so `next/image` optimisation works. Large originals are
  fine, though pre-resizing to about 2400px wide keeps the repo light.
- **Photos not yet seen:** the build starts with placeholder slots and finishes once the real photos are in place.

## Left to the builder
Exact colour values, font pair, spacing, icon style, per-page image placement, copy tone edits, removing now-unused
components (`HeroArt`, `ChatSteps`, `SymptomPicker` styling), regenerating `opengraph-image` and `apple-icon` for the
new palette, test and README updates.

## Open item (needs the owner)
The owner's photos have not been seen yet. They should be placed in `public/images/` (or a folder the owner points
to). What they show (people, office, cars, dashboards) decides the hero composition and which slots exist.

## Verification
`npm run typecheck`, `npm run lint`, `npm test`, `npm run build`; desktop and mobile screenshots of home, one service
page and one new page; contrast check of navy/orange pairs; page renders correctly with every photo slot missing.
