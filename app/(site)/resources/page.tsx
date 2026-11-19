import type { Metadata } from "next";
import Link from "next/link";
import { Checklist, ClosingCta, FaqAccordion, PageBanner } from "@/components/blocks";
import { Icon } from "@/components/Icon";
import { generalFaqs, quickChecks, symptoms, vehicleInfo } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Resources",
  description:
    "Free resources for car satellite radio problems: quick checks to try first, a guide to what your radio is doing, what details to gather and answers to common questions.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <PageBanner
        eyebrow="Resources"
        photo="banner-resources"
        title="Quick checks and straight answers"
        lead="Start here if you would rather try a few things yourself before you get in touch."
        crumbs={[{ name: "Resources", path: "/resources" }]}
      />

      <section className="py-14 sm:py-20" aria-labelledby="symptoms-heading">
        <div className="container-page">
          <h2 id="symptoms-heading" className="text-3xl">
            What is your radio doing?
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {symptoms.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="card flex h-full items-start gap-4 p-5 hover:border-navy-900"
                >
                  <Icon name={s.icon} className="mt-1 h-6 w-6 flex-none text-orange-700" />
                  <span>
                    <span className="block font-display text-lg font-semibold text-navy-900">{s.label}</span>
                    <span className="mt-1 block text-[0.9375rem] text-muted">{s.hint}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper py-14 sm:py-16" aria-labelledby="checks-heading">
        <div className="container-page">
          <h2 id="checks-heading" className="text-3xl">
            Three things worth trying first
          </h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-3">
            {quickChecks.map((c, i) => (
              <li key={c.title} className="card p-5">
                <span className="font-display text-3xl font-semibold text-orange-700">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-xl">{c.title}</h3>
                <p className="mt-2 text-muted">{c.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-14 sm:py-20" aria-labelledby="details-heading">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="details-heading" className="text-3xl">
              Details worth gathering
            </h2>
            <p className="mt-4 text-lg text-muted">{vehicleInfo.intro}</p>
            <p className="mt-4 text-muted">{vehicleInfo.honest}</p>
          </div>
          <div className="card p-6 sm:p-8">
            <h3 className="text-xl">Have these ready</h3>
            <div className="mt-5">
              <Checklist items={[...vehicleInfo.weNeed]} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-14 sm:py-16" aria-labelledby="faq-heading">
        <div className="container-page">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="faq-heading" className="text-3xl">
              Common questions
            </h2>
            <Link href="/faq" className="btn btn-ghost">
              See all questions
            </Link>
          </div>
          <div className="mt-8">
            <FaqAccordion faqs={generalFaqs.slice(0, 6)} columns={2} withSchema name="resources-faq" />
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
