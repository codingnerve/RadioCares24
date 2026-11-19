import Link from "next/link";
import { Icon } from "./Icon";
import { breadcrumbLd, faqLd, jsonLd } from "@/lib/seo";
import { Photo } from "./Photo";
import type { Faq } from "@/lib/content";
import type { PhotoSlot } from "@/lib/images";
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
      <h2 id={id} className="mt-3 text-3xl sm:text-4xl">
        {title}
      </h2>
      {lead && <p className="mt-4 text-lg text-muted">{lead}</p>}
    </div>
  );
}

/** Closing call-to-action: a full-width navy band. */
export function ClosingCta({
  title = "Still not sure where to start? Just tell us what the radio is doing.",
  text = "Send a short note or call. We'll reply with practical next steps, and tell you honestly what we can and can't help with.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section aria-labelledby="cta-heading" className="on-navy mt-16 bg-navy-900 py-14 sm:py-16">
      <div className="container-page flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <h2 id="cta-heading" className="text-3xl !text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-lg text-navy-100">{text}</p>
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
    </section>
  );
}

/** Navy banner for inner pages: breadcrumb, heading and an optional photo on large screens. */
export function PageBanner({
  title,
  lead,
  crumbs,
  eyebrow,
  photo,
}: {
  title: string;
  lead: string;
  eyebrow?: string;
  photo?: PhotoSlot;
  crumbs: { name: string; path: string }[];
}) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <section className="on-navy relative overflow-hidden bg-navy-900">
      <JsonLd data={breadcrumbLd(all)} />
      {photo && (
        <div className="absolute inset-y-0 right-0 hidden w-2/5 lg:block" aria-hidden="true">
          <Photo slot={photo} sizing="parent" className="h-full w-full" sizes="40vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/40 to-transparent" />
        </div>
      )}
      <div className="container-page relative py-12 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-navy-100">
          <ol className="flex flex-wrap items-center gap-2">
            {all.map((c, i) => (
              <li key={c.path} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {i === all.length - 1 ? (
                  <span aria-current="page" className="font-semibold text-white">
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
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-4xl !text-white sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-navy-100">{lead}</p>
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
            className={`mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded ${
              tone === "check" ? "bg-navy-50 text-navy-800" : "bg-white text-orange-700 ring-1 ring-line"
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
