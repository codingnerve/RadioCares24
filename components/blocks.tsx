import Link from "next/link";
import { Icon } from "./Icon";
import { breadcrumbLd, faqLd, jsonLd } from "@/lib/seo";
import type { Accent, Faq } from "@/lib/content";
import { mailHref, site, telHref } from "@/lib/site";

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />;
}

/** Native <details> accordion: keyboard accessible with no client JS. */
export function FaqAccordion({
  faqs,
  withSchema = false,
  name = "faq",
  columns = 1,
}: {
  faqs: Faq[];
  withSchema?: boolean;
  /** Items sharing a name behave as one exclusive group. */
  name?: string;
  columns?: 1 | 2;
}) {
  return (
    <div className={`accordion items-start ${columns === 2 ? "lg:grid-cols-2" : ""}`}>
      {withSchema && <JsonLd data={faqLd(faqs)} />}
      {faqs.map((f) => (
        <details key={f.q} name={name}>
          <summary>{f.q}</summary>
          <p className="answer">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  id?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="mt-3 text-3xl sm:text-[2.6rem]">
        {title}
      </h2>
      {lead && <p className="mt-4 text-lg text-muted">{lead}</p>}
    </div>
  );
}

/** Closing call-to-action: a big rounded teal panel. */
export function ClosingCta({
  title = "Still not sure where to start? Just tell us what the radio is doing.",
  text = "Send a short note or call. We'll reply with practical next steps, and tell you honestly what we can and can't help with.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section aria-labelledby="cta-heading" className="px-3 pb-6 pt-6 sm:px-4">
      <div className="on-teal container-page relative overflow-hidden rounded-[2.5rem] bg-teal-800 !px-6 py-12 sm:!px-12 sm:py-16">
        <div aria-hidden="true" className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-teal-700/60" />
        <div aria-hidden="true" className="absolute -bottom-24 right-24 h-48 w-48 rounded-full bg-coral-500/25" />
        <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h2 id="cta-heading" className="text-3xl !text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mt-3 text-lg text-teal-100">{text}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary">
              Send an enquiry
            </Link>
            {telHref ? (
              <a href={telHref} className="btn btn-ghost">
                <Icon name="phone" className="h-5 w-5" /> {site.phoneDisplay}
              </a>
            ) : mailHref ? (
              <a href={mailHref} className="btn btn-ghost">
                <Icon name="mail" className="h-5 w-5" /> Email us
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Light banner for inner pages: soft accent panel with blobs and a breadcrumb. */
export function PageBanner({
  title,
  lead,
  crumbs,
  eyebrow,
  accent,
}: {
  title: string;
  lead: string;
  eyebrow?: string;
  accent?: Accent;
  crumbs: { name: string; path: string }[];
}) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <section className="px-3 pt-4 sm:px-4">
      <JsonLd data={breadcrumbLd(all)} />
      <div
        className={`container-page relative overflow-hidden rounded-[2.5rem] !px-6 py-12 sm:!px-12 sm:py-16 ${
          accent ? `accent-${accent}` : "bg-sand"
        }`}
      >
        <div aria-hidden="true" className="absolute -right-12 -top-16 h-56 w-56 rounded-full bg-white/50" />
        <div aria-hidden="true" className="absolute -bottom-20 right-28 h-40 w-40 rounded-full bg-white/35" />
        <div className="relative">
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              {all.map((c, i) => (
                <li key={c.path} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {i === all.length - 1 ? (
                    <span aria-current="page" className="font-semibold text-teal-900">
                      {c.name}
                    </span>
                  ) : (
                    <Link href={c.path} className="underline-offset-4 hover:underline">
                      {c.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          {eyebrow && <p className="eyebrow !bg-white/70 !text-teal-900">{eyebrow}</p>}
          <h1 className="mt-3 max-w-3xl text-4xl sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-ink/85">{lead}</p>
        </div>
      </div>
    </section>
  );
}

export function Checklist({ items, tone = "check" }: { items: string[]; tone?: "check" | "limit" }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            className={`mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full ${
              tone === "check" ? "bg-teal-100 text-teal-800" : "bg-white text-coral-700 ring-1 ring-line"
            }`}
            aria-hidden="true"
          >
            {tone === "check" ? (
              <Icon name="check" className="h-4 w-4" />
            ) : (
              <span className="text-sm font-bold leading-none">!</span>
            )}
          </span>
          <span className="text-ink">{item}</span>
        </li>
      ))}
    </ul>
  );
}
