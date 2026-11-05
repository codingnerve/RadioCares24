import Link from "next/link";
import { Checklist, ClosingCta, FaqAccordion, PageBanner } from "./blocks";
import { EnquiryForm } from "./EnquiryForm";
import { Icon } from "./Icon";
import { services, type ServiceContent } from "@/lib/content";

export function ServicePage({ service }: { service: ServiceContent }) {
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageBanner
        eyebrow="Help guide"
        accent={service.accent}
        title={service.h1}
        lead={service.intro}
        crumbs={[{ name: service.title, path: service.href }]}
      />

      <section className="py-14 sm:py-20" aria-labelledby="help-heading">
        <div className="container-page grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div className="space-y-14">
            <div>
              <h2 id="help-heading" className="text-2xl sm:text-3xl">
                What we can help with
              </h2>
              <ul className="mt-6 flex flex-wrap gap-3">
                {service.helpWith.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2 rounded-[1.25rem] bg-white px-4 py-3 text-[0.9375rem] shadow-soft ring-1 ring-line"
                  >
                    <Icon name="check" className="mt-0.5 h-4 w-4 flex-none text-sage-ink" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl">Before you get in touch</h2>
              <p className="mt-2 text-muted">Three quick things that often make the next step much easier.</p>
              <ol className="mt-6 grid gap-4 sm:grid-cols-3">
                {service.beforeYouContact.map((b, i) => (
                  <li key={b.title} className={`accent-${service.accent} rounded-[1.75rem] p-5`}>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/85 font-display font-bold">
                      {i + 1}
                    </span>
                    <h3 className="mt-4 text-lg !text-teal-950">{b.title}</h3>
                    <p className="mt-2 text-[0.9375rem] text-ink/85">{b.text}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl">What happens next</h2>
              <ol className="mt-6 grid gap-4 md:grid-cols-3">
                {service.nextSteps.map((s, i) => (
                  <li key={s} className="card relative !rounded-[1.5rem] p-5 pt-8">
                    <span
                      aria-hidden="true"
                      className="absolute -top-4 left-5 flex h-9 w-9 items-center justify-center rounded-full bg-coral-500 font-display font-bold text-[#2a0f08]"
                    >
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-[2rem] bg-sand p-6 sm:p-8">
              <h2 className="text-xl">What we can&apos;t do</h2>
              <p className="mt-1 text-sm text-muted">So there are no surprises.</p>
              <div className="mt-4">
                <Checklist tone="limit" items={service.limits} />
              </div>
            </div>
          </div>

          <aside id="enquiry" aria-labelledby="aside-heading" className="lg:sticky lg:top-28 lg:self-start">
            <div className="card !rounded-[2rem] p-5 sm:p-7">
              <h2 id="aside-heading" className="text-2xl">
                Ask about this
              </h2>
              <p className="mb-5 mt-2 text-sm text-muted">
                Describe what you&apos;re seeing and we&apos;ll reply with practical next steps.
              </p>
              <EnquiryForm variant="compact" defaultCategory={service.category} />
            </div>
          </aside>
        </div>
      </section>

      <section className="px-3 sm:px-4" aria-labelledby="faq-heading">
        <div className="container-page grid gap-10 rounded-[2.5rem] bg-teal-50 !px-6 py-14 sm:!px-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-heading" className="mt-3 text-3xl">
              {service.title}: common questions
            </h2>
          </div>
          <FaqAccordion faqs={service.faqs} withSchema />
        </div>
      </section>

      <section className="py-14" aria-labelledby="related-heading">
        <div className="container-page">
          <h2 id="related-heading" className="text-2xl">
            Other guides
          </h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={o.href}
                  className={`accent-${o.accent} group inline-flex items-center gap-3 rounded-full py-2 pl-2 pr-5 font-display font-semibold transition-transform hover:-translate-y-0.5`}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/85">
                    <Icon name={o.icon} className="h-5 w-5" />
                  </span>
                  <span className="text-teal-950 group-hover:underline">{o.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
