import Link from "next/link";
import { Checklist, ClosingCta, FaqAccordion, PageBanner } from "./blocks";
import { EnquiryForm } from "./EnquiryForm";
import { Icon } from "./Icon";
import { services, type ServiceContent } from "@/lib/content";
import type { PhotoSlot } from "@/lib/images";

export function ServicePage({ service }: { service: ServiceContent }) {
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageBanner
        eyebrow="Service guide"
        photo={`service-${service.category}` as PhotoSlot}
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
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {service.helpWith.map((h) => (
                  <li key={h} className="flex items-start gap-3 rounded border border-line bg-white px-4 py-3 text-[0.9375rem]">
                    <Icon name="check" className="mt-0.5 h-4 w-4 flex-none text-orange-700" />
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
                  <li key={b.title} className="card p-5">
                    <span className="font-display text-3xl font-semibold text-orange-700">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 text-lg">{b.title}</h3>
                    <p className="mt-2 text-[0.9375rem] text-muted">{b.text}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl">What happens next</h2>
              <ol className="mt-6 space-y-3">
                {service.nextSteps.map((s, i) => (
                  <li key={s} className="flex items-start gap-4 border-l-2 border-navy-900 bg-paper py-3 pl-4 pr-4">
                    <span className="font-display text-lg font-semibold text-orange-700" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-md bg-mist p-6 sm:p-8">
              <h2 className="text-xl">What we can&apos;t do</h2>
              <p className="mt-1 text-sm text-muted">So there are no surprises.</p>
              <div className="mt-4">
                <Checklist tone="limit" items={service.limits} />
              </div>
            </div>
          </div>

          <aside id="enquiry" aria-labelledby="aside-heading" className="lg:sticky lg:top-28 lg:self-start">
            <div className="card p-5 sm:p-7">
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

      <section className="bg-paper py-14" aria-labelledby="faq-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
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
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={o.href}
                  className="group flex items-center gap-3 rounded border border-line bg-white px-4 py-3 font-semibold text-navy-900 hover:border-navy-900"
                >
                  <Icon name={o.icon} className="h-5 w-5 flex-none text-navy-700" />
                  <span className="group-hover:underline">{o.title}</span>
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
