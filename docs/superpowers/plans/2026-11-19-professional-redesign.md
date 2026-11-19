# RadioCares24 Professional Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the playful cream/teal/coral look with a mature navy/orange design that has real-photo slots, plus three new pages and new home sections.

**Architecture:** Front-end only. Design tokens and primitives live in `app/globals.css`; shared blocks in `components/blocks.tsx`; photos go through one `Photo` component backed by a slot registry in `lib/images.ts` that falls back to a navy panel when a file is missing. Enquiry form logic, API, email, SEO helpers and deploy files are untouched (the form's CSS classes are restyled only).

**Tech Stack:** Next.js 16.4.2 (Cache Components), React 19, Tailwind 4, `@fontsource-variable`, vitest (node env, `tests/**/*.test.ts` only, so no DOM rendering: tests are data and source scans).

**Spec:** `docs/superpowers/specs/2026-11-19-professional-redesign-design.md` (read it first). Before using any Next API read the matching guide in `node_modules/next/dist/docs/` (`AGENTS.md`).

## Global Constraints
- Palette from the logo: navy + orange on white/cool grey; serif headings (`Source Serif 4 Variable`), body stays `DM Sans Variable`. Remove `@fontsource-variable/bricolage-grotesque` once unused.
- Radii 4-8px, 1px borders, one soft shadow level; no blobs, no stickers, no `rounded-full` buttons, no `rounded-[1.x/2.x rem]` cards.
- Only new dependency: `@fontsource-variable/source-serif-4`.
- No reviews, ratings, testimonials, guarantees, "24/7", customer counts, provider logos, supported-vehicle lists. Callback timing stays unstated.
- Photos served from `public/images/` only (CSP `img-src 'self' data: blob:`). `public/logo-light.png` is the reversed logo for navy areas, `public/logo.png` for white.
- Keep AA contrast, visible focus, `prefers-reduced-motion` rule, 44px touch targets, mobile call bar hidden while a field is focused, blank env contact values hide their UI (`lib/site.ts`).
- `tests/brand.test.ts` and `tests/copy-claims.test.ts` must keep passing; no text containing the sister-brand name.
- Existing 11 URLs unchanged. New URLs: `/services`, `/how-it-works`, `/resources`.
- `lib/content.ts` keeps `symptoms`, `Accent`, `quickChecks`, `weDo`, `weDont`, `promises`, `vehicleInfo`, `generalFaqs`. `chatSteps` is replaced by `processSteps`.

## Review Focus
1. Every photo slot missing: pages must still render with a navy panel (Task 2 test: `findPhoto` returns `null`, `Photo` never throws).
2. Slot alt text: every slot has a non-empty `defaultAlt` (Task 2 test).
3. Orange/navy contrast: button text, body text, links, and the orange-on-navy footer links meet AA 4.5:1 (Task 1 test).
4. Blank `NEXT_PUBLIC_SUPPORT_PHONE`: every call-to-action has a `/contact` fallback, never an empty `href` (Task 3 and 5 source scan: no `href={telHref}` outside a `telHref ?` guard).
5. Broken navigation: every nav/footer/sitemap href maps to an existing route folder (Task 7 test); reduced-motion rule retained (Task 1 test).

---

### Task 1: Design tokens, fonts and class migration

**Files:**
- Modify: `app/globals.css`, `package.json`, `package-lock.json`, `app/layout.tsx` (`themeColor`), every `.tsx` under `app/` and `components/` that uses legacy class names (listed by `grep -rlE "teal-|coral-|cream|sand|on-teal" app components`)
- Create: `tests/design-tokens.test.ts`

**Interfaces:**
- Produces (Tailwind colour tokens): `navy-50/100/700/800/900/950`, `orange-100/500/600/700`, `paper` (#f6f8fb), `mist` (#eaeff6), `line` (#d5dde9), `ink` (#0f1f3a), `muted` (#4a5a73). Fonts: `--font-display` = Source Serif 4 Variable, `--font-sans` = DM Sans Variable.
- Produces (CSS classes): `.eyebrow` (small uppercase orange-700 label, no pill), `.btn`, `.btn-primary` (orange-500 bg, navy-950 text), `.btn-ghost` (navy-900 border), `.btn-light`, `.on-navy` (replaces `.on-teal`), `.card` (white, 1px line border, 6px radius, shadow-soft), `.field-*`, `.accordion`, `.prose-page`, `.accent-sage|sky|butter|blush` (legacy names kept, now navy/orange/grey tints so `Accent` data stays valid).
- Suggested values: navy-950 #071a38, navy-900 #0b2a55, navy-800 #12396f, navy-700 #1d4c8c, navy-100 #dbe5f3, navy-50 #eef3fa, orange-500 #f26a0c, orange-600 #d95500, orange-700 #b04200, orange-100 #fdebd9. Adjust until the contrast test passes.

- [ ] **Step 1: Create branch** `git switch -c redesign/professional` and commit the spec and this plan: `git add docs && git commit -m "docs: professional redesign spec and plan"`.
- [ ] **Step 2: Write failing test** `tests/design-tokens.test.ts` that parses `--color-*` hex values from `app/globals.css` and asserts: `contrast(ink, white) >= 7`, `contrast(muted, white) >= 4.5`, `contrast(muted, paper) >= 4.5`, `contrast(navy-950, orange-500) >= 4.5`, `contrast(orange-700, white) >= 4.5`, `contrast(white, navy-900) >= 7`, `contrast(orange-500, navy-900) >= 4.5` (orange links on navy footer), `contrast(navy-100, navy-900) >= 4.5`; also that `globals.css` contains `prefers-reduced-motion: reduce` and `--font-display` mentions `Source Serif 4`. Write a small `luminance`/`contrast` helper in the test file.
- [ ] **Step 3: Run** `npx vitest run tests/design-tokens.test.ts`; expect FAIL (tokens missing).
- [ ] **Step 4: Install font** `npm install @fontsource-variable/source-serif-4`; import it in `globals.css`; `npm uninstall @fontsource-variable/bricolage-grotesque` and remove its import.
- [ ] **Step 5: Rewrite `app/globals.css`** `@theme` and `@layer components` to the interface above. Keep the `rise` animation and reduced-motion block; drop `float` and `wave` keyframes and their `--animate-*` tokens after confirming no file uses `animate-float`/`animate-wave`. Buttons use `--font-sans` weight 600, radius 6px; headings use `--font-display` weight 600, `letter-spacing: -0.01em`.
- [ ] **Step 6: Migrate class names** across `app/` and `components/` with a scripted rename (`teal-`→`navy-`, `coral-`→`orange-`, `bg-cream`/`text-cream`→`paper`, `bg-sand`→`mist`, `on-teal`→`on-navy`). Then set `themeColor` in `app/layout.tsx` to the navy-900 value.
- [ ] **Step 7: Run** `npx vitest run tests/design-tokens.test.ts` (PASS), then `npm run typecheck && npm run lint && npm test`; all PASS.
- [ ] **Step 8: Commit** `git add -A && git commit -m "feat(design): navy/orange tokens, serif headings, class migration"`.

### Task 2: Photo slot system

**Files:**
- Create: `lib/images.ts`, `components/Photo.tsx`, `public/images/README.md`, `tests/images.test.ts`

**Interfaces:**
- Produces in `lib/images.ts`:
  - `type PhotoSlot = "hero" | "service-activation" | "service-signal" | "service-channels" | "service-subscription" | "about" | "process" | "contact" | "banner-services" | "banner-how-it-works" | "banner-resources"`
  - `photoSlots: Record<PhotoSlot, { ratio: string; defaultAlt: string }>` (ratio e.g. `"16/9"`; hero `21/9` desktop crop is done with CSS object-fit, so ratio here is the recommended source ratio)
  - `findPhoto(slot: PhotoSlot): string | null` returns `/images/<slot>.<ext>` for the first existing of `jpg, jpeg, webp, png, avif` under `public/images`, else `null`.
- Produces in `components/Photo.tsx` (server component): `Photo({ slot, alt?, className?, priority?, sizes? }: {...})`. Wrapper is `relative overflow-hidden bg-navy-900` with the slot's aspect ratio unless `className` overrides; renders `next/image` with `fill`, `object-cover`, `alt = alt ?? defaultAlt`, `sizes` default `"(min-width: 1024px) 50vw, 100vw"`; when `findPhoto` is `null` renders only the navy wrapper with `aria-hidden`.
- Consumes: nothing.

- [ ] **Step 1: Write failing tests** `tests/images.test.ts`: every slot has `defaultAlt.trim().length > 0` and a ratio matching `/^\d+\/\d+$/`; `findPhoto("hero")` returns `null` while `public/images` holds no hero file (use a temp file named for the slot in the test, create then delete, to assert it returns `/images/hero.jpg`); `public/images/README.md` mentions every slot key.
- [ ] **Step 2: Run** `npx vitest run tests/images.test.ts`; expect FAIL.
- [ ] **Step 3: Implement** `lib/images.ts` (use `node:fs` `existsSync` with `process.cwd()`), `components/Photo.tsx`, and `public/images/README.md` (table: slot name, recommended ratio and minimum width 1600px, where it appears, JPG/WebP, no text baked into images, no provider logos).
- [ ] **Step 4: Run** tests, PASS; `npm run typecheck && npm run lint`.
- [ ] **Step 5: Commit** `git commit -am "feat: photo slot registry and Photo component"` (add new files first).

### Task 3: Site shell (header, footer, mobile call bar) and navigation data

**Files:**
- Modify: `lib/site.ts`, `components/Header.tsx`, `components/Footer.tsx`, `components/MobileCallBar.tsx`, `components/SiteShell.tsx`, `components/Logo.tsx`
- Test: `tests/site-nav.test.ts` (created here, extended in Task 7)

**Interfaces:**
- Produces in `lib/site.ts`: `primaryNav: readonly { href: string; label: string }[]` = Services `/services`, How it works `/how-it-works`, Resources `/resources`, About `/about`, FAQ `/faq`, Contact `/contact`; `infoPages` = the first three entries (used by sitemap in Task 7). `servicePages`, `companyPages`, `legalPages` stay.
- Consumes: Task 1 tokens; `services` from `lib/content`.

- [ ] **Step 1: Write failing test** `tests/site-nav.test.ts`: every `primaryNav`, `servicePages`, `companyPages`, `legalPages` href equals `/` or has a directory `app/(site)/<href>/page.tsx` (this fails for the three new pages until Task 7, so list them in the test as `pendingRoutes` removed in Task 7).
- [ ] **Step 2: Add `primaryNav` and `infoPages`** to `lib/site.ts`; run the test (PASS with pending list).
- [ ] **Step 3: Rewrite `Header`**: solid white sticky bar with bottom 1px line (not floating, no pill); logo left; desktop nav from `primaryNav` with the four services in a dropdown under "Services" (keep the existing Escape/outside-click/pathname-close logic); right side phone button, or `Contact us` link to `/contact` when `telHref` is empty; mobile menu lists services then `primaryNav`.
- [ ] **Step 4: Rewrite `Footer`** on `bg-navy-900` using `logo-light.png`, four columns (brand + independence statement text unchanged, Services, Company incl. new pages, Get in touch), square corners; links `text-navy-100`, hover white. Keep address/hours/email conditional logic unchanged.
- [ ] **Step 5: Restyle `MobileCallBar`** as a full-width navy-bordered orange button, 4px radius; behaviour unchanged. `SiteShell` skip link uses navy-900.
- [ ] **Step 6: Verify** `npm run typecheck && npm run lint && npm test` PASS; run `npm run dev` and use the browser tools to screenshot header and footer at 1280px and 390px width; confirm no horizontal scroll.
- [ ] **Step 7: Commit** `git commit -am "feat(design): solid header, navy footer, primary nav"`.

### Task 4: Shared blocks

**Files:**
- Modify: `components/blocks.tsx`, `components/ServicePage.tsx`, `app/(site)/about/page.tsx`, `app/(site)/contact/page.tsx`, `app/(site)/faq/page.tsx`, `components/LegalPage.tsx` (callers of `PageBanner` only: remove the `accent` prop)
- Test: `tests/copy-style.test.ts` (created here, extended in Task 9)

**Interfaces:**
- Produces: `PageBanner({ title, lead, crumbs, eyebrow?, photo? }: {...; photo?: PhotoSlot})`: navy-900 band, white heading, breadcrumb in navy-100, optional `Photo` as right-half image on `lg` (hidden on mobile), no blobs. `SectionHeading({ eyebrow, title, lead?, id?, align? })` unchanged signature, new look. `ClosingCta({ title?, text? })` unchanged signature: navy band, orange primary button, `/contact` fallback when no phone. `Checklist`, `FaqAccordion`, `JsonLd` unchanged signatures.
- Consumes: `Photo`, `PhotoSlot` from Task 2.

- [ ] **Step 1: Write failing test** `tests/copy-style.test.ts`: scanning `app` and `components` `.tsx` sources, none contains `24/7`, `around the clock`, `testimonial`, `★`, or a pattern like `\d[\d,]*\+? (customers|drivers|cars)`; none contains `href={telHref}` that is not inside a `telHref ?` or `telHref &&` guard on the same or preceding 2 lines (the test implements this with a line-window check).
- [ ] **Step 2: Run** test; expect PASS or reveal real violations; fix any in place.
- [ ] **Step 3: Restyle blocks** per the interfaces; update the five callers to drop `accent`.
- [ ] **Step 4: Verify** `npm run typecheck && npm run lint && npm test`; screenshot `/about` at desktop and mobile.
- [ ] **Step 5: Commit** `git commit -am "feat(design): banner, CTA, headings, accordion restyle"`.

### Task 5: Home page

**Files:**
- Create: `components/home/Hero.tsx`, `components/home/TrustStrip.tsx`, `components/home/ServiceCards.tsx`, `components/home/ProcessSteps.tsx`, `components/home/Resources.tsx`
- Modify: `app/(site)/page.tsx`, `components/home/DoDont.tsx`, `components/home/QuickChecks.tsx`, `lib/content.ts`, `tests/content.test.ts`
- Delete: `components/home/HeroArt.tsx`, `components/home/ChatSteps.tsx`, `components/home/SymptomPicker.tsx`

**Interfaces:**
- Produces in `lib/content.ts`: `processSteps: readonly { title: string; text: string }[]` (exactly 4, derived from the old chat copy: 1 Tell us what the radio is doing; 2 We reply with plain-English guidance and checks; 3 Try the checks and note the result; 4 We help you word what to tell your provider or installer; no timing words like "within"/"minutes"/"hours"). Remove `chatSteps`.
- Components (all server, no props): `Hero` (uses `Photo slot="hero" priority`, navy overlay, h1 "Independent help for your car's satellite radio", primary `#enquiry` button, call button or `/contact` fallback), `TrustStrip` (three items from `promises[0..2]` titles), `ServiceCards` (four cards from `services` with `Photo slot="service-<category>"`, title, `short`, link), `ProcessSteps` (numbered from `processSteps`), `Resources` (three `quickChecks` plus links to `/resources` and `/faq`).
- Home order per spec: Hero, TrustStrip, ServiceCards, ProcessSteps, Photo+DoDont, Resources, enquiry form on navy panel (keep `id="enquiry"` and `<EnquiryForm variant="compact" />`), FAQ (first 6, 2 columns), `ClosingCta`.

- [ ] **Step 1: Update failing test** in `tests/content.test.ts`: replace the chatSteps assertions with `expect(processSteps).toHaveLength(4)` and a regex check that no step matches `/within|minutes?|hours?|24|guarantee/i`; remove `chatSteps` from the destructure.
- [ ] **Step 2: Run** `npx vitest run tests/content.test.ts`; expect FAIL.
- [ ] **Step 3: Implement** `processSteps` in `lib/content.ts`, delete `chatSteps`; run test, PASS.
- [ ] **Step 4: Build the components and page** per the interfaces; delete the three obsolete components; restyle `DoDont` and `QuickChecks` with square cards and `Checklist`.
- [ ] **Step 5: Verify** `npm run typecheck && npm run lint && npm test`; `npm run dev`, screenshot `/` at 1440, 1024 and 390 px with all photo slots missing; confirm the navy fallback panels look intentional, headings are legible and no horizontal scroll.
- [ ] **Step 6: Commit** `git add -A && git commit -m "feat(design): new home page"`.

### Task 6: Service guide template and remaining pages

**Files:**
- Modify: `components/ServicePage.tsx`, `app/(site)/about/page.tsx`, `app/(site)/contact/page.tsx`, `app/(site)/faq/page.tsx`, `components/LegalPage.tsx`, `app/not-found.tsx`, `app/error.tsx`, `components/EnquiryForm.tsx` (class names only; no logic change)

**Interfaces:**
- Consumes: `PageBanner` (with `photo` slots `service-*`, `about`, `contact`), `Photo`, Task 1 classes.
- Produces: no new exports.

- [ ] **Step 1: Restyle `ServicePage`**: banner with the matching `service-<category>` photo; "what we can help with" as a 2-column checklist; "before you get in touch" as three bordered cards with numbers; "what happens next" as numbered list; limits in a `mist` panel; sticky enquiry aside as `.card`; "Other guides" as a row of bordered links using `Icon`. Remove all `rounded-[…]` and `rounded-full` card styling.
- [ ] **Step 2: Restyle** about (add `Photo slot="about"` beside "Why RadioCares24 exists"), contact (add `Photo slot="contact"` above the details), faq, `LegalPage`, `not-found`, `error` to the new system; keep all copy except playful phrasing; replace the phrases "friendly"/"Let's sort it out together" style lines with plain professional wording where they appear as headings.
- [ ] **Step 3: Restyle form classes** in `EnquiryForm.tsx` (inputs, buttons, error text) without changing handlers, names, validation or `aria` attributes.
- [ ] **Step 4: Verify** `npm test` (includes `tests/enquiries.test.ts` and `tests/http.test.ts`, must pass untouched), typecheck, lint; screenshot `/radio-activation`, `/contact`, `/privacy-policy` desktop + mobile; submit the compact form in dev with deliberately invalid input and confirm error messages are visible and styled.
- [ ] **Step 5: Commit** `git commit -am "feat(design): guide template and inner pages"`.

### Task 7: New pages, sitemap and navigation

**Files:**
- Create: `app/(site)/services/page.tsx`, `app/(site)/how-it-works/page.tsx`, `app/(site)/resources/page.tsx`
- Modify: `app/sitemap.ts`, `tests/site-nav.test.ts`

**Interfaces:**
- Consumes: `PageBanner`, `SectionHeading`, `ClosingCta`, `Photo`, `services`, `processSteps`, `symptoms`, `quickChecks`, `vehicleInfo`, `generalFaqs`, `weDo`, `weDont`, `pageMetadata`, `infoPages`.
- Produces: three default-exported server pages, each with `export const metadata = pageMetadata({ title, description, path })`.
  - `/services`: banner (`banner-services`), four service rows (photo `service-*`, title, `short`, `helpWith` first 3, link), `weDont` limits panel, `ClosingCta`.
  - `/how-it-works`: banner (`banner-how-it-works`), `processSteps` as detailed numbered sections with `Photo slot="process"`, `promises` as four cards, `ClosingCta`.
  - `/resources`: banner (`banner-resources`), "What is your radio doing?" list from `symptoms`, `quickChecks`, `vehicleInfo` (`weNeed` checklist + `honest` text), `generalFaqs` accordion (first 6) with `withSchema`, `ClosingCta`.

- [ ] **Step 1: Extend failing test** in `tests/site-nav.test.ts`: remove `pendingRoutes`; add `sitemap()` urls include `/services`, `/how-it-works`, `/resources` (import default from `@/app/sitemap`); expect FAIL on missing pages.
- [ ] **Step 2: Create the three pages**; update `app/sitemap.ts` to include `infoPages` at priority 0.8.
- [ ] **Step 3: Run** `npm run typecheck && npm run lint && npm test`; PASS.
- [ ] **Step 4: Verify in browser**: the three pages at desktop and mobile; header/footer links reach them; no console errors.
- [ ] **Step 5: Commit** `git add -A && git commit -m "feat: services, how-it-works and resources pages"`.

### Task 8: Brand images and docs

**Files:**
- Modify: `app/opengraph-image.tsx`, `app/apple-icon.tsx`, `lib/seo.ts` (only if OG alt text mentions "Friendly"), `README.md`

- [ ] **Step 1: Regenerate OG image**: navy-900 background, `public/logo-light.png`, serif-free sans headline "Independent help for your car's satellite radio", subline unchanged in meaning (no "friendly"), orange rule; same 1200x630 size. Update `apple-icon.tsx` to a navy tile with `logo-mark-light.png`.
- [ ] **Step 2: Update `README.md`** with the photo workflow (point to `public/images/README.md`) and the three new pages. Leave `site.tagline` unchanged.
- [ ] **Step 3: Verify** `npm run build` succeeds; fetch `/opengraph-image` and `/apple-icon` from `npm start` and open the PNGs to confirm navy background and a legible logo.
- [ ] **Step 4: Commit** `git commit -am "feat(design): brand images and docs"`.

### Task 9: Final verification and leftovers guard

**Files:**
- Modify: `tests/copy-style.test.ts`

- [ ] **Step 1: Add failing test** in `tests/copy-style.test.ts`: no source in `app/` or `components/` contains legacy tokens `teal-`, `coral-`, `bg-cream`, `bg-sand`, `on-teal`, `rounded-[` with a rem value of 1 or more, `rounded-full` on an element whose class list also contains `btn`, `blur-2xl`, or `HeroArt`/`ChatSteps`/`SymptomPicker`.
- [ ] **Step 2: Run**; fix any leftovers found (this is where stragglers surface), until PASS.
- [ ] **Step 3: Run all gates**: `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`; all must exit 0.
- [ ] **Step 4: Visual pass** with `npm start`: screenshot `/`, `/services`, `/how-it-works`, `/resources`, `/radio-activation`, `/contact` at 1440 and 390 px; confirm no horizontal scroll, one `h1` per page, focus ring visible on keyboard tab, mobile call bar hides when a field is focused. Then place two sample images named `hero.jpg` and `service-signal.jpg` in `public/images/`, confirm they appear and the other slots keep the fallback, then delete the samples.
- [ ] **Step 5: Commit** `git commit -am "test: guard against legacy styling; final polish"` and report outcomes with the verification output.
